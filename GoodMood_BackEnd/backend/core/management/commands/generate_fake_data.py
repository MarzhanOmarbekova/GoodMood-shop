import random
from faker import Faker
from api_main.models import (
    Category,
    Product,
    ProductVariant,
    Size,
)
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Generate fake data for categories, products, and product variants"

    def handle(self, *args, **kwargs):
        fake = Faker()

        # Предустановленные размеры и цвета
        sizes = ["XS", "S", "M", "L", "XL", "XXL"]
        colors = ["Black", "White", "Red", "Blue", "Green", "Yellow", "Beige", "Gray"]

        # Категории одежды
        clothing_categories = [
            "Men",
            "Women",
            "Kids",
            "Shoes",
            "Accessories",
            "Sportswear",
            "Outerwear",
            "Underwear",
        ]

        # Добавим размеры, если их ещё нет
        for size_name in sizes:
            Size.objects.get_or_create(name=size_name)

        # Создание категорий
        for cat_name in clothing_categories:
            cat, created = Category.objects.get_or_create(
                name=cat_name, defaults={"description": fake.text(max_nb_chars=150)}
            )

            # Для каждой категории создаём товары
            for _ in range(random.randint(5, 10)):  # 5-10 товаров на категорию
                product_name = (
                    fake.unique.company()
                    + " "
                    + random.choice(["T-Shirt", "Jacket", "Pants", "Shoes", "Hat"])
                )
                product = Product.objects.get_or_create(
                    name=product_name,
                    description=fake.text(),
                    price=round(random.uniform(10.0, 200.0), 2),
                    main_image_url=fake.image_url(),
                    image_urls=[fake.image_url() for _ in range(3)],
                )
                product.categories.add(cat)

                # Создание вариантов товара
                for _ in range(random.randint(2, 5)):  # 2-5 вариантов на продукт
                    size = Size.objects.order_by("?").first()
                    color = random.choice(colors)
                    ProductVariant.objects.get_or_create(
                        product=product,
                        size=size,
                        color=color,
                        stock=random.randint(0, 50),
                        price=round(random.uniform(10.0, 200.0), 2),
                    )

        self.stdout.write(self.style.SUCCESS("✅ Данные успешно сгенерированы!"))

import json
import random
from faker import Faker
from django.core.management.base import BaseCommand
from api_main.models import Category, Product, ProductVariant, Size
import os

class Command(BaseCommand):
    help = "Импортирует товары из data.json в базу данных"

    def handle(self, *args, **kwargs):
        fake = Faker()


        # ✅ Подгружаем JSON
        try:
            with open("C:/Users/NEXTGENPC/Desktop/GoodMood-shop/GoodMood_BackEnd/backend/core/management/commands/data.json", "r", encoding="utf-8") as file:
                data = json.load(file)
        except Exception as e:
            self.stderr.write(self.style.ERROR(f"❌ Ошибка чтения data.json: {e}"))
            return

        # ✅ Добавляем размеры (если ещё не добавлены)
        sizes = ["XS", "S", "M", "L", "XL", "XXL"]
        for name in sizes:
            Size.objects.get_or_create(name=name, defaults={"description": f"Size {name}"})

        # ✅ Обработка каждого товара
        for item in data:
            title = item.get("title")
            brand = item.get("brand", "Без бренда")
            price = item.get("unitPrice", 0)
            preview_images = item.get("previewImages", [])
            main_image_url = (
                preview_images[0].get("large")
                if preview_images and isinstance(preview_images[0], dict) and "large" in preview_images[0]
                else fake.image_url()
            )

            # Формируем список всех изображений
            image_urls = [
                img.get("large") for img in preview_images
                if isinstance(img, dict) and "large" in img
            ]
            categories = item.get("categoryRu", ["Прочее"])

            #Создаём продукт
            product, created = Product.objects.get_or_create(
                name=title,
                defaults={
                    "description": f"Бренд: {brand}",
                    "price": price,
                    "main_image_url": main_image_url,
                    "image_urls": image_urls,
                },
            )

            #Привязываем категории
            for cat_name in categories:
                category, _ = Category.objects.get_or_create(name=cat_name)
                product.categories.add(category)

            # Добавляем варианты (цвета — рандом, размеры — из существующих)
            size = Size.objects.order_by("?").first()
            color = random.choice(["Black", "White", "Gray", "Red", "Blue", "Green", "Yellow", "Beige"])

            ProductVariant.objects.get_or_create(
                product=product,
                size=size,
                color=color,
                defaults={
                    "stock": random.randint(1, 30),
                    "price": price,
                },
            )

        self.stdout.write(self.style.SUCCESS("✅ Импорт завершён: товары добавлены из data.json"))

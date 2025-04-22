from django.core.management.base import BaseCommand
from api_main.models import Product, ProductVariant, Category, Size

class Command(BaseCommand):
    help = "Удаляет все товары, варианты товаров, категории и размеры"

    def handle(self, *args, **kwargs):
        # Удаление по порядку, чтобы избежать ForeignKey конфликтов
        ProductVariant.objects.all().delete()
        self.stdout.write("🧹 Удалены все варианты товаров")

        Product.objects.all().delete()
        self.stdout.write("🗑️ Удалены все товары")

        Category.objects.all().delete()
        self.stdout.write("📦 Удалены все категории")

        Size.objects.all().delete()
        self.stdout.write("📏 Удалены все размеры")

        self.stdout.write(self.style.SUCCESS("✅ Всё очищено успешно!"))

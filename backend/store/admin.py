from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Product, NairobiLocation, Order, OrderItem

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('image_preview', 'name', 'category', 'subcategory', 'gender', 'price', 'stock', 'is_new', 'is_popular', 'badge')
    list_filter = ('category', 'gender', 'is_new', 'is_popular', 'subcategory')
    search_fields = ('name', 'description', 'subcategory')
    list_editable = ('price', 'stock', 'is_new', 'is_popular', 'badge')
    ordering = ('-created_at',)

    def image_preview(self, obj):
        if obj.images and len(obj.images) > 0:
            return format_html('<img src="{}" style="width: 45px; height: 45px; object-fit: cover; border-radius: 8px; border: 1px solid #D4AF37;" />', obj.images[0])
        return "-"
    image_preview.short_description = "Item Photo"

@admin.register(NairobiLocation)
class NairobiLocationAdmin(admin.ModelAdmin):
    list_display = ('name', 'location_id', 'fee', 'eta')
    search_fields = ('name', 'location_id')
    list_editable = ('fee', 'eta')

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('product_name', 'selected_size', 'price', 'quantity')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'customer_name', 'phone', 'delivery_location_name', 'payment_method', 'total_amount', 'status', 'created_at')
    list_filter = ('status', 'payment_method', 'created_at')
    search_fields = ('order_number', 'customer_name', 'phone', 'delivery_location_name')
    list_editable = ('status',)
    inlines = [OrderItemInline]
    ordering = ('-created_at',)

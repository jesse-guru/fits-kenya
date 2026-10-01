from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Product(models.Model):
    GENDER_CHOICES = (
        ('unisex', 'Unisex'),
        ('men', 'Men'),
        ('women', 'Women'),
    )

    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    subcategory = models.CharField(max_length=100, help_text="e.g. Sneakers, Tees, Hoodies, Cargos, Bags")
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default='unisex')
    price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Price in KSh")
    original_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, help_text="Original price before discount")
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=5.0)
    reviews_count = models.IntegerField(default=0)
    badge = models.CharField(max_length=50, blank=True, help_text="e.g. MUST HAVE, TRENDING, NEW DROP")
    is_new = models.BooleanField(default=True)
    is_popular = models.BooleanField(default=False)
    stock = models.IntegerField(default=10)
    description = models.TextField()
    images = models.JSONField(default=list, help_text="List of image URLs e.g. ['https://...']")
    sizes = models.JSONField(default=list, help_text="List of sizes e.g. ['EU 40', 'EU 41'] or ['S', 'M', 'L']")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class NairobiLocation(models.Model):
    name = models.CharField(max_length=200)
    location_id = models.CharField(max_length=100, unique=True)
    fee = models.DecimalField(max_digits=10, decimal_places=2, help_text="Delivery fee in KSh")
    eta = models.CharField(max_length=100, help_text="e.g. 2 - 3 Hours (Rider Express)")

    def __str__(self):
        return f"{self.name} (KSh {self.fee})"

class Order(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending M-Pesa / Verification'),
        ('confirmed', 'Confirmed'),
        ('dispatched', 'Dispatched with Nairobi Rider'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    )

    PAYMENT_CHOICES = (
        ('mpesa', 'M-Pesa STK Push'),
        ('cod', 'Cash / Card on Delivery'),
    )

    order_number = models.CharField(max_length=50, unique=True)
    customer_name = models.CharField(max_length=150)
    phone = models.CharField(max_length=20)
    delivery_location_name = models.CharField(max_length=200)
    delivery_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    address_notes = models.TextField(blank=True)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_CHOICES, default='mpesa')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='confirmed')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.order_number} - {self.customer_name} (KSh {self.total_amount})"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    product_name = models.CharField(max_length=200)
    selected_size = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantity}x {self.product_name} ({self.selected_size})"

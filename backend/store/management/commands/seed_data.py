from django.core.management.base import BaseCommand
from store.models import Category, Product, NairobiLocation

class Command(BaseCommand):
    help = 'Seed database with initial products, categories, and Nairobi delivery locations.'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting database seeding...'))

        # 1. Categories
        cat_clothes, _ = Category.objects.get_or_create(
            slug='clothes',
            defaults={'name': 'Streetwear Apparel', 'description': 'Tees, Hoodies, Cargo Pants, and Outerwear'}
        )
        cat_shoes, _ = Category.objects.get_or_create(
            slug='shoes',
            defaults={'name': 'Kicks & Shoes', 'description': 'Authentic Sneakers, Slides, and Grails'}
        )
        cat_acc, _ = Category.objects.get_or_create(
            slug='accessories',
            defaults={'name': 'Accessories', 'description': 'Caps, Bags, Chains, and Street Accessories'}
        )

        # 2. Locations
        locations_data = [
            {'id': 'cbd', 'name': 'Nairobi CBD (Pickup / Delivery)', 'fee': 0, 'eta': '1 - 2 Hours (Instant Rider)'},
            {'id': 'westlands', 'name': 'Westlands / Parklands / Highridge', 'fee': 250, 'eta': '2 Hours (Rider Express)'},
            {'id': 'kilimani', 'name': 'Kilimani / Lavington / Kileleshwa', 'fee': 250, 'eta': '2 - 3 Hours (Rider Express)'},
            {'id': 'roysambu', 'name': 'Roysambu / TRM / Kasarani / Garden City', 'fee': 300, 'eta': '2 - 3 Hours (Rider Express)'},
            {'id': 'thika_rd', 'name': 'Thika Road / Kahawa West / Juja', 'fee': 350, 'eta': '3 - 4 Hours (Rider Express)'},
            {'id': 'karen', 'name': 'Karen / Langata / Bomas', 'fee': 300, 'eta': '2 - 3 Hours (Rider Express)'},
            {'id': 'eastlands', 'name': 'Buruburu / Donholm / Embakasi / Fedha', 'fee': 300, 'eta': '2 - 4 Hours'},
            {'id': 'south_b', 'name': 'South B / South C / Bellevue', 'fee': 250, 'eta': '2 Hours'},
            {'id': 'kiambu', 'name': 'Kiambu Town / Ruaka / Ndenderu', 'fee': 350, 'eta': '3 - 4 Hours'},
            {'id': 'kitengela', 'name': 'Kitengela / Athi River / Syokimau', 'fee': 400, 'eta': 'Same Day Delivery'},
            {'id': 'upcountry_mbs', 'name': 'Mombasa / Coast Region (Courier)', 'fee': 500, 'eta': '24 Hours (Wells Fargo / Speedaf)'},
            {'id': 'upcountry_nkr', 'name': 'Nakuru / Eldoret / Kisumu (Courier)', 'fee': 450, 'eta': '24 Hours (EasyCoach / Matatu Sacco)'}
        ]

        for loc in locations_data:
            NairobiLocation.objects.get_or_create(
                location_id=loc['id'],
                defaults={'name': loc['name'], 'fee': loc['fee'], 'eta': loc['eta']}
            )

        # 3. Products
        products_data = [
            {
                'id': 1,
                'name': 'Air Jordan 4 Retro "Military Black"',
                'category': cat_shoes,
                'subcategory': 'Sneakers',
                'gender': 'unisex',
                'price': 7500,
                'original_price': 9200,
                'rating': 4.9,
                'reviews_count': 42,
                'badge': 'MUST HAVE',
                'is_new': True,
                'is_popular': True,
                'stock': 7,
                'description': 'The iconic Jordan 4 Military Black features a premium white leather upper with smooth grey suede overlays and black accents on the eyelets, heel tab, and midsole. Engineered for maximum street style points in Nairobi.',
                'images': [
                    'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=800'
                ],
                'sizes': ['EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45']
            },
            {
                'id': 2,
                'name': 'Nairobi Heavyweight Graphic Boxy Tee',
                'category': cat_clothes,
                'subcategory': 'Tees',
                'gender': 'unisex',
                'price': 2400,
                'original_price': 3000,
                'rating': 4.8,
                'reviews_count': 38,
                'badge': 'TRENDING',
                'is_new': True,
                'is_popular': True,
                'stock': 15,
                'description': 'Crafted from 240GSM heavyweight 100% combed cotton. Features a relaxed drop-shoulder oversized fit with custom Fits Kenya distressed chest graphic logo.',
                'images': [
                    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800'
                ],
                'sizes': ['S', 'M', 'L', 'XL', 'XXL']
            },
            {
                'id': 3,
                'name': 'Tactical Multi-Pocket Cargo Pants',
                'category': cat_clothes,
                'subcategory': 'Pants',
                'gender': 'unisex',
                'price': 3800,
                'original_price': 4500,
                'rating': 4.9,
                'reviews_count': 29,
                'badge': 'BEST SELLER',
                'is_new': False,
                'is_popular': True,
                'stock': 9,
                'description': 'Nairobi drill & streetwear essential. Designed with 6 spacious utility cargo pockets, adjustable ankle drawstrings for shoe stacks, and heavy ripstop cotton weave.',
                'images': [
                    'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=800'
                ],
                'sizes': ['S (30)', 'M (32)', 'L (34)', 'XL (36)', 'XXL (38)']
            },
            {
                'id': 4,
                'name': 'Nike Dunk Low "Panda" Black & White',
                'category': cat_shoes,
                'subcategory': 'Sneakers',
                'gender': 'unisex',
                'price': 6800,
                'original_price': 8500,
                'rating': 5.0,
                'reviews_count': 64,
                'badge': 'HOT DROP',
                'is_new': False,
                'is_popular': True,
                'stock': 12,
                'description': 'The versatile Dunk Low Panda goes with literally every single fit. Crisp leather base with black overlays, padded collar, and clean white rubber sole.',
                'images': [
                    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800'
                ],
                'sizes': ['EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44']
            },
            {
                'id': 5,
                'name': 'Washed Vintage Heavy Pullover Hoodie',
                'category': cat_clothes,
                'subcategory': 'Hoodies',
                'gender': 'unisex',
                'price': 4200,
                'original_price': 5000,
                'rating': 4.7,
                'reviews_count': 31,
                'badge': 'NEW DROP',
                'is_new': True,
                'is_popular': False,
                'stock': 8,
                'description': '450GSM ultra-heavyweight french terry fleece hoodie. Features a double-layer hood without drawstrings for clean minimalist aesthetic and oversized boxy structure.',
                'images': [
                    'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=800'
                ],
                'sizes': ['M', 'L', 'XL', 'XXL']
            },
            {
                'id': 6,
                'name': 'Fits Kenya Signature Oversized Puffer Jacket',
                'category': cat_clothes,
                'subcategory': 'Outerwear',
                'gender': 'unisex',
                'price': 5800,
                'original_price': 7000,
                'rating': 4.9,
                'reviews_count': 19,
                'badge': 'LIMITED FIT',
                'is_new': True,
                'is_popular': True,
                'stock': 5,
                'description': 'Engineered for cool Nairobi evenings and street styling. High-loft synthetic insulation with water-resistant shell, high stand collar, and internal phone pocket.',
                'images': [
                    'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=800'
                ],
                'sizes': ['S', 'M', 'L', 'XL']
            },
            {
                'id': 7,
                'name': 'New Balance 2002R "Protection Pack" Rain Cloud',
                'category': cat_shoes,
                'subcategory': 'Sneakers',
                'gender': 'unisex',
                'price': 8200,
                'original_price': 9800,
                'rating': 5.0,
                'reviews_count': 45,
                'badge': 'HOT SNEAKER',
                'is_new': True,
                'is_popular': True,
                'stock': 6,
                'description': 'Deconstructed aesthetics at its finest. Jagged suede cutouts overlaying breathable mesh, equipped with N-ergy cushioning for ultimate all-day comfort.',
                'images': [
                    'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&q=80&w=800'
                ],
                'sizes': ['EU 41', 'EU 42', 'EU 43', 'EU 44']
            },
            {
                'id': 8,
                'name': 'Yeezy Slide "Bone"',
                'category': cat_shoes,
                'subcategory': 'Slides',
                'gender': 'unisex',
                'price': 3500,
                'original_price': 4200,
                'rating': 4.8,
                'reviews_count': 52,
                'badge': 'RESTOCKED',
                'is_new': False,
                'is_popular': True,
                'stock': 14,
                'description': 'Injected EVA foam for lightweight durability. Strategic groove positioning in the outsole for optimal comfort and traction whether chilling or stepping out in town.',
                'images': [
                    'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800'
                ],
                'sizes': ['EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45']
            },
            {
                'id': 9,
                'name': 'Fits Kenya 3D Rubber Trucker Snapback Cap',
                'category': cat_acc,
                'subcategory': 'Headwear',
                'gender': 'unisex',
                'price': 1500,
                'original_price': 2000,
                'rating': 4.9,
                'reviews_count': 22,
                'badge': 'ACCESSORY',
                'is_new': True,
                'is_popular': False,
                'stock': 20,
                'description': 'High-crown trucker cap with breathable rear mesh, pre-curved visor, and raised 3D Fits Kenya emblem on front panel.',
                'images': [
                    'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&q=80&w=800'
                ],
                'sizes': ['One Size (Adjustable)']
            },
            {
                'id': 10,
                'name': 'Tactical Streetwear Crossbody Mini Bag',
                'category': cat_acc,
                'subcategory': 'Bags',
                'gender': 'unisex',
                'price': 2200,
                'original_price': 2800,
                'rating': 4.6,
                'reviews_count': 17,
                'badge': 'ESSENTIAL',
                'is_new': False,
                'is_popular': False,
                'stock': 11,
                'description': 'Keep your phone, keys, and M-Pesa wallet safe in style. Cordura water-resistant fabric with quick-release tactical buckle strap.',
                'images': [
                    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=800'
                ],
                'sizes': ['One Size']
            },
            {
                'id': 11,
                'name': 'Travis Scott x Air Jordan 1 Low "Mocha"',
                'category': cat_shoes,
                'subcategory': 'Sneakers',
                'gender': 'unisex',
                'price': 8900,
                'original_price': 11500,
                'rating': 5.0,
                'reviews_count': 78,
                'badge': 'GRAIL FIT',
                'is_new': True,
                'is_popular': True,
                'stock': 4,
                'description': 'The iconic backward Swoosh sneaker. Premium nubuck leather in rich mocha brown paired with off-white sail leather overlays. The ultimate street grail in Nairobi.',
                'images': [
                    'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&q=80&w=800'
                ],
                'sizes': ['EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44']
            },
            {
                'id': 12,
                'name': 'Acid Wash Corduroy Oversized Street Shirt',
                'category': cat_clothes,
                'subcategory': 'Outerwear',
                'gender': 'unisex',
                'price': 3600,
                'original_price': 4200,
                'rating': 4.8,
                'reviews_count': 26,
                'badge': 'VINTAGE VIBE',
                'is_new': True,
                'is_popular': False,
                'stock': 10,
                'description': 'Thick corduroy cotton shirt designed to be worn open as a jacket or buttoned up. Textured wale cord fabric with matte silver snap buttons.',
                'images': [
                    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800',
                    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800'
                ],
                'sizes': ['M', 'L', 'XL']
            }
        ]

        for p_data in products_data:
            Product.objects.get_or_create(
                id=p_data['id'],
                defaults={
                    'name': p_data['name'],
                    'category': p_data['category'],
                    'subcategory': p_data['subcategory'],
                    'gender': p_data['gender'],
                    'price': p_data['price'],
                    'original_price': p_data['original_price'],
                    'rating': p_data['rating'],
                    'reviews_count': p_data['reviews_count'],
                    'badge': p_data['badge'],
                    'is_new': p_data['is_new'],
                    'is_popular': p_data['is_popular'],
                    'stock': p_data['stock'],
                    'description': p_data['description'],
                    'images': p_data['images'],
                    'sizes': p_data['sizes']
                }
            )

        self.stdout.write(self.style.SUCCESS('Database seeding completed successfully!'))

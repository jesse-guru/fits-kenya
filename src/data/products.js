export const products = [
  {
    id: 'prod-1',
    name: 'Air Jordan 4 Retro "Military Black"',
    category: 'shoes',
    subcategory: 'Sneakers',
    gender: 'unisex',
    price: 7500,
    originalPrice: 9200,
    rating: 4.9,
    reviewsCount: 42,
    badge: 'MUST HAVE',
    isNew: true,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45'],
    colors: ['White/Black/Neutral Grey'],
    description: 'The iconic Jordan 4 Military Black features a premium white leather upper with smooth grey suede overlays and black accents on the eyelets, heel tab, and midsole. Engineered for maximum street style points in Nairobi.',
    details: [
      'Genuine leather and suede upper',
      'Visible Air-Sole unit in the heel for responsive cushion',
      'Durable rubber outsole with herringbone traction pattern',
      'Standard EU sizing'
    ],
    stock: 7
  },
  {
    id: 'prod-2',
    name: 'Nairobi Heavyweight Graphic Boxy Tee',
    category: 'clothes',
    subcategory: 'Tees',
    gender: 'unisex',
    price: 2400,
    originalPrice: 3000,
    rating: 4.8,
    reviewsCount: 38,
    badge: 'TRENDING',
    isNew: true,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Washed Acid Black', 'Vintage Bone White'],
    description: 'Crafted from 240GSM heavyweight 100% combed cotton. Features a relaxed drop-shoulder oversized fit with custom Fits Kenya distressed chest graphic logo.',
    details: [
      '240 GSM 100% Organic Heavy Cotton',
      'Drop shoulder oversized street silhouette',
      'Screen printed custom high-density graphic',
      'Pre-shrunk fabric to prevent washing shrinkage'
    ],
    stock: 15
  },
  {
    id: 'prod-3',
    name: 'Tactical Multi-Pocket Cargo Pants',
    category: 'clothes',
    subcategory: 'Pants',
    gender: 'unisex',
    price: 3800,
    originalPrice: 4500,
    rating: 4.9,
    reviewsCount: 29,
    badge: 'BEST SELLER',
    isNew: false,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['S (30)', 'M (32)', 'L (34)', 'XL (36)', 'XXL (38)'],
    colors: ['Matte Black', 'Olive Drab Green'],
    description: 'Nairobi drill & streetwear essential. Designed with 6 spacious utility cargo pockets, adjustable ankle drawstrings for shoe stacks, and heavy ripstop cotton weave.',
    details: [
      'Durable ripstop cotton construction',
      '6 reinforced utility pockets with flap closures',
      'Adjustable toggle cinch hem at ankles',
      'Relaxed straight-leg tapered fit'
    ],
    stock: 9
  },
  {
    id: 'prod-4',
    name: 'Nike Dunk Low "Panda" Black & White',
    category: 'shoes',
    subcategory: 'Sneakers',
    gender: 'unisex',
    price: 6800,
    originalPrice: 8500,
    rating: 5.0,
    reviewsCount: 64,
    badge: 'HOT DROP',
    isNew: false,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44'],
    colors: ['Black / White'],
    description: 'The versatile Dunk Low Panda goes with literally every single fit. Crisp leather base with black overlays, padded collar, and clean white rubber sole.',
    details: [
      'Smooth leather upper with classic color blocking',
      'Low-cut padded collar for comfort',
      'Perforations on toe box for breathability',
      'Rubber cupsole construction'
    ],
    stock: 12
  },
  {
    id: 'prod-5',
    name: 'Washed Vintage Heavy Pullover Hoodie',
    category: 'clothes',
    subcategory: 'Hoodies',
    gender: 'unisex',
    price: 4200,
    originalPrice: 5000,
    rating: 4.7,
    reviewsCount: 31,
    badge: 'NEW DROP',
    isNew: true,
    isPopular: false,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Vintage Slate Grey', 'Mocha Brown'],
    description: '450GSM ultra-heavyweight french terry fleece hoodie. Features a double-layer hood without drawstrings for clean minimalist aesthetic and oversized boxy structure.',
    details: [
      '450 GSM 100% French Terry Fleece',
      'Double-layered thick hood (no drawstrings)',
      'Kangaroo front pocket with subtle rubber logo',
      'Ribbed cuffs and hem line'
    ],
    stock: 8
  },
  {
    id: 'prod-6',
    name: 'Fits Kenya Signature Oversized Puffer Jacket',
    category: 'clothes',
    subcategory: 'Outerwear',
    gender: 'unisex',
    price: 5800,
    originalPrice: 7000,
    rating: 4.9,
    reviewsCount: 19,
    badge: 'LIMITED FIT',
    isNew: true,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Matte Obsidian Black', 'Electric Lime Trim'],
    description: 'Engineered for cool Nairobi evenings and street styling. High-loft synthetic insulation with water-resistant shell, high stand collar, and internal phone pocket.',
    details: [
      'Water-repellent nylon outer shell',
      'Thermal high-loft insulation layer',
      'Dual zip front closure with storm flap',
      'Internal zippered media pocket'
    ],
    stock: 5
  },
  {
    id: 'prod-7',
    name: 'New Balance 2002R "Protection Pack" Rain Cloud',
    category: 'shoes',
    subcategory: 'Sneakers',
    gender: 'unisex',
    price: 8200,
    originalPrice: 9800,
    rating: 5.0,
    reviewsCount: 45,
    badge: 'HOT SNEAKER',
    isNew: true,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['EU 41', 'EU 42', 'EU 43', 'EU 44'],
    colors: ['Rain Cloud Grey'],
    description: 'Deconstructed aesthetics at its finest. Jagged suede cutouts overlaying breathable mesh, equipped with N-ergy cushioning for ultimate all-day comfort.',
    details: [
      'Deconstructed layered suede & mesh upper',
      'ABZORB midsole absorbs impact through cushioning',
      'N-ergy outsole provides superior shock absorption',
      'Stability Web outsole technology'
    ],
    stock: 6
  },
  {
    id: 'prod-8',
    name: 'Yeezy Slide "Bone"',
    category: 'shoes',
    subcategory: 'Slides',
    gender: 'unisex',
    price: 3500,
    originalPrice: 4200,
    rating: 4.8,
    reviewsCount: 52,
    badge: 'RESTOCKED',
    isNew: false,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45'],
    colors: ['Bone / Off-White'],
    description: 'Injected EVA foam for lightweight durability. Strategic groove positioning in the outsole for optimal comfort and traction whether chilling or stepping out in town.',
    details: [
      'Injected EVA foam construction',
      'Soft top layer in footbed for instant step-in comfort',
      'Aggressive outsole traction grooves'
    ],
    stock: 14
  },
  {
    id: 'prod-9',
    name: 'Fits Kenya 3D Rubber Trucker Snapback Cap',
    category: 'accessories',
    subcategory: 'Headwear',
    gender: 'unisex',
    price: 1500,
    originalPrice: 2000,
    rating: 4.9,
    reviewsCount: 22,
    badge: 'ACCESSORY',
    isNew: true,
    isPopular: false,
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['One Size (Adjustable)'],
    colors: ['Black/Neon Lime', 'All Black'],
    description: 'High-crown trucker cap with breathable rear mesh, pre-curved visor, and raised 3D Fits Kenya emblem on front panel.',
    details: [
      'Polyester front foam panel with rear mesh',
      'Raised 3D rubber emblem badge',
      'Adjustable snapback closure fits all head sizes'
    ],
    stock: 20
  },
  {
    id: 'prod-10',
    name: 'Tactical Streetwear Crossbody Mini Bag',
    category: 'accessories',
    subcategory: 'Bags',
    gender: 'unisex',
    price: 2200,
    originalPrice: 2800,
    rating: 4.6,
    reviewsCount: 17,
    badge: 'ESSENTIAL',
    isNew: false,
    isPopular: false,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['One Size'],
    colors: ['Matte Black', 'Camouflage'],
    description: 'Keep your phone, keys, and M-Pesa wallet safe in style. Cordura water-resistant fabric with quick-release tactical buckle strap.',
    details: [
      'Heavy-duty Cordura ballistic nylon',
      'Dual zipper main compartment + quick access mesh pouch',
      'Adjustable cross-body shoulder strap'
    ],
    stock: 11
  },
  {
    id: 'prod-11',
    name: 'Travis Scott x Air Jordan 1 Low "Mocha"',
    category: 'shoes',
    subcategory: 'Sneakers',
    gender: 'unisex',
    price: 8900,
    originalPrice: 11500,
    rating: 5.0,
    reviewsCount: 78,
    badge: 'GRAIL FIT',
    isNew: true,
    isPopular: true,
    images: [
      'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44'],
    colors: ['Dark Mocha / Sail / Black'],
    description: 'The iconic backward Swoosh sneaker. Premium nubuck leather in rich mocha brown paired with off-white sail leather overlays. The ultimate street grail in Nairobi.',
    details: [
      'Reverse Swoosh design on lateral sides',
      'Premium nubuck and tumbled leather upper',
      'Cactus Jack branding details on tongue & heel',
      'Includes extra laces set (Black, Pink, Sail)'
    ],
    stock: 4
  },
  {
    id: 'prod-12',
    name: 'Acid Wash Corduroy Oversized Street Shirt',
    category: 'clothes',
    subcategory: 'Outerwear',
    gender: 'unisex',
    price: 3600,
    originalPrice: 4200,
    rating: 4.8,
    reviewsCount: 26,
    badge: 'VINTAGE VIBE',
    isNew: true,
    isPopular: false,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['M', 'L', 'XL'],
    colors: ['Washed Olive', 'Vintage Caramel'],
    description: 'Thick corduroy cotton shirt designed to be worn open as a jacket or buttoned up. Textured wale cord fabric with matte silver snap buttons.',
    details: [
      '100% Cotton Heavy Ribbed Corduroy',
      'Acid washed vintage finish',
      'Double flap chest pockets',
      'Snap button closure front and cuffs'
    ],
    stock: 10
  }
];

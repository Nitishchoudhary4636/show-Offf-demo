/**
 * SHOWOFFFF - Full Website Multi-Category Catalog & Data Store
 */

const PRODUCTS_DATA = {
  // Collections Section (Homepage Asymmetric Grid)
  collections: [
    {
      id: "col_party_edit",
      title: "After 9 - Party Edit",
      subtitle: "Shop the night's best looks →",
      image: "assets/party-edit.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1080&q=80",
      link: "women.html?cat=Dresses",
      isTall: true
    },
    {
      id: "col_coord_sets",
      title: "Co - ord Sets",
      subtitle: "Effortless pairs, maximum style →",
      image: "assets/coord-sets.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1080&q=80",
      link: "women.html?cat=Co-ord Sets"
    },
    {
      id: "col_denim_stories",
      title: "Denim Stories",
      subtitle: "Cool, comfy, and casual denim picks →",
      image: "assets/denim-stories.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=1080&q=80",
      link: "women.html?cat=Skirts"
    },
    {
      id: "col_vacay_fits",
      title: "Vacay Fits",
      subtitle: "Breezy outfits for your next getaway →",
      image: "assets/vacay-fits.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1080&q=80",
      link: "women.html?cat=Dresses"
    },
    {
      id: "col_festive_ethnic",
      title: "Festive & Ethnic",
      subtitle: "Tradition meets modern elegance →",
      image: "assets/festive-ethnic.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1080&q=80",
      link: "women.html?cat=Dresses"
    }
  ],

  // Hot Drops This Week
  hotDrops: [
    {
      id: "prod_drop_1",
      title: "Women's NavyBlue Denim Mini Skirt",
      gender: "Women",
      category: "Skirts",
      salePrice: "₹999.00",
      regPrice: "₹2,499.00",
      saleNum: 999,
      regNum: 2499,
      discount: "64% OFF",
      badge: "NEW",
      images: [
        "https://showoffff.in/cdn/shop/files/LT-SKT-1003_NavyBlue_1.jpg?v=1785827063&width=1080",
        "https://showoffff.in/cdn/shop/files/LT-SKT-1003_NavyBlue_2.jpg?v=1785827063&width=1080"
      ],
      sizes: ["28", "30", "32", "34"],
      colors: ["#1B2E4B", "#253C61", "#0F1A2C"],
      rating: 4.9,
      reviewsCount: 128,
      fabric: "100% Cotton Stretch Denim",
      description: "Step out in effortless style with this NavyBlue Denim Mini Skirt. Tailored from premium stretch denim with a flattering A-line silhouette, high-rise waist, and chic raw hem detail."
    },
    {
      id: "prod_drop_2",
      title: "Women's White Layered Ruffle Off-Shoulder Dress",
      gender: "Women",
      category: "Dresses",
      salePrice: "₹999.00",
      regPrice: "₹2,499.00",
      saleNum: 999,
      regNum: 2499,
      discount: "64% OFF",
      badge: "NEW",
      images: [
        "https://showoffff.in/cdn/shop/files/CHN-5692_White_1_6aa32719-f331-4f70-9f0b-e04aee2b4d0a.jpg?v=1778331500&width=1080",
        "https://showoffff.in/cdn/shop/files/CHN-5692_White_2_cafe596e-b81b-406d-a246-650d82699618.jpg?v=1778331500&width=1080"
      ],
      sizes: ["XS", "S", "M", "L"],
      colors: ["#FFFFFF", "#F5EFEB", "#E8DED1"],
      rating: 4.8,
      reviewsCount: 84,
      fabric: "Georgette with Soft Crepe Lining",
      description: "Float through your day in this romantic layered ruffle dress. Features a delicate off-shoulder neckline and breathable airy chiffon fabric."
    },
    {
      id: "prod_drop_3",
      title: "Women's Beige Classic Trench Button-Down Utility Dress",
      gender: "Women",
      category: "Dresses",
      salePrice: "₹999.00",
      regPrice: "₹2,499.00",
      saleNum: 999,
      regNum: 2499,
      discount: "64% OFF",
      badge: "NEW",
      images: [
        "https://showoffff.in/cdn/shop/files/CHN-8119_Beige_1_ca4f4bc1-85ad-4d89-a086-904a29f16b42.jpg?v=1778329586&width=1080",
        "https://showoffff.in/cdn/shop/files/CHN-8119_Beige_2_f4335880-536c-4be6-ac36-3870384150c5.jpg?v=1778329586&width=1080"
      ],
      sizes: ["XS", "S", "M", "L"],
      colors: ["#D4BA9F", "#C4A687", "#8D6E4E"],
      rating: 4.9,
      reviewsCount: 95,
      fabric: "Premium Cotton Twill",
      description: "Chic and utilitarian. This beige belted button-down dress blends casual elegance with a waist-cinching silhouette."
    },
    {
      id: "prod_drop_4",
      title: "Men's Olive Green Lightweight Casual Bomber Jacket",
      gender: "Men",
      category: "Jackets",
      salePrice: "₹1,299.00",
      regPrice: "₹3,499.00",
      saleNum: 1299,
      regNum: 3499,
      discount: "63% OFF",
      badge: "NEW",
      images: [
        "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1080&q=80"
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: ["#3D4A3E", "#2B332C", "#1E241F"],
      rating: 4.8,
      reviewsCount: 67,
      fabric: "Water-resistant Poly-Cotton Blend",
      description: "The essential layer for all seasons. Designed with a sleek ribbed collar, smooth metallic zip closure, and comfortable regular fit."
    },
    {
      id: "prod_drop_5",
      title: "Women's Ribbed Chocolate Brown Open Front Longline Shrug",
      gender: "Women",
      category: "Shrugs",
      salePrice: "₹999.00",
      regPrice: "₹2,499.00",
      saleNum: 999,
      regNum: 2499,
      discount: "64% OFF",
      badge: "NEW",
      images: [
        "https://showoffff.in/cdn/shop/files/CHN-1992_ChocolateBrown_1.jpg?v=1784635000&width=1080",
        "https://showoffff.in/cdn/shop/files/CHN-1992_ChocolateBrown_2.jpg?v=1784635000&width=1080"
      ],
      sizes: ["XS", "S", "M", "L"],
      colors: ["#4A2E18", "#331E0F", "#6B4426"],
      rating: 4.8,
      reviewsCount: 110,
      fabric: "Ribbed Acrylic Knit",
      description: "Elevate your layered outfits with this cozy chocolate brown longline shrug. Super soft ribbed knit with side slits."
    }
  ],

  // Bestsellers 4-Tile Grid
  bestsellerTiles: [
    {
      id: "best_for_her",
      title: "FOR HER",
      image: "assets/bestseller-for-her.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1080&q=80",
      link: "women.html"
    },
    {
      id: "best_for_him",
      title: "FOR HIM",
      image: "assets/bestseller-for-him.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1080&q=80",
      link: "men.html"
    },
    {
      id: "best_blazers",
      title: "BLAZERS",
      image: "assets/bestseller-blazers.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1080&q=80",
      link: "men.html?cat=Blazers"
    },
    {
      id: "best_dresses",
      title: "DRESSES",
      image: "assets/bestseller-dresses.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1080&q=80",
      link: "women.html?cat=Dresses"
    }
  ],

  // Fashion Stories (Reels)
  fashionStories: [
    {
      id: "story_1",
      creator: "@priya_style",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      caption: "Styling the new summer collection ✨",
      thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-walking-on-a-sunny-street-41551-large.mp4",
      productId: "prod_drop_2",
      productName: "Women's Layered Ruffle Maxi Dress",
      productPrice: "₹999.00"
    },
    {
      id: "story_2",
      creator: "@sneha_fits",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
      caption: "Airport look under ₹1500 🔥",
      thumbnail: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-girl-in-a-red-dress-smiling-on-the-street-40097-large.mp4",
      productId: "prod_drop_1",
      productName: "Denim Cut-off Shorts & Crop Top",
      productPrice: "₹999.00"
    },
    {
      id: "story_3",
      creator: "@tanvi_looks",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
      caption: "Party ready in 5 mins with Showoffff",
      thumbnail: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-posing-in-a-black-jacket-41566-large.mp4",
      productId: "prod_drop_5",
      productName: "Ruched Party Mini Dress",
      productPrice: "₹999.00"
    },
    {
      id: "story_4",
      creator: "@ananya_edit",
      avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=120&q=80",
      caption: "Denim essentials you can't miss",
      thumbnail: "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=600&q=80",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-turning-around-wearing-a-white-dress-41553-large.mp4",
      productId: "prod_drop_1",
      productName: "Classic Navy Blue Denim Skirt",
      productPrice: "₹999.00"
    }
  ],

  // Full Women Catalog
  womenProducts: [
    {
      id: "prod_w_1",
      title: "Women's NavyBlue Denim Mini Skirt",
      gender: "Women",
      category: "Skirts",
      salePrice: "₹999.00",
      regPrice: "₹2,499.00",
      saleNum: 999,
      regNum: 2499,
      discount: "64% OFF",
      badges: ["New", "Website Xclusive"],
      images: [
        "https://showoffff.in/cdn/shop/files/LT-SKT-1003_NavyBlue_1.jpg?v=1785827063&width=1080",
        "https://showoffff.in/cdn/shop/files/LT-SKT-1003_NavyBlue_2.jpg?v=1785827063&width=1080"
      ],
      sizes: ["28", "30", "32", "34"],
      colors: ["#1B2E4B", "#253C61"],
      rating: 4.8,
      reviewsCount: 99,
      fabric: "100% Stretch Denim",
      description: "Elevate your fashion statement with SHOWOFFFF's Women's NavyBlue Denim Mini Skirt. Designed with premium fabric, tailored fit, and breathable touch."
    },
    {
      id: "prod_w_2",
      title: "Women's Brown Ruched Top with Tie-Up Sleeve & Floral Brooch Detail",
      gender: "Women",
      category: "Tops",
      salePrice: "₹999.00",
      regPrice: "₹2,499.00",
      saleNum: 999,
      regNum: 2499,
      discount: "64% OFF",
      badges: ["New", "Website Xclusive"],
      images: [
        "https://showoffff.in/cdn/shop/files/CHN-29911_Brown_1.jpg?v=1785827011&width=1080",
        "https://showoffff.in/cdn/shop/files/CHN-29911_Brown_2.jpg?v=1785827011&width=1080"
      ],
      sizes: ["XS", "S", "M"],
      colors: ["#5C3826", "#3A2114"],
      rating: 4.8,
      reviewsCount: 69,
      fabric: "Soft Poly Crepe",
      description: "Chic brown ruched top featuring playful tie-up sleeves and an exquisite floral brooch detail."
    },
    {
      id: "prod_w_3",
      title: "Women's Yellow Halter Neck Ruffle A-Line Maxi Dress",
      gender: "Women",
      category: "Dresses",
      salePrice: "₹999.00",
      regPrice: "₹2,499.00",
      saleNum: 999,
      regNum: 2499,
      discount: "65% OFF",
      badges: ["New", "Website Xclusive"],
      images: [
        "https://showoffff.in/cdn/shop/files/CHN-5913_Yellow_1.jpg?v=1784635039&width=1080",
        "https://showoffff.in/cdn/shop/files/CHN-5913_Yellow_2.jpg?v=1784635039&width=1080"
      ],
      sizes: ["XS", "S", "M", "L"],
      colors: ["#EAB308", "#FDE047"],
      rating: 4.8,
      reviewsCount: 49,
      fabric: "Flowy Georgette",
      description: "Radiate sunshine vibes in this yellow halter neck maxi dress with cascading ruffles."
    },
    {
      id: "prod_w_4",
      title: "Women's Blue Denim Mini Skirt",
      gender: "Women",
      category: "Skirts",
      salePrice: "₹999.00",
      regPrice: "₹2,499.00",
      saleNum: 999,
      regNum: 2499,
      discount: "64% OFF",
      badges: ["New", "Website Xclusive"],
      images: [
        "https://showoffff.in/cdn/shop/files/LT-SKT-1003_Blue_1.jpg?v=1784635152&width=1080",
        "https://showoffff.in/cdn/shop/files/LT-SKT-1003_Blue_2.jpg?v=1784635152&width=1080"
      ],
      sizes: ["28", "30", "32", "34"],
      colors: ["#2563EB", "#1D4ED8"],
      rating: 4.8,
      reviewsCount: 34,
      fabric: "Pure Denim",
      description: "Classic light wash denim skirt with front button accents and back patch pockets."
    },
    {
      id: "prod_w_5",
      title: "Women's Ribbed Chocolate Brown Open Front Longline Shrug",
      gender: "Women",
      category: "Shrugs",
      salePrice: "₹999.00",
      regPrice: "₹2,499.00",
      saleNum: 999,
      regNum: 2499,
      discount: "64% OFF",
      badges: ["Bestseller", "New"],
      images: [
        "https://showoffff.in/cdn/shop/files/CHN-1992_ChocolateBrown_1.jpg?v=1784635000&width=1080",
        "https://showoffff.in/cdn/shop/files/CHN-1992_ChocolateBrown_2.jpg?v=1784635000&width=1080"
      ],
      sizes: ["XS", "S", "M", "L"],
      colors: ["#4A2E18", "#6B4426"],
      rating: 4.8,
      reviewsCount: 86,
      fabric: "Ribbed Acrylic Knit",
      description: "Cozy chocolate brown shrug for effortless layering on any top or dress."
    },
    {
      id: "prod_w_6",
      title: "Women's Striped Pink & Orange Top and Skirt Co-Ord Set",
      gender: "Women",
      category: "Co-ord Sets",
      salePrice: "₹1,199.00",
      regPrice: "₹2,799.00",
      saleNum: 1199,
      regNum: 2799,
      discount: "57% OFF",
      badges: ["Website Xclusive"],
      images: [
        "https://showoffff.in/cdn/shop/files/CHN-M2219_Pink_1_b774f30e-de10-4cce-b52e-9e60f37bbc69.jpg?v=1778330668&width=1080",
        "https://showoffff.in/cdn/shop/files/CHN-M2219_Pink_2_31382853-fb02-4da8-9b51-0bb1064d67ba.jpg?v=1778330668&width=1080"
      ],
      sizes: ["XS", "S", "M", "L"],
      colors: ["#EC4899", "#F97316"],
      rating: 4.9,
      reviewsCount: 62,
      fabric: "Premium Rayon Blend",
      description: "Eye-catching summer stripes in pink & orange. Matching crop top and breezy tiered skirt."
    },
    {
      id: "prod_w_7",
      title: "Women's Floral Embroidered Black Shirt",
      gender: "Women",
      category: "Shirts",
      salePrice: "₹999.00",
      regPrice: "₹2,499.00",
      saleNum: 999,
      regNum: 2499,
      discount: "64% OFF",
      badges: ["Bestseller"],
      images: [
        "https://showoffff.in/cdn/shop/files/CHN-5395_Black_1_97fa6916-de8e-4ab3-a005-6c6c7e6fd0e1.jpg?v=1778329255&width=1080",
        "https://showoffff.in/cdn/shop/files/CHN-5395_Black_2_7d016775-21b9-4bdf-9744-3ea56399c9f0.jpg?v=1778329255&width=1080"
      ],
      sizes: ["XS", "S", "M", "L"],
      colors: ["#111827", "#1F2937"],
      rating: 4.8,
      reviewsCount: 28,
      fabric: "Cotton Silk",
      description: "Sophisticated black button-down shirt embellished with fine floral needlework."
    },
    {
      id: "prod_w_8",
      title: "Women's Green Off-Shoulder Mini Dress",
      gender: "Women",
      category: "Dresses",
      salePrice: "₹999.00",
      regPrice: "₹2,499.00",
      saleNum: 999,
      regNum: 2499,
      discount: "61% OFF",
      badges: ["Website Xclusive"],
      images: [
        "https://showoffff.in/cdn/shop/files/CHN-2527_Green_1_c16f7a29-77c9-4e4c-a077-0cdd693de981.jpg?v=1778330615&width=1080",
        "https://showoffff.in/cdn/shop/files/CHN-2527_Green_2_e224fb58-b4a4-4ffe-9dc4-ef94fdc471d9.jpg?v=1778330615&width=1080"
      ],
      sizes: ["XS", "S", "M", "L"],
      colors: ["#15803D", "#166534"],
      rating: 4.8,
      reviewsCount: 46,
      fabric: "Stretch Poplin",
      description: "Flirty emerald green mini dress with elasticized off-shoulder neckline."
    }
  ],

  // Full Men Catalog
  menProducts: [
    {
      id: "prod_m_1",
      title: "Men's Blue Botanical Floral Print Casual Resort Shirt",
      gender: "Men",
      category: "Shirts",
      salePrice: "₹999.00",
      regPrice: "₹2,499.00",
      saleNum: 999,
      regNum: 2499,
      discount: "64% OFF",
      badges: ["Bestseller", "New"],
      images: [
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1080&q=80"
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["#1E40AF", "#3B82F6"],
      rating: 4.9,
      reviewsCount: 88,
      fabric: "100% Breathable Rayon",
      description: "Embrace relaxed luxury in this vibrant blue botanical resort shirt with Cuban collar and breathable fit."
    },
    {
      id: "prod_m_2",
      title: "Men's Black & White Abstract Print Resort Shirt",
      gender: "Men",
      category: "Shirts",
      salePrice: "₹999.00",
      regPrice: "₹2,499.00",
      saleNum: 999,
      regNum: 2499,
      discount: "64% OFF",
      badges: ["Bestseller"],
      images: [
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1080&q=80"
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: ["#111827", "#374151"],
      rating: 4.8,
      reviewsCount: 54,
      fabric: "Lightweight Viscose",
      description: "Modern artistic statement piece designed with bold brush strokes and comfort fit."
    },
    {
      id: "prod_m_3",
      title: "Men's Tailored Royal Navy Two-Button Blazer",
      gender: "Men",
      category: "Blazers",
      salePrice: "₹1,999.00",
      regPrice: "₹4,999.00",
      saleNum: 1999,
      regNum: 4999,
      discount: "60% OFF",
      badges: ["Bestseller", "Premium"],
      images: [
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1080&q=80"
      ],
      sizes: ["38", "40", "42", "44"],
      colors: ["#0F172A", "#1E293B"],
      rating: 4.9,
      reviewsCount: 92,
      fabric: "Poly-Viscose Structured Weave",
      description: "Sharp slim-fit blazer tailored for formal events, parties, and weddings. Notch lapel and double back vent."
    },
    {
      id: "prod_m_4",
      title: "Men's Pastel Pink Embroidered Nehru Jacket / Bandi",
      gender: "Men",
      category: "Ethnic",
      salePrice: "₹1,499.00",
      regPrice: "₹3,999.00",
      saleNum: 1499,
      regNum: 3999,
      discount: "62% OFF",
      badges: ["New", "Festive"],
      images: [
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1080&q=80"
      ],
      sizes: ["38", "40", "42", "44"],
      colors: ["#F472B6", "#FB7185"],
      rating: 4.8,
      reviewsCount: 41,
      fabric: "Raw Silk Blend with Zari Work",
      description: "Celebratory elegance. Pair this pastel pink embroidered bandi over a crisp white kurta."
    },
    {
      id: "prod_m_5",
      title: "Men's Classic Slim Fit Light Wash Denim Jeans",
      gender: "Men",
      category: "Jeans",
      salePrice: "₹1,199.00",
      regPrice: "₹2,999.00",
      saleNum: 1199,
      regNum: 2999,
      discount: "60% OFF",
      badges: ["Bestseller"],
      images: [
        "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1080&q=80"
      ],
      sizes: ["30", "32", "34", "36", "38"],
      colors: ["#3B82F6", "#60A5FA"],
      rating: 4.7,
      reviewsCount: 76,
      fabric: "98% Cotton 2% Elastane",
      description: "Everyday stretch denim jeans engineered for comfort and modern style."
    }
  ],

  // Curve / Plus Size Catalog
  curveProducts: [
    {
      id: "prod_c_1",
      title: "Plus Size Women's Emerald Green Ruched Maxi Dress",
      gender: "Curve",
      category: "Dresses",
      salePrice: "₹1,299.00",
      regPrice: "₹3,199.00",
      saleNum: 1299,
      regNum: 3199,
      discount: "59% OFF",
      badges: ["Curve", "Bestseller"],
      images: [
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1080&q=80"
      ],
      sizes: ["1XL", "2XL", "3XL", "4XL", "5XL"],
      colors: ["#064E3B", "#047857"],
      rating: 4.9,
      reviewsCount: 115,
      fabric: "Super Stretch Lycra Jersey",
      description: "Flattering curve silhouette with side ruched details and v-neckline."
    },
    {
      id: "prod_c_2",
      title: "Plus Size Men's Burgundy Floral Linen Shirt (Up to 5XL)",
      gender: "Curve",
      category: "Shirts",
      salePrice: "₹1,099.00",
      regPrice: "₹2,699.00",
      saleNum: 1099,
      regNum: 2699,
      discount: "59% OFF",
      badges: ["Curve", "New"],
      images: [
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1080&q=80"
      ],
      sizes: ["2XL", "3XL", "4XL", "5XL"],
      colors: ["#881337", "#9F1239"],
      rating: 4.8,
      reviewsCount: 68,
      fabric: "Pure Linen Blend",
      description: "Generous comfortable cut tailored specifically for plus size confidence."
    },
    {
      id: "prod_c_3",
      title: "Plus Size Women's High-Waist Wide Leg Denim Pants",
      gender: "Curve",
      category: "Jeans",
      salePrice: "₹1,299.00",
      regPrice: "₹3,299.00",
      saleNum: 1299,
      regNum: 3299,
      discount: "60% OFF",
      badges: ["Curve"],
      images: [
        "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=1080&q=80",
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1080&q=80"
      ],
      sizes: ["36", "38", "40", "42", "44"],
      colors: ["#1E3A8A", "#1D4ED8"],
      rating: 4.8,
      reviewsCount: 52,
      fabric: "Soft Stretch Denim",
      description: "Flattering wide-leg fit with elastic back waistband for all-day ease."
    }
  ],

  // Utility to find product by ID across all arrays
  findProductById: function(id) {
    const all = [
      ...(this.hotDrops || []),
      ...(this.womenProducts || []),
      ...(this.menProducts || []),
      ...(this.curveProducts || [])
    ];
    return all.find(p => p.id === id);
  }
};

// Aliases for compatibility
PRODUCTS_DATA.shopAllWomen = PRODUCTS_DATA.womenProducts;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PRODUCTS_DATA;
}

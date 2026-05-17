// Image imports - Replace these paths with your actual image paths
// Example: import heroImage from '../assets/images/hero-bg.jpg';

export const IMAGES = {
  // Hero & Logo
  hero: 'https://picsum.photos/seed/lorahhero/1920/1080',
  logo: 'https://picsum.photos/seed/lorahlogo/56/56',
  
  // All your uploaded product images - UPDATE THESE PATHS
  products: [
    'https://picsum.photos/seed/bag01/400/400', // Product 1
    'https://picsum.photos/seed/bag02/400/400', // Product 2
    'https://picsum.photos/seed/bag03/400/400', // Product 3
    'https://picsum.photos/seed/bag04/400/400', // Product 4
    'https://picsum.photos/seed/bag05/400/400', // Product 5
    'https://picsum.photos/seed/bag06/400/400', // Product 6
    'https://picsum.photos/seed/bag07/400/400', // Product 7
    'https://picsum.photos/seed/bag08/400/400', // Product 8
    'https://picsum.photos/seed/bag09/400/400', // Product 9
    'https://picsum.photos/seed/bag10/400/400', // Product 10
    'https://picsum.photos/seed/bag11/400/400', // Product 11
    'https://picsum.photos/seed/bag12/400/400', // Product 12
    'https://picsum.photos/seed/bag13/400/400', // Product 13
    'https://picsum.photos/seed/bag14/400/400', // Product 14
    'https://picsum.photos/seed/bag15/400/400', // Product 15
    'https://picsum.photos/seed/bag16/400/400', // Product 16
    'https://picsum.photos/seed/bag17/400/400', // Product 17
    'https://picsum.photos/seed/bag18/400/400', // Product 18
    'https://picsum.photos/seed/bag19/400/400', // Product 19
    'https://picsum.photos/seed/bag20/400/400', // Product 20
    'https://picsum.photos/seed/bag21/400/400', // Product 21
    'https://picsum.photos/seed/bag22/400/400', // Product 22
    'https://picsum.photos/seed/bag23/400/400', // Product 23
    'https://picsum.photos/seed/bag24/400/400', // Product 24
    'https://picsum.photos/seed/bag25/400/400', // Product 25
    'https://picsum.photos/seed/bag26/400/400', // Product 26
    'https://picsum.photos/seed/bag27/400/400', // Product 27
    'https://picsum.photos/seed/bag28/400/400', // Product 28
    'https://picsum.photos/seed/bag29/400/400', // Product 29
    'https://picsum.photos/seed/bag30/400/400', // Product 30
    'https://picsum.photos/seed/bag31/400/400', // Product 31
    'https://picsum.photos/seed/bag32/400/400', // Product 32
    'https://picsum.photos/seed/bag33/400/400', // Product 33
    'https://picsum.photos/seed/bag34/400/400', // Product 34
    'https://picsum.photos/seed/bag35/400/400', // Product 35
    'https://picsum.photos/seed/bag36/400/400', // Product 36
    'https://picsum.photos/seed/bag37/400/400', // Product 37
    'https://picsum.photos/seed/bag38/400/400', // Product 38
    'https://picsum.photos/seed/bag39/400/400', // Product 39
    'https://picsum.photos/seed/bag40/400/400', // Product 40
    'https://picsum.photos/seed/bag41/400/400', // Product 41
    'https://picsum.photos/seed/bag42/400/400', // Product 42
    'https://picsum.photos/seed/bag43/400/400', // Product 43
    'https://picsum.photos/seed/bag44/400/400', // Product 44
    'https://picsum.photos/seed/bag45/400/400', // Product 45
    'https://picsum.photos/seed/bag46/400/400', // Product 46
    'https://picsum.photos/seed/bag47/400/400', // Product 47
    'https://picsum.photos/seed/bag48/400/400', // Product 48
    'https://picsum.photos/seed/bag49/400/400', // Product 49
    'https://picsum.photos/seed/bag50/400/400', // Product 50
  ],
  
  collections: [
    'https://picsum.photos/seed/sophia/300/300',
    'https://picsum.photos/seed/noir/300/300',
    'https://picsum.photos/seed/rose/300/300',
    'https://picsum.photos/seed/burgundy/300/300',
  ],
  
  testimonials: [
    'https://picsum.photos/seed/sarah/300/400',
    'https://picsum.photos/seed/grace/300/400',
    'https://picsum.photos/seed/diana/300/400',
  ],
  
  social: [
    'https://picsum.photos/seed/soc01/400/400',
    'https://picsum.photos/seed/soc02/400/400',
    'https://picsum.photos/seed/soc03/400/400',
    'https://picsum.photos/seed/soc04/400/400',
    'https://picsum.photos/seed/soc05/400/400',
    'https://picsum.photos/seed/soc06/400/400',
    'https://picsum.photos/seed/soc07/400/400',
    'https://picsum.photos/seed/soc08/400/400',
  ],
  
  about: 'https://picsum.photos/seed/about/600/500',
  luxury: 'https://picsum.photos/seed/luxury/600/400',
  affordable: 'https://picsum.photos/seed/affordable/600/400',
};

export const PRODUCTS = [
  {
    id: 1,
    name: "Sophia Tote",
    category: "tote",
    price: "UGX 150,000",
    image: IMAGES.products[0],
    desc: "A timeless black leather tote perfect for the modern professional. Features dual handles, gold hardware, and spacious interior compartments.",
    badge: "NEW"
  },
  {
    id: 2,
    name: "Noir Quilted",
    category: "shoulder",
    price: "UGX 220,000",
    image: IMAGES.products[1],
    desc: "Elegant red quilted shoulder bag with gold chain strap. The classic design that never goes out of style.",
    badge: "TRENDING"
  },
  {
    id: 3,
    name: "Rosé Mini",
    category: "mini",
    price: "UGX 95,000",
    image: IMAGES.products[2],
    desc: "Charming cream mini crossbody with delicate gold chain strap. Perfect for casual outings.",
    badge: "POPULAR"
  },
  {
    id: 4,
    name: "Classic Brown",
    category: "tote",
    price: "UGX 130,000",
    image: IMAGES.products[3],
    desc: "Rich brown leather travel tote with structured silhouette. Versatile everyday bag.",
    badge: "BEST SELLER"
  },
  {
    id: 5,
    name: "Burgundy Classic",
    category: "luxury",
    price: "UGX 180,000",
    image: IMAGES.products[4],
    desc: "Luxurious burgundy handbag with signature gold hardware. A statement piece.",
    badge: "PREMIUM"
  },
  {
    id: 6,
    name: "Pearl Collection",
    category: "luxury",
    price: "UGX 160,000",
    image: IMAGES.products[5],
    desc: "Exquisite cream-white collection set featuring pearl-tone finishes. Elegant and sophisticated.",
    badge: "NEW"
  },
  {
    id: 7,
    name: "Croco Shoulder",
    category: "luxury",
    price: "UGX 250,000",
    image: IMAGES.products[6],
    desc: "Premium black crocodile-textured shoulder bag with gold chain. The ultimate luxury statement.",
    badge: "LUXURY"
  },
  {
    id: 8,
    name: "Glamour Set",
    category: "travel",
    price: "UGX 200,000",
    image: IMAGES.products[7],
    desc: "Versatile travel set with multiple color options. Style and function in one elegant package.",
    badge: "TRAVEL"
  },
  {
    id: 9,
    name: "Amara Clutch",
    category: "luxury",
    price: "UGX 120,000",
    image: IMAGES.products[8],
    desc: "Elegant black leather clutch with burgundy velvet interior and gold chain. Perfect for evening events.",
    badge: "NEW"
  },
  {
    id: 10,
    name: "Queen Tote",
    category: "tote",
    price: "UGX 185,000",
    image: IMAGES.products[9],
    desc: "Premium black leather tote with gold chain handles and royal crest emblem. For the modern queen.",
    badge: "PREMIUM"
  },
  {
    id: 11,
    name: "Savanna Crossbody",
    category: "shoulder",
    price: "UGX 145,000",
    image: IMAGES.products[10],
    desc: "Rich burgundy leather crossbody with gold clasp. Inspired by African savanna sunsets.",
    badge: "TRENDING"
  },
  {
    id: 12,
    name: "Nile Mini",
    category: "mini",
    price: "UGX 85,000",
    image: IMAGES.products[11],
    desc: "Elegant beige mini crossbody with gold chain strap. Named after the mighty Nile River.",
    badge: "POPULAR"
  },
  {
    id: 13,
    name: "Kampala Quilted",
    category: "shoulder",
    price: "UGX 195,000",
    image: IMAGES.products[12],
    desc: "Black quilted leather shoulder bag with iconic gold logo. The ultimate Kampala fashion statement.",
    badge: "LUXURY"
  },
  {
    id: 14,
    name: "Serengeti Tote",
    category: "tote",
    price: "UGX 175,000",
    image: IMAGES.products[13],
    desc: "Tan brown leather tote with gold corner protectors and dual carry options. Adventure meets elegance.",
    badge: "BEST SELLER"
  },
  {
    id: 15,
    name: "Kampala Rose",
    category: "mini",
    price: "UGX 110,000",
    image: IMAGES.products[14],
    desc: "Rose pink leather mini bag with gold chain strap and signature buckle. A Kampala favorite.",
    badge: "NEW"
  },
  {
    id: 16,
    name: "Pearl Dome",
    category: "luxury",
    price: "UGX 210,000",
    image: IMAGES.products[15],
    desc: "White pearl leather dome satchel with gold hardware. Elegant and timeless for special occasions.",
    badge: "PREMIUM"
  },
  {
    id: 17,
    name: "Croco Hobo",
    category: "shoulder",
    price: "UGX 230,000",
    image: IMAGES.products[16],
    desc: "Black crocodile-textured hobo bag with bold gold chain. Bold and beautiful.",
    badge: "LUXURY"
  },
  {
    id: 18,
    name: "Emerald Tote",
    category: "tote",
    price: "UGX 165,000",
    image: IMAGES.products[17],
    desc: "Deep emerald green leather tote with gold clasp. Stand out with this stunning piece.",
    badge: "NEW"
  },
  {
    id: 19,
    name: "Ocean Satchel",
    category: "office",
    price: "UGX 155,000",
    image: IMAGES.products[18],
    desc: "Navy blue leather satchel with gold zippers. Perfect for the professional woman.",
    badge: "BEST SELLER"
  },
  {
    id: 20,
    name: "Blush Quilted",
    category: "mini",
    price: "UGX 125,000",
    image: IMAGES.products[19],
    desc: "Blush pink quilted mini bag with gold chain. Sweet and sophisticated.",
    badge: "POPULAR"
  },
  {
    id: 21,
    name: "Sahara Hobo",
    category: "shoulder",
    price: "UGX 140,000",
    image: IMAGES.products[20],
    desc: "Camel brown leather hobo bag with gold ring details. Relaxed luxury inspired by the Sahara.",
    badge: "TRENDING"
  },
  {
    id: 22,
    name: "Silver Moon Clutch",
    category: "luxury",
    price: "UGX 95,000",
    image: IMAGES.products[21],
    desc: "Metallic silver leather clutch with gold chain. Perfect for moonlit events.",
    badge: "NEW"
  },
  {
    id: 23,
    name: "Victoria Bucket",
    category: "shoulder",
    price: "UGX 135,000",
    image: IMAGES.products[22],
    desc: "Black leather bucket bag with drawstring closure and gold hardware. Classic and versatile.",
    badge: "BEST SELLER"
  },
  {
    id: 24,
    name: "Sunflower Crossbody",
    category: "shoulder",
    price: "UGX 115,000",
    image: IMAGES.products[23],
    desc: "Mustard yellow leather crossbody with gold clasp. Brighten your day with this cheerful bag.",
    badge: "POPULAR"
  },
  {
    id: 25,
    name: "Executive Brief",
    category: "office",
    price: "UGX 190,000",
    image: IMAGES.products[24],
    desc: "Black leather structured briefcase with gold corner protectors. For the executive woman.",
    badge: "PREMIUM"
  },
  {
    id: 26,
    name: "Ruby Clutch",
    category: "luxury",
    price: "UGX 105,000",
    image: IMAGES.products[25],
    desc: "Red leather envelope clutch with gold clasp. Passionate and elegant.",
    badge: "NEW"
  },
  {
    id: 27,
    name: "Ivory Chain",
    category: "shoulder",
    price: "UGX 170,000",
    image: IMAGES.products[26],
    desc: "White leather shoulder bag with gold chain strap. Pure elegance.",
    badge: "TRENDING"
  },
  {
    id: 28,
    name: "Sahel Quilted",
    category: "shoulder",
    price: "UGX 185,000",
    image: IMAGES.products[27],
    desc: "Beige quilted leather shoulder bag with gold chain. Inspired by Sahel landscapes.",
    badge: "LUXURY"
  },
  {
    id: 29,
    name: "Onyx Tote",
    category: "tote",
    price: "UGX 160,000",
    image: IMAGES.products[28],
    desc: "Black leather structured tote with gold zippers. Sleek and powerful.",
    badge: "BEST SELLER"
  },
  {
    id: 30,
    name: "Dusty Rose Mini",
    category: "mini",
    price: "UGX 100,000",
    image: IMAGES.products[29],
    desc: "Dusty rose leather mini bag with gold chain. Soft and romantic.",
    badge: "POPULAR"
  },
  {
    id: 31,
    name: "Merlot Satchel",
    category: "office",
    price: "UGX 175,000",
    image: IMAGES.products[30],
    desc: "Burgundy leather structured satchel with top handle. Rich and sophisticated.",
    badge: "PREMIUM"
  },
  {
    id: 32,
    name: "Midnight Hobo",
    category: "shoulder",
    price: "UGX 150,000",
    image: IMAGES.products[31],
    desc: "Black leather hobo bag with gold chain detail. Mysterious and elegant.",
    badge: "NEW"
  },
  {
    id: 33,
    name: "Golden Hour Clutch",
    category: "luxury",
    price: "UGX 110,000",
    image: IMAGES.products[32],
    desc: "Metallic gold leather clutch with chain strap. Glow like golden hour.",
    badge: "TRENDING"
  },
  {
    id: 34,
    name: "Pearl Tote",
    category: "tote",
    price: "UGX 165,000",
    image: IMAGES.products[33],
    desc: "Cream white leather tote with gold metal handles. Pure sophistication.",
    badge: "BEST SELLER"
  },
  {
    id: 35,
    name: "Shadow Crossbody",
    category: "shoulder",
    price: "UGX 130,000",
    image: IMAGES.products[34],
    desc: "Black leather crossbody with gold T-buckle. Minimalist and chic.",
    badge: "POPULAR"
  },
  {
    id: 36,
    name: "Olive Bucket",
    category: "shoulder",
    price: "UGX 140,000",
    image: IMAGES.products[35],
    desc: "Olive green leather bucket bag with gold ring detail. Earthy and elegant.",
    badge: "NEW"
  },
  {
    id: 37,
    name: "Fuchsia Mini",
    category: "mini",
    price: "UGX 105,000",
    image: IMAGES.products[36],
    desc: "Hot pink leather mini bag with gold chain. Bold and vibrant.",
    badge: "TRENDING"
  },
  {
    id: 38,
    name: "Cognac Satchel",
    category: "office",
    price: "UGX 180,000",
    image: IMAGES.products[37],
    desc: "Cognac brown leather structured satchel with gold hardware. Timeless elegance.",
    badge: "PREMIUM"
  },
  {
    id: 39,
    name: "Kampala Classic",
    category: "tote",
    price: "UGX 145,000",
    image: IMAGES.products[38],
    desc: "Black leather chain strap bag with burgundy interior. A Kampala classic reimagined.",
    badge: "BEST SELLER"
  },
  {
    id: 40,
    name: "Aurora Quilted",
    category: "shoulder",
    price: "UGX 200,000",
    image: IMAGES.products[39],
    desc: "Black quilted leather shoulder bag with gold logo. Like the aurora borealis.",
    badge: "LUXURY"
  },
  {
    id: 41,
    name: "Safari Tote",
    category: "travel",
    price: "UGX 170,000",
    image: IMAGES.products[40],
    desc: "Tan brown leather travel tote with gold corner protectors. Adventure-ready elegance.",
    badge: "TRAVEL"
  },
  {
    id: 42,
    name: "Blossom Mini",
    category: "mini",
    price: "UGX 90,000",
    image: IMAGES.products[41],
    desc: "Rose pink leather mini bag with gold chain. Delicate like a blossom.",
    badge: "POPULAR"
  },
  {
    id: 43,
    name: "Diamond Dome",
    category: "luxury",
    price: "UGX 220,000",
    image: IMAGES.products[42],
    desc: "White pearl leather dome satchel with gold hardware. Sparkle like a diamond.",
    badge: "PREMIUM"
  },
  {
    id: 44,
    name: "Panther Shoulder",
    category: "shoulder",
    price: "UGX 240,000",
    image: IMAGES.products[43],
    desc: "Black crocodile-textured shoulder bag with bold gold chain. Fierce and beautiful.",
    badge: "LUXURY"
  },
  {
    id: 45,
    name: "Forest Tote",
    category: "tote",
    price: "UGX 155,000",
    image: IMAGES.products[44],
    desc: "Emerald green leather tote with gold clasp. Fresh as a forest morning.",
    badge: "NEW"
  },
  {
    id: 46,
    name: "Navy Executive",
    category: "office",
    price: "UGX 165,000",
    image: IMAGES.products[45],
    desc: "Navy blue leather satchel with gold zippers. Command respect.",
    badge: "BEST SELLER"
  },
  {
    id: 47,
    name: "Petal Quilted",
    category: "mini",
    price: "UGX 115,000",
    image: IMAGES.products[46],
    desc: "Blush pink quilted mini bag with gold chain. Soft as a petal.",
    badge: "TRENDING"
  },
  {
    id: 48,
    name: "Dune Hobo",
    category: "shoulder",
    price: "UGX 135,000",
    image: IMAGES.products[47],
    desc: "Camel brown leather hobo bag with gold rings. Inspired by desert dunes.",
    badge: "POPULAR"
  },
  {
    id: 49,
    name: "Stella Clutch",
    category: "luxury",
    price: "UGX 100,000",
    image: IMAGES.products[48],
    desc: "Silver metallic leather clutch with gold chain. Shine like a star.",
    badge: "NEW"
  },
  {
    id: 50,
    name: "Heritage Tote",
    category: "tote",
    price: "UGX 175,000",
    image: IMAGES.products[49],
    desc: "Black leather structured tote with gold zippers. A heritage of excellence.",
    badge: "PREMIUM"
  }
];

export const COLLECTIONS = [
  {
    id: 1,
    name: "Sophia Tote",
    price: "UGX 150,000",
    image: IMAGES.collections[0],
    badge: "NEW"
  },
  {
    id: 2,
    name: "Noir Quilted",
    price: "UGX 220,000",
    image: IMAGES.collections[1],
    badge: "NEW"
  },
  {
    id: 3,
    name: "Rosé Mini",
    price: "UGX 95,000",
    image: IMAGES.collections[2],
    badge: "NEW"
  },
  {
    id: 4,
    name: "Burgundy Classic",
    price: "UGX 180,000",
    image: IMAGES.collections[3],
    badge: "NEW"
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Namuli",
    role: "Business Executive, Kampala",
    image: IMAGES.testimonials[0],
    rating: 5,
    text: "I ordered the Sophia Tote for a work event and received so many compliments! The quality is incredible for the price. Delivery was same day in Kampala. LORAH is now my go-to!"
  },
  {
    id: 2,
    name: "Grace Auma",
    role: "Fashion Blogger, Entebbe",
    image: IMAGES.testimonials[1],
    rating: 5,
    text: "The customer service is outstanding. They helped me choose the perfect bag for my wedding. The response on WhatsApp was instant!"
  },
  {
    id: 3,
    name: "Diana Atwine",
    role: "Loyal Customer, Jinja",
    image: IMAGES.testimonials[2],
    rating: 5,
    text: "I've bought 5 bags from LORAH now and each one is better than the last. The quality rivals brands that cost 3x more!"
  }
];

export const SOCIAL_POSTS = IMAGES.social.map((img, index) => ({
  id: index + 1,
  image: img
}));

export const FAQS = [
  {
    id: 1,
    question: "Do you deliver?",
    answer: "Yes! We offer same-day delivery within Kampala and nationwide shipping across Uganda and East Africa within 2-3 business days."
  },
  {
    id: 2,
    question: "How do I order?",
    answer: "Simply browse our collection, find a bag you love, and contact us via WhatsApp, phone call, or email. We'll handle the rest!"
  },
  {
    id: 3,
    question: "Can I reserve a handbag?",
    answer: "Absolutely! You can reserve any handbag by sending us a WhatsApp message. We'll hold it for you for up to 48 hours."
  },
  {
    id: 4,
    question: "Do you restock sold out items?",
    answer: "Yes, we regularly restock popular items! Let us know and we'll notify you as soon as it's available again."
  },
  {
    id: 5,
    question: "What payment methods do you accept?",
    answer: "We accept Mobile Money (MTN & Airtel), bank transfer, and cash on delivery within Kampala."
  }
];

export const SOCIAL_STATS = [
  { icon: "music", value: 15000, label: "TikTok Followers" },
  { icon: "instagram", value: 8500, label: "Instagram Fans" },
  { icon: "heart", value: 50000, label: "Likes & Hearts" },
  { icon: "eye", value: 200000, label: "Video Views" }
];

export const WHY_CHOOSE_US = [
  {
    icon: "gem",
    title: "Authentic Quality",
    desc: "Every handbag crafted from premium materials with meticulous attention to detail."
  },
  {
    icon: "truck",
    title: "Fast Delivery",
    desc: "Same-day delivery within Kampala. Nationwide shipping across Uganda & East Africa."
  },
  {
    icon: "tag",
    title: "Affordable Luxury",
    desc: "Designer-quality bags at prices that make sense."
  },
  {
    icon: "headphones",
    title: "Customer Support",
    desc: "Quick responses on WhatsApp, phone, or email — because you matter."
  },
  {
    icon: "sparkles",
    title: "Trendy Collections",
    desc: "New arrivals every week. Stay ahead of the fashion curve."
  },
  {
    icon: "shield",
    title: "Secure Communication",
    desc: "Order safely through WhatsApp with confirmation and tracking."
  }
];

// Newsletter Storage Functions
export const NL_STORAGE_KEY = 'lorah_newsletter_subscribers';

export const getSubscribers = () => {
  try {
    return JSON.parse(localStorage.getItem(NL_STORAGE_KEY)) || [];
  } catch(e) {
    return [];
  }
};

export const saveSubscribers = (subscribers) => {
  try {
    localStorage.setItem(NL_STORAGE_KEY, JSON.stringify(subscribers));
    return true;
  } catch(e) {
    return false;
  }
};

export const addSubscriber = (name, email) => {
  const subs = getSubscribers();
  const e = email.toLowerCase().trim();
  
  if (subs.some(s => s.email.toLowerCase() === e)) {
    return 'duplicate';
  }
  
  subs.push({
    id: Date.now().toString(36) + Math.random().toString(36).substr(2),
    name: name.trim() || 'Anonymous',
    email: e,
    subscribedAt: new Date().toISOString(),
    source: 'website'
  });
  
  return saveSubscribers(subs) ? 'success' : 'error';
};

export const removeSubscriber = (id) => {
  saveSubscribers(getSubscribers().filter(s => s.id !== id));
};

export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const escapeHtml = (str) => {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
};
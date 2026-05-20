export { products as PRODUCTS };

export function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ─────────────────────────────────────────────
//  SUBSCRIBERS  –  Supabase-backed
// ─────────────────────────────────────────────

function mapSubscriber(row) {
  return { id: row.id, name: row.name, email: row.email, subscribedAt: row.subscribed_at };
}

export async function fetchSubscribers() {
  const { supabase, isConfigured } = await import('../lib/supabase');
  if (!isConfigured()) return [];
  const { data, error } = await supabase.from('subscribers').select('*').order('subscribed_at', { ascending: false });
  if (error) { console.error('Failed to fetch subscribers:', error); return []; }
  return data.map(mapSubscriber);
}

export async function addSubscriber(name, email) {
  if (!name.trim()) return { ok: false, message: 'Please enter your name.' };
  if (!validateEmail(email)) return { ok: false, message: 'Please enter a valid email.' };
  const { supabase, isConfigured } = await import('../lib/supabase');
  if (!isConfigured()) return { ok: false, message: 'Database not configured.' };
  const { error } = await supabase.from('subscribers').insert({ name: name.trim(), email: email.trim().toLowerCase() });
  if (error) {
    if (error.code === '23505') return { ok: false, message: 'You are already subscribed!' };
    return { ok: false, message: error.message || 'Could not subscribe.' };
  }
  return { ok: true, message: 'success' };
}

export async function removeSubscriber(id) {
  const { supabase, isConfigured } = await import('../lib/supabase');
  if (!isConfigured()) return;
  await supabase.from('subscribers').delete().eq('id', id);
}

export async function clearSubscribers() {
  const { supabase, isConfigured } = await import('../lib/supabase');
  if (!isConfigured()) return;
  await supabase.from('subscribers').delete().neq('id', 0);
}

export const IMAGES = {
  logo: "images/lorah-logo.jpeg",
  about: "images/IMG-20260511-WA0012.png",
};

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Olivia K. Loreen ",
    role: "Fashion Enthusiast",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    text: "LORAH bags are absolutely stunning! The quality is unmatched at this price point. I get compliments every time I carry my Chrisbella tote.",
  },
  {
    id: 2,
    name: "Aisha Namugga",
    role: "Business Owner",
    image: "https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    text: "I ordered three bags for myself and my sisters — every single one was perfect. Fast delivery and beautiful packaging. My go-to shop!",
  },
  {
    id: 3,
    name: "Grace Tusiime",
    role: "Marketing Manager",
    image: "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?w=400&h=400&fit=crop&crop=face",
    rating: 5,
    text: "The Coach-style shoulder bag I got looks even better in person. The attention to detail is incredible. LORAH is now my one-stop bag shop.",
  },
];

export const SOCIAL_POSTS = [
  { id: 1, image: "images/IMG-20260511-WA0008.png" },
  { id: 2, image: "images/IMG-20260511-WA0025.png" },
  { id: 3, image: "images/IMG-20260511-WA0033.png" },
  { id: 4, image: "images/IMG-20260511-WA0057.png" },
  { id: 5, image: "images/IMG-20260511-WA0078.png" },
  { id: 6, image: "images/IMG-20260511-WA0100.png" },
  { id: 7, image: "images/IMG-20260511-WA0104.png" },
  { id: 8, image: "images/IMG-20260511-WA0022.png" },
];

export const FAQS = [
  {
    id: 1,
    question: "How do I place an order?",
    answer: "Browse our shop, click on order now to chat with our salesperson. You can also order directly via WhatsApp, Phone-Call or E-mail — just send us a screenshot of what you want or any other product that is not listed",
  },
  {
    id: 2,
    question: "Do you deliver outside Kampala?",
    answer: "Yes! We deliver nationwide. Kampala orders arrive same day, while upcountry deliveries take 2–3 business days via reliable courier partners.",
  },
  {
    id: 3,
    question: "What payment methods do you accept?",
    answer: "We accept Mobile Money (MTN & Airtel), bank transfer, and cash on delivery for Kampala orders.",
  },
  {
    id: 4,
    question: "Can I return or exchange a bag?",
    answer: "Absolutely. We offer a 7-day hassle-free return policy. The bag must be unused and in its original packaging. Contact us via WhatsApp to arrange a return.",
  },
  {
    id: 5,
    question: "Are your bags original brands?",
    answer: "We carry a mix of authentic brands (Chrisbella, Coach, Emily Loran) and high-quality designer-inspired styles. Each product description clearly states the brand type.",
  },
  {
    id: 6,
    question: "How can I track my order?",
    answer: "Once your order is dispatched, we'll send you a tracking link via WhatsApp or SMS. You can also message us anytime for an update.",
  },
];

export const SOCIAL_STATS = [
  { icon: "instagram", value: 12500, label: "Followers" },
  { icon: "heart", value: 8400, label: "Likes" },
  { icon: "eye", value: 25000, label: "Impressions" },
  { icon: "music", value: 3200, label: "Reels Views" },
];

export const WHY_CHOOSE_US = [
  {
    icon: "gem",
    title: "Premium Quality",
    desc: "Handpicked bags crafted from the finest materials for lasting elegance.",
  },
  {
    icon: "truck",
    title: "Fast Delivery",
    desc: "Same-day dispatch within Kampala, 2–3 days nationwide.",
  },
  {
    icon: "tag",
    title: "Affordable Luxury",
    desc: "Designer-inspired styles without the designer price tag.",
  },
  {
    icon: "headphones",
    title: "Personal Support",
    desc: "WhatsApp us anytime — real humans, real style advice.",
  },
  {
    icon: "sparkles",
    title: "Trend-Forward",
    desc: "New styles added weekly to keep your look fresh.",
  },
  {
    icon: "shield",
    title: "Quality Guaranteed",
    desc: "Every bag inspected before shipping. 7-day hassle-free returns.",
  },
];

export const COLLECTIONS = [
  {
    id: "col-1",
    name: "Tote Bags",
    badge: "Best Sellers",
    image: "images/IMG-20260511-WA0008.png",
    price: "From UGX 95,000",
    category: "Tote Bag",
  },
  {
    id: "col-2",
    name: "Shoulder Bags",
    badge: "New In",
    image: "images/IMG-20260511-WA0025.png",
    price: "From UGX 100,000",
    category: "Shoulder Bag",
  },
  {
    id: "col-3",
    name: "Crossbody Bags",
    badge: "Trending",
    image: "images/IMG-20260511-WA0033.png",
    price: "From UGX 95,000",
    category: "Crossbody Bag",
  },
  {
    id: "col-4",
    name: "Handbags",
    badge: "Premium",
    image: "images/IMG-20260511-WA0064.png",
    price: "From UGX 100,000",
    category: "Handbag",
  },
  {
    id: "col-5",
    name: "Bucket Bags",
    badge: "Limited",
    image: "images/IMG-20260511-WA0018.png",
    price: "From UGX 95,000",
    category: "Bucket Bag",
  },
];

export const products = [
  // ─────────────────────────────────────────────
  //  CHRISBELLA  –  largest in-store brand
  // ─────────────────────────────────────────────
  {
    id: "CB-001",
    name: "Chrisbella Herringbone Tote Set (5 Colours)",
    brand: "Chrisbella",
    category: "Tote Bag",
    price: 95000,
    images: [
      "images/IMG-20260511-WA0008.png",
      "images/IMG-20260511-WA0016.png",
    ],
    colors: ["Black", "Navy", "Burgundy", "Beige", "Brown"],
    description:
      "Statement herringbone-weave tote by Chrisbella (ref CBO164). Comes as a set with a zip wallet and wide crossbody strap. Structured silhouette, gold-tone hardware, coordinating scarf accent. Available in five colours.",
    inStock: true,
    featured: true,
  },
  {
    id: "CB-002",
    name: "Chrisbella Lime Green Chain Shoulder Bag",
    brand: "Chrisbella",
    category: "Shoulder Bag",
    price: 100000,
    images: ["images/IMG-20260511-WA0015.png"],
    colors: ["Lime Green"],
    description:
      "Bold lime-green textured saffiano shoulder bag by Chrisbella. Acrylic chunky-link chain handle, clean rectangular silhouette, gold lettering logo.",
    inStock: true,
    featured: false,
  },
  {
    id: "CB-003",
    name: "Chrisbella Burgundy Tote + Mini Bag Set",
    brand: "Chrisbella",
    category: "Tote Bag",
    price: 120000,
    images: ["images/IMG-20260511-WA0020.png"],
    colors: ["Burgundy / Wine"],
    description:
      "Elegant two-piece set: a structured Chrisbella tote and a matching mini flap crossbody. Smooth matte PU, dual top handles, gold hardware and a magnetic-snap mini bag.",
    inStock: true,
    featured: true,
  },
  {
    id: "CB-004",
    name: "Chrisbella Brown & Teal Two-Piece Set",
    brand: "Chrisbella",
    category: "Tote Bag",
    price: 120000,
    images: ["images/IMG-20260511-WA0021.png"],
    colors: ["Chocolate Brown / Teal"],
    description:
      "Sophisticated bi-colour Chrisbella set: a roomy structured tote and a chain-strap flap crossbody in contrasting teal and brown. Includes coordinating silk scarf and wide shoulder strap.",
    inStock: true,
    featured: false,
  },
  {
    id: "CB-005",
    name: "Chrisbella Burgundy & Blush Chain Shoulder + Wallet Set",
    brand: "Chrisbella",
    category: "Shoulder Bag",
    price: 100000,
    images: [
      "images/IMG-20260511-WA0025.png",
      "images/IMG-20260511-WA0065.png",
    ],
    colors: ["Burgundy / Blush"],
    description:
      "Chic two-tone Chrisbella chain shoulder bag with a signature envelope flap in blush over a burgundy body. Comes with a matching zip-around wallet and woven twill strap.",
    inStock: true,
    featured: true,
  },
  {
    id: "CB-006",
    name: "Chrisbella Mustard Top Handle Satchel",
    brand: "Chrisbella",
    category: "Handbag",
    price: 100000,
    images: [
      "images/IMG-20260511-WA0026.png",
      "images/IMG-20260511-WA0094.png",
      "images/IMG-20260511-WA0097.png",
    ],
    colors: ["Mustard Yellow", "Brown", "Burgundy", "Black", "Cream"],
    description:
      "Structured Chrisbella city satchel with a signature gold C-charm clasp and oval lock detail. Tan leather-look top handles and wide adjustable strap. Available in multiple colours.",
    inStock: true,
    featured: true,
  },
  {
    id: "CB-007",
    name: "Chrisbella Yellow & Dark Green Doctor Bag Set",
    brand: "Chrisbella",
    category: "Handbag",
    price: 70000,
    images: ["images/IMG-20260511-WA0028.png"],
    colors: ["Yellow / Dark Green"],
    description:
      "Bold colour-block Chrisbella doctor bag with contrast gold stud tabs and a coordinating mini crossbody. Structured dome silhouette, silver-tone studs, teal lining.",
    inStock: true,
    featured: false,
  },
  {
    id: "CB-008",
    name: "Chrisbella Camel & Beige Chain Shoulder + Wallet Set",
    brand: "Chrisbella",
    category: "Shoulder Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0036.png"],
    colors: ["Camel / Beige"],
    description:
      "Two-tone Chrisbella chain shoulder bag with a beige envelope flap over a camel body. Gold curb-chain and twill strap, matching zip-around wallet included.",
    inStock: true,
    featured: false,
  },
  {
    id: "CB-009",
    name: "Chrisbella Black/White Woven Shoulder Bag",
    brand: "Chrisbella",
    category: "Shoulder Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0014.png"],
    colors: ["Black / White"],
    description:
      "Eye-catching Chrisbella shoulder bag with a checker-woven lower panel and sleek black structured upper. Dual leather-look top handles and crossbody strap.",
    inStock: true,
    featured: false,
  },
  {
    id: "CB-010",
    name: "Chrisbella Tan & Brown Woven Shoulder Bag",
    brand: "Chrisbella",
    category: "Shoulder Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0054.png"],
    colors: ["Tan / Brown"],
    description:
      "Structured Chrisbella shoulder bag featuring a hand-woven rattan-style front panel and smooth brown leather-look panels. Dual top handles and adjustable crossbody strap.",
    inStock: true,
    featured: false,
  },
  {
    id: "CB-011",
    name: "Chrisbella Tan Chain Shoulder + Wallet Set",
    brand: "Chrisbella",
    category: "Shoulder Bag",
    price: 100000,
    images: ["images/IMG-20260511-WA0055.png"],
    colors: ["Tan / Brown"],
    description:
      "Elegant Chrisbella chain shoulder bag in warm tan with a caramel envelope flap. Gold chain and printed twill strap, comes with a matching zip wallet.",
    inStock: true,
    featured: false,
  },
  {
    id: "CB-012",
    name: "Chrisbella Navy & Light Blue Chain Shoulder + Wallet Set",
    brand: "Chrisbella",
    category: "Shoulder Bag",
    price: 100000,
    images: ["images/IMG-20260511-WA0058.png"],
    colors: ["Navy / Light Blue"],
    description:
      "Cool nautical-toned Chrisbella chain shoulder set in navy with a sky-blue envelope flap. Floral-print strap, gold chain hardware and zip-around wallet.",
    inStock: true,
    featured: false,
  },
  {
    id: "CB-013",
    name: "Chrisbella Black Chain Shoulder + Wallet Set",
    brand: "Chrisbella",
    category: "Shoulder Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0053.png"],
    colors: ["Black"],
    description:
      "Classic all-black Chrisbella chain shoulder bag with a smooth envelope flap and gold hardware. Includes a zip-around wallet and printed twill strap.",
    inStock: true,
    featured: false,
  },
  {
    id: "CB-014",
    name: "Chrisbella Black Chain Shoulder Bag",
    brand: "Chrisbella",
    category: "Shoulder Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0056.png"],
    colors: ["Black", "Brown"],
    description:
      "Everyday Chrisbella shoulder bag in saffiano-textured PU with black chunky-link chain handle. Clean, minimalist silhouette with embossed logo plate.",
    inStock: true,
    featured: false,
  },
  {
    id: "CB-015",
    name: "Chrisbella Khaki / Olive Chain Shoulder Bag",
    brand: "Chrisbella",
    category: "Shoulder Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0061.png"],
    colors: ["Khaki / Olive"],
    description:
      "Understated Chrisbella shoulder bag in military-inspired khaki saffiano PU. Black acrylic chain handle and embossed logo. Ideal everyday carry.",
    inStock: true,
    featured: false,
  },
  {
    id: "CB-016",
    name: "Chrisbella Brown & Beige Structured Tote",
    brand: "Chrisbella",
    category: "Tote Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0063.png"],
    colors: ["Brown / Beige"],
    description:
      "Sophisticated Chrisbella structured tote with a contrast beige top panel, wheat-stitch trim, signature C charm pendant and adjustable crossbody strap.",
    inStock: true,
    featured: false,
  },
  {
    id: "CB-017",
    name: "Chrisbella Blue & Light Blue Structured Tote + Wallet",
    brand: "Chrisbella",
    category: "Handbag",
    price: 120000,
    images: ["images/IMG-20260511-WA0074.png"],
    colors: ["Royal Blue / Light Blue"],
    description:
      "Chrisbella two-piece set: a structured city tote in royal blue with a light-blue envelope flap and gold push-lock, plus a matching mini zip wallet.",
    inStock: true,
    featured: true,
  },
  {
    id: "CB-018",
    name: "Chrisbella Beige / Cream Top Handle + Mini Wallet Set",
    brand: "Chrisbella",
    category: "Handbag",
    price: 95000,
    images: ["images/IMG-20260511-WA0079.png"],
    colors: ["Beige / Cream"],
    description:
      "Refined Chrisbella structured top handle in warm beige with cream envelope flap and gold bar lock. Coiled leather-look handle, comes with mini semicircle zip wallet.",
    inStock: true,
    featured: false,
  },
  {
    id: "CB-019",
    name: "Chrisbella Black Structured Tote + Mini Bag Set",
    brand: "Chrisbella",
    category: "Tote Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0081.png"],
    colors: ["Black"],
    description:
      "Two-piece Chrisbella set: a bold structured black tote with gold stud detail tabs and a matching mini flap crossbody. Gold logo lettering and dual top handles.",
    inStock: true,
    featured: false,
  },
  {
    id: "CB-020",
    name: "Chrisbella Dark Green Tote + Mini Bag Set",
    brand: "Chrisbella",
    category: "Tote Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0091.png"],
    colors: ["Dark Forest Green"],
    description:
      "Rich forest-green Chrisbella two-piece set: a spacious smooth-leather tote and a matching flap mini crossbody, both in deep hunter green with gold hardware.",
    inStock: true,
    featured: false,
  },
  {
    id: "CB-021",
    name: "Chrisbella Burgundy Top Handle Satchel",
    brand: "Chrisbella",
    category: "Handbag",
    price: 100000,
    images: [
      "images/IMG-20260511-WA0096.png",
      "images/IMG-20260511-WA0098.png",
      "images/IMG-20260511-WA0101.png",
    ],
    colors: ["Burgundy", "Black", "Cream", "Beige"],
    description:
      "Elegant Chrisbella structured satchel with a signature gold C-charm and oval-lock clasp. Wide strap and top handles. Available in burgundy, black, cream and beige.",
    inStock: true,
    featured: false,
  },
  {
    id: "CB-022",
    name: "Chrisbella Lavender Hobo + Mini Crossbody Set",
    brand: "Chrisbella",
    category: "Shoulder Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0102.png"],
    colors: ["Lavender / Lilac"],
    description:
      "Pretty lavender Chrisbella two-piece set: a slouchy hobo shoulder bag and a compact flap crossbody, both in soft satin-finish PU with gold hardware.",
    inStock: true,
    featured: true,
  },

  // ─────────────────────────────────────────────
  //  EMILY LORAN
  // ─────────────────────────────────────────────
  {
    id: "EL-001",
    name: "Emily Loran Navy Stripe Kelly-Style Tote + Pouch",
    brand: "Emily Loran",
    category: "Handbag",
    price: 120000,
    images: ["images/IMG-20260511-WA0064.png"],
    colors: ["Navy / White"],
    description:
      "Nautical navy-and-white stripe canvas Emily Loran tote with tan leather top frame, gold bar-turn lock and chain side strap. Comes with a matching striped card pouch.",
    inStock: true,
    featured: true,
  },
  {
    id: "EL-002",
    name: "Emily Loran Ivory Herringbone Kelly-Style Tote + Pouch",
    brand: "Emily Loran",
    category: "Handbag",
    price: 120000,
    images: ["images/IMG-20260511-WA0066.png"],
    colors: ["Ivory / Grey"],
    description:
      "Sophisticated ivory herringbone-weave Emily Loran structured tote with silver leather frame, turn-lock clasp and chain side strap. Includes a matching woven pouch.",
    inStock: true,
    featured: true,
  },

  // ─────────────────────────────────────────────
  //  COACH  (authentic / high-quality inspired)
  // ─────────────────────────────────────────────
  {
    id: "CO-001",
    name: "Coach Signature Canvas Shoulder Bag with Cherry Charm – Brown/Black",
    brand: "Coach",
    category: "Shoulder Bag",
    price: 100000,
    images: [
      "images/IMG-20260511-WA0029.png",
      "images/IMG-20260515-WA0006.png",
    ],
    colors: ["Brown / Black"],
    description:
      "Iconic Coach signature-print canvas baguette shoulder bag in classic brown and black. Gold 'COACH' logo, chain-and-leather strap, decorative red cherry charm keychain.",
    inStock: true,
    featured: true,
  },
  {
    id: "CO-002",
    name: "Coach Signature Canvas Shoulder Bag – Khaki/Saddle",
    brand: "Coach",
    category: "Shoulder Bag",
    price: 100000,
    images: ["images/IMG-20260515-WA0001.png"],
    colors: ["Khaki / Saddle Tan"],
    description:
      "Classic Coach khaki-and-saddle signature canvas shoulder bag with cognac leather trim, gold chain-and-leather handle and hang tag.",
    inStock: true,
    featured: false,
  },
  {
    id: "CO-003",
    name: "Coach Signature Canvas Shoulder Bag – Chalk/Cream",
    brand: "Coach",
    category: "Shoulder Bag",
    price: 100000,
    images: ["images/IMG-20260515-WA0002.png"],
    colors: ["Chalk / Cream"],
    description:
      "Elegant all-cream Coach signature canvas shoulder bag with gold logo and chain-link strap. Minimalist and versatile.",
    inStock: true,
    featured: false,
  },
  {
    id: "CO-004",
    name: "Coach Tabby Quilted Chain Shoulder Bag – Black",
    brand: "Coach",
    category: "Shoulder Bag",
    price: 100000,
    images: ["images/IMG-20260515-WA0009.png"],
    colors: ["Black"],
    description:
      "Iconic Coach Tabby in diamond-quilted smooth leather. Oversized gold C-clasp, gold chain strap, plush lambskin-feel interior.",
    inStock: true,
    featured: true,
  },
  {
    id: "CO-005",
    name: "Coach Tabby Quilted Chain Shoulder Bag – Dark Brown",
    brand: "Coach",
    category: "Shoulder Bag",
    price: 100000,
    images: ["images/IMG-20260515-WA0017.png"],
    colors: ["Dark Chocolate Brown"],
    description:
      "Rich chocolate-brown Coach Tabby in diamond-quilted leather with oversized gold C-clasp and gold chain strap.",
    inStock: true,
    featured: false,
  },

  // ─────────────────────────────────────────────
  //  YSL / SAINT LAURENT  (inspired)
  // ─────────────────────────────────────────────
  {
    id: "YS-001",
    name: "YSL-Inspired Pink Ombré Quilted Chain Flap Bag",
    brand: "YSL Style",
    category: "Crossbody Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0033.png"],
    colors: ["Pink Ombré"],
    description:
      "Stunning gradient pink-to-rose ombré quilted flap bag with a silver YSL monogram clasp and silver fine-link chain strap. Soft lambskin-feel leather.",
    inStock: true,
    featured: true,
  },
  {
    id: "YS-002",
    name: "YSL-Inspired Brown Quilted Chain Flap Bag",
    brand: "YSL Style",
    category: "Crossbody Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0100.png"],
    colors: ["Cognac Brown"],
    description:
      "Luxe cognac-brown quilted flap crossbody bag with a large gold YSL monogram logo and gold chain strap. Geometric tile quilt pattern.",
    inStock: true,
    featured: true,
  },
  {
    id: "YS-003",
    name: "YSL-Inspired Orange Coral Quilted Chain Flap Bag",
    brand: "YSL Style",
    category: "Crossbody Bag",
    price: 35000,
    images: ["images/IMG-20260515-WA0046.png"],
    colors: ["Orange / Coral"],
    description:
      "Vibrant terracotta-orange quilted flap bag with a large black YSL monogram and silver chain. Eye-catching summer colourway.",
    inStock: true,
    featured: false,
  },

  // ─────────────────────────────────────────────
  //  VICTORIA SEVEN
  // ─────────────────────────────────────────────
  {
    id: "VS-001",
    name: "Victoria Seven Black Ruched Leather Tote",
    brand: "Victoria Seven",
    category: "Handbag",
    price: 110000,
    images: ["images/IMG-20260511-WA0046.png"],
    colors: ["Black"],
    description:
      "Structured Victoria Seven ruched tote in pebbled black leather. Dual rounded top handles with silver knot detail, wide detachable strap, silver hardware.",
    inStock: true,
    featured: false,
  },
  {
    id: "VS-002",
    name: "Victoria Seven Silver Metallic Ruched Tote",
    brand: "Victoria Seven",
    category: "Handbag",
    price: 110000,
    images: ["images/IMG-20260511-WA0057.png"],
    colors: ["Silver / Metallic"],
    description:
      "Glamorous Victoria Seven metallic silver pebbled leather tote with dual rounded handles, silver knot detail and detachable crossbody strap.",
    inStock: true,
    featured: true,
  },

  // ─────────────────────────────────────────────
  //  BAGCO
  // ─────────────────────────────────────────────
  {
    id: "BG-001",
    name: "Bagco Tan Rope-Handle Flap Shoulder Bag",
    brand: "Bagco",
    category: "Shoulder Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0012.png"],
    colors: ["Tan / Caramel"],
    description:
      "Sleek Bagco tan leather-look flap shoulder bag with a distinctive macramé-style braided rope handle and silver-metal stone clasp. Detachable rope crossbody strap.",
    inStock: true,
    featured: false,
  },

  // ─────────────────────────────────────────────
  //  DAVID JONES
  // ─────────────────────────────────────────────
  {
    id: "DJ-001",
    name: "David Jones Camel Croc-Embossed Chain Shoulder Bag",
    brand: "David Jones",
    category: "Shoulder Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0013.png"],
    colors: ["Camel"],
    description:
      "Elegant David Jones camel-coloured croc-embossed shoulder bag with gold double-chain straps and a clean zip-top silhouette. Gold David Jones logo plate.",
    inStock: true,
    featured: false,
  },

  // ─────────────────────────────────────────────
  //  MIU MIU-INSPIRED
  // ─────────────────────────────────────────────
  {
    id: "MM-001",
    name: "Miu Miu-Inspired Taupe Monogram Top Handle Bag",
    brand: "Miu Miu Style",
    category: "Handbag",
    price: 35000,
    images: [
      "images/IMG-20260511-WA0035.png",
      "images/IMG-20260515-WA0048.png",
    ],
    colors: ["Taupe / Warm Brown", "Tan"],
    description:
      "Chic Miu Miu-inspired structured top handle bag with all-over embossed 'miu' logo canvas flap and smooth leather lower body. Gold oval-loop lock. Available in taupe and tan.",
    inStock: true,
    featured: true,
  },

  // ─────────────────────────────────────────────
  //  GD / GUCCI-INSPIRED
  // ─────────────────────────────────────────────
  {
    id: "GD-001",
    name: "GD Monogram Sage Green Chain Shoulder Bag",
    brand: "GD Style",
    category: "Crossbody Bag",
    price: 35000,
    images: [
      "images/IMG-20260511-WA0045.png",
      "images/IMG-20260515-WA0043.png",
    ],
    colors: ["Sage Green", "Mint Green"],
    description:
      "Quilted GD monogram flap crossbody in soft sage green. Silver double-G-style clasp and silver chain strap. Compact and elegant for day or evening.",
    inStock: true,
    featured: false,
  },
  {
    id: "GD-002",
    name: "GD Monogram Khaki Tote + Wallet + Strap Set",
    brand: "GD Style",
    category: "Tote Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0051.png"],
    colors: ["Khaki / Warm Taupe"],
    description:
      "Three-piece GD set: a spacious khaki tote with gold GD logo centrepiece, a matching zip wallet and a wide monochrome crossbody strap.",
    inStock: true,
    featured: false,
  },

  // ─────────────────────────────────────────────
  //  GUESS
  // ─────────────────────────────────────────────
  {
    id: "GS-001",
    name: "Guess Dark Brown Chain Hobo Bag",
    brand: "Guess",
    category: "Shoulder Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0048.png"],
    colors: ["Dark Brown"],
    description:
      "Buttery-soft dark brown distressed Guess hobo with an oversized antique-gold chunky chain strap and small 'G' logo charm. Crescent silhouette.",
    inStock: true,
    featured: false,
  },
  {
    id: "GS-002",
    name: "Guess Black Velvet Chain Hobo Bag",
    brand: "Guess",
    category: "Shoulder Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0086(1).png"],
    colors: ["Black"],
    description:
      "Luxuriously soft black velvet Guess hobo bag with a bold gold chunky chain strap and 'G' logo charm. Crescent body, clean minimalist design.",
    inStock: true,
    featured: false,
  },

  // ─────────────────────────────────────────────
  //  FOREVER BARSITI
  // ─────────────────────────────────────────────
  {
    id: "FB-001",
    name: "Forever Barsiti White & Pink Mini Satchel",
    brand: "Forever Barsiti",
    category: "Mini Bag",
    price: 35000,
    images: [
      "images/IMG-20260511-WA0037.png",
      "images/IMG-20260515-WA0035.png",
    ],
    colors: ["White / Pink"],
    description:
      "Cute Forever Barsiti mini top-handle satchel with a white flap over a pink PU body. Two round snap buttons, compact size, perfect for outings.",
    inStock: true,
    featured: false,
  },

  // ─────────────────────────────────────────────
  //  ZAYZ
  // ─────────────────────────────────────────────
  {
    id: "ZZ-001",
    name: "ZAYZ Ring Handle Hobo Bag – White",
    brand: "ZAYZ",
    category: "Shoulder Bag",
    price: 130000,
    images: ["images/IMG-20260511-WA0078.png"],
    colors: ["White"],
    description:
      "Striking ZAYZ crescent hobo bag with a hammered gold circular ring handle and detachable crossbody strap. Soft smooth PU, zip closure.",
    inStock: true,
    featured: true,
  },
  {
    id: "ZZ-002",
    name: "ZAYZ Ring Handle Hobo Bag – Black",
    brand: "ZAYZ",
    category: "Shoulder Bag",
    price: 130000,
    images: ["images/IMG-20260511-WA0110(1).png"],
    colors: ["Black"],
    description:
      "Sleek black ZAYZ crescent hobo bag with a hammered gold circular ring handle and detachable crossbody strap. Zip closure.",
    inStock: true,
    featured: false,
  },

  // ─────────────────────────────────────────────
  //  VOGUE & CLASSIC
  // ─────────────────────────────────────────────
  {
    id: "VC-001",
    name: "Vogue & Classic Black Croc Chain Tote + Pouch",
    brand: "Vogue & Classic",
    category: "Tote Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0070.png"],
    colors: ["Black"],
    description:
      "Sleek Vogue & Classic black croc-embossed structured tote with gold chain-and-leather twin straps and a matching zip pouch. Clean silhouette.",
    inStock: true,
    featured: false,
  },
  {
    id: "VC-002",
    name: "Vogue & Classic Brown Croc Chain Shoulder Bag",
    brand: "Vogue & Classic",
    category: "Shoulder Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0080.png"],
    colors: ["Cognac Brown"],
    description:
      "Rich cognac croc-embossed Vogue & Classic shoulder bag with gold chain-and-leather strap and gold logo plate. Classic structured shape.",
    inStock: true,
    featured: false,
  },

  // ─────────────────────────────────────────────
  //  GIVENCHY-INSPIRED  (4G lock)
  // ─────────────────────────────────────────────
  {
    id: "GV-001",
    name: "Givenchy-Inspired Plum 4G Quilted Chain Flap Bag",
    brand: "Givenchy Style",
    category: "Crossbody Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0073.png"],
    colors: ["Plum / Burgundy"],
    description:
      "Chevron-quilted plum crossbody bag with a silver 4G-logo turn-lock and silver chain strap. Refined evening-to-day carry.",
    inStock: true,
    featured: false,
  },
  {
    id: "GV-002",
    name: "Givenchy-Inspired Navy 4G Quilted Chain Flap Bag",
    brand: "Givenchy Style",
    category: "Crossbody Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0076.png"],
    colors: ["Navy Blue"],
    description:
      "Chevron-quilted navy blue crossbody bag with a gunmetal 4G-logo turn-lock and gunmetal chain strap.",
    inStock: true,
    featured: false,
  },

  // ─────────────────────────────────────────────
  //  BALENCIAGA-INSPIRED  (BB logo)
  // ─────────────────────────────────────────────
  {
    id: "BB-001",
    name: "BB-Logo Dark Brown Patent Clutch Bag",
    brand: "BB Style",
    category: "Clutch",
    price: 100000,
    images: ["images/IMG-20260511-WA0087.png"],
    colors: ["Dark Burgundy Brown / Patent"],
    description:
      "Sleek dark-brown patent leather clutch with a silver BB-style turn-lock clasp and chain strap. Polished finish with a structured silhouette.",
    inStock: true,
    featured: false,
  },
  {
    id: "BB-002",
    name: "BB Quilted Chocolate Top Handle Satchel",
    brand: "BB Style",
    category: "Handbag",
    price: 95000,
    images: ["images/IMG-20260511-WA0104.png"],
    colors: ["Chocolate Brown"],
    description:
      "Premium diamond-quilted chocolate brown top handle satchel with an embossed tone-on-tone BB logo, top handle and detachable strap. Rich structured silhouette.",
    inStock: true,
    featured: true,
  },

  // ─────────────────────────────────────────────
  //  HERMÈS-INSPIRED  (H hardware)
  // ─────────────────────────────────────────────
  {
    id: "HM-001",
    name: "H-Lock Quilted Chocolate Crossbody Bag",
    brand: "H Style",
    category: "Crossbody Bag",
    price: 95000,
    images: [
      "images/IMG-20260511-WA0072(1).png",
      "images/IMG-20260511-WA0088.png",
    ],
    colors: ["Chocolate Brown", "Burgundy"],
    description:
      "Diamond-quilted flap crossbody with a gold H-logo push-lock clasp. Gold chain-and-leather shoulder strap and wide adjustable strap. In chocolate brown and burgundy.",
    inStock: true,
    featured: false,
  },
  {
    id: "HM-002",
    name: "H-Lock Lemon Yellow Mini Top Handle Bag",
    brand: "H Style",
    category: "Mini Bag",
    price: 50000,
    images: [
      "images/IMG-20260511-WA0039.png",
      "images/IMG-20260515-WA0041.png",
    ],
    colors: ["Lemon Yellow", "Cream / Ivory"],
    description:
      "Chic Kelly-inspired mini top handle in soft pebbled PU. Gold H-bar turn-lock clasp, top handle and adjustable strap. Available in lemon yellow and cream.",
    inStock: true,
    featured: false,
  },

  // ─────────────────────────────────────────────
  //  FENDI-INSPIRED  (FF baguette)
  // ─────────────────────────────────────────────
  {
    id: "FD-001",
    name: "FF-Buckle Baguette Shoulder Bag – Tan/Nude",
    brand: "Fendi Style",
    category: "Shoulder Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0043.png"],
    colors: ["Tan / Nude"],
    description:
      "Iconic baguette-style shoulder bag in soft tan PU with a gold FF-inspired buckle clasp and adjustable strap. Ruched drape silhouette.",
    inStock: true,
    featured: false,
  },
  {
    id: "FD-002",
    name: "FF-Buckle Baguette Shoulder Bag – Black",
    brand: "Fendi Style",
    category: "Shoulder Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0071.png"],
    colors: ["Black"],
    description:
      "Sleek black version of the baguette-style shoulder bag with a gold FF-inspired buckle clasp and adjustable strap.",
    inStock: true,
    featured: false,
  },

  // ─────────────────────────────────────────────
  //  CELINE-INSPIRED  (Triomphe CC clasp)
  // ─────────────────────────────────────────────
  {
    id: "CL-001",
    name: "Celine-Inspired Triomphe Burgundy Chain Shoulder Bag",
    brand: "Celine Style",
    category: "Shoulder Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0022.png"],
    colors: ["Deep Burgundy"],
    description:
      "Distressed lambskin-feel deep-burgundy flap bag with a gold interlinked CC-clasp and gold chunky-chain shoulder strap. Slouchy yet structured.",
    inStock: true,
    featured: true,
  },

  // ─────────────────────────────────────────────
  //  BOTTEGA VENETA-INSPIRED  (woven intrecciato)
  // ─────────────────────────────────────────────
  {
    id: "BV-001",
    name: "BV-Style Olive Woven Bucket Bag",
    brand: "BV Style",
    category: "Bucket Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0018.png"],
    colors: ["Olive / Army Green"],
    description:
      "Luxurious intrecciato-weave bucket bag in military olive. Knotted leather draw-cord and shoulder strap, silver hardware details.",
    inStock: true,
    featured: true,
  },
  {
    id: "BV-002",
    name: "BV-Style Black Woven Bucket Bag",
    brand: "BV Style",
    category: "Bucket Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0062.png"],
    colors: ["Black"],
    description:
      "Classic black intrecciato-weave bucket bag with knotted shoulder strap and silver hardware. Timeless and elegant.",
    inStock: true,
    featured: false,
  },
  {
    id: "BV-003",
    name: "BV-Style Dark Brown Woven Flap Shoulder Bag",
    brand: "BV Style",
    category: "Shoulder Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0069.png"],
    colors: ["Dark Brown"],
    description:
      "Dark brown intrecciato-weave structured flap shoulder bag with a signature gold X-clasp and woven rope handle.",
    inStock: true,
    featured: false,
  },

  // ─────────────────────────────────────────────
  //  CLASSIC BRAND
  // ─────────────────────────────────────────────
  {
    id: "CK-001",
    name: "Classic Burgundy Top Handle Satchel",
    brand: "Classic",
    category: "Handbag",
    price: 95000,
    images: ["images/IMG-20260511-WA0040.png"],
    colors: ["Burgundy / Wine"],
    description:
      "Understated Classic-brand structured satchel in rich burgundy PU. Gold push-lock bar clasp, loop top handle and detachable strap.",
    inStock: true,
    featured: false,
  },
  {
    id: "CK-002",
    name: "Classic Sage Green Top Handle Satchel",
    brand: "Classic",
    category: "Handbag",
    price: 95000,
    images: ["images/IMG-20260511-WA0077.png"],
    colors: ["Sage Green"],
    description:
      "Muted sage-green Classic-brand structured satchel. Gold push-lock bar clasp, loop top handle and detachable strap. Effortlessly understated.",
    inStock: true,
    featured: false,
  },
  {
    id: "CK-003",
    name: "Classic Black Top Handle Satchel",
    brand: "Classic",
    category: "Handbag",
    price: 95000,
    images: ["images/IMG-20260511-WA0060.png"],
    colors: ["Black"],
    description:
      "Clean all-black Classic-brand structured top handle satchel with a gold push-lock and strap. A wardrobe staple.",
    inStock: true,
    featured: false,
  },

  // ─────────────────────────────────────────────
  //  CHRISTINA & GLK
  // ─────────────────────────────────────────────
  {
    id: "CG-001",
    name: "Christina & Glk Burgundy Structured Shoulder Tote",
    brand: "Christina & Glk",
    category: "Tote Bag",
    price: 100000,
    images: ["images/IMG-20260511-WA0095.png"],
    colors: ["Burgundy"],
    description:
      "Refined Christina & Glk structured shoulder tote in burgundy PU with perforated side panels, wood-bead tassel pendant and dual top handles.",
    inStock: true,
    featured: false,
  },
  {
    id: "CG-002",
    name: "Christina & Glk Cream & Brown Structured Tote",
    brand: "Christina & Glk",
    category: "Tote Bag",
    price: 100000,
    images: ["images/IMG-20260511-WA0099.png"],
    colors: ["Cream / Brown"],
    description:
      "Elegant Christina & Glk two-tone structured tote in cream with brown leather-look handles, perforated side panels and wood-bead tassel pendant.",
    inStock: true,
    featured: false,
  },

  // ─────────────────────────────────────────────
  //  PENNY C
  // ─────────────────────────────────────────────
  {
    id: "PC-001",
    name: "Penny C Camel Suede Shoulder Hobo",
    brand: "Penny C",
    category: "Shoulder Bag",
    price: 95000,
    images: ["images/IMG-20260515-WA0090(1).png"],
    colors: ["Camel"],
    description:
      "Casual Penny C shoulder hobo in soft camel suede-feel PU. Adjustable leather strap, gold zip closure and dainty logo patch.",
    inStock: true,
    featured: false,
  },

  // ─────────────────────────────────────────────
  //  YUESKANGAROO  –  Men's
  // ─────────────────────────────────────────────
  {
    id: "YK-001",
    name: "YUESKANGAROO Men's Leather Clutch Wallet Bag",
    brand: "YUESKANGAROO",
    category: "Men's Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0019.png"],
    colors: ["Black"],
    description:
      "Premium men's multi-compartment clutch/wristlet by YUESKANGAROO. Kangaroo embossed logo, double zip, wristlet strap. Holds phone, cards, cash.",
    inStock: true,
    featured: false,
  },

  // ─────────────────────────────────────────────
  //  LOUIS VUITTON-INSPIRED
  // ─────────────────────────────────────────────
  {
    id: "LV-001",
    name: "LV-Inspired Grey Quilted Chain Flap Bag",
    brand: "LV Style",
    category: "Crossbody Bag",
    price: 35000,
    images: ["images/IMG-20260515-WA0019.png"],
    colors: ["Pearl Grey"],
    description:
      "Quilted pearl-grey flap crossbody with a gunmetal LV-style monogram clasp and gunmetal chain-and-leather strap. Chevron quilt pattern.",
    inStock: true,
    featured: false,
  },

  // ─────────────────────────────────────────────
  //  EG BRAND
  // ─────────────────────────────────────────────
  {
    id: "EG-001",
    name: "EG Brown Top Handle Flap Shoulder Bag",
    brand: "EG",
    category: "Shoulder Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0023(1).png"],
    colors: ["Cognac Brown"],
    description:
      "Structured EG brand flap shoulder bag in cognac brown smooth PU. Large gold EG monogram clasp, top handle and detachable strap.",
    inStock: true,
    featured: false,
  },
  {
    id: "EG-002",
    name: "EG Crimson Red Structured Tote with Scarf",
    brand: "EG",
    category: "Handbag",
    price: 100000,
    images: ["images/IMG-20260511-WA0084(1).png"],
    colors: ["Crimson Red"],
    description:
      "Bold crimson-red EG structured tote with white contrast stitch, gold EG push-lock clasp, top handles and a decorative floral satin scarf wrap.",
    inStock: true,
    featured: true,
  },

  // ─────────────────────────────────────────────
  //  MAISON MARGIELA-INSPIRED
  // ─────────────────────────────────────────────
  {
    id: "MG-001",
    name: "MM-Inspired Ivory Patent Chain Clutch",
    brand: "MM Style",
    category: "Clutch",
    price: 55000,
    images: ["images/IMG-20260515-WA0014.png"],
    colors: ["Ivory / Off-White"],
    description:
      "Minimalist ivory patent leather flap clutch with a silver Braille-style logo plate and silver chunky link chain strap. Clean and sophisticated.",
    inStock: true,
    featured: false,
  },

  // ─────────────────────────────────────────────
  //  BOYY-INSPIRED
  // ─────────────────────────────────────────────
  {
    id: "BY-001",
    name: "Boyy-Inspired Tan Acrylic Buckle Top Handle Bag",
    brand: "Boyy Style",
    category: "Handbag",
    price: 50000,
    images: ["images/IMG-20260515-WA0031.png"],
    colors: ["Tan / Nude"],
    description:
      "Structured top handle bag in tan pebbled PU with a dramatic oversized marble-effect acrylic buckle closure. Sleek minimalist silhouette with strap.",
    inStock: true,
    featured: false,
  },

  // ─────────────────────────────────────────────
  //  OO-LOCK QUILTED  (unbranded / fashion)
  // ─────────────────────────────────────────────
  {
    id: "OO-001",
    name: "OO-Lock Quilted Chain Flap Bag – Plum",
    brand: "Fashion",
    category: "Crossbody Bag",
    price: 95000,
    images: [
      "images/IMG-20260511-WA0089(1).png",
      "images/IMG-20260511-WA0092.png",
    ],
    colors: ["Plum / Wine", "Dark Plum"],
    description:
      "Diamond-quilted flap crossbody with a silver OO bamboo-style lock clasp and heavy silver link chain. Soft lambskin-feel PU.",
    inStock: true,
    featured: false,
  },

  // ─────────────────────────────────────────────
  //  MISC / FASHION  (unbranded boutique bags)
  // ─────────────────────────────────────────────
  {
    id: "MF-001",
    name: "Brown Suede Knotted Mini Shoulder Bag",
    brand: "Fashion",
    category: "Mini Bag",
    price: 35000,
    images: [
      "images/IMG-20260511-WA0024.png",
      "images/IMG-20260511-WA0075.png",
    ],
    colors: ["Brown Suede", "Camel Suede"],
    description:
      "Adorable mini shoulder bag in soft suede-feel PU with knotted double-strand leather handles and silver ring hardware. Available in brown and camel.",
    inStock: true,
    featured: false,
  },
  {
    id: "MF-002",
    name: "Cream & Navy Tweed Top Handle Satchel",
    brand: "Fashion",
    category: "Handbag",
    price: 95000,
    images: ["images/IMG-20260511-WA0038.png"],
    colors: ["Cream / Navy Tweed"],
    description:
      "Chic structured satchel with a cream smooth-leather flap over a navy tweed body. Gold twist-lock, single top handle and adjustable strap.",
    inStock: true,
    featured: false,
  },
  {
    id: "MF-003",
    name: "Pearl-Strap Taupe Chain Crossbody Bag",
    brand: "Fashion",
    category: "Crossbody Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0041.png"],
    colors: ["Taupe / Nude"],
    description:
      "Elegant taupe crossbody bag with a gold grid-cube push-lock and a pearl-bead-adorned adjustable chain strap. Sophisticated and versatile.",
    inStock: true,
    featured: false,
  },
  {
    id: "MF-004",
    name: "Distressed Burgundy Chain Clutch / Shoulder",
    brand: "Fashion",
    category: "Clutch",
    price: 95000,
    images: ["images/IMG-20260511-WA0017.png"],
    colors: ["Burgundy / Distressed"],
    description:
      "Edgy distressed-leather-look burgundy foldover clutch with a zip base and silver link chain. Vintage crinkled finish.",
    inStock: true,
    featured: false,
  },
  {
    id: "MF-005",
    name: "Pewter Metallic Distressed Chain Clutch",
    brand: "Fashion",
    category: "Clutch",
    price: 95000,
    images: ["images/IMG-20260511-WA0068.png"],
    colors: ["Pewter / Gunmetal"],
    description:
      "Glamorous distressed pewter metallic foldover clutch with a fine silver chain strap. Perfect for evenings out.",
    inStock: true,
    featured: false,
  },
  {
    id: "MF-006",
    name: "Black Glossy Fold-Over Clutch",
    brand: "Fashion",
    category: "Clutch",
    price: 95000,
    images: ["images/IMG-20260511-WA0067.png"],
    colors: ["Black / Glossy"],
    description:
      "Sleek black crinkled-patent fold-over clutch with a fine silver zip base and minimalist profile. Goes with everything.",
    inStock: true,
    featured: false,
  },
  {
    id: "MF-007",
    name: "Beige/Natural Straw Woven Mini Top Handle",
    brand: "Fashion",
    category: "Mini Bag",
    price: 35000,
    images: [
      "images/IMG-20260511-WA0044.png",
      "images/IMG-20260515-WA0016.png",
    ],
    colors: ["Natural / Beige"],
    description:
      "Summer-ready mini top handle bag with a gold woven front panel and cream leather-look flap. Silver bar detail, strap included.",
    inStock: true,
    featured: false,
  },
  {
    id: "MF-008",
    name: "Navy & White Stripe Tweed Top Handle Satchel",
    brand: "Fashion",
    category: "Handbag",
    price: 95000,
    images: ["images/IMG-20260511-WA0052.png"],
    colors: ["Navy / White Stripe"],
    description:
      "Classic navy-and-white stripe tweed mini satchel with black leather top and gold H-bar turn-lock. Structured and smart.",
    inStock: true,
    featured: false,
  },
  {
    id: "MF-009",
    name: "Tan / Beige Tweed Chain Crossbody",
    brand: "Fashion",
    category: "Crossbody Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0083.png"],
    colors: ["Tan / Beige Tweed"],
    description:
      "Chic crossbody featuring a tan smooth leather flap over a beige herringbone-tweed body. Gold bear-paw push-lock and chain-and-leather strap.",
    inStock: true,
    featured: false,
  },
  {
    id: "MF-010",
    name: "Bear-Lock Beige Chain Crossbody Bag",
    brand: "Fashion",
    category: "Crossbody Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0085.png"],
    colors: ["Beige / Tan"],
    description:
      "Sweet beige fabric-and-leather flap crossbody with a gold bear-face push-lock clasp and gold chain strap. Playful and practical.",
    inStock: true,
    featured: false,
  },
  {
    id: "MF-011",
    name: "Navy & White Stripe Chain Shoulder Bag",
    brand: "Fashion",
    category: "Shoulder Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0093.png"],
    colors: ["Navy / White Stripe"],
    description:
      "Structured navy flap shoulder bag with a white stripe fabric lower panel, gold ring push-lock and gold chain-and-leather strap.",
    inStock: true,
    featured: false,
  },
  {
    id: "MF-012",
    name: "Black Structured Tweed-Strap Flap Satchel",
    brand: "Fashion",
    category: "Handbag",
    price: 55000,
    images: ["images/IMG-20260515-WA0012.png"],
    colors: ["Black / Grey Tweed"],
    description:
      "Sharp black PU satchel with a grey mosaic-tweed centre strap and gold bar-buckle. Clean structured silhouette with top handle.",
    inStock: true,
    featured: false,
  },
  {
    id: "MF-013",
    name: "Lavender & Blue Tweed Mini Top Handle",
    brand: "Fashion",
    category: "Handbag",
    price: 50000,
    images: ["images/IMG-20260515-WA0028.png"],
    colors: ["Lavender / Blue Tweed"],
    description:
      "Feminine mini top handle satchel with a lavender leather flap over a purple-blue mosaic-tweed body and gold hook clasp.",
    inStock: true,
    featured: false,
  },
  {
    id: "MF-014",
    name: "Purple Structured Top Handle with Scarf",
    brand: "Fashion",
    category: "Handbag",
    price: 50000,
    images: ["images/IMG-20260515-WA0007.png"],
    colors: ["Purple / Violet"],
    description:
      "Compact purple PU structured top handle bag with a satin envelope flap, silver tab lock and a matching silk scarf wrapped on the handle.",
    inStock: true,
    featured: false,
  },
  {
    id: "MF-015",
    name: "Olive Canvas Micro Top Handle Satchel",
    brand: "Fashion",
    category: "Mini Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0103.png"],
    colors: ["Olive / Sage"],
    description:
      "Petite micro satchel in olive diagonal-stripe canvas with sage leather-look trim, gold rod-end handles and gold zip closure.",
    inStock: true,
    featured: false,
  },
  {
    id: "MF-016",
    name: "GG Monogram Beige/Brown Shoulder Tote",
    brand: "GG Style",
    category: "Tote Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0105.png"],
    colors: ["Beige / Brown"],
    description:
      "Classic GG-inspired monogram canvas shoulder tote in tan and brown with leather trim and a tied satin scarf accent on the strap.",
    inStock: true,
    featured: false,
  },
  {
    id: "MF-017",
    name: "Black Chain Shoulder Bag with Scarf Accent",
    brand: "Fashion",
    category: "Shoulder Bag",
    price: 95000,
    images: ["images/IMG-20260511-WA0082.png"],
    colors: ["Black"],
    description:
      "Sleek black structured shoulder bag with gold chain strap, coin-charm pendant and a delicate floral satin scarf accent. Clean trapezoidal silhouette.",
    inStock: true,
    featured: false,
  },

  // ─────────────────────────────────────────────
  //  CANVAS / TOTE BAGS
  // ─────────────────────────────────────────────
  {
    id: "CT-001",
    name: "HelloKeke Embroidered Beige Canvas Tote",
    brand: "HelloKeke",
    category: "Canvas Tote",
    price: 30000,
    images: ["images/IMG-20260515-WA0004.png"],
    colors: ["Beige / Natural"],
    description:
      "Casual HelloKeke large canvas tote in warm beige with a cute embroidered cutlery graphic and patch badge detail. Ideal for everyday and market use.",
    inStock: true,
    featured: false,
  },
  {
    id: "CT-002",
    name: "Cotso 'Tickle Me Pink' Graphic Canvas Tote",
    brand: "Cotso",
    category: "Canvas Tote",
    price: 30000,
    images: ["images/IMG-20260515-WA0026.png"],
    colors: ["Beige / Natural"],
    description:
      "Fun Cotso canvas tote with a large cartoon bear 'Tickle Me Pink' print. Lightweight, roomy and playful.",
    inStock: true,
    featured: false,
  },
];

// ─────────────────────────────────────────────
//  HELPER  –  derived data
// ─────────────────────────────────────────────

export const categories = [
  ...new Set(products.map((p) => p.category)),
].sort();

export const brands = [
  ...new Set(products.map((p) => p.brand)),
].sort();

export const featuredProducts = products.filter((p) => p.featured);

export const getProductById = (id) =>
  products.find((p) => p.id === id) || null;

export const getProductsByCategory = (category) =>
  products.filter((p) => p.category === category);

export const getProductsByBrand = (brand) =>
  products.filter((p) => p.brand === brand);

export const searchProducts = (query) => {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.colors.some((c) => c.toLowerCase().includes(q))
  );
};

export const formatPrice = (price) =>
  typeof price === 'string' ? price : `UGX ${Number(price).toLocaleString('en-UG')}`;

// ─────────────────────────────────────────────
//  SUPABASE  –  product CRUD & image storage
// ─────────────────────────────────────────────

import { supabase, isConfigured } from '../lib/supabase';

// Map a Supabase row (snake_case) to our app's product shape (camelCase)
function rowToProduct(row) {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    category: row.category,
    price: Number(row.price),
    images: row.images || [],
    colors: row.colors || [],
    description: row.description || '',
    inStock: row.in_stock,
    featured: row.featured,
  };
}

// Map our app's product shape to a Supabase row (snake_case)
function productToRow(p) {
  return {
    id: p.id,
    name: p.name,
    brand: p.brand || '',
    category: p.category,
    price: p.price,
    images: p.images || [],
    colors: p.colors || [],
    description: p.description || '',
    in_stock: p.inStock ?? true,
    featured: p.featured ?? false,
  };
}

// Fetch all products from Supabase
export async function fetchProducts() {
  if (!isConfigured()) return products; // fallback to static
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) {
    console.error('Failed to fetch products:', error);
    return products; // fallback to static
  }
  return data.length > 0 ? data.map(rowToProduct) : products;
}

// Insert a new product
export async function addProduct(product) {
  const row = productToRow(product);
  const { data, error } = await supabase
    .from('products')
    .insert(row)
    .select()
    .single();
  if (error) throw error;
  return rowToProduct(data);
}

// Update an existing product
export async function updateProduct(id, updates) {
  // Convert camelCase updates to snake_case
  const row = {};
  if (updates.name !== undefined) row.name = updates.name;
  if (updates.brand !== undefined) row.brand = updates.brand;
  if (updates.category !== undefined) row.category = updates.category;
  if (updates.price !== undefined) row.price = updates.price;
  if (updates.images !== undefined) row.images = updates.images;
  if (updates.colors !== undefined) row.colors = updates.colors;
  if (updates.description !== undefined) row.description = updates.description;
  if (updates.inStock !== undefined) row.in_stock = updates.inStock;
  if (updates.featured !== undefined) row.featured = updates.featured;

  const { data, error } = await supabase
    .from('products')
    .update(row)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return rowToProduct(data);
}

// Delete a product
export async function deleteProduct(id) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// Upload an image to Supabase Storage and return its public URL
export async function uploadProductImage(productId, file) {
  const ext = file.name.split('.').pop();
  const fileName = `${productId}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage
    .from('product-images')
    .upload(fileName, file, { upsert: false });
  if (error) throw error;
  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(fileName);
  return data.publicUrl;
}

// Delete an image from Supabase Storage
export async function deleteProductImage(imageUrl) {
  // Extract the path after the bucket name from the URL
  const marker = '/product-images/';
  const idx = imageUrl.indexOf(marker);
  if (idx === -1) return;
  const path = imageUrl.substring(idx + marker.length);
  const { error } = await supabase.storage
    .from('product-images')
    .remove([path]);
  if (error) console.error('Failed to delete image:', error);
}

// Seed the database with the static products (run once)
export async function seedProducts() {
  const rows = products.map(productToRow);
  const { error } = await supabase
    .from('products')
    .upsert(rows, { onConflict: 'id', ignoreDuplicates: true });
  if (error) throw error;
  return rows.length;
}

// Returns the static product list (used as fallback)
export function getLiveProducts() {
  return products;
}

export default products;
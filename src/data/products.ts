import type { Product } from "../types/product";

const addToCart = (id: string): Product["action"] => ({
  type: "ADD_TO_CART",
  payload: { id }
});

export const featuredProducts: Product[] = [
  {
    id: "snack-bites-001",
    title: "Mango Millet Bites",
    subtitle: "No refined sugar",
    price: "₹129",
    imageUrl: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?auto=format&fit=crop&w=500&q=80",
    badge: "Best seller",
    action: addToCart("snack-bites-001")
  },
  {
    id: "diaper-soft-002",
    title: "Cloud Soft Diapers",
    subtitle: "Pack of 32",
    price: "₹499",
    imageUrl: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?auto=format&fit=crop&w=500&q=80",
    badge: "10 min",
    action: addToCart("diaper-soft-002")
  },
  {
    id: "sipper-owl-003",
    title: "Owl Training Sipper",
    subtitle: "Spill-proof",
    price: "₹349",
    imageUrl: "https://images.unsplash.com/photo-1528821128474-27f963b062bf?auto=format&fit=crop&w=500&q=80",
    action: addToCart("sipper-owl-003")
  },
  {
    id: "plush-dino-004",
    title: "Soft Dino Plush",
    subtitle: "Washable toy",
    price: "₹399",
    imageUrl: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=500&q=80",
    badge: "New",
    action: addToCart("plush-dino-004")
  }
];

export const snackProducts: Product[] = [
  {
    id: "snack-ragi-005",
    title: "Ragi Choco Cookies",
    subtitle: "6 mini packs",
    price: "₹179",
    imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=500&q=80",
    action: addToCart("snack-ragi-005")
  },
  {
    id: "snack-fruit-006",
    title: "Fruit Yogurt Melts",
    subtitle: "Strawberry",
    price: "₹149",
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&q=80",
    action: addToCart("snack-fruit-006")
  },
  {
    id: "snack-puffs-007",
    title: "Veggie Puffs",
    subtitle: "Baked, 40g",
    price: "₹99",
    imageUrl: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=500&q=80",
    badge: "Under ₹99",
    action: addToCart("snack-puffs-007")
  }
];

export const toyProducts: Product[] = [
  {
    id: "toy-blocks-008",
    title: "Stacking Blocks",
    subtitle: "12 pieces",
    price: "₹299",
    imageUrl: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=500&q=80",
    action: addToCart("toy-blocks-008")
  },
  {
    id: "toy-puzzle-009",
    title: "Wooden Shape Puzzle",
    subtitle: "Ages 2+",
    price: "₹449",
    imageUrl: "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&w=500&q=80",
    action: addToCart("toy-puzzle-009")
  },
  {
    id: "toy-crayons-010",
    title: "Jumbo Washable Crayons",
    subtitle: "Pack of 16",
    price: "₹199",
    imageUrl: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=500&q=80",
    action: addToCart("toy-crayons-010")
  }
];

export const backToSchoolProducts: Product[] = [
  {
    id: "school-lunchbox-011",
    title: "Bento Lunchbox",
    subtitle: "Leak resistant",
    price: "₹549",
    imageUrl: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=500&q=80",
    badge: "School pick",
    action: addToCart("school-lunchbox-011")
  },
  {
    id: "school-bag-012",
    title: "Mini Explorer Bag",
    subtitle: "Lightweight",
    price: "₹699",
    imageUrl: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=500&q=80",
    action: addToCart("school-bag-012")
  },
  {
    id: "school-bottle-013",
    title: "Insulated Water Bottle",
    subtitle: "500 ml",
    price: "₹399",
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80",
    action: addToCart("school-bottle-013")
  }
];

export const summerPlayhouseProducts: Product[] = [
  {
    id: "summer-bucket-014",
    title: "Beach Bucket Set",
    subtitle: "5 pieces",
    price: "₹299",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80",
    badge: "Splash",
    action: addToCart("summer-bucket-014")
  },
  {
    id: "summer-ball-015",
    title: "Inflatable Beach Ball",
    subtitle: "Soft grip",
    price: "₹179",
    imageUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=500&q=80",
    action: addToCart("summer-ball-015")
  },
  {
    id: "summer-floater-016",
    title: "Toddler Arm Floaters",
    subtitle: "Pool ready",
    price: "₹349",
    imageUrl: "https://images.unsplash.com/photo-1534294228306-bd54eb9a7ba8?auto=format&fit=crop&w=500&q=80",
    action: addToCart("summer-floater-016")
  }
];

export const mysteryGiftProducts: Product[] = [
  {
    id: "mystery-box-017",
    title: "Mystery Toy Box",
    subtitle: "Surprise inside",
    price: "₹249",
    imageUrl: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=500&q=80",
    badge: "Lucky draw",
    action: addToCart("mystery-box-017")
  },
  {
    id: "mystery-coupon-018",
    title: "Gift Coupon Pack",
    subtitle: "Instant reveal",
    price: "₹99",
    imageUrl: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=500&q=80",
    action: addToCart("mystery-coupon-018")
  },
  {
    id: "mystery-plush-019",
    title: "Blind Bag Plush",
    subtitle: "Collectibles",
    price: "₹199",
    imageUrl: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=500&q=80",
    action: addToCart("mystery-plush-019")
  }
];

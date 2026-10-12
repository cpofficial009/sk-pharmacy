const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Order = require('../models/Order');

dotenv.config({ path: require('path').resolve(__dirname, '../.env') });

const categoriesData = [
  {
    name: 'Pain Relief',
    description: 'Analgesics, anti-inflammatory, and muscle relaxant medications.',
    icon: 'activity',
  },
  {
    name: 'Antibiotics',
    description: 'Prescription antibiotics for bacterial infections.',
    icon: 'shield',
  },
  {
    name: 'Cold & Cough',
    description: 'Antihistamines, decongestants, syrups, and lozenges.',
    icon: 'thermometer',
  },
  {
    name: 'Vitamins & Supplements',
    description: 'Immunity boosters, daily multivitamin supplements and minerals.',
    icon: 'heart',
  },
  {
    name: 'Diabetes Care',
    description: 'Oral hypoglycemics, glucose care, and monitoring supplies.',
    icon: 'droplet',
  },
  {
    name: 'Digestive Health',
    description: 'Antacids, proton pump inhibitors, enzymes, and laxatives.',
    icon: 'coffee',
  },
  {
    name: 'Cardiovascular',
    description: 'Heart health, blood pressure control, and statins.',
    icon: 'heart-pulse',
  },
  {
    name: 'Skin & Hair Care',
    description: 'Dermatological creams, antiseptics, and healing gels.',
    icon: 'sparkles',
  },
];

const productsData = [
  {
    name: 'Dolo 650 Tablet',
    brand: 'Micro Labs Ltd',
    category: 'Pain Relief',
    description:
      'Dolo 650 is an effective analgesic and antipyretic medicine formulated to quickly reduce high fever and alleviate mild to moderate bodily pain, headache, and muscular aches.',
    price: 35,
    discount: 10,
    stock: 120,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    manufacturer: 'Micro Labs Limited',
    dosage: '1 tablet every 6 to 8 hours as prescribed (Max 4g/day)',
    usage: 'Fever reduction, toothache, muscle aches, headache, joint pain.',
    expiryDate: new Date('2028-06-30'),
    requiresPrescription: false,
    isFeatured: true,
    rating: 4.8,
    numReviews: 45,
  },
  {
    name: 'Amoxicillin 500mg Capsules',
    brand: 'Novartis Healthcare',
    category: 'Antibiotics',
    description:
      'Broad-spectrum penicillin antibiotic used to combat bacterial infections of the respiratory tract, ear, nose, throat, skin, and urinary tract.',
    price: 110,
    discount: 15,
    stock: 65,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&auto=format&fit=crop&q=80',
    manufacturer: 'Novartis Pharma India',
    dosage: '500mg orally 3 times daily for 7 days or as directed by doctor',
    usage: 'Bacterial infections including bronchitis, pneumonia, sinusitis.',
    expiryDate: new Date('2027-11-30'),
    requiresPrescription: true,
    isFeatured: true,
    rating: 4.7,
    numReviews: 28,
  },
  {
    name: 'Cetirizine 10mg Tablets',
    brand: 'Cipla Ltd',
    category: 'Cold & Cough',
    description:
      'Fast-acting second generation antihistamine that provides 24-hour relief from allergy symptoms such as sneezing, runny nose, itching, and hives.',
    price: 45,
    discount: 5,
    stock: 90,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80',
    manufacturer: 'Cipla Pharmaceuticals',
    dosage: '1 tablet once daily preferably at bedtime',
    usage: 'Seasonal allergic rhinitis, watery eyes, urticaria, itching.',
    expiryDate: new Date('2028-04-15'),
    requiresPrescription: false,
    isFeatured: true,
    rating: 4.6,
    numReviews: 32,
  },
  {
    name: 'Metformin 500mg SR',
    brand: 'Sun Pharma',
    category: 'Diabetes Care',
    description:
      'Sustained-release biguanide medication that helps control blood sugar levels in patients with type 2 diabetes by improving insulin sensitivity.',
    price: 85,
    discount: 12,
    stock: 140,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=80',
    manufacturer: 'Sun Pharmaceutical Industries',
    dosage: '1 tablet daily with the evening meal',
    usage: 'Management of type 2 diabetes mellitus alongside diet & exercise.',
    expiryDate: new Date('2028-01-20'),
    requiresPrescription: true,
    isFeatured: true,
    rating: 4.9,
    numReviews: 54,
  },
  {
    name: 'Pan-D (Pantoprazole & Domperidone)',
    brand: 'Alkem Laboratories',
    category: 'Digestive Health',
    description:
      'Combination drug containing a proton pump inhibitor and a prokinetic agent to heal acid reflux, severe heartburn, and nausea.',
    price: 195,
    discount: 18,
    stock: 75,
    image: 'https://images.unsplash.com/photo-1550572017-ed236b280385?w=600&auto=format&fit=crop&q=80',
    manufacturer: 'Alkem Laboratories Ltd',
    dosage: '1 capsule daily in the morning 30 minutes before breakfast',
    usage: 'Gastroesophageal reflux disease (GERD), peptic ulcer, acid acidity.',
    expiryDate: new Date('2027-09-30'),
    requiresPrescription: true,
    isFeatured: true,
    rating: 4.7,
    numReviews: 38,
  },
  {
    name: 'Limcee Vitamin C 500mg Chewable',
    brand: 'Abbott Healthcare',
    category: 'Vitamins & Supplements',
    description:
      'Orange-flavored Ascorbic Acid chewable tablet that reinforces immune defenses, boosts skin collagen synthesis, and fights oxidative cell damage.',
    price: 25,
    discount: 0,
    stock: 200,
    image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=600&auto=format&fit=crop&q=80',
    manufacturer: 'Abbott India Ltd',
    dosage: '1 to 2 chewable tablets daily after meals',
    usage: 'Immunity boosting, wound healing, scurvy prevention, healthy skin.',
    expiryDate: new Date('2028-08-31'),
    requiresPrescription: false,
    isFeatured: true,
    rating: 4.9,
    numReviews: 89,
  },
  {
    name: 'Azithromycin 500mg Tablets',
    brand: 'Zydus Cadila',
    category: 'Antibiotics',
    description:
      'Potent macrolide antibiotic prescribed for 3-day or 5-day therapy to quickly treat bacterial chest infections, tonsillitis, and skin infections.',
    price: 125,
    discount: 20,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&auto=format&fit=crop&q=80',
    manufacturer: 'Zydus Healthcare',
    dosage: '1 tablet once daily for 3 consecutive days 1 hour before meal',
    usage: 'Throat infection, bronchitis, strep throat, community pneumonia.',
    expiryDate: new Date('2027-12-15'),
    requiresPrescription: true,
    isFeatured: false,
    rating: 4.6,
    numReviews: 21,
  },
  {
    name: 'Benadryl Cough Formula Syrup 100ml',
    brand: 'Johnson & Johnson',
    category: 'Cold & Cough',
    description:
      'Soothing cough syrup providing dual action against wet cough and throat tickles, clearing mucus and easing tight chests.',
    price: 130,
    discount: 10,
    stock: 55,
    image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=600&auto=format&fit=crop&q=80',
    manufacturer: 'Johnson & Johnson Consumer Health',
    dosage: '5-10 ml every 4 hours using measuring cup',
    usage: 'Productive cough, bronchospasm, cold symptoms, throat irritation.',
    expiryDate: new Date('2027-10-31'),
    requiresPrescription: false,
    isFeatured: true,
    rating: 4.5,
    numReviews: 44,
  },
  {
    name: 'Atorvastatin 10mg (Atorva)',
    brand: 'Zydus Healthcare',
    category: 'Cardiovascular',
    description:
      'HMG-CoA reductase inhibitor (statin) that lowers bad LDL cholesterol and triglycerides while raising healthy HDL cholesterol.',
    price: 160,
    discount: 15,
    stock: 80,
    image: 'https://images.unsplash.com/photo-1550572017-4fcdbb590e56?w=600&auto=format&fit=crop&q=80',
    manufacturer: 'Zydus Cadila',
    dosage: '1 tablet once daily at bedtime',
    usage: 'High cholesterol, hyperlipidemia, cardiovascular disease prevention.',
    expiryDate: new Date('2028-03-31'),
    requiresPrescription: true,
    isFeatured: false,
    rating: 4.8,
    numReviews: 19,
  },
  {
    name: 'Volini Pain Relief Gel 50g',
    brand: 'Sun Pharma',
    category: 'Pain Relief',
    description:
      'Quick-absorbing topical analgesic gel with micro-particles that penetrate deep into muscles to provide instant relief from backache, sprains, and joint pain.',
    price: 145,
    discount: 8,
    stock: 95,
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&auto=format&fit=crop&q=80',
    manufacturer: 'Sun Pharmaceutical Industries Ltd',
    dosage: 'Apply gently 3-4 times daily on affected area',
    usage: 'Lower backache, neck shoulder stiffness, sprains, sports injuries.',
    expiryDate: new Date('2028-05-31'),
    requiresPrescription: false,
    isFeatured: true,
    rating: 4.7,
    numReviews: 62,
  },
  {
    name: 'Omeprazole 20mg Capsules',
    brand: 'Dr. Reddys',
    category: 'Digestive Health',
    description:
      'Targeted proton pump inhibitor that suppresses stomach acid production, facilitating fast healing of gastric and duodenal ulcers.',
    price: 60,
    discount: 10,
    stock: 110,
    image: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?w=600&auto=format&fit=crop&q=80',
    manufacturer: 'Dr. Reddys Laboratories',
    dosage: '1 capsule daily 30 minutes before first meal of the day',
    usage: 'Dyspepsia, heartburn, acid regurgitation, Zollinger-Ellison syndrome.',
    expiryDate: new Date('2028-02-28'),
    requiresPrescription: false,
    isFeatured: false,
    rating: 4.5,
    numReviews: 17,
  },
  {
    name: 'Becadexamin Multivitamin Capsules',
    brand: 'GlaxoSmithKline',
    category: 'Vitamins & Supplements',
    description:
      'Complete wellness formulation of Vitamin A, B-Complex, C, D3, E along with essential trace minerals to combat fatigue and bolster vitality.',
    price: 52,
    discount: 5,
    stock: 150,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    manufacturer: 'GSK Pharmaceuticals India',
    dosage: '1 capsule daily after lunch or dinner',
    usage: 'Nutritional deficiency, convalescence, fatigue, weakness.',
    expiryDate: new Date('2028-07-31'),
    requiresPrescription: false,
    isFeatured: false,
    rating: 4.8,
    numReviews: 53,
  },
  {
    name: 'Betadine 10% Antiseptic Solution 100ml',
    brand: 'Win-Medicare',
    category: 'Skin & Hair Care',
    description:
      'Gold standard Povidone-Iodine antiseptic solution for preventing infection in minor cuts, scrapes, abrasions, and minor surgical wounds.',
    price: 115,
    discount: 10,
    stock: 70,
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&auto=format&fit=crop&q=80',
    manufacturer: 'Win-Medicare Pvt Ltd',
    dosage: 'Apply full strength directly to affected skin with clean swab',
    usage: 'First aid treatment of minor cuts, wounds, burns, pre-op skin prep.',
    expiryDate: new Date('2028-09-30'),
    requiresPrescription: false,
    isFeatured: false,
    rating: 4.9,
    numReviews: 41,
  },
  {
    name: 'Montair-LC (Montelukast & Levocetirizine)',
    brand: 'Cipla Ltd',
    category: 'Cold & Cough',
    description:
      'Dual active formula relieving persistent allergic rhinitis, nighttime sneezing, asthma symptoms, and seasonal pollen allergies.',
    price: 210,
    discount: 15,
    stock: 60,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80',
    manufacturer: 'Cipla Ltd',
    dosage: '1 tablet daily at bedtime',
    usage: 'Allergic rhinitis, bronchial asthma prophylaxis, persistent cough.',
    expiryDate: new Date('2028-04-30'),
    requiresPrescription: true,
    isFeatured: false,
    rating: 4.7,
    numReviews: 35,
  },
  {
    name: 'Electral ORS Powder Sachet (21.8g)',
    brand: 'FDC Limited',
    category: 'Digestive Health',
    description:
      'WHO-recommended oral rehydration salt formulation that restores vital electrolyte and water balance during dehydration and stomach upset.',
    price: 22,
    discount: 0,
    stock: 180,
    image: 'https://images.unsplash.com/photo-1550572017-ed236b280385?w=600&auto=format&fit=crop&q=80',
    manufacturer: 'FDC Limited',
    dosage: 'Dissolve entire sachet content in 1 litre of clean drinking water',
    usage: 'Restoration of fluids & electrolytes in diarrhea, vomiting, heat exhaustion.',
    expiryDate: new Date('2029-01-31'),
    requiresPrescription: false,
    isFeatured: true,
    rating: 4.9,
    numReviews: 76,
  },
  {
    name: 'Ibuprofen 400mg (Brufen)',
    brand: 'Abbott Healthcare',
    category: 'Pain Relief',
    description:
      'Non-steroidal anti-inflammatory drug (NSAID) delivering reliable pain relief and reducing swelling in dental ache, sprains, and arthritis.',
    price: 42,
    discount: 5,
    stock: 8, // Intentional low stock to show low stock warning on Admin Dashboard!
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    manufacturer: 'Abbott India',
    dosage: '1 tablet 2-3 times daily after food',
    usage: 'Dental pain, period pain, arthritis, muscular inflammation.',
    expiryDate: new Date('2027-08-31'),
    requiresPrescription: false,
    isFeatured: false,
    rating: 4.6,
    numReviews: 24,
  },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(' Connected to MongoDB for seeding...');

    // Clear existing records
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    console.log(' Cleared old data.');

    // Create Admin User
    const adminUser = await User.create({
      name: 'SK Pharmacy Administrator',
      email: 'admin@skpharmacy.com',
      password: 'admin123',
      phone: '+91 98765 43210',
      role: 'admin',
      address: {
        street: '12 Medical Central Plaza, MG Road',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400001',
        country: 'India',
      },
    });

    // Create Customer User
    const customerUser = await User.create({
      name: 'Rahul Sharma',
      email: 'user@skpharmacy.com',
      password: 'user123',
      phone: '+91 91234 56789',
      role: 'user',
      address: {
        street: 'Flat 402, Green Valley Enclave, Sector 14',
        city: 'New Delhi',
        state: 'Delhi',
        postalCode: '110001',
        country: 'India',
      },
    });

    console.log(' Users seeded:');
    console.log('   Admin:    admin@skpharmacy.com  /  admin123');
    console.log('   Customer: user@skpharmacy.com   /  user123');

    // Create Categories
    const createdCategories = await Category.insertMany(categoriesData);
    console.log(` Seeded ${createdCategories.length} categories.`);

    // Create Products
    const createdProducts = await Product.insertMany(productsData);
    console.log(` Seeded ${createdProducts.length} medicines/products.`);

    // Create Sample Orders for Demo
    const sampleOrder1 = new Order({
      user: customerUser._id,
      orderItems: [
        {
          name: createdProducts[0].name,
          quantity: 2,
          image: createdProducts[0].image,
          price: createdProducts[0].finalPrice,
          product: createdProducts[0]._id,
        },
        {
          name: createdProducts[5].name,
          quantity: 3,
          image: createdProducts[5].image,
          price: createdProducts[5].finalPrice,
          product: createdProducts[5]._id,
        },
      ],
      shippingAddress: {
        fullName: 'Rahul Sharma',
        phone: '+91 91234 56789',
        address: 'Flat 402, Green Valley Enclave, Sector 14',
        city: 'New Delhi',
        state: 'Delhi',
        postalCode: '110001',
        country: 'India',
      },
      paymentMethod: 'Cash on Delivery',
      itemsPrice: 138,
      taxPrice: 7,
      shippingPrice: 40,
      totalPrice: 185,
      orderStatus: 'Confirmed',
      isPaid: false,
      isDelivered: false,
    });

    const sampleOrder2 = new Order({
      user: customerUser._id,
      orderItems: [
        {
          name: createdProducts[3].name,
          quantity: 1,
          image: createdProducts[3].image,
          price: createdProducts[3].finalPrice,
          product: createdProducts[3]._id,
        },
        {
          name: createdProducts[9].name,
          quantity: 1,
          image: createdProducts[9].image,
          price: createdProducts[9].finalPrice,
          product: createdProducts[9]._id,
        },
      ],
      shippingAddress: {
        fullName: 'Rahul Sharma',
        phone: '+91 91234 56789',
        address: 'Flat 402, Green Valley Enclave, Sector 14',
        city: 'New Delhi',
        state: 'Delhi',
        postalCode: '110001',
        country: 'India',
      },
      paymentMethod: 'UPI / Online Transfer',
      itemsPrice: 208,
      taxPrice: 10,
      shippingPrice: 40,
      totalPrice: 258,
      orderStatus: 'Delivered',
      isPaid: true,
      paidAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      isDelivered: true,
      deliveredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    });

    await sampleOrder1.save();
    await sampleOrder2.save();
    console.log(' Sample demo orders created.');

    console.log('\n Database seeding finished successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error(' Error during seeding:', error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    console.log(' Data destroyed successfully.');
    process.exit(0);
  } catch (error) {
    console.error(' Error destroying data:', error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  seedData();
}

import Service from "../models/Service.js";
import Worker from "../models/Worker.js";

const defaultServices = [
  {
    name: "Electrician",
    slug: "electrician",
    description: "Wiring, switchboard, fan, lighting, and power issue repairs.",
    basePrice: 399,
    icon: "bolt",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Plumbing",
    slug: "plumbing",
    description: "Leakage fixes, pipe repairs, tap installation, and drainage support.",
    basePrice: 349,
    icon: "droplet",
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "AC Repair",
    slug: "ac-repair",
    description: "Cooling, servicing, gas refill assessment, and AC diagnostics.",
    basePrice: 599,
    icon: "snowflake",
    image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Cleaning",
    slug: "cleaning",
    description: "Deep home cleaning, bathroom sanitization, and sofa cleaning.",
    basePrice: 499,
    icon: "sparkles",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Carpentry",
    slug: "carpentry",
    description: "Furniture assembly, door repairs, shelf fitting, and woodwork support.",
    basePrice: 449,
    icon: "hammer",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Painting",
    slug: "painting",
    description: "Wall touch-ups, full-room painting, texture guidance, and finishing work.",
    basePrice: 699,
    icon: "paintbrush",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Appliance Repair",
    slug: "appliance-repair",
    description: "Washing machine, refrigerator, microwave, and kitchen appliance repairs.",
    basePrice: 549,
    icon: "settings",
    image:
      "https://images.unsplash.com/photo-1581092921461-eab10380cc86?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Pest Control",
    slug: "pest-control",
    description: "Targeted pest treatment for insects, termites, and preventive home care.",
    basePrice: 799,
    icon: "shield",
    image:
      "https://images.unsplash.com/photo-1584473457409-ce9df4f5c679?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Gardening",
    slug: "gardening",
    description: "Lawn care, plant trimming, balcony garden setup, and seasonal maintenance.",
    basePrice: 399,
    icon: "leaf",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Home Security",
    slug: "home-security",
    description: "CCTV installation, smart locks, door sensors, and security checks.",
    basePrice: 899,
    icon: "lock",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Vehicle Wash",
    slug: "vehicle-wash",
    description: "Doorstep car and bike wash, interior vacuuming, and polish add-ons.",
    basePrice: 299,
    icon: "car",
    image:
      "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Laundry",
    slug: "laundry",
    description: "Pickup laundry, steam ironing, dry-clean coordination, and fabric care.",
    basePrice: 249,
    icon: "shirt",
    image:
      "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=900&q=80"
  }
];

const defaultWorkers = [
  {
    name: "Ravi Kumar",
    phone: "+91 9876543201",
    experience: 6,
    rating: 4.8,
    serviceSlug: "electrician"
  },
  {
    name: "Arjun Mehta",
    phone: "+91 9876543202",
    experience: 9,
    rating: 4.9,
    serviceSlug: "electrician"
  },
  {
    name: "Mahesh Patel",
    phone: "+91 9876543203",
    experience: 7,
    rating: 4.7,
    serviceSlug: "plumbing"
  },
  {
    name: "Salman Khan",
    phone: "+91 9876543204",
    experience: 5,
    rating: 4.6,
    serviceSlug: "plumbing"
  },
  {
    name: "Deepak Nair",
    phone: "+91 9876543205",
    experience: 8,
    rating: 4.9,
    serviceSlug: "ac-repair"
  },
  {
    name: "Sanjay Verma",
    phone: "+91 9876543206",
    experience: 4,
    rating: 4.5,
    serviceSlug: "ac-repair"
  },
  {
    name: "Priya Das",
    phone: "+91 9876543207",
    experience: 6,
    rating: 4.8,
    serviceSlug: "cleaning"
  },
  {
    name: "Neha Iyer",
    phone: "+91 9876543208",
    experience: 5,
    rating: 4.7,
    serviceSlug: "cleaning"
  },
  {
    name: "Karthik Rao",
    phone: "+91 9876543209",
    experience: 7,
    rating: 4.8,
    serviceSlug: "carpentry"
  },
  {
    name: "Imran Sheikh",
    phone: "+91 9876543210",
    experience: 6,
    rating: 4.6,
    serviceSlug: "carpentry"
  },
  {
    name: "Rakesh Sinha",
    phone: "+91 9876543211",
    experience: 8,
    rating: 4.9,
    serviceSlug: "painting"
  },
  {
    name: "Amit Joseph",
    phone: "+91 9876543212",
    experience: 5,
    rating: 4.5,
    serviceSlug: "painting"
  },
  {
    name: "Vivek Menon",
    phone: "+91 9876543213",
    experience: 9,
    rating: 4.9,
    serviceSlug: "appliance-repair"
  },
  {
    name: "Harish Gupta",
    phone: "+91 9876543214",
    experience: 6,
    rating: 4.7,
    serviceSlug: "appliance-repair"
  },
  {
    name: "Nisha Kapoor",
    phone: "+91 9876543215",
    experience: 7,
    rating: 4.8,
    serviceSlug: "pest-control"
  },
  {
    name: "Farhan Ali",
    phone: "+91 9876543216",
    experience: 5,
    rating: 4.6,
    serviceSlug: "pest-control"
  },
  {
    name: "Anita Bose",
    phone: "+91 9876543217",
    experience: 6,
    rating: 4.8,
    serviceSlug: "gardening"
  },
  {
    name: "Manoj Pillai",
    phone: "+91 9876543218",
    experience: 4,
    rating: 4.5,
    serviceSlug: "gardening"
  },
  {
    name: "Kabir Anand",
    phone: "+91 9876543219",
    experience: 7,
    rating: 4.9,
    serviceSlug: "home-security"
  },
  {
    name: "Suresh Reddy",
    phone: "+91 9876543220",
    experience: 5,
    rating: 4.6,
    serviceSlug: "home-security"
  },
  {
    name: "Pawan Yadav",
    phone: "+91 9876543221",
    experience: 5,
    rating: 4.7,
    serviceSlug: "vehicle-wash"
  },
  {
    name: "Rohit Bansal",
    phone: "+91 9876543222",
    experience: 3,
    rating: 4.4,
    serviceSlug: "vehicle-wash"
  },
  {
    name: "Meera Shah",
    phone: "+91 9876543223",
    experience: 8,
    rating: 4.9,
    serviceSlug: "laundry"
  },
  {
    name: "Tanvi Rao",
    phone: "+91 9876543224",
    experience: 4,
    rating: 4.6,
    serviceSlug: "laundry"
  }
];

export const seedDefaultData = async () => {
  for (const service of defaultServices) {
    await Service.findOneAndUpdate({ slug: service.slug }, service, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    });
  }

  const services = await Service.find({});
  const serviceMap = services.reduce((accumulator, service) => {
    accumulator[service.slug] = service._id;
    return accumulator;
  }, {});

  for (const worker of defaultWorkers) {
    const workerPayload = {
      name: worker.name,
      phone: worker.phone,
      experience: worker.experience,
      rating: worker.rating,
      skills: [serviceMap[worker.serviceSlug]],
      isAvailable: true
    };

    await Worker.findOneAndUpdate({ phone: worker.phone }, workerPayload, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    });
  }
};

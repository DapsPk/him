export interface TourDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
  accommodation: string;
}

export interface Tour {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Difficult';
  image: string;
  location: string;
  highlights: string[];
  rating: number;
  reviewCount: number;
  category: 'safari' | 'trekking' | 'beach' | 'cultural';
  section: 'safari' | 'kilimanjaro' | 'zanzibar';
  itinerary: TourDay[];
  inclusions: string[];
  exclusions: string[];
  
  // NEW FIELDS FOR KILIMANJARO ENHANCEMENTS
  packageType?: 'climbing' | 'day-trip' | 'safari-package' | 'beach-package' | 'cultural-package';  // ✅ FIXED: Added beach and cultural
  
  routeType?: 'machame' | 'marangu' | 'lemosho' | 'rongai' | 'northern-circuit' | 'umbwe';
  activityType?: 'pre-climb' | 'post-climb' | 'general';
  successRate?: number;
  
  // NEW FIELDS FOR SAFARI PACKAGES
  overview?: string;
  accommodations?: string;
  experience?: string;
  groupPrice?: number;
  familyPrice?: number;
  
  // NEW FIELD FOR SAFARI CATEGORIZATION
  subCategory?: 'serengeti' | 'ngorongoro' | 'tarangire' | 'zanzibar' | 'kilimanjaro';  // ✅ FIXED: Added zanzibar and kilimanjaro
  
  // NEW FIELD FOR SAFARI STYLE CATEGORIZATION
  tourStyle?: 'multi-day' | 'short-trip' | 'family' | 'group' | 'luxury' | 'romantic';  // ✅ FIXED: Added luxury and romantic
  
  // NEW FIELDS FOR KILIMANJARO CATEGORIZATION
  kilimanjaroCategory?: 'multi-day-climbs' | 'short-climbs' | 'day-trips' | 'luxury-climbs';
  acclimatizationDays?: number;
  groupSize?: 'private' | 'small-group' | 'large-group';
  fitnessLevel?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  
  // ✅ ADD THESE NEW FIELDS (from your data)
  slug?: string;
  shortDescription?: string;
  durationDays?: number;
  images?: {
    main: string;
    mobile: string;
    thumbnail: string;
    alt: string;
  };
  pricing?: {
    basePrice: number;
    groupPrice?: number;
    familyPrice?: number;
    couplePrice?: number;
    currency: string;
  };
  couplePrice?: number;
}

export interface TourFilters {
  difficulty: string[];
  priceRange: [number, number];
  duration: string[];
  category: string[];
}
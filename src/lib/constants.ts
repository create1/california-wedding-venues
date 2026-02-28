// Tier limits (from PRD). Venues self-manage within these limits.
export const TIER_LIMITS = {
  free: {
    maxPhotos: 8,
    maxVideos: 0,
    maxDescriptionChars: 300,
    maxLeadsPerMonth: 5,
    maxReviewsDisplay: 5,
    hasInbox: false,
    hasAnalyticsDashboard: false,
    hasFeaturedPlacement: false,
    hasBadge: false,
  },
  basic: {
    maxPhotos: 25,
    maxVideos: 2,
    maxDescriptionChars: 600,
    maxLeadsPerMonth: 25,
    maxReviewsDisplay: 15,
    maxCustomSections: 1,
    hasInbox: true,
    hasAnalyticsDashboard: true,
    hasFeaturedPlacement: false,
    hasBadge: true,
  },
  standard: {
    maxPhotos: 50,
    maxVideos: 5,
    maxDescriptionChars: 1200,
    maxLeadsPerMonth: 75,
    maxReviewsDisplay: 50,
    maxCustomSections: 3,
    hasInbox: true,
    hasAnalyticsDashboard: true,
    hasFeaturedPlacement: true,
    featuredPlacementCount: 1,
    hasBadge: true,
  },
  premium: {
    maxPhotos: 999,
    maxVideos: 10,
    maxDescriptionChars: 2500,
    maxLeadsPerMonth: 999,
    maxReviewsDisplay: 999,
    maxCustomSections: 5,
    hasInbox: true,
    hasAnalyticsDashboard: true,
    hasFeaturedPlacement: true,
    featuredPlacementCount: 3,
    hasBadge: true,
  },
} as const;

export type ListingTier = keyof typeof TIER_LIMITS;

export const REGIONS: { id: string; name: string; slug: string }[] = [
  { id: "bay-area", name: "Bay Area", slug: "bay-area" },
  { id: "central-coast", name: "Central Coast", slug: "central-coast" },
  { id: "central-valley", name: "Central Valley", slug: "central-valley" },
  { id: "desert", name: "Desert", slug: "desert" },
  { id: "inland-empire", name: "Inland Empire", slug: "inland-empire" },
  { id: "los-angeles", name: "Los Angeles", slug: "los-angeles" },
  { id: "north-coast", name: "North Coast", slug: "north-coast" },
  { id: "orange-county", name: "Orange County", slug: "orange-county" },
  { id: "san-diego", name: "San Diego", slug: "san-diego" },
  { id: "wine-country", name: "Wine Country", slug: "wine-country" },
];

export const STYLES: { id: string; name: string; slug: string }[] = [
  { id: "vineyard", name: "Vineyard / Winery", slug: "vineyard" },
  { id: "beach", name: "Beach / Coastal", slug: "beach" },
  { id: "barn", name: "Barn / Ranch", slug: "barn" },
  { id: "garden", name: "Garden", slug: "garden" },
  { id: "estate", name: "Estate / Mansion", slug: "estate" },
  { id: "hotel", name: "Hotel / Resort", slug: "hotel" },
  { id: "rustic", name: "Rustic", slug: "rustic" },
  { id: "modern", name: "Modern / Industrial", slug: "modern" },
  { id: "lodge", name: "Lodge / Mountain", slug: "lodge" },
  { id: "historic", name: "Historic", slug: "historic" },
  { id: "rooftop", name: "Rooftop", slug: "rooftop" },
  { id: "other", name: "Other", slug: "other" },
];

export const AMENITIES: { id: string; name: string; slug: string }[] = [
  { id: "outdoor-ceremony", name: "Outdoor ceremony space", slug: "outdoor-ceremony" },
  { id: "indoor-reception", name: "Indoor reception", slug: "indoor-reception" },
  { id: "catering", name: "In-house catering", slug: "catering" },
  { id: "lodging", name: "On-site lodging", slug: "lodging" },
  { id: "parking", name: "Parking", slug: "parking" },
  { id: "bridal-suite", name: "Bridal suite", slug: "bridal-suite" },
  { id: "rain-backup", name: "Rain backup", slug: "rain-backup" },
  { id: "av", name: "AV / sound", slug: "av" },
  { id: "tables-chairs", name: "Tables & chairs", slug: "tables-chairs" },
];

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  surface: number;
  propertyType: 'house' | 'apartment' | 'land' | 'commercial';
  images: string[];
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilter {
  propertyType?: string[];
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
  minSurface?: number;
  maxSurface?: number;
  location?: string;
}

export interface ExploreContextType {
  properties: Property[];
  filteredProperties: Property[];
  filters: PropertyFilter;
  loading: boolean;
  error: string | null;
  setFilters: (filters: PropertyFilter) => void;
  clearFilters: () => void;
} 
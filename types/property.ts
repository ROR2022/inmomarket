export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  location: string;
  type: string; // 'casa', 'departamento', 'terreno', 'oficina', 'local'
  status: string; // 'active', 'sold', 'rented', 'pending'
  author_id: string;
  created_at: string;
  updated_at: string;
  
  // Campos de ubicación
  address?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  latitude?: string;
  longitude?: string;
  
  // Características
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  features?: string[]; // Array de características 
  operation?: string; // 'venta', 'alquiler', etc.
  
  // Relaciones
  author?: ProfileMinimal;
  property_media?: PropertyMedia[];
  property_details?: PropertyDetails;
  
  // Campo adicional para la URL de la imagen principal (procesada)
  mainImageUrl?: string | null;
}

export interface ProfileMinimal {
  id: string;
  username?: string;
  avatar_url?: string;
}

export interface PropertyMedia {
  id: string;
  property_id: string;
  type: string; // 'image', 'video', 'document'
  url: string;
  order: number;
  created_at?: string;
  fullUrl?: string; // URL completa incluyendo el path de Supabase Storage
}

export interface PropertyDetails {
  id: string;
  property_id: string;
  details: Record<string, any>; // JSONB en la base de datos
  created_at?: string;
  updated_at?: string;
}

export interface PropertyFilters {
  search?: string;
  type?: string;
  operation?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  bedrooms?: number;
  bathrooms?: number;
  features?: string[];
  sort?: 'price_asc' | 'price_desc' | 'date_desc' | 'date_asc';
}

export interface SearchParams {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number; 
  maxArea?: number;
  operation?: string;
  type?: string;
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  features?: string[];
  page?: number;
  pageSize?: number;
  sort?: 'date_asc' | 'date_desc' | 'price_asc' | 'price_desc';
  status?: 'active' | 'pending' | 'inactive' | 'deleted';
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
}

export interface PropertySearchResult {
  properties: Property[];
  pagination: PaginationInfo;
} 
"use server";

import { createClient } from "@/utils/supabase/server";
import type { PropertySearchResult, SearchParams, Property, PropertyMedia } from "@/types/property";

/**
 * Obtiene propiedades con filtros, paginación y ordenamiento
 */
export async function getProperties(params: SearchParams = {}): Promise<PropertySearchResult> {
  const supabase = await createClient();
  
  const {
    search = '',
    type,
    operation,
    minPrice = 0,
    maxPrice = 999999999,
    minArea = 0,
    maxArea = 999999,
    features = [],
    bedrooms,
    bathrooms,
    page = 1,
    pageSize = 12,
    sort = 'date_desc'
  } = params;
  
  // Calcular rango para paginación
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  
  // Construir consulta base
  let query = supabase
    .from('properties')
    .select(`
      *,
      author:profiles(id, username, avatar_url),
      property_media(id, type, url, order)
    `, { count: 'exact' })
    .eq('status', 'active')
    .gte('price', minPrice)
    .lte('price', maxPrice);
  
  // Si hay un término de búsqueda, aplicar filtro OR para título, descripción y ubicación
  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,location.ilike.%${search}%,address.ilike.%${search}%`);
  }
  
  // Filtros adicionales
  if (type) {
    query = query.eq('type', type);
  }
  
  if (operation) {
    query = query.eq('operation', operation);
  }
  
  if (minArea) {
    query = query.gte('area', minArea);
  }
  
  if (maxArea) {
    query = query.lte('area', maxArea);
  }
  
  if (bedrooms !== undefined) {
    query = query.eq('bedrooms', bedrooms);
  }
  
  if (bathrooms !== undefined) {
    query = query.eq('bathrooms', bathrooms);
  }
  
  // Filtro por características (features)
  if (features.length > 0) {
    features.forEach(feature => {
      query = query.contains('features', [feature]);
    });
  }
  
  // Ordenamiento
  switch (sort) {
    case 'price_asc':
      query = query.order('price', { ascending: true });
      break;
    case 'price_desc':
      query = query.order('price', { ascending: false });
      break;
    case 'date_asc':
      query = query.order('created_at', { ascending: true });
      break;
    case 'date_desc':
    default:
      query = query.order('created_at', { ascending: false });
      break;
  }
  
  // Aplicar paginación
  query = query.range(from, to);
  
  // Ejecutar consulta
  const { data, error, count } = await query;
  
  if (error) {
    console.error("Error fetching properties:", error);
    throw new Error(`Error al obtener propiedades: ${error.message}`);
  }
  
  // Procesar las propiedades para añadir información adicional
  const processedProperties = data.map(property => {
    // Encontrar la imagen principal (la de orden más bajo, generalmente 0)
    const mainImage = property.property_media
      ?.filter((media: PropertyMedia) => media.type === 'image')
      ?.sort((a: PropertyMedia, b: PropertyMedia) => a.order - b.order)[0];
    
    // Crear URL completa de la imagen si existe
    const imageUrl = mainImage?.url 
      ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/property-media/${mainImage.url}`
      : null;
    
    return {
      ...property,
      mainImageUrl: imageUrl
    };
  });
  
  // Calcular información de paginación
  const totalItems = count || 0;
  const totalPages = Math.ceil(totalItems / pageSize);
  
  return {
    properties: processedProperties,
    pagination: {
      currentPage: page,
      totalPages,
      pageSize,
      totalItems
    }
  };
}

/**
 * Obtiene una sola propiedad por su ID
 */
export async function getPropertyById(id: string): Promise<Property | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('properties')
    .select(`
      *,
      author:profiles(id, username, avatar_url),
      property_media(id, type, url, order),
      property_details(details)
    `)
    .eq('id', id)
    .single();
  
  if (error) {
    console.error("Error fetching property:", error);
    return null;
  }
  
  // Procesar las URLs de las imágenes
  const processedMedia = data.property_media.map((media: PropertyMedia) => ({
    ...media,
    fullUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/property-media/${media.url}`
  }));
  
  return {
    ...data,
    property_media: processedMedia
  };
}

/**
 * Obtiene propiedades destacadas o recientes
 */
export async function getFeaturedProperties(limit: number = 6): Promise<Property[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('properties')
    .select(`
      id, title, price, currency, location, type, operation,
      bedrooms, bathrooms, area,
      property_media(id, type, url, order)
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error("Error fetching featured properties:", error);
    return [];
  }
  
  // Procesar las propiedades
  const processedProperties = data.map(property => {
    const mainImage = property.property_media
      ?.filter(media => media.type === 'image')
      ?.sort((a, b) => a.order - b.order)[0];
    
    const imageUrl = mainImage?.url 
      ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/property-media/${mainImage.url}`
      : null;
    
    return {
      ...property,
      mainImageUrl: imageUrl
    };
  });
  
  return processedProperties as Property[];
}

/**
 * Obtiene las propiedades de un usuario específico (para dashboard)
 */
export async function getUserProperties(userId: string, params: SearchParams = {}): Promise<PropertySearchResult> {
  const supabase = await createClient();
  
  const {
    status,
    page = 1,
    pageSize = 10,
    sort = 'date_desc'
  } = params;
  
  // Calcular rango para paginación
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  
  // Construir consulta base
  let query = supabase
    .from('properties')
    .select(`
      *,
      property_media(id, type, url, order)
    `, { count: 'exact' })
    .eq('author_id', userId);
  
  // Filtrar por estado si se especifica
  if (status) {
    query = query.eq('status', status);
  }
  
  // Ordenamiento
  switch (sort) {
    case 'price_asc':
      query = query.order('price', { ascending: true });
      break;
    case 'price_desc':
      query = query.order('price', { ascending: false });
      break;
    case 'date_asc':
      query = query.order('created_at', { ascending: true });
      break;
    case 'date_desc':
    default:
      query = query.order('created_at', { ascending: false });
      break;
  }
  
  // Aplicar paginación
  query = query.range(from, to);
  
  // Ejecutar consulta
  const { data, error, count } = await query;
  
  if (error) {
    console.error("Error fetching user properties:", error);
    throw new Error(`Error al obtener propiedades del usuario: ${error.message}`);
  }
  
  // Procesar las propiedades
  const processedProperties = data.map(property => {
    const mainImage = property.property_media
      ?.filter((media: PropertyMedia) => media.type === 'image')
      ?.sort((a: PropertyMedia, b: PropertyMedia) => a.order - b.order)[0];
    
    const imageUrl = mainImage?.url 
      ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/property-media/${mainImage.url}`
      : null;
    
    return {
      ...property,
      mainImageUrl: imageUrl
    };
  });
  
  // Calcular información de paginación
  const totalItems = count || 0;
  const totalPages = Math.ceil(totalItems / pageSize);
  
  return {
    properties: processedProperties,
    pagination: {
      currentPage: page,
      totalPages,
      pageSize,
      totalItems
    }
  };
}

/**
 * Obtiene estadísticas del usuario para el dashboard
 */
export async function getUserStats(userId: string): Promise<{
  totalProperties: number,
  activeProperties: number,
  byOperation: Record<string, number>,
  byType: Record<string, number>
}> {
  const supabase = await createClient();
  
  // Obtener el total de propiedades y el número de propiedades activas
  const { count: totalProperties, error: totalError } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })
    .eq('author_id', userId);
    
  const { count: activeProperties, error: activeError } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })
    .eq('author_id', userId)
    .eq('status', 'active');
  
  if (totalError || activeError) {
    console.error("Error fetching property stats:", totalError || activeError);
    throw new Error(`Error al obtener estadísticas: ${(totalError || activeError)?.message}`);
  }
  
  // Obtener propiedades agrupadas por operación y tipo
  const { data, error: propsError } = await supabase
    .from('properties')
    .select('operation, type')
    .eq('author_id', userId);
  
  if (propsError) {
    console.error("Error fetching property types and operations:", propsError);
    throw new Error(`Error al obtener tipos y operaciones: ${propsError.message}`);
  }
  
  // Contar por operación
  const byOperation: Record<string, number> = {};
  // Contar por tipo
  const byType: Record<string, number> = {};
  
  // Inicializar contadores
  propsError ? [] : data.forEach(prop => {
    // Contar por operación
    if (prop.operation) {
      byOperation[prop.operation] = (byOperation[prop.operation] || 0) + 1;
    }
    
    // Contar por tipo
    if (prop.type) {
      byType[prop.type] = (byType[prop.type] || 0) + 1;
    }
  });
  
  return {
    totalProperties: totalProperties || 0,
    activeProperties: activeProperties || 0,
    byOperation,
    byType
  };
}

/**
 * Elimina una propiedad
 */
export async function deleteProperty(id: string, userId: string): Promise<{ success: boolean, message: string }> {
  const supabase = await createClient();
  
  // Verificar que la propiedad pertenezca al usuario
  const { data: property, error: fetchError } = await supabase
    .from('properties')
    .select('id, author_id')
    .eq('id', id)
    .single();
  
  if (fetchError) {
    console.error("Error fetching property for deletion:", fetchError);
    return { success: false, message: "No se pudo encontrar la propiedad" };
  }
  
  if (property.author_id !== userId) {
    return { success: false, message: "No tienes permiso para eliminar esta propiedad" };
  }
  
  // Eliminar la propiedad
  const { error: deleteError } = await supabase
    .from('properties')
    .delete()
    .eq('id', id);
  
  if (deleteError) {
    console.error("Error deleting property:", deleteError);
    return { success: false, message: `Error al eliminar la propiedad: ${deleteError.message}` };
  }
  
  return { success: true, message: "Propiedad eliminada correctamente" };
} 
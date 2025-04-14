"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Upload } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import Image from "next/image"

interface CreatePropertyFormProps {
  userId: string
}

export function CreatePropertyForm({ userId }: CreatePropertyFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("informacion")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    currency: "MXN",
    type: "",
    operation: "",
    location: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    latitude: "",
    longitude: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    features: [] as string[],
    status: "pending", // Las propiedades inicialmente están pendientes de aprobación
  })
  
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null)
  const [uploadedDocs, setUploadedDocs] = useState<File[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    if (checked) {
      setSelectedFeatures([...selectedFeatures, value])
    } else {
      setSelectedFeatures(selectedFeatures.filter(feature => feature !== value))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files)
      setUploadedImages([...uploadedImages, ...filesArray])
    }
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedVideo(e.target.files[0])
    }
  }

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files)
      setUploadedDocs([...uploadedDocs, ...filesArray])
    }
  }

  const uploadFiles = async (propertyId: string) => {
    const supabase = createClient()
    const promises = []

    try {
      // Upload images
      for (let i = 0; i < uploadedImages.length; i++) {
        const file = uploadedImages[i]
        const fileExt = file.name.split('.').pop()
        const fileName = `${propertyId}_${i}.${fileExt}`
        const filePath = `properties/${propertyId}/images/${fileName}`
        
        promises.push(
          supabase.storage
            .from('property-media')
            .upload(filePath, file)
            .then(async ({ data, error }) => {
              if (error) throw error
              
              // Add image record to database
              const { data: mediaData, error: mediaError } = await supabase
                .from('property_media')
                .insert({
                  property_id: propertyId,
                  type: 'image',
                  url: filePath,
                  "order": i
                })
                
              if (mediaError) throw mediaError
              return mediaData
            })
        )
      }
      
      // Upload video if exists
      if (uploadedVideo) {
        const fileExt = uploadedVideo.name.split('.').pop()
        const fileName = `${propertyId}_video.${fileExt}`
        const filePath = `properties/${propertyId}/videos/${fileName}`
        
        promises.push(
          supabase.storage
            .from('property-media')
            .upload(filePath, uploadedVideo)
            .then(async ({ data, error }) => {
              if (error) throw error
              
              // Add video record to database
              const { data: mediaData, error: mediaError } = await supabase
                .from('property_media')
                .insert({
                  property_id: propertyId,
                  type: 'video',
                  url: filePath,
                  "order": 0
                })
                
              if (mediaError) throw mediaError
              return mediaData
            })
        )
      }
      
      // Upload documents
      for (let i = 0; i < uploadedDocs.length; i++) {
        const file = uploadedDocs[i]
        const fileExt = file.name.split('.').pop()
        const fileName = `${propertyId}_doc_${i}.${fileExt}`
        const filePath = `properties/${propertyId}/documents/${fileName}`
        
        promises.push(
          supabase.storage
            .from('property-media')
            .upload(filePath, file)
            .then(async ({ data, error }) => {
              if (error) throw error
              
              // Add document record to database
              const { data: mediaData, error: mediaError } = await supabase
                .from('property_media')
                .insert({
                  property_id: propertyId,
                  type: 'document',
                  url: filePath,
                  "order": i
                })
                
              if (mediaError) throw mediaError
              return mediaData
            })
        )
      }
      
      await Promise.all(promises)
    } catch (error) {
      console.error("Error uploading files:", error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()
      
      // Verificar que el usuario esté autenticado
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error('Usuario no autenticado')
      }
      
      // Asegurarnos que el ID del usuario coincida con el proporcionado
      if (user.id !== userId) {
        console.warn('ID de usuario no coincide:', {
          authUserId: user.id,
          providedUserId: userId
        })
      }
      
      // Add selected features to form data and include only fields that match the database schema
      const dataToSubmit = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        currency: formData.currency,
        type: formData.type,
        location: formData.location,
        status: 'pending',
        author_id: user.id, // Usar el ID del usuario autenticado actual
        // Estos campos fueron agregados a la base de datos con la migración
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipcode: formData.zipcode,
        latitude: formData.latitude,
        longitude: formData.longitude,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        area: formData.area,
        features: selectedFeatures,
        operation: formData.operation,
      }
      
      // Convert numeric strings to numbers
      const numericFields = ['price', 'bedrooms', 'bathrooms', 'area']
      numericFields.forEach(field => {
        if (dataToSubmit[field as keyof typeof dataToSubmit]) {
          const value = dataToSubmit[field as keyof typeof dataToSubmit];
          if (typeof value === 'string') {
            // Solo redondear a enteros para bedrooms
            if (field === 'bedrooms') {
              (dataToSubmit as any)[field] = Math.round(Number(value));
            } else {
              // Para price, bathrooms y area pueden ser decimales
              (dataToSubmit as any)[field] = Number(value);
            }
          }
        }
      })
      
      // Create property record
      const { data: property, error } = await supabase
        .from('properties')
        .insert(dataToSubmit)
        .select()
        .single()
      
      if (error) throw error
      
      // Upload media files if there are any
      if (uploadedImages.length > 0 || uploadedVideo || uploadedDocs.length > 0) {
        await uploadFiles(property.id)
      }

      toast({
        title: "Propiedad creada con éxito",
        description: "Tu propiedad ha sido enviada y está pendiente de aprobación",
      })

      // Redirect to dashboard
      router.push('/dashboard')
      router.refresh()
    } catch (error) {
      console.error("Error creating property:", error)
      toast({
        title: "Error al publicar",
        description: "Ocurrió un error al publicar tu propiedad. Intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const nextTab = () => {
    if (activeTab === "informacion") setActiveTab("detalles")
    else if (activeTab === "detalles") setActiveTab("multimedia")
    else if (activeTab === "multimedia") setActiveTab("ubicacion")
  }

  const prevTab = () => {
    if (activeTab === "ubicacion") setActiveTab("multimedia")
    else if (activeTab === "multimedia") setActiveTab("detalles")
    else if (activeTab === "detalles") setActiveTab("informacion")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Publicar una nueva propiedad</CardTitle>
          <CardDescription>Completa la información de tu propiedad para publicarla en InmoMarket</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="informacion">Información básica</TabsTrigger>
              <TabsTrigger value="detalles">Detalles</TabsTrigger>
              <TabsTrigger value="multimedia">Multimedia</TabsTrigger>
              <TabsTrigger value="ubicacion">Ubicación</TabsTrigger>
            </TabsList>

            <TabsContent value="informacion" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Ej. Casa moderna con jardín en Colonia Roma"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe tu propiedad con detalle..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Precio *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Ej. 2500000"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Moneda *</Label>
                  <Select value={formData.currency} onValueChange={(value) => handleSelectChange("currency", value)}>
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Selecciona una moneda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MXN">Peso Mexicano (MXN)</SelectItem>
                      <SelectItem value="USD">Dólar Estadounidense (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de propiedad *</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value) => handleSelectChange("type", value)}
                    required
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casa">Casa</SelectItem>
                      <SelectItem value="departamento">Departamento</SelectItem>
                      <SelectItem value="terreno">Terreno</SelectItem>
                      <SelectItem value="oficina">Oficina</SelectItem>
                      <SelectItem value="local">Local comercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="operation">Operación *</Label>
                  <Select 
                    value={formData.operation} 
                    onValueChange={(value) => handleSelectChange("operation", value)}
                    required
                  >
                    <SelectTrigger id="operation">
                      <SelectValue placeholder="Selecciona una operación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="venta">Venta</SelectItem>
                      <SelectItem value="alquiler">Alquiler</SelectItem>
                      <SelectItem value="temporal">Alquiler temporal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button type="button" onClick={nextTab}>
                  Siguiente
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="detalles" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Habitaciones</Label>
                  <Input
                    id="bedrooms"
                    name="bedrooms"
                    type="number"
                    placeholder="Ej. 3"
                    value={formData.bedrooms}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Baños</Label>
                  <Input
                    id="bathrooms"
                    name="bathrooms"
                    type="number"
                    step="0.5"
                    placeholder="Ej. 2.5"
                    value={formData.bathrooms}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">Superficie (m²)</Label>
                  <Input
                    id="area"
                    name="area"
                    type="number"
                    placeholder="Ej. 150"
                    value={formData.area}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <Label>Características</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    "Piscina",
                    "Jardín",
                    "Garaje",
                    "Seguridad 24h",
                    "Amueblado",
                    "Aire acondicionado",
                    "Calefacción",
                    "Terraza",
                    "Ascensor",
                    "Vista panorámica",
                    "Gimnasio",
                    "Zona BBQ",
                  ].map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id={`feature-${feature}`} 
                        value={feature}
                        checked={selectedFeatures.includes(feature)}
                        onChange={handleFeatureChange}
                        className="rounded border-gray-300" 
                      />
                      <Label htmlFor={`feature-${feature}`}>{feature}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <Button type="button" variant="outline" onClick={prevTab}>
                  Anterior
                </Button>
                <Button type="button" onClick={nextTab}>
                  Siguiente
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="multimedia" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label>Fotos de la propiedad</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">
                      Arrastra y suelta tus fotos aquí, o haz clic para seleccionarlas
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Formatos aceptados: JPG, PNG, WEBP. Máximo 10 MB por imagen.
                    </p>
                    <input 
                      type="file" 
                      id="property-images" 
                      accept="image/jpeg,image/png,image/webp"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => document.getElementById('property-images')?.click()}
                    >
                      Seleccionar archivos
                    </Button>
                  </div>
                  {uploadedImages.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="relative">
                          <Image 
                            src={URL.createObjectURL(image)} 
                            alt={`Preview ${index}`} 
                            className="w-full h-24 object-cover rounded"
                            width={100}
                            height={100}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Video de la propiedad (opcional)</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Sube un video de recorrido por tu propiedad</p>
                    <p className="text-xs text-muted-foreground">Formatos aceptados: MP4, MOV. Máximo 100 MB.</p>
                    <input 
                      type="file" 
                      id="property-video" 
                      accept="video/mp4,video/quicktime"
                      className="hidden"
                      onChange={handleVideoUpload}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => document.getElementById('property-video')?.click()}
                    >
                      Seleccionar video
                    </Button>
                  </div>
                  {uploadedVideo && (
                    <div className="mt-4">
                      <p className="text-sm">Video seleccionado: {uploadedVideo.name}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Documentos (opcional)</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">
                      Sube documentos relevantes como planos, escrituras, etc.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Formatos aceptados: PDF, DOC, DOCX. Máximo 10 MB por archivo.
                    </p>
                    <input 
                      type="file" 
                      id="property-docs" 
                      accept=".pdf,.doc,.docx"
                      multiple
                      className="hidden"
                      onChange={handleDocUpload}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => document.getElementById('property-docs')?.click()}
                    >
                      Seleccionar documentos
                    </Button>
                  </div>
                  {uploadedDocs.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm">Documentos seleccionados:</p>
                      <ul className="list-disc pl-4 text-left">
                        {uploadedDocs.map((doc, index) => (
                          <li key={index} className="text-sm">{doc.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <Button type="button" variant="outline" onClick={prevTab}>
                  Anterior
                </Button>
                <Button type="button" onClick={nextTab}>
                  Siguiente
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="ubicacion" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="location">Ubicación *</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Ej. Colonia Roma, Ciudad de México"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Ej. Calle Orizaba 123"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad *</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="Ej. Ciudad de México"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">Estado *</Label>
                  <Input
                    id="state"
                    name="state"
                    placeholder="Ej. CDMX"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipcode">Código Postal</Label>
                  <Input
                    id="zipcode"
                    name="zipcode"
                    placeholder="Ej. 06700"
                    value={formData.zipcode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitud (opcional)</Label>
                  <Input
                    id="latitude"
                    name="latitude"
                    placeholder="Ej. 19.4195"
                    value={formData.latitude}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitud (opcional)</Label>
                  <Input
                    id="longitude"
                    name="longitude"
                    placeholder="Ej. -99.1589"
                    value={formData.longitude}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mt-4 border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                <p className="text-sm text-muted-foreground">
                  Puedes obtener las coordenadas exactas (latitud y longitud) de la propiedad en Google Maps.
                  Simplemente haz clic derecho en la ubicación y selecciona &ldquo;¿Qué hay aquí?&rdquo;
                </p>
              </div>

              <div className="flex justify-between mt-4">
                <Button type="button" variant="outline" onClick={prevTab}>
                  Anterior
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Publicando..." : "Publicar propiedad"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </form>
  )
} 
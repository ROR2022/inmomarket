"use client"

import type React from "react"

import { useState } from "react"
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

export function PropertyForm() {
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
    bedrooms: "",
    bathrooms: "",
    area: "",
    features: [],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Here you would implement the property creation logic with Supabase
      console.log("Create property with:", formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Propiedad publicada",
        description: "Tu propiedad ha sido publicada exitosamente",
      })

      // Redirect to dashboard
      window.location.href = "/dashboard"
    } catch (error) {
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
                  <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
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
                  <Select value={formData.operation} onValueChange={(value) => handleSelectChange("operation", value)}>
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
                    placeholder="Ej. 2"
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
                  ].map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <input type="checkbox" id={`feature-${feature}`} className="rounded border-gray-300" />
                      <Label htmlFor={`feature-${feature}`}>{feature}</Label>
                    </div>
                  ))}
                </div>
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
                    <Button type="button" variant="outline" className="mt-4">
                      Seleccionar archivos
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Video de la propiedad (opcional)</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Sube un video de recorrido por tu propiedad</p>
                    <p className="text-xs text-muted-foreground">Formatos aceptados: MP4, MOV. Máximo 100 MB.</p>
                    <Button type="button" variant="outline" className="mt-4">
                      Seleccionar video
                    </Button>
                  </div>
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
                    <Button type="button" variant="outline" className="mt-4">
                      Seleccionar documentos
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ubicacion" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="location">Dirección *</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Ej. Calle Durango 145, Colonia Roma, Ciudad de México"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad *</Label>
                  <Input id="city" name="city" placeholder="Ej. Ciudad de México" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">Estado *</Label>
                  <Input id="state" name="state" placeholder="Ej. CDMX" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">Código postal *</Label>
                  <Input id="zipCode" name="zipCode" placeholder="Ej. 06700" />
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <Label>Ubicación en el mapa</Label>
                <div className="border rounded-lg p-2">
                  <div className="aspect-[16/9] bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Mapa para seleccionar ubicación</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Haz clic en el mapa para marcar la ubicación exacta de tu propiedad
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-8">
            <Button type="button" variant="outline" onClick={prevTab} disabled={activeTab === "informacion"}>
              Anterior
            </Button>

            {activeTab !== "ubicacion" ? (
              <Button type="button" onClick={nextTab}>
                Siguiente
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Publicando..." : "Publicar propiedad"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  )
}

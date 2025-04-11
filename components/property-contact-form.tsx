"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function PropertyContactForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "Me interesa esta propiedad y quisiera recibir más información.",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would implement the contact logic
    console.log(formData)

    toast({
      title: "Mensaje enviado",
      description: "El propietario se pondrá en contacto contigo pronto.",
    })

    // Reset form (except message)
    setFormData((prev) => ({
      ...prev,
      name: "",
      email: "",
      phone: "",
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="font-bold text-lg mb-2">Contactar al vendedor</h3>
        <p className="text-sm text-muted-foreground">
          Completa el formulario y el vendedor se pondrá en contacto contigo.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Nombre completo</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Teléfono</Label>
        <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Mensaje</Label>
        <Textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} required />
      </div>

      <Button type="submit" className="w-full">
        Enviar mensaje
      </Button>
    </form>
  )
}

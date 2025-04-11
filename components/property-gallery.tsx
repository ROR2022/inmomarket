"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PropertyGallery() {
  const [currentImage, setCurrentImage] = useState(0)

  // This would be replaced with actual images
  const images = [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ]

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  return (
    <div className="space-y-2">
      <div className="relative rounded-lg overflow-hidden">
        <div className="aspect-[16/9]">
          <Image
            src={images[currentImage] || "/placeholder.svg"}
            alt={`Imagen ${currentImage + 1} de la propiedad`}
            fill
            className="object-cover"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
          onClick={prevImage}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
          onClick={nextImage}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-sm">
          {currentImage + 1} / {images.length}
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`flex-shrink-0 rounded-md overflow-hidden border-2 ${
              index === currentImage ? "border-primary" : "border-transparent"
            }`}
            onClick={() => setCurrentImage(index)}
          >
            <div className="w-20 h-20 relative">
              <Image src={image || "/placeholder.svg"} alt={`Miniatura ${index + 1}`} fill className="object-cover" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

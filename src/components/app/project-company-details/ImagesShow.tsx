'use client'

import { useState, useCallback } from 'react'
import Cookies from 'js-cookie'
import { Button } from '@/components/ui/button'
import { IProjectData } from '@/types/types'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X, Maximize2 } from 'lucide-react'
import Image from 'next/image'

export default function ImagesShow({ projectData }: { projectData: IProjectData }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [scale, setScale] = useState(1)
  const lang = Cookies.get("NEXT_LOCALE")
  const allImages = [projectData.image, ...projectData.images]

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length)
  }, [allImages.length])

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length)
  }, [allImages.length])

  const openPopup = () => {
    setIsPopupOpen(true)
    setScale(1)
  }

  const closePopup = () => {
    setIsPopupOpen(false)
    setScale(1)
  }

  const zoomIn = () => setScale(prevScale => Math.min(prevScale * 1.2, 3))
  const zoomOut = () => setScale(prevScale => Math.max(prevScale / 1.2, 0.5))

  return (
    <>
      <div className="relative w-full h-[400px]">
        <div
          style={{
            backgroundImage: `url(${allImages[currentImageIndex]})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          className="rounded-lg shadow-lg w-full h-full"
        />
        {allImages.length > 1 && (
          <div className={`absolute inset-0 flex items-center justify-between ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
            <Button
              variant="ghost"
              size="icon"
              onClick={prevImage}
              className="text-white bg-black bg-opacity-50 hover:bg-opacity-75"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextImage}
              className="text-white bg-black bg-opacity-50 hover:bg-opacity-75"
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next image</span>
            </Button>
          </div>
        )}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
          {currentImageIndex + 1} / {allImages.length}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={openPopup}
          className="absolute top-2 right-2 text-white bg-black bg-opacity-50 hover:bg-opacity-75"
        >
          <Maximize2 className="h-6 w-6" />
          <span className="sr-only">View full size</span>
        </Button>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src={allImages[currentImageIndex]}
              height={1000}
              width={1000}
              alt={`${projectData.title} - Image ${currentImageIndex + 1}`}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-full max-h-full object-contain"
              style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={zoomIn}
                className="text-white bg-black bg-opacity-50 hover:bg-opacity-75"
              >
                <ZoomIn className="h-6 w-6" />
                <span className="sr-only">Zoom in</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={zoomOut}
                className="text-white bg-black bg-opacity-50 hover:bg-opacity-75"
              >
                <ZoomOut className="h-6 w-6" />
                <span className="sr-only">Zoom out</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={closePopup}
                className="text-white bg-black bg-opacity-50 hover:bg-opacity-75"
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            {allImages.length > 1 && (
              <div className={`absolute inset-x-0 bottom-4 flex items-center justify-center space-x-4 ${lang === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevImage}
                  className="text-white bg-black bg-opacity-50 hover:bg-opacity-75"
                >
                  <ChevronLeft className="h-6 w-6" />
                  <span className="sr-only">Previous image</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextImage}
                  className="text-white bg-black bg-opacity-50 hover:bg-opacity-75"
                >
                  <ChevronRight className="h-6 w-6" />
                  <span className="sr-only">Next image</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
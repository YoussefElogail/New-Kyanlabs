'use client'

import { useState } from 'react'
import { Play } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

const slides = [
    {
        id: 1,
        image: "https://placehold.co/600x400?text=4",
        alt: "Modern building facade"
    },
    {
        id: 2,
        image: "https://placehold.co/600x400?text=4",
        alt: "Interior design"
    },
    {
        id: 3,
        image: "https://placehold.co/600x400?text=4",
        alt: "Architecture concept"
    },
    {
        id: 4,
        image: "https://placehold.co/600x400?text=4",
        alt: "Building exterior"
    }
]

export default function FeaturedSection() {
    const [currentSlide, setCurrentSlide] = useState(0)

    return (
        <section className="relative w-full overflow-hidden bg-white py-12">
            {/* Background Triangle */}
            <div className="absolute right-0 top-0 h-full w-1/2 bg-[#f8fbff] clip-triangle" />

            <div className="container relative z-10">
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                    {/* Image Slider */}
                    <div className="relative aspect-video overflow-hidden rounded-lg bg-slate-800 shadow-lg">
                        <div className="absolute inset-0">
                            <img
                                alt={slides[currentSlide].alt}
                                className="h-full w-full object-cover transition-opacity duration-500"
                                src={slides[currentSlide].image}
                            />
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <span className="rounded-full bg-white/30 p-4 backdrop-blur-sm transition-colors hover:bg-white/40">
                    <Play className="h-8 w-8 text-white" />
                  </span>
                                </button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[800px] p-8">
                                <div className="relative aspect-video">
                                    <iframe
                                        src="https://www.youtube-nocookie.com/embed/53VIWj8ksyI"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="absolute inset-0 h-full w-full rounded-md"
                                    />
                                </div>
                            </DialogContent>
                        </Dialog>
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                            {slides.map((slide, index) => (
                                <button
                                    key={slide.id}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-2 transition-all ${
                                        index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
                                    } rounded-full`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4 lg:pt-12">
                        <div className="inline-block border-l-4 border-teal-500 pl-4">
                            <h2 className="text-3xl font-bold tracking-tight">Featured</h2>
                        </div>
                        <p className="text-xl text-gray-600">
                            Extending and improving your home can bring enormous benefits to your life style.
                        </p>
                        <div className="space-y-4 text-gray-600">
                            <p>
                                If you are contemplating the construction or renovation of a building, an architect is the professional who is
                                equipped through training and experience to guide you through the entire process.
                            </p>
                            <p>
                                The need to retain an architect is not only a matter of good business, but may also be a legal requirement.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .clip-triangle {
                    clip-path: polygon(100% 0, 0 0, 100% 100%);
                }
            `}</style>
        </section>
    )
}
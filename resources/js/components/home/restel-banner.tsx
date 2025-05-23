import { SearchReservation } from "@/components/restel-search-reservation";
import { useState, useEffect } from "react";

// Carousel images with actual hotel photos
const carouselImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=600&q=80",
    title: "Selamat Datang di ResTel",
    subtitle: "Temukan pengalaman menginap terbaik dengan harga spesial khusus untuk Anda!"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=600&q=80",
    title: "Promo Liburan",
    subtitle: "Dapatkan diskon hingga 30% untuk pemesanan di akhir pekan!"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=600&q=80",
    title: "Kamar Premium",
    subtitle: "Nikmati kenyamanan kamar premium kami dengan fasilitas lengkap"
  }
];

export function RestelBanner() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-rotate carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
        }, 5000);
        
        return () => clearInterval(interval);
    }, []);

    // Manual navigation
    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const goToPrevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    };

    const goToNextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    };

    return (
      <div className="mt-5 mb-24">
        <div className="relative w-4/5 mx-auto">
          {/* Carousel */}
          <div className="rounded-xl shadow-lg h-72 overflow-hidden relative">
            {carouselImages.map((image, index) => (
              <div 
                key={image.id}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img 
                  src={image.url} 
                  alt={`Slide ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/70 to-blue-600/50 flex flex-col justify-center items-center text-white text-center p-10">
                  <h1 className="text-4xl font-bold mb-4 drop-shadow-md">{image.title}</h1>
                  <p className="text-xl max-w-2xl drop-shadow-md">{image.subtitle}</p>
                </div>
              </div>
            ))}

            {/* Navigation arrows */}
            <button 
              onClick={goToPrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-blue-600 p-2 rounded-full shadow-md z-10 transition-transform hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={goToNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-blue-600 p-2 rounded-full shadow-md z-10 transition-transform hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots navigation - positioned higher to make room for search box */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Repositioned search box */}
          <div className="mx-auto max-w-4xl -mt-6 relative z-20">
        <SearchReservation />
      </div>       
        </div>
      </div>
    );
}

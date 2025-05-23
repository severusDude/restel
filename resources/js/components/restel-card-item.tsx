import { CardItemProps } from "@/types";
import { Link } from "@inertiajs/react";

export interface ExtendedCardItemProps extends CardItemProps {
  rating?: number;
  image?: string;
}

export function CardItem({ hotelName, location, price, rating = 4.8, image }: ExtendedCardItemProps) {
  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative">
          <img 
            src={image || "https://source.unsplash.com/random/400x250/?hotel,1"} 
            alt={hotelName} 
            className="w-full h-48 object-cover" 
          />
          <div className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full flex items-center">
            ★ {rating.toFixed(1)}
          </div>
        </div>

          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-1">{ hotelName }</h3>
            <p className="text-gray-500 text-sm mb-3">{ location }</p>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Mulai dari</span>
              <span className="text-blue-600 font-bold">Rp.{ price }</span>
            </div>
          </div>
        </div>
    </>
  )
}
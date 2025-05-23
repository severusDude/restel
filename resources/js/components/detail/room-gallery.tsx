import { useState } from 'react';
import { Room } from '@/types';

interface RoomGalleryProps {
  room: Room;
}

export default function RoomGallery({ room }: RoomGalleryProps) {
  // Placeholder images for demo purposes
  const images = [
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  ];

  const [activeImage, setActiveImage] = useState(0);
  
  // Use the featured image from the room if available, otherwise use the first placeholder
  const mainImage = images[activeImage];

  return (
    <div className="space-y-4">
      <div className="relative h-[400px] rounded-lg overflow-hidden">
        <img 
          src={mainImage} 
          alt={`${room.name} - Image ${activeImage + 1}`}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <div 
            key={index}
            className={`h-24 rounded-md overflow-hidden cursor-pointer border-2 ${
              activeImage === index ? 'border-blue-500' : 'border-transparent'
            }`}
            onClick={() => setActiveImage(index)}
          >
            <img 
              src={image} 
              alt={`${room.name} - Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
} 
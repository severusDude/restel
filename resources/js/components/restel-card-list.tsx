import { CardItem } from "./restel-card-item";
import { Room, PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";

interface Props extends PageProps {
  featuredRooms?: Room[];
}

export function CardList() {
  // Mengambil data rooms langsung dari props yang dikirimkan melalui Inertia
  const { featuredRooms = [] } = usePage<Props>().props;

  // Jika ada data kamar, tampilkan
  if (featuredRooms && featuredRooms.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {featuredRooms.map((room) => (
          <Link 
            key={room.id} 
            href={route('rooms.show', room.slug)}
            className="block hover:no-underline"
          >
            <CardItem 
              hotelName={room.name} 
              location={room.location} 
              price={`Rp.${room.price.toLocaleString()}`}
              rating={room.average_rating || 4.5}
              image={room.featured_image || `https://source.unsplash.com/random/400x250/?hotel,${room.id}`}
            />
          </Link>
        ))}
      </div>
    );
  }

  // Jika tidak ada kamar ditemukan
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
      <svg className="w-12 h-12 text-yellow-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <h3 className="text-lg font-medium text-yellow-800 mb-2">Belum ada kamar tersedia</h3>
      <p className="text-yellow-700 mb-4">Silahkan cek kembali nanti untuk melihat pilihan kamar terbaru kami.</p>
      <Link 
        href={route('home')} 
        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors inline-block"
      >
        Refresh
      </Link>
    </div>
  );
}
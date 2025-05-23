import { CardList } from "@/components/restel-card-list";
import { Link } from "@inertiajs/react";

export function MainHome({ rooms }: { rooms: any[] }) {
  return (
    <>
      <main className="max-w-6xl mx-auto px-6 py-6 -mt-24">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Kamar</h2>
          <Link 
            href={route('rooms.index')} 
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            Lihat Semua
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
        
        {/* card list */}
        <CardList rooms={rooms}/>
      </main>
    </>
  )
}
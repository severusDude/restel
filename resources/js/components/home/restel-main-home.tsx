import { CardList } from "@/components/restel-card-list";


export function MainHome() {
  return (
    <>
      <main className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Kamar</h2>
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
            Lihat Semua
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
        
        {/* card list */}
        <CardList />
      </main>
    </>
  )
}
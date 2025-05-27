import { FacitiesList } from "./description-facilities-list";

export function DescriptionCard({ room, rating } : any) {
  return (
    <>
      <div className="flex-[8] bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="mb-4">
          <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded">{room.type}</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{room.name}</h2>
        {/* <h5 className="text-sm text-blue-600 font-medium mb-4">Enjoy breathtaking ocean views</h5> */}
        
        <div className="flex items-center gap-2 mb-6">
          <div className="flex text-yellow-400">
            ★★★★★
          </div>
          <span className="text-sm text-gray-500">{room.rating} (127 reviews)</span>
        </div>
        
        <div className="description mr-5">
          <p className="text-gray-600 leading-relaxed">{ room.description }</p>
          
          
          {/* Added Facilities Cards Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Fasilitas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <FacitiesList />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
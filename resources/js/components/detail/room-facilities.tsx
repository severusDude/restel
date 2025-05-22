import { Facility } from '@/types';

interface RoomFacilitiesProps {
  facilities: Facility[];
}

export default function RoomFacilities({ facilities }: RoomFacilitiesProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {facilities.map((facility) => (
        <div 
          key={facility.id} 
          className="flex items-center p-3 bg-gray-50 rounded-lg"
        >
          <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span className="text-gray-700">{facility.name}</span>
        </div>
      ))}
    </div>
  );
} 
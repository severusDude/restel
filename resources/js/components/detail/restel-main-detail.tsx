import { useState } from 'react';
import { Room } from '@/types';
import DatePicker from 'react-datepicker';
import { useForm } from '@inertiajs/react';
import 'react-datepicker/dist/react-datepicker.css';

interface MainDetailProps {
  room: Room;
  rating: number;
  unavailableDates?: string[];
}

export function MainDetail({ room, rating, unavailableDates = [] }: MainDetailProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { data, setData, post, processing, errors, reset } = useForm({
    room_id: room.id,
    start_date: '',
    end_date: '',
  });

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
    setData('start_date', date.toISOString().split('T')[0]);
    
    // If end date is before start date, reset it
    if (endDate && endDate < date) {
      setEndDate(null);
      setData('end_date', '');
    }
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
    setData('end_date', date.toISOString().split('T')[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('reservations.store'));
  };

  // Convert unavailable dates from strings to Date objects
  const unavailableDateObjects = unavailableDates.map(date => new Date(date));

  // Custom date filtering function to disable unavailable dates
  const filterDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return !unavailableDates.includes(dateString);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{room.name}</h1>
        <div className="flex items-center mb-4">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{room.type}</span>
          <span className="text-gray-600">{room.location}</span>
          <div className="ml-auto flex items-center">
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="ml-1 text-gray-600">{rating ? rating.toFixed(1) : 'No ratings'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-700">{room.description}</p>
          </div>
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Facilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {room.facilities?.map((facility) => (
                <div key={facility.id} className="flex items-center bg-gray-50 p-3 rounded-lg">
                  <div className="rounded-full bg-blue-100 p-2 mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">{facility.name}</h3>
                    <p className="text-sm text-gray-500">{facility.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            {room.reviews && room.reviews.length > 0 ? (
              <div className="space-y-4">
                {room.reviews.map((review) => (
                  <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {review.user ? review.user.name : 'Anonymous'}
                      </span>
                      <span className="ml-auto text-xs text-gray-500">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No reviews yet.</p>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
            <h2 className="text-2xl font-bold mb-4">Book This Room</h2>
            <p className="text-3xl font-bold text-blue-600 mb-4">Rp {room.price.toLocaleString()} <span className="text-sm text-gray-500">/ malam</span></p>
            
            {route().has('login') ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Check-in Date
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    filterDate={filterDate}
                    minDate={new Date()}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholderText="Select check-in date"
                    required
                  />
                  {errors.start_date && <p className="text-red-500 text-xs italic mt-1">{errors.start_date}</p>}
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Check-out Date
                  </label>
                  <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    filterDate={filterDate}
                    minDate={startDate || new Date()}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholderText="Select check-out date"
                    disabled={!startDate}
                    required
                  />
                  {errors.end_date && <p className="text-red-500 text-xs italic mt-1">{errors.end_date}</p>}
                </div>
                
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  >
                    {processing ? 'Processing...' : 'Book Now'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-yellow-50 p-4 rounded-md">
                <p className="text-yellow-800 text-center">
                  Please <a href="/login" className="text-blue-500 hover:underline">log in</a> to book this room
                </p>
              </div>
            )}
            
            <div className="mt-6">
              <h3 className="font-bold text-gray-700 mb-2">Room Details</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Capacity: {room.capacity} people
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  Location: {room.location}
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                  Type: {room.type}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
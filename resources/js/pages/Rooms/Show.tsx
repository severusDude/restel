import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { PageProps, Room, Review, User } from '@/types';
import RoomGallery from '@/components/detail/room-gallery';
import { Footer } from '@/components/restel-footer';
import { Header } from '@/components/restel-header';
import { Link } from '@inertiajs/react';

interface Props extends PageProps {
  room: Room & {
    reviews: (Review & { user: User })[]
  };
  rating: number;
  unavailableDates: string[];
}

export default function Show({ auth, room, rating, unavailableDates }: Props) {
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [guests, setGuests] = useState<number>(1);
  
  const { data, setData, post, processing, errors } = useForm({
    room_id: room.id,
    start_date: '',
    end_date: '',
    guests: 1,
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update the form data
    setData({
      room_id: room.id,
      start_date: checkIn,
      end_date: checkOut,
      guests: guests
    });
    
    // Submit the form with proper callbacks
    post(route('reservations.store'), {
      preserveScroll: true,
      onSuccess: () => {
        // Direct redirect to the reservations index page
        window.location.href = route('reservations.index');
      },
      onError: (errors) => {
        console.error('Booking failed:', errors);
      }
    });
  };
  
  const handleDateChange = (field: 'start_date' | 'end_date', value: string) => {
    if (field === 'start_date') {
      setCheckIn(value);
      setData('start_date', value);
    } else {
      setCheckOut(value);
      setData('end_date', value);
    }
  };

  return (
    <>
      <Head title={room.name} />
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href={route('rooms.index')}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span>Back to Rooms</span>
          </Link>
          
          <h1 className="text-3xl font-bold mb-2">{room.name}</h1>
          <div className="flex items-center mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{room.type}</span>
            <span className="text-gray-600">Room {room.location}</span>
            <div className="ml-auto flex items-center">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span className="ml-1 text-gray-600">{rating ? rating.toFixed(1) : 'No ratings'}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side with main image (60-70% of screen) */}
          <div className="lg:w-2/3">
            <RoomGallery room={room} />
          </div>
          
          {/* Right side with booking */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Book This Room</h2>
              <p className="text-3xl font-bold text-blue-600 mb-4">Rp {room.price.toLocaleString()} <span className="text-sm text-gray-500">/ malam</span></p>
              
              {auth.user ? (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4 mb-4">
                    <div>
                      <label htmlFor="check-in" className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                      <input
                        type="date"
                        id="check-in"
                        value={checkIn}
                        onChange={(e) => handleDateChange('start_date', e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                      {errors.start_date && <p className="text-red-500 text-xs mt-1">{errors.start_date}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="check-out" className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                      <input
                        type="date"
                        id="check-out"
                        value={checkOut}
                        onChange={(e) => handleDateChange('end_date', e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                      {errors.end_date && <p className="text-red-500 text-xs mt-1">{errors.end_date}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                      <input
                        type="number"
                        id="guests"
                        min="1"
                        max={room.capacity}
                        value={guests}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          setGuests(value);
                          setData('guests', value);
                        }}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests}</p>}
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {processing ? 'Processing...' : 'Book Now'}
                  </button>
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
        
        {/* Room information section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <p className="text-gray-700">{room.description || 'No description available.'}</p>
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Facilities</h2>
            {room.facilities && room.facilities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {room.facilities.map((facility) => (
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
            ) : (
              <p className="text-gray-500 italic">No facilities listed.</p>
            )}
          </div>
        </div>
        
        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Guest Reviews</h2>
          {room.reviews && room.reviews.length > 0 ? (
            <div className="space-y-6">
              {room.reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          {review.user.name.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{review.user.name}</h3>
                        <p className="text-sm text-gray-500">{new Date(review.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg 
                          key={star}
                          className={`w-5 h-5 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <p className="text-gray-500">No reviews yet for this room.</p>
              {auth.user && (
                <p className="mt-2 text-gray-600">
                  After staying in this room, you can be the first to leave a review!
                </p>
              )}
            </div>
          )}
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Hotel Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Contact & Location</h3>
              <div className="space-y-3">
                <p className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  +62 812-3456-7890
                </p>
                <p className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  info@restel.com
                </p>
                <p className="flex items-start text-gray-700">
                  <svg className="w-5 h-5 mr-3 text-blue-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  Jl. Mugarsari No.10, Tasikmalaya, West Java, Indonesia
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Hotel Policies</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Check-in: 2:00 PM - 10:00 PM
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Check-out: 12:00 PM
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Cancellation: Free cancellation up to 24 hours before check-in
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Pets: Not allowed
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}
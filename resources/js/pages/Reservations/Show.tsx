import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps, Reservation, ReservationItem } from '@/types';
import { AppShell } from '@/Components/app-shell';
import { formatRupiah } from '@/helpers/currency';

interface Props extends PageProps {
  reservation: Reservation;
}

export default function Show({ auth, reservation }: Props) {
  const [activeReviewItem, setActiveReviewItem] = useState<string | null>(null);

  const { data, setData, post, processing, errors, reset } = useForm({
    reservation_item_id: '',
    rating: 5,
    comment: '',
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const calculateNights = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const initiateReview = (item: ReservationItem) => {
    setActiveReviewItem(item.id);
    setData({
      reservation_item_id: item.id,
      rating: 5,
      comment: '',
    });
  };

  const cancelReview = () => {
    setActiveReviewItem(null);
    reset();
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('reviews.store'), {
      onSuccess: () => {
        setActiveReviewItem(null);
        reset();
      },
    });
  };

  const getStatusClass = (status: string) => {
    switch(status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AppShell>
      <Head title={`Reservation #${reservation.id.substring(0, 8)}`} />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Link
            href={route('reservations.index')}
            className="text-blue-500 hover:underline flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
            </svg>
            Back to Reservations
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold">
                Reservation Details 
                <span className="text-gray-400 ml-2 text-lg">#{reservation.id.substring(0, 8)}</span>
              </h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(reservation.status)}`}>
                {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-lg font-semibold mb-2">Booking Information</h2>
                <ul className="space-y-2 text-gray-600">
                  <li>
                    <span className="font-medium">Check-in:</span> {formatDate(reservation.start_date)}
                  </li>
                  <li>
                    <span className="font-medium">Check-out:</span> {formatDate(reservation.end_date)}
                  </li>
                  <li>
                    <span className="font-medium">Duration:</span> {calculateNights(reservation.start_date, reservation.end_date)} nights
                  </li>
                  <li>
                    <span className="font-medium">Total Price:</span> {formatRupiah(reservation.total_price)}
                  </li>
                  <li>
                    <span className="font-medium">Booked on:</span> {formatDate(reservation.created_at)}
                  </li>
                </ul>
              </div>

              {reservation.status === 'pending' && (
                <div className="flex items-center space-x-3">
                  <Link
                    href={route('reservations.confirm', reservation.id)}
                    method="post"
                    as="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Confirm Reservation
                  </Link>
                  
                  <Link
                    href={route('reservations.cancel', reservation.id)}
                    method="post"
                    as="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Cancel Reservation
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4">Reserved Items</h2>
        
        <div className="space-y-4">
          {reservation.items && reservation.items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold">{item.reservable?.name}</h3>
                    <p className="text-gray-600">{item.reservable?.location}</p>
                    <p className="text-gray-600">Type: {item.reservable?.type}</p>
                    <p className="text-gray-600">Price: {formatRupiah(item.price)}</p>
                  </div>
                  
                  {reservation.status === 'confirmed' && (
                    <div>
                      {item.review ? (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Your Review</h4>
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i}
                                className={`w-5 h-5 ${i < item.review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor" 
                                viewBox="0 0 20 20" 
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                          </div>
                          <p className="text-gray-700">{item.review.comment}</p>
                          <div className="mt-2 text-right">
                            <Link
                              href={route('reviews.destroy', item.review.id)}
                              method="delete"
                              as="button"
                              className="text-red-500 text-sm hover:underline"
                            >
                              Delete Review
                            </Link>
                          </div>
                        </div>
                      ) : activeReviewItem === item.id ? (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Write a Review</h4>
                          
                          <form onSubmit={submitReview}>
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Rating
                              </label>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <button
                                    key={i}
                                    type="button"
                                    onClick={() => setData('rating', i + 1)}
                                    className="mr-1 focus:outline-none"
                                  >
                                    <svg 
                                      className={`w-6 h-6 ${i < data.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                      fill="currentColor" 
                                      viewBox="0 0 20 20" 
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                  </button>
                                ))}
                              </div>
                              {errors.rating && <p className="text-red-500 text-xs italic mt-1">{errors.rating}</p>}
                            </div>
                            
                            <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                Comment
                              </label>
                              <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                rows={4}
                                value={data.comment}
                                onChange={e => setData('comment', e.target.value)}
                                required
                              ></textarea>
                              {errors.comment && <p className="text-red-500 text-xs italic mt-1">{errors.comment}</p>}
                            </div>
                            
                            <div className="flex justify-end space-x-2">
                              <button
                                type="button"
                                onClick={cancelReview}
                                className="px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                disabled={processing}
                                className="px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                {processing ? 'Submitting...' : 'Submit Review'}
                              </button>
                            </div>
                          </form>
                        </div>
                      ) : (
                        <button
                          onClick={() => initiateReview(item)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Write a Review
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
} 
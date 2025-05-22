import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps, Reservation } from '@/types';
import { AppShell } from '@/Components/app-shell';

interface Props extends PageProps {
  reservations: Reservation[];
}

export default function Index({ auth, reservations }: Props) {
  const [activeTab, setActiveTab] = useState<string>('all');
  
  const filteredReservations = activeTab === 'all' 
    ? reservations 
    : reservations.filter(reservation => reservation.status === activeTab);

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

  return (
    <AppShell>
      <Head title="My Reservations" />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Reservations</h1>
        
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {['all', 'pending', 'confirmed', 'cancelled'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {filteredReservations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500">No reservations found</p>
            <Link
              href={route('rooms.index')}
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 active:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-300 disabled:opacity-25 transition"
            >
              Browse Rooms
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReservations.map((reservation) => (
              <div key={reservation.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">
                        {reservation.items?.[0]?.reservable?.name || 'Room Reservation'}
                      </h2>
                      <p className="text-gray-600">
                        {formatDate(reservation.start_date)} - {formatDate(reservation.end_date)} 
                        <span className="text-gray-500 ml-2">
                          ({calculateNights(reservation.start_date, reservation.end_date)} nights)
                        </span>
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(reservation.status)}`}>
                      {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-gray-700">
                      <p>Total Price: <span className="font-semibold">${reservation.total_price}</span></p>
                      <p className="text-sm text-gray-500">Booked on {formatDate(reservation.created_at)}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Link
                        href={route('reservations.show', reservation.id)}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        View Details
                      </Link>
                      
                      {reservation.status === 'pending' && (
                        <>
                          <Link
                            href={route('reservations.confirm', reservation.id)}
                            method="post"
                            as="button"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Confirm
                          </Link>
                          
                          <Link
                            href={route('reservations.cancel', reservation.id)}
                            method="post"
                            as="button"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Cancel
                          </Link>
                        </>
                      )}
                      
                      {reservation.status === 'confirmed' && reservation.items?.some(item => !item.review) && (
                        <Link
                          href={route('reservations.show', reservation.id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                          Write Review
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
} 
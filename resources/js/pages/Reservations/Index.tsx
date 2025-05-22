import { Head } from '@inertiajs/react';
import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Reservation, User } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useForm } from '@inertiajs/react';

interface ReservationsIndexProps {
    auth: {
        user: User | null;
    };
    reservations: Reservation[];
}

export default function ReservationsIndex({ auth, reservations }: ReservationsIndexProps) {
    const { delete: destroy, processing } = useForm();

    const handleCancel = (reservationId: string) => {
        if (confirm('Are you sure you want to cancel this reservation?')) {
            destroy(route('reservations.destroy', reservationId));
        }
    };

    const getStatusColor = (status: Reservation['status']) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'confirmed':
                return 'bg-blue-100 text-blue-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            case 'success':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <MainLayout user={auth.user || undefined}>
            <Head title="My Reservations" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">My Reservations</h1>
                        <p className="mt-2 text-gray-600">
                            View and manage your room reservations
                        </p>
                    </div>

                    <div className="space-y-6">
                        {reservations.map((reservation) => (
                            <Card key={reservation.id}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>
                                            Reservation #{reservation.id.slice(0, 8)}
                                        </CardTitle>
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                                reservation.status
                                            )}`}
                                        >
                                            {reservation.status.charAt(0).toUpperCase() +
                                                reservation.status.slice(1)}
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {reservation.items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-start space-x-4"
                                            >
                                                <div className="h-24 w-32 flex-shrink-0">
                                                    <img
                                                        src={
                                                            item.room.image_url ||
                                                            '/images/room-placeholder.jpg'
                                                        }
                                                        alt={item.room.name}
                                                        className="h-full w-full object-cover rounded-lg"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-lg font-medium text-gray-900">
                                                        {item.room.name}
                                                    </h4>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {item.room.type} • {item.room.capacity} guests
                                                    </p>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        ${item.price} per night
                                                    </p>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="border-t pt-4 mt-4">
                                            <div className="flex justify-between text-sm">
                                                <div className="space-y-1">
                                                    <p>
                                                        <span className="font-medium">Check-in:</span>{' '}
                                                        {format(
                                                            new Date(reservation.start_date),
                                                            'PPP'
                                                        )}
                                                    </p>
                                                    <p>
                                                        <span className="font-medium">
                                                            Check-out:
                                                        </span>{' '}
                                                        {format(
                                                            new Date(reservation.end_date),
                                                            'PPP'
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium">Total Price</p>
                                                    <p className="text-2xl font-bold text-gray-900">
                                                        ${reservation.total_price}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {reservation.status === 'pending' && (
                                            <div className="border-t pt-4 mt-4">
                                                <Button
                                                    variant="destructive"
                                                    disabled={processing}
                                                    onClick={() => handleCancel(reservation.id)}
                                                >
                                                    Cancel Reservation
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {reservations.length === 0 && (
                            <div className="text-center py-12">
                                <h3 className="text-lg font-medium text-gray-900">
                                    No reservations found
                                </h3>
                                <p className="mt-2 text-gray-500">
                                    You haven't made any reservations yet.
                                </p>
                                <Button
                                    className="mt-4"
                                    onClick={() => window.location.href = route('rooms.index')}
                                >
                                    Browse Rooms
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 
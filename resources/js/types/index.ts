export interface User {
    id: string;
    name: string;
    email: string;
    email_verified_at?: string;
    created_at: string;
    updated_at: string;
}

export interface Room {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    type: string;
    capacity: number;
    location: string;
    price: number;
    image_url?: string;
    facilities: Facility[];
    created_at: string;
    updated_at: string;
}

export interface Facility {
    id: string;
    name: string;
    type: string;
    default_image_id: string | null;
    default_image?: Attachment;
    created_at: string;
    updated_at: string;
}

export interface Attachment {
    id: string;
    name: string;
    file_name: string;
    mime_type: string;
    path: string;
    disk: string;
    file_hash: string;
    collection: string;
    size: number;
    created_at: string;
    updated_at: string;
}

export interface Reservation {
    id: string;
    user_id: string;
    start_date: string;
    end_date: string;
    total_price: number | null;
    status: 'pending' | 'confirmed' | 'cancelled' | 'success';
    status_date: string | null;
    created_at: string;
    updated_at: string;
    items: ReservationItem[];
    user: User;
}

export interface ReservationItem {
    id: string;
    reservation_id: string;
    room_id: string;
    price: number;
    created_at: string;
    updated_at: string;
    room: Room;
}

export interface Review {
    id: string;
    user_id: string;
    reservation_id: string;
    rating: number;
    comment: string | null;
    created_at: string;
    updated_at: string;
    user: User;
    reservation: Reservation;
} 
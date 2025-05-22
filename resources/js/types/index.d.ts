import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import { AxiosInstance } from 'axios';
import ziggyRoute, { Config as ZiggyConfig } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: string;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Facility {
    id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    pivot?: {
        custom_image_id?: string;
    };
}

export interface Review {
    id: string;
    user_id: string;
    reservation_item_id: string;
    rating: number;
    comment: string;
    created_at: string;
    updated_at: string;
    user?: User;
}

export interface Room {
    id: string;
    name: string;
    slug: string;
    description: string;
    type: string;
    capacity: number;
    location: string;
    price: number;
    created_at: string;
    updated_at: string;
    facilities?: Facility[];
    reviews?: Review[];
    average_rating?: number;
    featured_image?: string;
}

export interface ReservationItem {
    id: string;
    reservation_id: string;
    reservable_id: string;
    reservable_type: string;
    price: number;
    created_at: string;
    updated_at: string;
    reservable?: Room;
    review?: Review;
}

export interface Reservation {
    id: string;
    user_id: string;
    start_date: string;
    end_date: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    total_price: number;
    created_at: string;
    updated_at: string;
    items?: ReservationItem[];
}

export interface CardItemProps {
    hotelName: string;
    location: string;
    price: string;
}

export interface PageProps extends SharedData {
    jetstream?: {
        [key: string]: unknown;
    };
    errorBags?: {
        [key: string]: {
            [key: string]: string;
        };
    };
    flash?: {
        [key: string]: string;
    };
}

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    function route(
        name?: string,
        params?: any,
        absolute?: boolean,
        config?: ZiggyConfig
    ): string;
}

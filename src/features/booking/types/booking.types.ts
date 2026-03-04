import { Tour } from '@/features/tours/types/tour.types';

export interface BookingFormData {
  tourId: string;
  date: string;
  participants: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    specialRequirements?: string;
  };
}

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour: Tour | null;
}

// ✅ ADD THIS - Missing interface that your component needs
export interface BookingConfirmationData {
  id: string;
  tourId: string;
  tourName: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  bookingDate: string;
  travelDate: string;
  numberOfGuests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  specialRequests?: string;
  createdAt: string;
  updatedAt?: string;
}

// ✅ ADD THIS - Good to have for API responses
export interface BookingResponse {
  success: boolean;
  data?: BookingConfirmationData;
  error?: string;
  message?: string;
}

// ✅ ADD THIS - For creating new bookings
export interface CreateBookingRequest {
  tourId: string;
  tourName: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  travelDate: string;
  numberOfGuests: number;
  specialRequests?: string;
}
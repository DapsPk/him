import { Tour } from '@/features/tours/types/tour.types';

export interface BookingFormData {
  tourId: string;
  date: string;
  participants: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    country?: string;
    specialRequirements?: string;
  };
}

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour: Tour | null;
}

// COMPLETELY REWRITTEN to match what BookingConfirmation.tsx expects
export interface BookingConfirmationData {
  id: string;
  bookingId: string;           // Added for display
  bookingReference: string;     // Added for display
  
  // Tour information - this matches what the component uses
  tour: {
    id: string;
    title: string;              // This is critical - used in line 14!
    duration: string;
    price: number;
    image: string;
    section?: string;           // Used for kilimanjaro check
    category?: string;
  };
  tourId: string;
  tourName: string;
  
  // Customer information - nested inside formData as the component expects
  formData: {
    participants: number;
    customerInfo: {
      name: string;
      email: string;
      phone: string;
      country?: string;
      specialRequirements?: string;
    };
  };
  
  // Also keep root-level fields for flexibility
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  
  // Dates
  bookingDate: string;
  travelDate: string;
  departureDate?: string;
  
  // Pricing - support both totalAmount and totalPrice
  totalAmount: number;          // Used in formatPrice(booking.totalAmount)
  totalPrice?: number;          // For compatibility
  
  numberOfGuests: number;
  
  // Status
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  
  // Optional fields
  specialRequests?: string;
  
  // Timestamps
  createdAt: Date | string;
  updatedAt?: string;
}

export interface BookingResponse {
  success: boolean;
  data?: BookingConfirmationData;
  error?: string;
  message?: string;
}

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

export interface SerengetiBookingRequirements {
  requiresPassport: boolean;
  requiresVisa: boolean;
  requiresYellowFever: boolean;
  requiresTravelInsurance: boolean;
  minAge: number;
  recommendedFitness: string;
  bestMonths: string[];
  specialRequirements?: string[];
}
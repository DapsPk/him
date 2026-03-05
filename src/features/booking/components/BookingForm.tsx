'use client';

import { useState } from 'react';
import { Tour } from '@/features/tours/types/tour.types';
import { BookingFormData, SerengetiBookingRequirements } from '../types/booking.types';
import Button from '@/components/ui/Button';
import Image from 'next/image';

interface BookingFormProps {
  tour: Tour | null;
  onSubmit: (data: BookingFormData) => void;
  onCancel: () => void;
}

// Extended interface for Serengeti-specific options
interface SerengetiOptions {
  preferredViewingAreas: string[];
  photographyLevel: 'beginner' | 'intermediate' | 'professional';
  wildlifeInterests: string[];
  accommodationType: 'basic' | 'comfort' | 'luxury';
  gameDrivePreference: 'morning' | 'afternoon' | 'full-day';
  specialRequirements?: string;
}

export default function BookingForm({ tour, onSubmit, onCancel }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    tourId: tour?.id || '',
    date: '',
    participants: 1,
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      specialRequirements: ''
    }
  });

  const [serengetiOptions, setSerengetiOptions] = useState<SerengetiOptions>({
    preferredViewingAreas: [],
    photographyLevel: 'beginner',
    wildlifeInterests: [],
    accommodationType: 'comfort',
    gameDrivePreference: 'full-day'
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Check if this is a Serengeti tour
  const isSerengetiTour = tour?.title?.toLowerCase().includes('serengeti') || 
                          tour?.id?.toLowerCase().includes('serengeti') || 
                          tour?.subCategory === 'serengeti';

  // Wildlife interests options
  const wildlifeOptions = [
    { value: 'big-cats', label: 'Big Cats (Lions, Leopards, Cheetahs)' },
    { value: 'elephants', label: 'Elephant Herds' },
    { value: 'migration', label: 'Great Migration (Wildebeest & Zebras)' },
    { value: 'birds', label: 'Bird Watching (500+ species)' },
    { value: 'rhinos', label: 'Rhinos' },
    { value: 'hippos', label: 'Hippos & Crocodiles' },
    { value: 'giraffes', label: 'Giraffes' },
    { value: 'buffalo', label: 'Cape Buffalo' }
  ];

  // Viewing areas options
  const viewingAreasOptions = [
    { value: 'seronera', label: 'Seronera Valley (Central)' },
    { value: 'mara-river', label: 'Mara River (North)' },
    { value: 'grumeti', label: 'Grumeti River (West)' },
    { value: 'ndutu', label: 'Ndutu Area (South)' },
    { value: 'lemai', label: 'Lemai Wedge' }
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.customerInfo.name.trim()) {
        newErrors.name = 'Name is required';
      }
      if (!formData.customerInfo.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.customerInfo.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.customerInfo.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      }
    }

    if (step === 2) {
      if (!formData.date) {
        newErrors.date = 'Travel date is required';
      }
      if (formData.participants < 1) {
        newErrors.participants = 'At least 1 participant required';
      }
      if (formData.participants > 20) {
        newErrors.participants = 'Maximum 20 participants allowed';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      // Combine form data with Serengeti options if applicable
      const finalData = isSerengetiTour 
        ? { ...formData, serengetiOptions }
        : formData;
      onSubmit(finalData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as Record<string, any>),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleParticipantsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setFormData(prev => ({ ...prev, participants: value }));
    if (errors.participants) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.participants;
        return newErrors;
      });
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, date: e.target.value }));
    if (errors.date) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.date;
        return newErrors;
      });
    }
  };

  // Serengeti-specific handlers
  const handleViewingAreaChange = (area: string) => {
    setSerengetiOptions(prev => {
      const current = prev.preferredViewingAreas;
      const updated = current.includes(area)
        ? current.filter(a => a !== area)
        : [...current, area];
      return { ...prev, preferredViewingAreas: updated };
    });
  };

  const handleWildlifeInterestChange = (interest: string) => {
    setSerengetiOptions(prev => {
      const current = prev.wildlifeInterests;
      const updated = current.includes(interest)
        ? current.filter(i => i !== interest)
        : [...current, interest];
      return { ...prev, wildlifeInterests: updated };
    });
  };

  const handlePhotographyLevelChange = (level: 'beginner' | 'intermediate' | 'professional') => {
    setSerengetiOptions(prev => ({ ...prev, photographyLevel: level }));
  };

  const handleAccommodationTypeChange = (type: 'basic' | 'comfort' | 'luxury') => {
    setSerengetiOptions(prev => ({ ...prev, accommodationType: type }));
  };

  const handleGameDrivePreferenceChange = (pref: 'morning' | 'afternoon' | 'full-day') => {
    setSerengetiOptions(prev => ({ ...prev, gameDrivePreference: pref }));
  };

  if (!tour) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No tour selected</p>
        <Button onClick={onCancel} className="mt-4">
          Back to Tours
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                currentStep >= step
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step}
            </div>
            {step < 3 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  currentStep > step ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Personal Information */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Your Information
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="customerInfo.name"
              value={formData.customerInfo.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="customerInfo.email"
              value={formData.customerInfo.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="customerInfo.phone"
              value={formData.customerInfo.phone}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+255 XXX XXX XXX"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Tour Details */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Tour Details
          </h3>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-2">Selected Tour</h4>
            <p className="text-gray-600">{tour.title}</p>
            <p className="text-sm text-gray-500 mt-1">Duration: {tour.duration}</p>
            <p className="text-sm text-gray-500">Price: ${tour.price} per person</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Travel Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleDateChange}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-500">{errors.date}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Participants *
            </label>
            <input
              type="number"
              name="participants"
              value={formData.participants}
              onChange={handleParticipantsChange}
              min="1"
              max="20"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.participants ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.participants && (
              <p className="mt-1 text-sm text-red-500">{errors.participants}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Total: ${tour.price * formData.participants}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Requirements (Optional)
            </label>
            <textarea
              name="customerInfo.specialRequirements"
              value={formData.customerInfo.specialRequirements}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Dietary restrictions, medical conditions, or other special requests"
            />
          </div>
        </div>
      )}

      {/* Step 3: Serengeti Preferences (Only for Serengeti tours) */}
      {currentStep === 3 && isSerengetiTour && (
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Your Serengeti Safari Preferences
          </h3>

          {/* Wildlife Interests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What wildlife are you most excited to see? *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {wildlifeOptions.map((option) => (
                <label key={option.value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={serengetiOptions.wildlifeInterests.includes(option.value)}
                    onChange={() => handleWildlifeInterestChange(option.value)}
                    className="rounded border-gray-300 text-green-500 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Preferred Viewing Areas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Preferred Viewing Areas
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {viewingAreasOptions.map((option) => (
                <label key={option.value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={serengetiOptions.preferredViewingAreas.includes(option.value)}
                    onChange={() => handleViewingAreaChange(option.value)}
                    className="rounded border-gray-300 text-green-500 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Photography Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Photography Interest Level
            </label>
            <div className="flex space-x-4">
              {(['beginner', 'intermediate', 'professional'] as const).map((level) => (
                <label key={level} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="photographyLevel"
                    checked={serengetiOptions.photographyLevel === level}
                    onChange={() => handlePhotographyLevelChange(level)}
                    className="text-green-500 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700 capitalize">{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Accommodation Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Accommodation Preference
            </label>
            <div className="flex space-x-4">
              {(['basic', 'comfort', 'luxury'] as const).map((type) => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="accommodationType"
                    checked={serengetiOptions.accommodationType === type}
                    onChange={() => handleAccommodationTypeChange(type)}
                    className="text-green-500 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700 capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Game Drive Preference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Game Drive Preference
            </label>
            <div className="flex space-x-4">
              {(['morning', 'afternoon', 'full-day'] as const).map((pref) => (
                <label key={pref} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gameDrivePreference"
                    checked={serengetiOptions.gameDrivePreference === pref}
                    onChange={() => handleGameDrivePreferenceChange(pref)}
                    className="text-green-500 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {pref === 'full-day' ? 'Full Day' : pref + ' drives'}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Review (for non-Serengeti tours) */}
      {currentStep === 3 && !isSerengetiTour && (
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Review Your Booking
          </h3>
          
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div>
              <h4 className="font-semibold text-gray-700">Tour</h4>
              <p className="text-gray-600">{tour.title}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-700">Customer</h4>
              <p className="text-gray-600">{formData.customerInfo.name}</p>
              <p className="text-gray-600">{formData.customerInfo.email}</p>
              <p className="text-gray-600">{formData.customerInfo.phone}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-700">Booking Details</h4>
              <p className="text-gray-600">Date: {formData.date || 'Not specified'}</p>
              <p className="text-gray-600">Participants: {formData.participants}</p>
              <p className="text-gray-600">Total: ${tour.price * formData.participants}</p>
            </div>
            
            {formData.customerInfo.specialRequirements && (
              <div>
                <h4 className="font-semibold text-gray-700">Special Requirements</h4>
                <p className="text-gray-600">{formData.customerInfo.specialRequirements}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4 border-t">
        {currentStep > 1 ? (
          <Button type="button" variant="outline" onClick={handleBack}>
            ← Back
          </Button>
        ) : (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        
        {currentStep < 3 ? (
          <Button type="button" onClick={handleNext}>
            Continue →
          </Button>
        ) : (
          <Button type="submit">
            Confirm Booking
          </Button>
        )}
      </div>

      {/* Tour Image Preview */}
      <div className="relative h-32 w-full rounded-lg overflow-hidden mt-4">
        <Image
          src={tour.images?.main || tour.image || '/images/placeholder.jpg'}
          alt={tour.title}
          fill
          className="object-cover"
        />
      </div>
    </form>
  );
}
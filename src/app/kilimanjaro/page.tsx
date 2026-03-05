'use client';

import { useState, useEffect } from 'react';
import { Tour } from '@/features/tours/types/tour.types';
import { toursData } from '@/features/tours/data/tours-data';
import ToursGrid from '@/features/tours/components/ToursGrid';
import BookingModal from '@/features/booking/components/BookingModal';
import SuccessCalculator from '@/features/calculator/components/SuccessCalculator';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

export default function KilimanjaroPage() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Kilimanjaro header images - using the same pattern as Hero component
  const kilimanjaroImages = [
    '/images/headers/kilimanjaro/header-1.jpg',
    '/images/headers/kilimanjaro/header-2.jpg',
    '/images/headers/kilimanjaro/header-3.jpg',
    '/images/headers/kilimanjaro/header-4.jpg'
  ];

  // Rotate images every 5 seconds - same as homepage
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === kilimanjaroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [kilimanjaroImages.length]);

  const handleBookNow = (tour: Tour) => {
    setSelectedTour(tour);
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
    setSelectedTour(null);
  };

  // Filter tours for kilimanjaro section only
  const kilimanjaroTours = toursData.filter(tour => tour.section === 'kilimanjaro');

  // NEW: Filter tours by selected category
  const filteredTours = selectedCategory 
    ? kilimanjaroTours.filter(tour => tour.kilimanjaroCategory === selectedCategory)
    : [];

  // NEW KILIMANJARO CATEGORIES - Experience-based organization
  const kilimanjaroCategories = [
    { 
      id: 'multi-day-climbs', 
      name: 'Multi-Day Climbs', 
      count: kilimanjaroTours.filter(t => t.kilimanjaroCategory === 'multi-day-climbs').length,
      emoji: '🏔️',
      description: '6-9 day expeditions with optimal acclimatization',
      difficulty: 'Difficult',
      duration: '6-9 days',
      successRate: 92,
      color: 'from-blue-600 to-indigo-700',
      bgColor: 'bg-gradient-to-r from-blue-600 to-indigo-700',
      textColor: 'text-white',
      features: ['Highest Success Rates', 'Gradual Acclimatization', 'Professional Guides', 'All Inclusive']
    },
    { 
      id: 'short-climbs', 
      name: 'Short Climbs', 
      count: kilimanjaroTours.filter(t => t.kilimanjaroCategory === 'short-climbs').length,
      emoji: '⚡',
      description: '5-7 day faster summit attempts',
      difficulty: 'Moderate-Difficult',
      duration: '5-7 days',
      successRate: 78,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-gradient-to-r from-orange-500 to-red-600',
      textColor: 'text-white',
      features: ['Faster Summit', 'Budget Friendly', 'Great for Experienced', 'Efficient Itinerary']
    },
    { 
      id: 'day-trips', 
      name: 'Day Trips', 
      count: kilimanjaroTours.filter(t => t.kilimanjaroCategory === 'day-trips').length,
      emoji: '🚶‍♂️',
      description: '1-2 day acclimatization and cultural experiences',
      difficulty: 'Easy-Moderate',
      duration: '1-2 days',
      successRate: null,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-gradient-to-r from-green-500 to-emerald-600',
      textColor: 'text-white',
      features: ['Cultural Immersion', 'Fitness Testing', 'Perfect Warm-up', 'Local Experiences']
    },
    { 
      id: 'luxury-climbs', 
      name: 'Luxury Climbs', 
      count: 0, // Will be added in future phases
      emoji: '⭐',
      description: 'Premium experiences with enhanced comfort',
      difficulty: 'Various',
      duration: '7-9 days',
      successRate: 95,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-gradient-to-r from-purple-500 to-pink-600',
      textColor: 'text-white',
      features: ['Premium Accommodation', 'Private Guides', 'Enhanced Comfort', 'VIP Treatment']
    },
  ];

  const climbingStats = [
    { number: '95%', label: 'Success Rate' },
    { number: '5,895m', label: 'Summit Height' },
    { number: '15,000+', label: 'Happy Climbers' },
    { number: '⭐ 4.9', label: 'Climber Rating' },
  ];

  const includedFeatures = [
    { icon: '🛡️', title: 'Certified Guides', description: 'Wilderness First Responder certified' },
    { icon: '🏕️', title: 'Quality Equipment', description: '4-season tents & sleeping systems' },
    { icon: '🍲', title: 'Nutritious Meals', description: 'High-energy meals for altitude' },
    { icon: '🚑', title: 'Safety First', description: 'Pulse oximeters & emergency oxygen' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Kilimanjaro Hero Section - CLEAN IMAGES WITHOUT GLOWING ELEMENTS */}
      <section className="relative py-20 text-white overflow-hidden">
        <div className="absolute inset-0">
          {/* Rotating Background Images - Same pattern as homepage */}
          {kilimanjaroImages.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
          ))}
          
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
          
          {/* REMOVED: Both glowing elements for clean images */}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Mount Kilimanjaro
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Conquer Africa's highest peak and stand on the Roof of Africa. 
              Experience the adventure of a lifetime with our expert-guided expeditions.
            </p>

            {/* Climbing Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-blue-200 mb-12">
              {climbingStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* TRANSPARENT BUTTONS - Using primary variant */}
              <Button 
                size="lg" 
                variant="primary" // This is already transparent with white border
                onClick={() => document.getElementById('experience-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 text-lg font-semibold rounded-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                🥾 Choose Your Experience
              </Button>
              <Button 
                size="lg" 
                variant="primary" // This is already transparent with white border
                onClick={() => document.getElementById('success-calculator')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 text-lg font-semibold rounded-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                📊 Check Success Chance
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Kilimanjaro History & Story Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
                Mount Kilimanjaro: A Mountain of Fire, Ice, and Spirit
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto mb-8"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* History Content */}
              <div className="space-y-8">
                <div className="animate-fade-in">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                    <span className="text-orange-500 mr-3">🌋</span>
                    A Geological Giant Shaped by Time
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    Soaring 5,895 meters (19,341 feet) into the African sky, Mount Kilimanjaro stands as the world's tallest free-standing mountain and Tanzania's most iconic natural monument. Formed more than one million years ago along the Great Rift Valley, Kilimanjaro is a dormant stratovolcano made of three ancient volcanic cones: Kibo, Mawenzi, and Shira.
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                    Kibo, the youngest and highest cone, holds the legendary Uhuru Peak, the true summit and symbol of freedom. While the mountain once roared with fire, its last major eruption occurred around 360,000 years ago, leaving behind vast fertile slopes, lava formations, and the glaciers that still crown its summit—now slowly retreating as the climate warms.
                  </p>
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                    <span className="text-green-500 mr-3">🌿</span>
                    A Cultural Sacred Landmark of the Chagga People
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    To the Chagga communities who have lived on Kilimanjaro's fertile foothills for centuries, the mountain is a guardian and a source of life. Known in their language as "Kilema Kyaro", meaning "impossible journey" or "the place we cannot reach," it has always carried a sense of wonder and reverence.
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                    Generations of Chagga farmers have flourished here, cultivating banana groves and coffee plantations, nourished by mountain streams. Their traditions, songs, and folklore speak of Kilimanjaro as a place of strength, purity, and ancestral presence. To climb it is to walk through living heritage.
                  </p>
                </div>
              </div>

              {/* Additional History Content */}
              <div className="space-y-8">
                <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                    <span className="text-blue-500 mr-3">🧭</span>
                    The Age of Exploration and the Modern Summiting Era
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    The western world first learned of Kilimanjaro in 1848 when German missionary Johannes Rebmann reported the astonishing sight of snow on the equator. His claims were doubted—until explorers soon confirmed the truth.
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                    In 1889, Hans Meyer and Ludwig Purtscheller completed the first documented ascent, facing extreme cold, thin air, and uncharted paths. Their achievement opened a doorway that continues today.
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                    Now, more than 30,000 trekkers from around the world attempt the summit each year. What makes Kilimanjaro unique is that it requires no technical climbing skills—just determination, good preparation, and the guidance of skilled mountain professionals.
                  </p>
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                    <span className="text-purple-500 mr-3">🌍</span>
                    A Journey Through Five Worlds in One Mountain
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    Climbing Kilimanjaro is like walking from the tropics to the Arctic in a single journey: Lush Rainforests filled with colobus monkeys and ancient trees, Heather & Moorland landscapes covered in giant groundsel and lobelias, High-Alpine Desert silent, vast, and otherworldly, and the Arctic Glacial Summit where snow meets sunrise over Africa.
                  </p>
                </div>

                {/* Inspirational Quote */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-2xl border-l-4 border-orange-500 animate-fade-in" style={{ animationDelay: '800ms' }}>
                  <p className="text-lg italic text-gray-700 dark:text-gray-300 text-center">
                    "Climb Kilimanjaro not just to reach the summit, but to discover the summit within yourself."
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">— Majestic Trails Philosophy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Kilimanjaro Route Map Section */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Kilimanjaro Climbing Routes
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Explore the different paths to Uhuru Peak. Each route offers unique landscapes, 
                challenges, and experiences on your journey to the Roof of Africa.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-6"></div>
            </div>
            
            {/* Map Container */}
            <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-600">
              <Image 
                src="/images/kilimanjaro/route-map.jpg" 
                alt="Kilimanjaro Climbing Routes Map showing Machame, Lemosho, Shira, Umbwe, Marangu and Rongai routes with camps and elevations"
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg shadow-lg"
                priority
              />
              
              
              {/* Map Caption */}
              <div className="text-center mt-4">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Detailed overview of all Kilimanjaro climbing routes and camps
                </p>
              </div>
            </div>

            {/* Route Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">5,895m</div>
                <div className="text-gray-600 dark:text-gray-400 mt-2">Uhuru Peak Elevation</div>
              </div>
              <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">6-9 Days</div>
                <div className="text-gray-600 dark:text-gray-400 mt-2">Recommended Duration</div>
              </div>
              <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-2xl">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">Scenic</div>
                <div className="text-gray-600 dark:text-gray-400 mt-2">Machame Route</div>
              </div>
            </div>

            {/* Popular Routes Info */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                  <span className="text-orange-500 mr-2">🥾</span>
                  Most Popular Routes
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• <strong>Machame Route</strong> - "Whiskey Route" - 6-7 days</li>
                  <li>• <strong>Lemosho Route</strong> - Most scenic - 7-8 days</li>
                  <li>• <strong>Marangu Route</strong> - "Coca-Cola Route" - 5-6 days</li>
                  <li>• <strong>Rongai Route</strong> - Dry northern approach - 6-7 days</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                  <span className="text-green-500 mr-2">📊</span>
                  Success Rates
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• <strong>7-8 day routes:</strong> 90-95% success rate</li>
                  <li>• <strong>6 day routes:</strong> 85-90% success rate</li>
                  <li>• <strong>5 day routes:</strong> 60-70% success rate</li>
                  <li>• Proper acclimatization is key to success</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Kilimanjaro Experience Categories Section - MOVED BELOW HISTORY */}
      <section id="experience-section" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
                Choose Your Kilimanjaro Experience
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                From multi-day summit expeditions to cultural day trips, find the perfect adventure that matches your fitness level and travel style.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-8"></div>
            </div>

            {/* Kilimanjaro Category Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {kilimanjaroCategories.map((category, index) => (
                <div
                  key={category.id}
                  className={`group relative overflow-hidden rounded-3xl p-8 text-white transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${category.bgColor} cursor-pointer`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-5 transition-opacity duration-300"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{category.emoji}</div>
                      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold">
                        {category.count} {category.count === 1 ? 'tour' : 'tours'}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3">{category.name}</h3>
                    <p className="text-white text-opacity-90 mb-4 text-sm leading-relaxed">
                      {category.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      {category.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <span className="mr-2">✓</span>
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-3 py-1">
                        {category.difficulty}
                      </span>
                      <span className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-3 py-1">
                        {category.duration}
                      </span>
                      {category.successRate && (
                        <span className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-3 py-1">
                          {category.successRate}% Success
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-8 text-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">95%</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Success Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">15,000+</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Happy Climbers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">5,895m</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Summit Height</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">⭐ 4.9</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Packages Display Section - Shows packages from selected category */}
      {selectedCategory && (
        <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {kilimanjaroCategories.find(cat => cat.id === selectedCategory)?.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {filteredTours.length} amazing {filteredTours.length === 1 ? 'adventure' : 'adventures'} waiting for you
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedCategory(null)}
                  className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400"
                >
                  ← Back to Categories
                </Button>
              </div>

              {filteredTours.length > 0 ? (
                // FIXED: Pass the filteredTours directly to ToursGrid
                <ToursGrid 
                  tours={filteredTours} // This prop will now be used
                  onBookNow={handleBookNow} 
                  activeSection="kilimanjaro"
                />
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🥾</div>
                  <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    No packages found in this category
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500 mb-6">
                    Check back soon for new adventures in this category
                  </p>
                  <Button onClick={() => setSelectedCategory(null)}>
                    Back to All Categories
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Success Calculator Section */}
      <section id="success-calculator" className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black transition-colors duration-300">
        <SuccessCalculator />
      </section>

      {/* What's Included Section */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Everything You Need to Summit
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We provide comprehensive support to ensure your safety, comfort, and success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {includedFeatures.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-600">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Expeditions */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Why Choose Majestic Trails?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍⚕️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">High-Altitude Experts</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our guides are certified in wilderness medicine and have 100+ summits each.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Small Groups</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Maximum 8 climbers per guide for personalized attention and safety.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">95% Success Rate</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Industry-leading summit success through proper acclimatization and pacing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-3xl p-12 text-center max-w-4xl mx-auto shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Conquer Kilimanjaro?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of successful adventurers who've experienced the magic of Kilimanjaro with us. 
              Your summit adventure awaits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => document.getElementById('experience-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-orange-600 hover:bg-orange-50"
              >
                🥾 Choose Your Experience
              </Button>
              <Link href="/safari">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                  🦁 Add a Safari Adventure?
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={handleCloseBooking}
        tour={selectedTour}
      />
    </div>
  );
}
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  { 
    image: "https://restaurantindia.s3.ap-south-1.amazonaws.com/s3fs-public/2025-01/photo-1414235077428-338989a2e.JPG", 
    alt: "Delicious Food 1",
    title: "Authentic Local Cuisine",
    subtitle: "Taste the flavors of Chhindwara"
  },
  { 
    image: "https://restaurantindia.s3.ap-south-1.amazonaws.com/s3fs-public/content12975.jpg", 
    alt: "Delicious Food 2",
    title: "Freshly Made Daily",
    subtitle: "Prepared with love by local chefs"
  },
  { 
    image: "https://parisjetaime.com/data/layout_image/11250_Les-Pinces-Plat--630x405--%C2%A9-Telly-Vision.jpg?ver=1687768724", 
    alt: "Delicious Food 3",
    title: "Seasonal Specialties",
    subtitle: "Discover our limited-time offerings"
  },
];

export const UserSlide = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-xl shadow-2xl">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ 
          clickable: true,
          el: '.swiper-pagination',
          type: 'bullets',
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active'
        }}
        autoplay={{ 
          delay: 5000,
          disableOnInteraction: false
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
        loop={true}
        speed={1000}
        className="h-[400px] md:h-[600px] lg:h-[700px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-1/4 left-0 right-0 text-center px-8 transform translate-y-1/2">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 animate-fadeIn">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl mx-auto animate-fadeIn delay-100">
                  {slide.subtitle}
                </p>
               <a href="/AllProducts"> <button className="bg-white text-indigo-700 px-8 py-3 rounded-full font-semibold hover:bg-indigo-100 transition-all duration-300 shadow-lg animate-fadeIn delay-200">
                  Order Now
                </button></a>
              </div>
            </div>
          </SwiperSlide>
        ))}
        
        {/* Custom Navigation Arrows */}
        <div className="swiper-button-prev !text-white !w-12 !h-12 !rounded-full !bg-black/30 hover:!bg-black/50 !transition-all !duration-300 after:!text-xl"></div>
        <div className="swiper-button-next !text-white !w-12 !h-12 !rounded-full !bg-black/30 hover:!bg-black/50 !transition-all !duration-300 after:!text-xl"></div>
        
        {/* Custom Pagination */}
        <div className="swiper-pagination !bottom-8"></div>
      </Swiper>
      
      {/* Overlay decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/50 to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
    </div>
  );
};
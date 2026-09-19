import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  ShoppingBag,
  Star,
  CheckCircle2,
  Clock,
  Calendar,
  Award,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Truck,
  Heart,
  X,
  ChevronRight,
  BookOpen,
  Eye,
  BadgeCheck
} from 'lucide-react';
import { ACADEMY_COURSES, BOUTIQUE_PRODUCTS, CourseItem, ProductItem } from '../../data/coursesAndProductsData';
import { useBusiness } from '../../context/BusinessContext';

interface CoursesAndProductsPageProps {
  onBackToStudio: () => void;
}

export const CoursesAndProductsPage: React.FC<CoursesAndProductsPageProps> = ({ onBackToStudio }) => {
  const { business } = useBusiness();
  const [activeFilter, setActiveFilter] = useState<'all' | 'courses' | 'products'>('all');
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Studio WhatsApp contact number (defaulting to clean standard)
  const cleanPhone = (business.whatsapp || business.phone || '9175757003').replace(/\D/g, '');

  const handleWhatsAppInquiry = (itemTitle: string, itemType: 'course' | 'product', price: string) => {
    const text = itemType === 'course'
      ? `Hello! I would like to inquire about enrolling in the "${itemTitle}" (${price}) at ${business.businessName}. Please share upcoming batch dates and enrollment procedure.`
      : `Hello! I would like to order "${itemTitle}" (${price}) from the ${business.businessName} boutique. Please let me know payment and delivery details.`;

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#fdf9f4] text-[#1c1c19] flex flex-col font-sans selection:bg-[#775a25] selection:text-[#ffffff]">
      
      {/* 1. Header Bar */}
      <header className="sticky top-0 z-40 bg-[#fdf9f4]/95 backdrop-blur-xl border-b border-[#2b211f]/8 shadow-[0_4px_20px_-2px_rgba(43,33,31,0.04)]">
        <div className="h-16 sm:h-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-2">
          
          {/* Back to Studio Link */}
          <button
            onClick={onBackToStudio}
            className="group inline-flex items-center gap-1.5 sm:gap-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#4e4543] hover:text-[#140c0a] transition-colors py-2 px-2.5 sm:px-3.5 rounded-lg bg-[#f1ede8] hover:bg-[#ebe6df] shrink-0"
            title="Return to Main Studio Services"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#775a25] group-hover:-translate-x-1 transition-transform" />
            <span className="hidden xs:inline">Studio Home</span>
            <span className="xs:hidden">Studio</span>
          </button>

          {/* Central Title - Academy & Beauty Boutique ONLY */}
          <div className="text-center min-w-0 px-2 flex-1">
            <h1 className="font-serif text-base sm:text-xl font-bold text-[#140c0a] tracking-tight truncate leading-tight">
              Academy &amp; Beauty Boutique
            </h1>
            <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] text-[#775a25] hidden xs:block -mt-0.5">
              Masterclasses &amp; Formulations
            </span>
          </div>

          {/* Quick WhatsApp Concierge */}
          <a
            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello! I am browsing the Academy & Beauty Boutique courses and products and have an inquiry.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-[#25d366] hover:bg-[#20bd5a] text-white rounded-lg text-[10px] sm:text-[12px] font-semibold uppercase tracking-wider shadow-xs transition-all shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
            <span className="hidden sm:inline">WhatsApp Inquiries</span>
            <span className="sm:hidden">Inquire</span>
          </a>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="w-full py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#f7f3ee] to-[#fdf9f4] border-b border-[#2b211f]/6 relative overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#775a25]/10 text-[#775a25] border border-[#775a25]/20 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Curated Formulations &amp; Professional Education</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#140c0a] font-normal tracking-tight leading-[1.2] max-w-4xl mx-auto mb-4 sm:mb-6">
            Master the Craft. Shop Atelier Formulations.
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-[#4e4543] font-light max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 px-2">
            Professional certified masterclasses taught by internationally certified artists, alongside salon-tested bridal essentials formulated for timeless radiance.
          </p>

          {/* Trust Highlights Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl mx-auto pt-5 border-t border-[#2b211f]/10">
            <div className="flex flex-col items-center p-2.5 sm:p-3 bg-white/70 backdrop-blur-xs rounded-xl border border-[#2b211f]/5 shadow-2xs">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-[#775a25] mb-1" />
              <span className="font-semibold text-xs sm:text-sm text-[#140c0a]">Certified Diplomas</span>
              <span className="text-[10px] sm:text-[11px] text-[#4e4543]">Recognized Standards</span>
            </div>

            <div className="flex flex-col items-center p-2.5 sm:p-3 bg-white/70 backdrop-blur-xs rounded-xl border border-[#2b211f]/5 shadow-2xs">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#775a25] mb-1" />
              <span className="font-semibold text-xs sm:text-sm text-[#140c0a]">PFW / DFW Mastery</span>
              <span className="text-[10px] sm:text-[11px] text-[#4e4543]">International Techniques</span>
            </div>

            <div className="flex flex-col items-center p-2.5 sm:p-3 bg-white/70 backdrop-blur-xs rounded-xl border border-[#2b211f]/5 shadow-2xs">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#775a25] mb-1" />
              <span className="font-semibold text-xs sm:text-sm text-[#140c0a]">100% Authentic</span>
              <span className="text-[10px] sm:text-[11px] text-[#4e4543]">Bridal Studio Quality</span>
            </div>

            <div className="flex flex-col items-center p-2.5 sm:p-3 bg-white/70 backdrop-blur-xs rounded-xl border border-[#2b211f]/5 shadow-2xs">
              <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-[#775a25] mb-1" />
              <span className="font-semibold text-xs sm:text-sm text-[#140c0a]">Pan-India Shipping</span>
              <span className="text-[10px] sm:text-[11px] text-[#4e4543]">Express Delivery</span>
            </div>
          </div>

        </div>

        {/* Decorative ambient background glows */}
        <div className="absolute -top-12 -left-12 w-80 h-80 bg-[#ffd796]/25 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-[#b56d78]/15 rounded-full blur-3xl pointer-events-none -z-10" />
      </section>

      {/* 3. Filter Navigation Tabs */}
      <section className="sticky top-16 sm:top-20 z-30 bg-[#fdf9f4]/95 backdrop-blur-md border-b border-[#2b211f]/8 py-3 sm:py-4">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar scroll-smooth">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeFilter === 'all'
                ? 'bg-[#140c0a] text-white shadow-xs'
                : 'bg-[#f1ede8] text-[#4e4543] hover:text-[#140c0a] hover:bg-[#ebe6df]'
            }`}
          >
            All Offerings ({ACADEMY_COURSES.length + BOUTIQUE_PRODUCTS.length})
          </button>

          <button
            onClick={() => setActiveFilter('courses')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
              activeFilter === 'courses'
                ? 'bg-[#140c0a] text-white shadow-xs'
                : 'bg-[#f1ede8] text-[#4e4543] hover:text-[#140c0a] hover:bg-[#ebe6df]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Courses ({ACADEMY_COURSES.length})</span>
          </button>

          <button
            onClick={() => setActiveFilter('products')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
              activeFilter === 'products'
                ? 'bg-[#140c0a] text-white shadow-xs'
                : 'bg-[#f1ede8] text-[#4e4543] hover:text-[#140c0a] hover:bg-[#ebe6df]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Boutique ({BOUTIQUE_PRODUCTS.length})</span>
          </button>
        </div>
      </section>

      {/* 4. Main Catalog Content */}
      <main className="max-w-[1360px] mx-auto px-5 lg:px-12 py-14 sm:py-20 flex-1">
        
        {/* === SECTION A: COURSES & MASTERCLASSES === */}
        {(activeFilter === 'all' || activeFilter === 'courses') && (
          <div className="mb-20">
            {/* Category Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#2b211f]/10">
              <div>
                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#775a25] block mb-1">
                  PROFESSIONAL ACADEMY
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#140c0a] font-normal tracking-tight">
                  Makeup &amp; Hair Masterclasses
                </h2>
              </div>
              <p className="text-sm text-[#4e4543] font-light max-w-md">
                Certified curriculums designed to elevate your personal grooming or launch your international bridal artistry career.
              </p>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ACADEMY_COURSES.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col border border-[#2b211f]/8 group"
                >
                  {/* Visual Header */}
                  <div className="relative h-64 overflow-hidden bg-[#f1ede8]">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{ objectPosition: course.imagePosition || 'center 15%' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140c0a]/75 via-transparent to-transparent" />
                    
                    {/* Tag badge */}
                    <span className="absolute top-4 left-4 bg-[#140c0a]/80 backdrop-blur-md text-[#ffd796] px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border border-[#ffd796]/30">
                      {course.tag}
                    </span>

                    {/* Level */}
                    <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-[#140c0a] px-2.5 py-1 rounded-full text-[10px] font-medium shadow-xs">
                      {course.level}
                    </span>

                    {/* Bottom overlay on image */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#ffd796]" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1 text-[#ffd796]">
                        <Star className="w-3.5 h-3.5 fill-[#ffd796]" />
                        {course.rating} ({course.studentsCount})
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-xl text-[#140c0a] font-medium mb-2 leading-snug">
                        {course.title}
                      </h3>
                      <p className="text-xs text-[#4e4543] font-light leading-relaxed mb-4 line-clamp-2">
                        {course.description}
                      </p>

                      {/* Syllabus Snippets */}
                      <div className="space-y-1.5 mb-5 bg-[#fbf8f4] p-3.5 rounded-xl border border-[#2b211f]/5">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#775a25] block mb-1">
                          Key Curriculum Modules:
                        </span>
                        {course.syllabus.slice(0, 3).map((item, i) => (
                          <div key={i} className="flex items-start gap-2 text-[11px] text-[#4e4543]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#775a25] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer / Price & Actions */}
                    <div className="pt-4 border-t border-[#2b211f]/8">
                      <div className="flex items-baseline justify-between mb-4">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#4e4543] block">Tuition</span>
                          <span className="font-serif text-2xl font-semibold text-[#140c0a]">
                            {course.price}
                          </span>
                          {course.originalPrice && (
                            <span className="text-xs text-[#8c827a] line-through ml-2">
                              {course.originalPrice}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#775a25] font-semibold bg-[#775a25]/10 px-2.5 py-1 rounded-md">
                          Cert. Included
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setSelectedCourse(course)}
                          className="w-full py-2.5 rounded-lg border border-[#2b211f]/15 hover:border-[#140c0a] text-[#140c0a] text-xs font-semibold uppercase tracking-wider hover:bg-[#f1ede8] transition-colors"
                        >
                          Curriculum
                        </button>
                        <button
                          onClick={() => handleWhatsAppInquiry(course.title, 'course', course.price)}
                          className="w-full py-2.5 rounded-lg bg-[#25d366] hover:bg-[#20bd5a] text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-colors flex items-center justify-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-white" />
                          <span>Enroll</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === SECTION B: CURATED BOUTIQUE PRODUCTS === */}
        {(activeFilter === 'all' || activeFilter === 'products') && (
          <div>
            {/* Category Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#2b211f]/10">
              <div>
                <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#775a25] block mb-1">
                  BOUTIQUE COLLECTION
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#140c0a] font-normal tracking-tight">
                  Bridal &amp; Vanity Essentials
                </h2>
              </div>
              <p className="text-sm text-[#4e4543] font-light max-w-md">
                Hand-curated formulations, tools, and accessories tested rigorously on real brides for humidity resistance and all-day glow.
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {BOUTIQUE_PRODUCTS.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col border border-[#2b211f]/8 group"
                >
                  {/* Visual Header */}
                  <div className="relative h-64 overflow-hidden bg-[#f1ede8]">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{ objectPosition: product.imagePosition || 'center 20%' }}
                    />
                    
                    {/* Badge */}
                    <span className="absolute top-4 left-4 bg-[#140c0a]/85 backdrop-blur-md text-[#ffd796] px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border border-[#ffd796]/30">
                      {product.tag}
                    </span>

                    {/* In Stock */}
                    <span className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-medium">
                      In Stock
                    </span>

                    {product.badge && (
                      <span className="absolute bottom-3 left-4 bg-[#775a25] text-white px-3 py-1 rounded-md text-[10px] font-medium shadow-sm">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] uppercase tracking-wider text-[#775a25] font-semibold">
                          {product.category}
                        </span>
                        <div className="flex items-center gap-1 text-amber-600 text-xs">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          <span className="font-medium">{product.rating}</span>
                          <span className="text-[#8c827a]">({product.reviewsCount})</span>
                        </div>
                      </div>

                      <h3 className="font-serif text-lg text-[#140c0a] font-medium mb-1.5 leading-snug">
                        {product.title}
                      </h3>

                      <p className="text-xs text-[#4e4543] font-light leading-relaxed mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      {product.volumeOrWeight && (
                        <span className="inline-block text-[11px] text-[#775a25] bg-[#f7f3ee] px-2.5 py-1 rounded-md mb-4 font-medium">
                          {product.volumeOrWeight}
                        </span>
                      )}
                    </div>

                    {/* Price & Buy Action */}
                    <div className="pt-4 border-t border-[#2b211f]/8">
                      <div className="flex items-baseline justify-between mb-4">
                        <div>
                          <span className="font-serif text-2xl font-semibold text-[#140c0a]">
                            {product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-[#8c827a] line-through ml-2">
                              {product.originalPrice}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-emerald-700 font-medium">
                          Free Studio Packaging
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="w-full py-2.5 rounded-lg border border-[#2b211f]/15 hover:border-[#140c0a] text-[#140c0a] text-xs font-semibold uppercase tracking-wider hover:bg-[#f1ede8] transition-colors"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => handleWhatsAppInquiry(product.title, 'product', product.price)}
                          className="w-full py-2.5 rounded-lg bg-[#140c0a] hover:bg-[#2b211f] text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-colors flex items-center justify-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-[#ffd796]" />
                          <span>Order</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* 5. Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedCourse(null)}
            className="fixed inset-0 bg-[#140c0a]/65 backdrop-blur-xs transition-opacity"
          />
          <div className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl z-10 border border-[#2b211f]/10 my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#140c0a]/60 text-white hover:bg-[#140c0a] flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-[#f1ede8]">
              <img
                src={selectedCourse.image}
                alt={selectedCourse.title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                style={{ objectPosition: selectedCourse.imagePosition || 'center 20%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140c0a]/85 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-6 right-4 sm:right-6 text-white">
                <span className="bg-[#775a25] text-[#ffd796] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider border border-[#ffd796]/30 inline-block mb-1.5 sm:mb-2">
                  {selectedCourse.tag}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-medium leading-tight">
                  {selectedCourse.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 max-h-[55vh] sm:max-h-[60vh] overflow-y-auto">
              {/* Quick Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 bg-[#fbf8f4] p-3 sm:p-4 rounded-xl border border-[#2b211f]/5 text-xs">
                <div>
                  <span className="text-[#8c827a] block text-[9px] sm:text-[10px] uppercase tracking-wider">Duration</span>
                  <span className="font-semibold text-[#140c0a] text-xs sm:text-sm">{selectedCourse.duration}</span>
                </div>
                <div>
                  <span className="text-[#8c827a] block text-[9px] sm:text-[10px] uppercase tracking-wider">Level</span>
                  <span className="font-semibold text-[#140c0a] text-xs sm:text-sm">{selectedCourse.level}</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[#8c827a] block text-[9px] sm:text-[10px] uppercase tracking-wider">Batches</span>
                  <span className="font-semibold text-[#140c0a] text-xs sm:text-sm">{selectedCourse.batches}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#775a25] mb-2">
                  Course Overview
                </h4>
                <p className="text-xs sm:text-sm text-[#4e4543] font-light leading-relaxed">
                  {selectedCourse.description}
                </p>
              </div>

              {/* Syllabus */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#775a25] mb-3">
                  Comprehensive Syllabus
                </h4>
                <div className="space-y-2">
                  {selectedCourse.syllabus.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#140c0a]">
                      <CheckCircle2 className="w-4 h-4 text-[#775a25] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What You Receive */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#775a25] mb-3">
                  Certification &amp; Inclusions
                </h4>
                <div className="space-y-2">
                  {selectedCourse.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#4e4543]">
                      <Award className="w-4 h-4 text-[#ffd796] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certificate badge */}
              <div className="bg-[#775a25]/10 border border-[#775a25]/20 p-3.5 sm:p-4 rounded-xl flex items-center gap-3">
                <BadgeCheck className="w-7 h-7 sm:w-8 sm:h-8 text-[#775a25] shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#775a25] block">
                    Awarded Qualification
                  </span>
                  <span className="font-serif text-xs sm:text-sm font-semibold text-[#140c0a]">
                    {selectedCourse.certification}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 sm:p-6 bg-[#fbf8f4] border-t border-[#2b211f]/8 flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-3 sm:gap-4">
              <div>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#4e4543] block">Tuition Fee</span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#140c0a]">
                  {selectedCourse.price}
                </span>
              </div>
              <button
                onClick={() => {
                  handleWhatsAppInquiry(selectedCourse.title, 'course', selectedCourse.price);
                  setSelectedCourse(null);
                }}
                className="w-full xs:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-[#25d366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-semibold uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Reserve via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
          <div
            onClick={() => setSelectedProduct(null)}
            className="fixed inset-0 bg-[#140c0a]/65 backdrop-blur-xs transition-opacity"
          />
          <div className="relative bg-white w-full max-w-2xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl z-10 border border-[#2b211f]/10 my-4 sm:my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#140c0a]/60 text-white hover:bg-[#140c0a] flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-[#f1ede8]">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                style={{ objectPosition: selectedProduct.imagePosition || 'center center' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140c0a]/85 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-6 right-4 sm:right-6 text-white">
                <span className="bg-[#775a25] text-[#ffd796] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider border border-[#ffd796]/30 inline-block mb-1.5 sm:mb-2">
                  {selectedProduct.tag}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-medium leading-tight">
                  {selectedProduct.title}
                </h3>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 max-h-[55vh] sm:max-h-[60vh] overflow-y-auto">
              <p className="text-xs sm:text-sm text-[#4e4543] font-light leading-relaxed">
                {selectedProduct.description}
              </p>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#775a25] mb-3">
                  Formulation &amp; Inclusions
                </h4>
                <div className="space-y-2">
                  {selectedProduct.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#140c0a]">
                      <CheckCircle2 className="w-4 h-4 text-[#775a25] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedProduct.volumeOrWeight && (
                <div className="bg-[#fbf8f4] p-3 sm:p-3.5 rounded-xl border border-[#2b211f]/5 flex items-center justify-between text-xs">
                  <span className="text-[#8c827a]">Net Contents:</span>
                  <span className="font-semibold text-[#140c0a]">{selectedProduct.volumeOrWeight}</span>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="p-4 sm:p-6 bg-[#fbf8f4] border-t border-[#2b211f]/8 flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-3 sm:gap-4">
              <div>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#4e4543] block">Price</span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-[#140c0a]">
                  {selectedProduct.price}
                </span>
              </div>
              <button
                onClick={() => {
                  handleWhatsAppInquiry(selectedProduct.title, 'product', selectedProduct.price);
                  setSelectedProduct(null);
                }}
                className="w-full xs:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-[#140c0a] hover:bg-[#2b211f] text-white rounded-xl text-xs font-semibold uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#ffd796]" />
                <span>Order via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Footer */}
      <footer className="w-full bg-[#140c0a] text-[#fdf9f4] border-t border-[#ffd796]/20 py-12">
        <div className="max-w-[1360px] mx-auto px-5 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <span className="font-serif text-xl font-bold text-white block">
              Academy &amp; Beauty Boutique
            </span>
            <span className="text-xs text-[#8c827a] font-light mt-0.5 block">
              Master Makeup Academy &amp; Haute Bridal Boutique
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider">
            <button
              onClick={onBackToStudio}
              className="text-[#ffd796] hover:underline"
            >
              Studio Services
            </button>
            <span className="text-neutral-600">•</span>
            <a
              href={`https://wa.me/${cleanPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#ffd796]"
            >
              WhatsApp Assistance
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};

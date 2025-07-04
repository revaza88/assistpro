import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, Calculator, Shield, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const serviceIcons = {
  accounting: Calculator,
  tax: Shield,
  legal: Building,
};

const serviceColors = {
  accounting: {
    bg: 'bg-gradient-to-br from-brand-blue-50 to-brand-blue-100',
    icon: 'text-brand-blue-600',
    button: 'bg-brand-blue-600 hover:bg-brand-blue-700',
  },
  tax: {
    bg: 'bg-gradient-to-br from-green-50 to-green-100',
    icon: 'text-green-600',
    button: 'bg-green-600 hover:bg-green-700',
  },
  legal: {
    bg: 'bg-gradient-to-br from-brand-gold-50 to-brand-gold-100',
    icon: 'text-brand-gold-600',
    button: 'bg-brand-gold-600 hover:bg-brand-gold-700',
  },
};

export default function ServicesCarousel() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const services = [
    {
      key: 'accounting',
      title: t('services.accounting.title'),
      description: t('services.accounting.navDesc'),
      icon: serviceIcons.accounting,
      href: '/services/accounting'
    },
    {
      key: 'tax',
      title: t('services.tax.title'),
      description: t('services.tax.navDesc'),
      icon: serviceIcons.tax,
      href: '/services/tax'
    },
    {
      key: 'legal',
      title: t('services.legal.title'),
      description: t('services.legal.navDesc'),
      icon: serviceIcons.legal,
      href: '/services/legal'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [services.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="relative h-96">
        {services.map((service, index) => {
          const colors = serviceColors[service.key as keyof typeof serviceColors];
          
          return (
            <div
              key={service.key}
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                index === currentSlide 
                  ? 'opacity-100 translate-x-0' 
                  : index < currentSlide 
                    ? 'opacity-0 -translate-x-full' 
                    : 'opacity-0 translate-x-full'
              }`}
            >
              <div className={`h-full ${colors.bg} p-8 flex items-center`}>
                <div className="flex-1">
                  <div className={`w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-lg`}>
                    <service.icon className={`w-8 h-8 ${colors.icon}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                  <p className="text-slate-700 mb-6 leading-relaxed">{service.description}</p>
                  <Link href={service.href}>
                    <Button className={`${colors.button} text-white`}>
                      დეტალურად ნახვა
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
      >
        <ChevronLeft className="w-5 h-5 text-slate-600" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
      >
        <ChevronRight className="w-5 h-5 text-slate-600" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? 'bg-white scale-110' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
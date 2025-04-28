
import { useState } from "react";
import { Service, services } from "@/lib/data";
import { Scissors } from "lucide-react";

interface ServiceSelectionProps {
  onSelectService: (service: Service) => void;
  selectedService: Service | null;
}

const ServiceSelection = ({ onSelectService, selectedService }: ServiceSelectionProps) => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Nossos Serviços</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map((service) => (
            <div 
              key={service.id}
              onClick={() => onSelectService(service)}
              className={`border-2 ${
                selectedService?.id === service.id 
                  ? 'border-barbershop-gold bg-barbershop-gold bg-opacity-10' 
                  : 'border-gray-200 hover:border-barbershop-gold'
              } p-6 transition-all cursor-pointer`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-barbershop-charcoal rounded-full text-white">
                  <Scissors size={18} />
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-barbershop-charcoal">
                  R$ {service.price}
                </span>
                <span className="text-gray-500 text-sm">
                  {service.duration} minutos
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSelection;


import { useState } from "react";
import { Barber, barbers } from "@/lib/data";
import { User } from "lucide-react";

interface BarberSelectionProps {
  onSelectBarber: (barber: Barber) => void;
  selectedBarber: Barber | null;
}

const BarberSelection = ({ onSelectBarber, selectedBarber }: BarberSelectionProps) => {
  return (
    <section id="barbers" className="py-20 bg-barbershop-lightgray">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Nossos Barbeiros</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {barbers.map((barber) => (
            <div 
              key={barber.id}
              onClick={() => onSelectBarber(barber)}
              className={`bg-white shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105 ${
                selectedBarber?.id === barber.id ? 'ring-2 ring-barbershop-gold' : ''
              }`}
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={barber.image} 
                  alt={barber.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{barber.name}</h3>
                <p className="text-gray-600 mb-4">{barber.description}</p>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <User size={16} className="mr-2" /> Especialidades
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {barber.specialties.map((specialty, index) => (
                      <span 
                        key={index} 
                        className="bg-barbershop-charcoal text-white text-xs px-2 py-1"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BarberSelection;

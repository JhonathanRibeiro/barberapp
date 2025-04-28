
import { useState } from "react";
import { Barber, Service, services, barbers } from "@/lib/data";
import { Check, Scissors, User, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { toast } from "sonner";

const BookingSection = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<{ date: Date; time: string } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedBarber || !selectedDateTime) {
      toast.error("Por favor, complete todas as seleções antes de agendar");
      return;
    }

    // Submit the form
    toast.success("Agendamento realizado com sucesso!");
    // Reset form
    setSelectedService(null);
    setSelectedBarber(null);
    setSelectedDateTime(null);
    setFormData({ name: "", email: "", phone: "" });
  };

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Agende seu Horário</h2>
        
        <div className="max-w-4xl mx-auto mt-12 bg-white p-6 shadow-lg rounded-lg">
          <div className="flex flex-wrap mb-8 gap-4">
            <div className={cn(
              "flex-1 p-4 border rounded-lg transition-all",
              selectedService ? "border-barbershop-gold bg-barbershop-gold/5" : "border-gray-200"
            )}>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Scissors className="w-5 h-5" />
                Serviço
              </h3>
              <div className="grid gap-2">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={cn(
                      "text-left p-3 rounded-md transition-all",
                      selectedService?.id === service.id
                        ? "bg-barbershop-gold text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    )}
                  >
                    <div className="font-medium">{service.name}</div>
                    <div className="text-sm opacity-75">
                      R$ {service.price} • {service.duration} min
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className={cn(
              "flex-1 p-4 border rounded-lg transition-all",
              selectedBarber ? "border-barbershop-gold bg-barbershop-gold/5" : "border-gray-200"
            )}>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Barbeiro
              </h3>
              <div className="grid gap-2">
                {barbers.map((barber) => (
                  <button
                    key={barber.id}
                    onClick={() => setSelectedBarber(barber)}
                    className={cn(
                      "text-left p-3 rounded-md transition-all",
                      selectedBarber?.id === barber.id
                        ? "bg-barbershop-gold text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    )}
                  >
                    <div className="font-medium">{barber.name}</div>
                    <div className="text-sm opacity-75">
                      {barber.specialties.join(" • ")}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {(selectedService && selectedBarber) && (
            <div className="space-y-6">
              <div className={cn(
                "p-4 border rounded-lg transition-all",
                selectedDateTime ? "border-barbershop-gold bg-barbershop-gold/5" : "border-gray-200"
              )}>
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Data e Horário
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDateTime?.date}
                    onSelect={(date) => {
                      if (date) {
                        // Fixed: Only update the state if date is not null
                        // and ensure the time property is always included
                        setSelectedDateTime({
                          date,
                          time: selectedDateTime?.time || ""
                        });
                      }
                    }}
                    className="rounded-md border"
                    disabled={(date) => date < new Date()}
                  />

                  <div className="grid grid-cols-3 gap-2 content-start">
                    {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"].map((time) => (
                      <button
                        key={time}
                        onClick={() => 
                          selectedDateTime?.date && 
                          setSelectedDateTime({
                            date: selectedDateTime.date,
                            time
                          })
                        }
                        disabled={!selectedDateTime?.date}
                        className={cn(
                          "p-2 rounded text-center transition-all",
                          selectedDateTime?.time === time
                            ? "bg-barbershop-gold text-white"
                            : "bg-gray-100 hover:bg-gray-200",
                          !selectedDateTime?.date && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-1 font-medium">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-barbershop-gold"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-1 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-barbershop-gold"
                    placeholder="seu.email@exemplo.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block mb-1 font-medium">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-barbershop-gold"
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-barbershop-gold text-white py-3 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-barbershop-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!selectedService || !selectedBarber || !selectedDateTime || !formData.name || !formData.email || !formData.phone}
                >
                  <Check className="w-5 h-5" />
                  Confirmar Agendamento
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingSection;

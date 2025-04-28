
import { useState } from "react";
import { addAppointment, Barber, Service } from "@/lib/data";
import { toast } from "sonner";
import { Check } from "lucide-react";

interface AppointmentFormProps {
  selectedBarber: Barber | null;
  selectedService: Service | null;
  selectedDateTime: { date: Date; time: string } | null;
  onAppointmentCreated: () => void;
}

const AppointmentForm = ({
  selectedBarber,
  selectedService,
  selectedDateTime,
  onAppointmentCreated
}: AppointmentFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedBarber || !selectedService || !selectedDateTime) {
      toast.error("Por favor, complete todas as seleções antes de agendar");
      return;
    }

    setIsSubmitting(true);

    // In a real app, you would make an API call here
    setTimeout(() => {
      try {
        addAppointment({
          barberId: selectedBarber.id,
          serviceId: selectedService.id,
          clientName: formData.name,
          clientEmail: formData.email,
          clientPhone: formData.phone,
          date: selectedDateTime.date.toISOString(),
          confirmed: false,
          completed: false
        });
        
        toast.success("Agendamento realizado com sucesso!");
        setFormData({ name: "", email: "", phone: "" });
        onAppointmentCreated();
      } catch (error) {
        toast.error("Erro ao criar agendamento. Tente novamente.");
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    }, 1000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
      <h3 className="text-xl font-bold mb-6">Seus Dados</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Nome Completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-barbershop-gold"
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
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-barbershop-gold"
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
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-barbershop-gold"
              placeholder="(00) 00000-0000"
            />
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={
                isSubmitting || 
                !selectedBarber || 
                !selectedService || 
                !selectedDateTime ||
                !formData.name ||
                !formData.email ||
                !formData.phone
              }
              className="w-full bg-barbershop-gold text-barbershop-black py-3 font-oswald uppercase tracking-wider font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                "Processando..."
              ) : (
                <>
                  <Check className="mr-2" size={18} />
                  Confirmar Agendamento
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;

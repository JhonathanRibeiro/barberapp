
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { barbers, services, appointments, updateAppointment, getBarberAppointments, Appointment } from "@/lib/data";
import { format } from "date-fns";
import { toast } from "sonner";
import { User, Calendar, Clock, Check, X } from "lucide-react";

const BarberPanel = () => {
  const [selectedBarberId, setSelectedBarberId] = useState<string>("");
  const [barberAppointments, setBarberAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  useEffect(() => {
    if (selectedBarberId) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const filteredAppointments = getBarberAppointments(selectedBarberId);
        setBarberAppointments(filteredAppointments);
        setLoading(false);
      }, 500);
    }
  }, [selectedBarberId]);
  
  const handleConfirmAppointment = (appointmentId: string) => {
    updateAppointment(appointmentId, { confirmed: true });
    setBarberAppointments(prev => 
      prev.map(app => 
        app.id === appointmentId ? { ...app, confirmed: true } : app
      )
    );
    toast.success("Agendamento confirmado!");
  };
  
  const handleCancelAppointment = (appointmentId: string) => {
    // In a real app, you'd also notify the client
    updateAppointment(appointmentId, { confirmed: false });
    setBarberAppointments(prev => 
      prev.map(app => 
        app.id === appointmentId ? { ...app, confirmed: false } : app
      )
    );
    toast.success("Agendamento cancelado!");
  };
  
  const handleMarkCompleted = (appointmentId: string) => {
    updateAppointment(appointmentId, { completed: true });
    setBarberAppointments(prev => 
      prev.map(app => 
        app.id === appointmentId ? { ...app, completed: true } : app
      )
    );
    toast.success("Agendamento marcado como concluído!");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-barbershop-black text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="font-oswald text-2xl font-bold tracking-wider text-barbershop-gold">
            PRIME CUT
          </Link>
          <div>
            <span className="hidden md:inline mr-4">Painel do Barbeiro</span>
            <Link 
              to="/" 
              className="bg-barbershop-gold text-barbershop-black px-4 py-2 font-medium hover:bg-opacity-90 transition-all text-sm"
            >
              Voltar ao Site
            </Link>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Painel do Barbeiro</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <User className="mr-2 text-barbershop-gold" size={20} />
            Selecione o Barbeiro
          </h2>
          
          <select 
            value={selectedBarberId}
            onChange={(e) => setSelectedBarberId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-barbershop-gold"
          >
            <option value="">Selecione um barbeiro...</option>
            {barbers.map(barber => (
              <option key={barber.id} value={barber.id}>{barber.name}</option>
            ))}
          </select>
        </div>
        
        {selectedBarberId && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Calendar className="mr-2 text-barbershop-gold" size={20} />
              Agendamentos
            </h2>
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-barbershop-gold"></div>
              </div>
            ) : barberAppointments.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Calendar size={48} className="mx-auto mb-4 text-gray-400" />
                <p>Nenhum agendamento encontrado</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {barberAppointments.map(appointment => {
                    const service = services.find(s => s.id === appointment.serviceId);
                    const appointmentDate = new Date(appointment.date);
                    
                    return (
                      <div 
                        key={appointment.id}
                        className={`border p-4 rounded-lg ${
                          appointment.completed 
                            ? 'bg-gray-100 border-gray-300' 
                            : appointment.confirmed 
                            ? 'bg-green-50 border-green-300' 
                            : 'bg-amber-50 border-amber-300'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold text-lg">{appointment.clientName}</h3>
                            <p className="text-sm text-gray-600">{service?.name}</p>
                          </div>
                          <div className={`px-2 py-1 text-xs rounded-full font-medium ${
                            appointment.completed 
                              ? 'bg-gray-200 text-gray-700' 
                              : appointment.confirmed 
                              ? 'bg-green-200 text-green-800' 
                              : 'bg-amber-200 text-amber-800'
                          }`}>
                            {appointment.completed 
                              ? 'Concluído' 
                              : appointment.confirmed 
                              ? 'Confirmado' 
                              : 'Pendente'
                            }
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-2 text-gray-600" />
                            <span className="text-sm">
                              {format(appointmentDate, "dd/MM/yyyy")}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock size={14} className="mr-2 text-gray-600" />
                            <span className="text-sm">
                              {format(appointmentDate, "HH:mm")}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <User size={14} className="mr-2 text-gray-600" />
                            <span className="text-sm break-all">
                              {appointment.clientPhone}
                            </span>
                          </div>
                        </div>
                        
                        {!appointment.completed && (
                          <div className="flex gap-2 mt-3">
                            {!appointment.confirmed ? (
                              <button
                                onClick={() => handleConfirmAppointment(appointment.id)}
                                className="flex-1 bg-green-600 text-white py-1 px-2 rounded text-sm flex items-center justify-center"
                              >
                                <Check size={14} className="mr-1" />
                                Confirmar
                              </button>
                            ) : (
                              <button
                                onClick={() => handleMarkCompleted(appointment.id)}
                                className="flex-1 bg-barbershop-charcoal text-white py-1 px-2 rounded text-sm flex items-center justify-center"
                              >
                                <Check size={14} className="mr-1" />
                                Atendido
                              </button>
                            )}
                            <button
                              onClick={() => handleCancelAppointment(appointment.id)}
                              className="flex-1 bg-red-600 text-white py-1 px-2 rounded text-sm flex items-center justify-center"
                            >
                              <X size={14} className="mr-1" />
                              Cancelar
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-8 p-4 bg-barbershop-charcoal text-white rounded-lg">
              <h3 className="font-bold mb-2">Definir Horários Indisponíveis</h3>
              <p className="text-sm mb-4">
                Use esta área para bloquear horários ou dias em que você não estará disponível (folgas, férias, etc).
              </p>
              <button className="bg-barbershop-gold text-barbershop-black px-4 py-2 rounded text-sm font-medium">
                Gerenciar Disponibilidade
              </button>
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-barbershop-black text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Prime Cut Barbearia. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default BarberPanel;


export interface Barber {
  id: string;
  name: string;
  image: string;
  description: string;
  specialties: string[];
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
  description: string;
}

export interface Appointment {
  id: string;
  barberId: string;
  serviceId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  date: string; // ISO string
  confirmed: boolean;
  completed: boolean;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

// Sample data
export const barbers: Barber[] = [
  {
    id: "b1",
    name: "Carlos Silva",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop",
    description: "Especialista em cortes modernos e barbas estilizadas. Com mais de 10 anos de experiência.",
    specialties: ["Corte degradê", "Barba completa", "Navalha"]
  },
  {
    id: "b2",
    name: "André Santos",
    image: "https://images.unsplash.com/photo-1567894340315-735d7c361db0?q=80&w=1974&auto=format&fit=crop",
    description: "Mestre barbeiro com técnicas precisas em desenhos e acabamentos perfeitos.",
    specialties: ["Desenhos", "Corte tesoura", "Sobrancelha"]
  },
  {
    id: "b3",
    name: "Marcos Oliveira",
    image: "https://images.unsplash.com/photo-1622296089861-61a593ee151d?q=80&w=1974&auto=format&fit=crop",
    description: "Especializado em estilos clássicos e vintage. Traz o melhor da tradição para o presente.",
    specialties: ["Pompadour", "Barba vintage", "Hot towel"]
  }
];

export const services: Service[] = [
  {
    id: "s1",
    name: "Corte Masculino",
    price: 60,
    duration: 30,
    description: "Corte tradicional com acabamento perfeito"
  },
  {
    id: "s2",
    name: "Barba",
    price: 40,
    duration: 20,
    description: "Modelagem e hidratação da barba"
  },
  {
    id: "s3",
    name: "Corte + Barba",
    price: 90,
    duration: 50,
    description: "Combo completo: corte e barba"
  },
  {
    id: "s4",
    name: "Corte Infantil",
    price: 45,
    duration: 25,
    description: "Para crianças até 12 anos"
  },
  {
    id: "s5",
    name: "Sobrancelha",
    price: 25,
    duration: 15,
    description: "Design e alinhamento da sobrancelha"
  }
];

// Sample appointments
export const appointments: Appointment[] = [
  {
    id: "a1",
    barberId: "b1",
    serviceId: "s1",
    clientName: "João Paulo",
    clientEmail: "joao@email.com",
    clientPhone: "(11) 99999-8888",
    date: "2025-05-01T14:00:00",
    confirmed: true,
    completed: false
  },
  {
    id: "a2",
    barberId: "b2",
    serviceId: "s3",
    clientName: "Ricardo Mendes",
    clientEmail: "ricardo@email.com",
    clientPhone: "(11) 98888-7777",
    date: "2025-05-02T10:00:00",
    confirmed: true,
    completed: false
  }
];

// Generate available time slots
export const generateTimeSlots = (date: Date, barberId: string): TimeSlot[] => {
  // Business hours: 9:00 to 19:00
  const startHour = 9;
  const endHour = 19;
  const slots: TimeSlot[] = [];

  // Convert date to string for comparison
  const dateString = date.toISOString().split('T')[0];
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      
      // Check if this time slot is booked
      const isBooked = appointments.some(appointment => {
        const appointmentDate = new Date(appointment.date);
        return (
          appointment.barberId === barberId &&
          appointmentDate.toISOString().split('T')[0] === dateString &&
          appointmentDate.getHours() === hour &&
          appointmentDate.getMinutes() === minute
        );
      });

      slots.push({
        time: timeString,
        available: !isBooked
      });
    }
  }

  return slots;
};

export const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
  const newAppointment = {
    ...appointment,
    id: `a${appointments.length + 1}`,
    confirmed: false,
    completed: false
  };
  
  appointments.push(newAppointment);
  return newAppointment;
};

export const getBarberAppointments = (barberId: string) => {
  return appointments.filter(app => app.barberId === barberId);
};

export const updateAppointment = (id: string, data: Partial<Appointment>) => {
  const index = appointments.findIndex(app => app.id === id);
  if (index !== -1) {
    appointments[index] = { ...appointments[index], ...data };
    return appointments[index];
  }
  return null;
};

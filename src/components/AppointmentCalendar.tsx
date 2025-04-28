
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { generateTimeSlots, TimeSlot } from "@/lib/data";
import { format } from "date-fns";
import { Clock, Calendar as CalendarIcon } from "lucide-react";

interface AppointmentCalendarProps {
  selectedBarberId: string | null;
  onSelectDateTime: (date: Date, time: string) => void;
}

const AppointmentCalendar = ({ selectedBarberId, onSelectDateTime }: AppointmentCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    if (selectedDate && selectedBarberId) {
      const slots = generateTimeSlots(selectedDate, selectedBarberId);
      setTimeSlots(slots);
      setSelectedTime(null);
    }
  }, [selectedDate, selectedBarberId]);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (selectedDate) {
      const [hours, minutes] = time.split(':').map(Number);
      const dateTime = new Date(selectedDate);
      dateTime.setHours(hours, minutes);
      onSelectDateTime(dateTime, time);
    }
  };

  const today = new Date();
  // Set to beginning of today
  today.setHours(0, 0, 0, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="flex items-center mb-4">
            <CalendarIcon className="mr-2 text-barbershop-gold" size={20} />
            <h3 className="text-xl font-bold">Escolha a Data</h3>
          </div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={(date) => date < today}
            className="border border-gray-200 rounded-lg"
          />
        </div>
        
        <div className="md:w-1/2">
          <div className="flex items-center mb-4">
            <Clock className="mr-2 text-barbershop-gold" size={20} />
            <h3 className="text-xl font-bold">Horários Disponíveis</h3>
          </div>
          
          {selectedDate ? (
            <>
              <p className="mb-4 text-gray-600">
                {format(selectedDate, "dd 'de' MMMM 'de' yyyy")}
              </p>
              
              {selectedBarberId ? (
                timeSlots.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => slot.available && handleTimeSelect(slot.time)}
                        disabled={!slot.available}
                        className={`time-slot ${!slot.available ? 'disabled' : ''} ${
                          selectedTime === slot.time ? 'selected' : ''
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p>Carregando horários disponíveis...</p>
                )
              ) : (
                <p className="text-amber-600">Selecione um barbeiro primeiro</p>
              )}
            </>
          ) : (
            <p className="text-amber-600">Selecione uma data primeiro</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendar;

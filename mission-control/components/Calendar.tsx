"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CalendarEvent } from "@/types";
import { formatDate, formatTime, cn } from "@/lib/utils";
import { Plus, Clock, Calendar as CalendarIcon, Repeat, Trash2, Bell, Zap, Users } from "lucide-react";
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";
import { fr } from "date-fns/locale";

const EVENT_COLORS = {
  task: "bg-blue-500",
  reminder: "bg-yellow-500",
  cron: "bg-purple-500",
  meeting: "bg-green-500",
};

const EVENT_ICONS = {
  task: <Zap className="w-3 h-3" />,
  reminder: <Bell className="w-3 h-3" />,
  cron: <Clock className="w-3 h-3" />,
  meeting: <Users className="w-3 h-3" />,
};

export function Calendar() {
  const events = useQuery(api.tasks.getEvents) || [];
  const createEvent = useMutation(api.tasks.createEvent);
  const deleteEvent = useMutation(api.tasks.deleteEvent);
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isCreating, setIsCreating] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "task" as const,
    startTime: "",
    description: "",
    recurring: undefined as "daily" | "weekly" | "monthly" | undefined,
  });

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDay = (day: Date) => {
    return events.filter((e) => {
      const eventDate = new Date(e.startTime);
      return isSameDay(eventDate, day);
    });
  };

  const handleCreateEvent = async () => {
    if (!newEvent.title.trim() || !newEvent.startTime) return;
    
    const startTime = new Date(newEvent.startTime).getTime();
    
    await createEvent({
      title: newEvent.title,
      type: newEvent.type,
      startTime,
      description: newEvent.description,
      recurring: newEvent.recurring,
    });
    
    setNewEvent({
      title: "",
      type: "task",
      startTime: "",
      description: "",
      recurring: undefined,
    });
    setIsCreating(false);
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Calendrier</h2>
          <div className="flex items-center gap-2">
            <button onClick={prevMonth} className="p-2 hover:bg-slate-800 rounded">←</button>
            <span className="text-lg font-medium capitalize">
              {format(currentMonth, "MMMM yyyy", { locale: fr })}
            </span>
            <button onClick={nextMonth} className="p-2 hover:bg-slate-800 rounded">→</button>
          </div>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nouvel Événement
        </button>
      </div>

      {isCreating && (
        <div className="mb-6 p-4 bg-slate-800 rounded-lg border border-slate-700">
          <input
            type="text"
            placeholder="Titre de l'événement..."
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            className="w-full px-3 py-2 bg-slate-900 rounded border border-slate-700 mb-3 text-white"
          />
          <div className="flex gap-3 mb-3">
            <input
              type="datetime-local"
              value={newEvent.startTime}
              onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
              className="px-3 py-2 bg-slate-900 rounded border border-slate-700 text-white text-sm"
            />
            <select
              value={newEvent.type}
              onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as typeof newEvent.type })}
              className="px-3 py-2 bg-slate-900 rounded border border-slate-700 text-sm"
            >
              <option value="task">Tâche</option>
              <option value="reminder">Rappel</option>
              <option value="cron">Cron Job</option>
              <option value="meeting">Réunion</option>
            </select>
            <select
              value={newEvent.recurring || ""}
              onChange={(e) => setNewEvent({ ...newEvent, recurring: e.target.value as typeof newEvent.recurring || undefined })}
              className="px-3 py-2 bg-slate-900 rounded border border-slate-700 text-sm"
            >
              <option value="">Une fois</option>
              <option value="daily">Quotidien</option>
              <option value="weekly">Hebdomadaire</option>
              <option value="monthly">Mensuel</option>
            </select>
          </div>
          <textarea
            placeholder="Description (optionnelle)..."
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            className="w-full px-3 py-2 bg-slate-900 rounded border border-slate-700 mb-3 text-white text-sm h-20 resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={handleCreateEvent}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
            >
              Créer
            </button>
            <button
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-sm"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-7 gap-px bg-slate-700 rounded-lg overflow-hidden">
        {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((day) => (
          <div key={day} className="bg-slate-900 p-3 text-center text-sm font-medium text-slate-400">
            {day}
          </div>
        ))}
        
        {days.map((day) => {
          const dayEvents = getEventsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          
          return (
            <div
              key={day.toISOString()}
              className={cn(
                "bg-slate-800 min-h-[100px] p-2 cursor-pointer hover:bg-slate-750 transition-colors",
                !isCurrentMonth && "opacity-50",
                isSameDay(day, new Date()) && "ring-2 ring-blue-500"
              )}
              onClick={() => setSelectedDate(day)}
            >
              <div className="text-sm font-medium text-slate-300 mb-1">
                {format(day, "d")}
              </div>
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event._id}
                    className={cn(
                      "text-xs px-1.5 py-0.5 rounded text-white truncate flex items-center gap-1",
                      EVENT_COLORS[event.type]
                    )}
                  >
                    {EVENT_ICONS[event.type]}
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-slate-500">+{dayEvents.length - 3} autre(s)</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <DayModal
          date={selectedDate}
          events={getEventsForDay(selectedDate)}
          onClose={() => setSelectedDate(null)}
          onDelete={(id) => deleteEvent({ id })}
        />
      )}
    </div>
  );
}

function DayModal({
  date,
  events,
  onClose,
  onDelete,
}: {
  date: Date;
  events: CalendarEvent[];
  onClose: () => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-xl border border-slate-700 w-full max-w-md">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold capitalize">{format(date, "EEEE d MMMM yyyy", { locale: fr })}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>
        <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
          {events.length === 0 ? (
            <p className="text-slate-500 text-center py-4">Aucun événement prévu</p>
          ) : (
            events.map((event) => (
              <div key={event._id} className="bg-slate-800 p-3 rounded-lg flex items-start justify-between group">
                <div className="flex items-start gap-3">
                  <div className={cn("p-2 rounded text-white", EVENT_COLORS[event.type])}>
                    {EVENT_ICONS[event.type]}
                  </div>
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-slate-400">{formatTime(event.startTime)}</p>
                    {event.description && (
                      <p className="text-sm text-slate-500 mt-1">{event.description}</p>
                    )}
                    {event.recurring && (
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500 mt-2">
                        <Repeat className="w-3 h-3" />
                        Récurrence : {event.recurring}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => onDelete(event._id)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 text-red-500 rounded transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

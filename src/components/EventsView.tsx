import React, { useState } from "react";
import { motion } from "motion/react";
import { Calendar, Clock, MapPin, User, BookOpen, UserCheck, ShieldCheck, Mail, ArrowRight, Award, Trophy } from "lucide-react";
import { LabEvent } from "../types";

interface EventsViewProps {
  events: LabEvent[];
}

export default function EventsView({ events }: EventsViewProps) {
  const [selectedEvent, setSelectedEvent] = useState<LabEvent | null>(null);
  const [attendeeName, setAttendeeName] = useState("");
  const [attendeeEmail, setAttendeeEmail] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>([]);
  const [showRegisterSuccess, setShowRegisterSuccess] = useState(false);

  // Local state for seat update simulator
  const [localEvents, setLocalEvents] = useState<LabEvent[]>(events);

  const handleOpenDetail = (evt: LabEvent) => {
    setSelectedEvent(evt);
    setShowRegisterSuccess(false);
    setAttendeeName("");
    setAttendeeEmail("");
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendeeName || !attendeeEmail || !selectedEvent) return;

    setIsRegistering(true);

    setTimeout(() => {
      // Simulate successful registration
      setRegisteredEventIds([...registeredEventIds, selectedEvent.id]);
      
      // Update seats locally
      setLocalEvents(prev => prev.map(evt => {
        if (evt.id === selectedEvent.id) {
          return {
            ...evt,
            seatsRegistered: evt.seatsRegistered + 1
          };
        }
        return evt;
      }));

      setIsRegistering(false);
      setShowRegisterSuccess(true);
    }, 1000);
  };

  const categories = ["All", "Workshop", "Bootcamp", "Hackathon", "FDP"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredEvents = localEvents.filter(evt => {
    return activeCategory === "All" || evt.category === activeCategory;
  });

  // Mock lab coordinators & student team
  const labTeam = [
    {
      name: "Dr. Siby S.",
      role: "Senior Lab Coordinator",
      dept: "Mechanical Engineering",
      image: "/images/avatar1.png"
    },
    {
      name: "Prof. Abraham Kurian",
      role: "Technical Coordinator",
      dept: "Electronics & Comm",
      image: "/images/avatar2.png"
    },
    {
      name: "Joel Mathew Varghese",
      role: "Student Mentor Lead",
      dept: "S7 CSE",
      image: "/images/avatar3.png"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5 }}
      className="space-y-24 pb-16"
    >
      {/* Event Header segment */}
      <section className="relative px-4 py-12 md:py-16 text-center bg-blue-50/20 border-b border-slate-200/40 rounded-3xl mt-6 select-none overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#005aa3_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#005aa3] bg-blue-105 px-3 py-1 bg-blue-50 rounded-full border border-blue-150">
            Skills Development
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight">Workshops & Events</h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
            Upskill by registering for our weekly hardware bootcamps, safety badges, or intercollegiate robotics hackathons.
          </p>
        </div>
      </section>

      {/* Events display section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12 text-left">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-6 gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-primary border-primary text-white"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <p className="text-slate-400 font-bold text-xs">
            Showing {filteredEvents.length} events
          </p>
        </div>

        {/* Main Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.map((evt) => {
            const seatsLeft = evt.seatsTotal - evt.seatsRegistered;
            const isRegistered = registeredEventIds.includes(evt.id);

            return (
              <div 
                key={evt.id}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group"
              >
                <div className="md:flex flex-1">
                  {/* Left Side: Thumbnail image */}
                  <div className="w-full md:w-2/5 h-48 md:h-auto overflow-hidden relative min-h-[180px]">
                    <img 
                      alt={evt.title} 
                      src={evt.image} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-slate-900/10"></div>
                    <span className="absolute top-4 left-4 text-[10px] uppercase font-black tracking-widest text-[#001c39] bg-[#d4e3ff] px-3 py-1 rounded-full shadow-sm border border-blue-200">
                      {evt.category}
                    </span>
                  </div>

                  {/* Right Side: details and texts */}
                  <div className="p-6 md:p-8 flex flex-col flex-1 text-left justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-extrabold text-slate-800 text-base md:text-lg hover:text-primary transition-colors leading-snug">
                        {evt.title}
                      </h3>
                      <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                        {evt.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-50 text-[11px] font-semibold text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{evt.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{evt.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{evt.venue}</span>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between shrink-0">
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                        evt.status === "Completed" 
                          ? "bg-slate-100 text-slate-400" 
                          : seatsLeft <= 3 
                            ? "bg-rose-50 text-rose-600 border border-rose-100" 
                            : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      }`}>
                        {evt.status === "Completed" 
                          ? "Completed" 
                          : isRegistered 
                            ? "Registered!" 
                            : `${seatsLeft} seats left`}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleOpenDetail(evt)}
                        className="text-xs font-black text-[#005aa3] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {evt.status === "Completed" ? "View Summary" : isRegistered ? "View Badge" : "Register / Details"}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SJCET Team Lead block section */}
      <section className="bg-slate-50/50 border-y border-slate-200/50 py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="max-w-xl mx-auto space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#005aa3] px-3 py-1 bg-blue-50 rounded-full border border-blue-105">
              Leadership
            </span>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">Our Core Coordinators</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Connect with department guides, laboratory superintendents, or student volunteers regarding complex research, project approval requests, or custom material questions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {labTeam.map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm flex flex-col items-center hover:shadow-md transition-shadow relative text-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-slate-100 relative shadow-inner">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent z-10 pointer-events-none"></div>
                  <img 
                    alt={member.name} 
                    src={member.image} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-extrabold text-slate-800 text-base">{member.name}</h4>
                <p className="text-secondary font-bold text-xs mt-1">{member.role}</p>
                <p className="text-slate-400 font-bold text-[10px] mt-2 bg-slate-50 border border-slate-100 px-3 py-1 rounded-full uppercase tracking-wider">
                  {member.dept}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Registration Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[2rem] w-full max-w-xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-fadeIn text-left">
            <div className="relative h-48 sm:h-56 bg-slate-100">
              <img 
                alt={selectedEvent.title} 
                src={selectedEvent.image} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
              <button 
                type="button" 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 bg-slate-900/40 hover:bg-slate-900/60 text-white p-2 rounded-full transition-colors font-bold z-10 cursor-pointer"
              >
                ✕
              </button>
              <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#a4c9ff] bg-[#001c39]/60 px-2.5 py-0.5 rounded-full border border-blue-500/10">
                  {selectedEvent.category}
                </span>
                <h3 className="font-extrabold text-white text-lg sm:text-xl leading-snug mt-2">
                  {selectedEvent.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Event descriptors */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">About the Event</h4>
                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  {selectedEvent.detailDescription || selectedEvent.description}
                </p>
              </div>

              {/* Event logistics meta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-700">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>Date: {selectedEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>Time: {selectedEvent.time}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 font-bold">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="truncate">Venue: {selectedEvent.venue}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold">
                    <User className="w-4 h-4 text-emerald-600" />
                    <span className="truncate">Mentor: {selectedEvent.instructorName}</span>
                  </div>
                </div>
              </div>

              {selectedEvent.status === "Completed" ? (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center flex flex-col items-center gap-3">
                  <Trophy className="w-8 h-8 text-[#fbbc05]" />
                  <h4 className="font-extrabold text-slate-800 text-sm">Workshop Completed Successfully</h4>
                  <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
                    This workshop occurred in the past. To explore resource scripts, slides, or request a secondary batch booking, contact {selectedEvent.instructorName} directly.
                  </p>
                </div>
              ) : registeredEventIds.includes(selectedEvent.id) ? (
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 text-center flex flex-col items-center gap-3">
                  <UserCheck className="w-8 h-8 text-emerald-600" />
                  <h4 className="font-extrabold text-emerald-800 text-sm">Seat Confirmed!</h4>
                  <p className="text-emerald-700 text-xs leading-relaxed max-w-sm">
                    Awesome! You are officially signed up. A digital verification slip was sent to your inbox. Bring your physical SJCET ID to the venue {selectedEvent.venue} on {selectedEvent.date} at {selectedEvent.time}.
                  </p>
                </div>
              ) : showRegisterSuccess ? (
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 text-center flex flex-col items-center gap-3 animate-pulse">
                  <ShieldCheck className="w-8 h-8 text-emerald-600" />
                  <h4 className="font-extrabold text-emerald-800 text-sm font-sans">Registration Successful!</h4>
                  <p className="text-emerald-700 text-xs leading-relaxed max-w-sm">
                    Seat locked. An invitation ticket is synced dynamically. We look forward to coding and tinkering with you on site!
                  </p>
                  <button 
                    type="button"
                    onClick={() => setSelectedEvent(null)}
                    className="mt-2 bg-emerald-600 text-white font-bold text-xs px-5 py-2 rounded-full cursor-pointer hover:bg-emerald-700 transition"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Quick Student Registration</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={attendeeName}
                        onChange={(e) => setAttendeeName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-xs font-semibold outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">SJCET Email ID</label>
                      <input 
                        type="email" 
                        required
                        value={attendeeEmail}
                        onChange={(e) => setAttendeeEmail(e.target.value)}
                        placeholder="student@sjcetpalai.ac.in"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-xs font-semibold outline-none transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isRegistering}
                    className="w-full bg-primary hover:bg-[#1a73c8] text-white font-bold text-xs py-3 rounded-xl transition shadow flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    {isRegistering ? "Verifying clearance..." : "Register Seat Ticket"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
export const is_events_loaded = true;

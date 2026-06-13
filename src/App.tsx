import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { 
  Menu, 
  X, 
  Calendar, 
  CheckCircle, 
  Layers, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  BookOpen, 
  ShieldAlert, 
  Award, 
  MapPin, 
  FileText,
  AlertCircle,
  Hash,
  Trash2,
  Bell
} from "lucide-react";

import { Equipment, Booking, LabMessage } from "./types";
import { MOCK_EQUIPMENT, MOCK_EVENTS, MOCK_STATS, FAQ_ITEMS } from "./mockData";

// Views
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import FacilitiesView from "./components/FacilitiesView";
import EventsView from "./components/EventsView";
import ContactView from "./components/ContactView";
import BookingModal from "./components/BookingModal";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [selectedEqToBook, setSelectedEqToBook] = useState<Equipment | null>(null);
  
  // High detail dialog state for a specific machine
  const [selectedEqDetail, setSelectedEqDetail] = useState<Equipment | null>(null);

  // States with localStorage persistence
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [messages, setMessages] = useState<LabMessage[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize and seed some default mock bookings on mount
  useEffect(() => {
    const savedBookings = localStorage.getItem("sjcet_idealab_bookings");
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    } else {
      // Seed default active mock booking for illustration
      const seedBookings: Booking[] = [
        {
          id: "SJCET-IDEA-834920",
          equipmentId: "eq-1",
          equipmentName: "Ultimaker S5 Professional FDM 3D Printer",
          userName: "Amit Kumar Nair",
          userEmail: "amitnair@sjcetpalai.ac.in",
          userPhone: "+91 9447102938",
          department: "Mechanical Engineering",
          batchOrRole: "S6 ME - Alpha",
          date: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0], // 2 days in future
          timeSlot: "11:30 AM - 01:30 PM",
          purpose: "Fabricating custom gear sockets for SJCET Rover Team drone challenge entry.",
          status: "Approved",
          createdAt: new Date().toISOString()
        }
      ];
      setBookings(seedBookings);
      localStorage.setItem("sjcet_idealab_bookings", JSON.stringify(seedBookings));
    }

    const savedMessages = localStorage.getItem("sjcet_idealab_messages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Trigger brief alert toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Create new active reservation slot
  const handleBookingSuccess = (newBooking: Booking) => {
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem("sjcet_idealab_bookings", JSON.stringify(updated));
    setShowBookingModal(false);
    setSelectedEqToBook(null);
    
    // Switch view directly to Bookings so the user immediately sees success!
    setActiveTab("bookings");
    triggerToast(`Booking ${newBooking.id} created as Pending Approval! Check details.`);
  };

  // Delete/Cancel an existing booking from local list
  const handleCancelBooking = (id: string) => {
    if (confirm("Are you sure you want to cancel this booking slot?")) {
      const updated = bookings.filter(b => b.id !== id);
      setBookings(updated);
      localStorage.setItem("sjcet_idealab_bookings", JSON.stringify(updated));
      triggerToast("Booking slot cancelled successfully.");
    }
  };

  // Submit and log Contact Us feedback inquiry
  const handleMessageSubmit = (newMsg: LabMessage) => {
    const updated = [newMsg, ...messages];
    setMessages(updated);
    localStorage.setItem("sjcet_idealab_messages", JSON.stringify(updated));
    triggerToast("Inquiry logged. Automated reply generated in the form!");
  };

  // Quick helper to initiate booking wizard for a specific machine
  const initiateBooking = (eq: Equipment) => {
    setSelectedEqToBook(eq);
    setShowBookingModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[#d4e3ff] selection:text-primary select-none">
      
      {/* Toast Notification Box */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-slate-800 text-white rounded-full px-6 py-3 border border-slate-700 shadow-xl flex items-center gap-3 text-xs font-semibold"
          >
            <Bell className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Header Glassmorphic Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 p-4">
        <div className="bg-white/70 backdrop-blur-md rounded-full mx-auto w-[95%] max-w-7xl border border-slate-100/50 shadow-sm flex justify-between items-center px-4 sm:px-8 py-3">
          
          {/* Brand/Icons group */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => { setActiveTab("home"); window.scrollTo(0,0); }}>
            <img 
              alt="AICTE IDEALab Logo" 
              className="h-9 sm:h-11 w-auto object-contain mix-blend-multiply" 
              src="/images/aicte_idealab_logo.png"
            />
            <img 
              alt="SJCET Autonomous Logo" 
              className="h-9 sm:h-11 w-auto object-contain mix-blend-multiply hidden md:block border-l pl-4 border-slate-200" 
              src="/images/sjcet_college_logo.png"
            />
            <span className="font-sans font-extrabold text-base sm:text-lg text-primary tracking-tight hidden sm:block">
              IDEALab
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About SJCET" },
              { id: "facilities", label: "Our Facilities" },
              { id: "events", label: "Workshops & Events" },
              { id: "bookings", label: "My Bookings" },
              { id: "contact", label: "Contact Us" }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => { setActiveTab(link.id); window.scrollTo(0,0); }}
                className={`relative px-4 py-2 rounded-full font-bold text-xs transition-transform cursor-pointer hover:bg-slate-50 ${
                  activeTab === link.id 
                    ? "text-[#005aa3]" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {link.label}
                {activeTab === link.id && (
                  <motion.span 
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#005aa3] rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {link.id === "bookings" && bookings.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.25 bg-[#006e1c] text-white rounded-full text-[9px] font-bold">
                    {bookings.length}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => { setSelectedEqToBook(null); setShowBookingModal(true); }}
              className="bg-primary hover:bg-[#1a73c8] text-white px-5 py-2 sm:px-6 sm:py-2.5 rounded-full font-bold text-xs flex items-center gap-2 active:scale-95 transition-transform shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>Book a Facility</span>
              <Calendar className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition-colors cursor-pointer"
              title="Toggle mobile menu"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Collapsible Navigation Overlay */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-24 mx-auto w-[90%] bg-white rounded-3xl shadow-xl border border-slate-100 z-50 p-6 flex flex-col gap-3 lg:hidden text-left"
          >
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About SJCET" },
              { id: "facilities", label: "Our Facilities" },
              { id: "events", label: "Workshops & Events" },
              { id: "bookings", label: "My Bookings" },
              { id: "contact", label: "Contact Us" }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => { setActiveTab(link.id); setShowMobileMenu(false); window.scrollTo(0,0); }}
                className={`px-4 py-3 rounded-xl text-xs font-bold w-full text-left transition-colors cursor-pointer flex justify-between items-center ${
                  activeTab === link.id 
                    ? "bg-blue-50 text-primary" 
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span>{link.label}</span>
                {link.id === "bookings" && bookings.length > 0 && (
                  <span className="px-2 py-0.5 bg-[#006e1c] text-white rounded-full text-[10px] font-bold">
                    {bookings.length}
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Core View Layout Container */}
      <main className="flex-1 pt-32 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <HomeView 
              stats={MOCK_STATS} 
              featuredEquipment={MOCK_EQUIPMENT}
              onNavigate={(tab) => { setActiveTab(tab); window.scrollTo(0,0); }}
              onSelectEquipment={setSelectedEqDetail}
            />
          )}

          {activeTab === "about" && (
            <AboutView />
          )}

          {activeTab === "facilities" && (
            <FacilitiesView 
              equipmentList={MOCK_EQUIPMENT} 
              onBookSelect={initiateBooking}
              onSelectDetail={setSelectedEqDetail}
            />
          )}

          {activeTab === "events" && (
            <EventsView 
              events={MOCK_EVENTS} 
            />
          )}

          {activeTab === "contact" && (
            <ContactView 
              faqItems={FAQ_ITEMS} 
              onSubmitMessage={handleMessageSubmit}
            />
          )}

          {activeTab === "bookings" && (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12 pb-16 text-left"
            >
              {/* Header booking block */}
              <div className="bg-slate-900 text-white rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-md mt-6">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(white_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
                <div className="relative z-10 max-w-2xl space-y-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#94f990] bg-[#006e1c]/40 px-3 py-1 rounded-full border border-emerald-500/20">
                    Live Session Tracker
                  </span>
                  <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-none">Your SJCET IDEALab Reservations</h2>
                  <p className="text-slate-350 text-sm leading-relaxed text-blue-100">
                    Review structural slot assignments, safety clearance certifications, or print barcodes for checkout verifications.
                  </p>
                </div>
              </div>

              {bookings.length > 0 ? (
                <div className="space-y-6">
                  {bookings.map((booking) => (
                    <div 
                      key={booking.id}
                      className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      {/* Left: Booking Details */}
                      <div className="space-y-4 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-slate-400 font-bold text-xs font-mono flex items-center gap-1">
                            <Hash className="w-3.5 h-3.5" /> {booking.id}
                          </span>
                          <span className={`text-[10px] font-extrabold px-3 py-0.5 rounded-full ${
                            booking.status === "Approved" 
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                              : "bg-amber-50 text-amber-600 border border-amber-100 animate-pulse"
                          }`}>
                            {booking.status}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-extrabold text-slate-800 text-base md:text-lg leading-tight">
                            {booking.equipmentName}
                          </h3>
                          <p className="text-slate-400 font-bold text-[10px] mt-1 uppercase flex items-center gap-1">
                            <Layers className="w-3.5 h-3.5 text-slate-400" /> Ground Floor, Fabrication Wing
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-6 text-xs text-slate-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                            <span><strong>Date:</strong> {booking.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                            <span><strong>Slot:</strong> {booking.timeSlot}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-slate-400 shrink-0" />
                            <span className="truncate"><strong>User:</strong> {booking.userName}</span>
                          </div>
                        </div>

                        {booking.purpose && (
                          <div className="bg-slate-50/70 rounded-xl p-3 border border-slate-100 text-xs text-slate-500">
                            <strong>Purpose:</strong> {booking.purpose}
                          </div>
                        )}
                      </div>

                      {/* Right: Actions / QR code simulator */}
                      <div className="flex items-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 md:pl-6 border-slate-50 shrink-0 select-none">
                        
                        {/* Simulating barcodes / QR code for realistic check-in */}
                        <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 flex flex-col items-center justify-center shrink-0">
                          <div className="w-16 h-16 bg-white border border-slate-200 rounded-lg flex items-center justify-center font-mono text-[9px] text-slate-400 font-bold tracking-widest text-center px-1">
                            QR CODE KEY
                          </div>
                          <span className="text-[9px] text-slate-400 font-bold mt-1.5 font-mono">SCAN CHECK-IN</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCancelBooking(booking.id)}
                          className="text-rose-500 hover:text-rose-600 hover:bg-rose-50/50 p-2.5 rounded-full transition-colors cursor-pointer shrink-0"
                          title="Cancel Reservation Slot"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 rounded-3xl p-16 text-center max-w-xl mx-auto border border-slate-100">
                  <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-700">No active reservations logged</h3>
                  <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                    You do not hold any structured slots. Simply click the 'Book a Facility' button above to select a machine and schedule your tinkering hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setSelectedEqToBook(null); setShowBookingModal(true); }}
                    className="mt-6 bg-primary hover:bg-[#1a73c8] text-white font-bold text-xs px-6 py-2.5 rounded-full transition shadow"
                  >
                    Initiate Booking Slot
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Detailed Equipment Review and Operator Rules Modal Drawer */}
      <AnimatePresence>
        {selectedEqDetail && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2rem] w-full max-w-xl shadow-2xl border border-slate-100 overflow-hidden my-8 select-text text-left"
            >
              
              {/* Cover Photo */}
              <div className="relative h-48 bg-slate-100">
                <img 
                  alt={selectedEqDetail.name} 
                  src={selectedEqDetail.image} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                <button 
                  type="button" 
                  onClick={() => setSelectedEqDetail(null)}
                  className="absolute top-4 right-4 bg-slate-900/40 hover:bg-slate-900/60 text-white p-2 rounded-full transition-colors font-bold cursor-pointer"
                >
                  ✕
                </button>
                <div className="absolute bottom-4 left-6 right-6 text-white text-left">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#a4c9ff] bg-[#001c39]/60 px-2.5 py-0.5 rounded-full border border-blue-500/10">
                    {selectedEqDetail.category}
                  </span>
                  <h3 className="font-extrabold text-white text-lg mt-1 leading-tight">
                    {selectedEqDetail.name}
                  </h3>
                </div>
              </div>

              {/* Specs & safety checklists content */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto select-text">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Status</span>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                    {selectedEqDetail.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-primary" /> Technical Specifications
                  </span>
                  <ul className="grid grid-cols-1 gap-2 text-xs text-slate-600 pl-2">
                    {selectedEqDetail.specs.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#005aa3] font-bold">▪</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-5 space-y-3">
                  <span className="text-[10px] font-bold text-rose-800 uppercase tracking-widest flex items-center gap-1.5">
                    <ShieldAlert className="w-4.5 h-4.5 text-rose-500" /> Mandatory Operator Compliance (OD6+)
                  </span>
                  <ul className="space-y-2 text-xs text-rose-700 pl-2">
                    {selectedEqDetail.safetyRules.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold shrink-0 mt-0.5">⚠️</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer action */}
                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setSelectedEqDetail(null)}
                    className="px-5 py-2 rounded-full border border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-50 transition cursor-pointer"
                  >
                    Close Rules
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSelectedEqDetail(null); initiateBooking(selectedEqDetail); }}
                    className="bg-primary hover:bg-[#1a73c8] text-white font-bold text-xs px-6 py-2 rounded-full transition shadow"
                  >
                    Book This Machine
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Facility Booking Slot wizard */}
      {showBookingModal && (
        <BookingModal 
          equipment={selectedEqToBook}
          equipmentList={MOCK_EQUIPMENT}
          onClose={() => { setShowBookingModal(false); setSelectedEqToBook(null); }}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* Cohesive Footer Block */}
      <footer className="bg-slate-900 border-t border-slate-800 text-white w-full">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-4 gap-12 text-left">
          
          {/* Logo brands column */}
          <div className="col-span-1 lg:col-span-2 space-y-6">
            <div className="flex flex-wrap items-center gap-4 bg-white/5 p-4 rounded-2xl w-fit border border-white/5">
              <img 
                alt="AICTE IDEALab Logo" 
                className="h-10 object-contain brightness-0 invert opacity-90" 
                src="/images/aicte_idealab_logo.png"
              />
              <img 
                alt="SJCET Autonomous Logo" 
                className="h-10 object-contain brightness-0 invert opacity-90" 
                src="/images/sjcet_college_logo.png"
              />
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Fostering a culture of innovation, tinkering, and hands-on engineering education at St. Joseph's College of Engineering and Technology (Autonomous).
            </p>
          </div>

          {/* Quick Links Nav switching */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-extrabold font-sans">Quick Navigation</h4>
            <nav className="flex flex-col gap-3 text-xs font-bold text-slate-400">
              <button onClick={() => { setActiveTab("home"); window.scrollTo(0,0); }} className="hover:text-white transition-colors cursor-pointer text-left">Home Block</button>
              <button onClick={() => { setActiveTab("about"); window.scrollTo(0,0); }} className="hover:text-white transition-colors cursor-pointer text-left">About SJCET Collaboration</button>
              <button onClick={() => { setActiveTab("facilities"); window.scrollTo(0,0); }} className="hover:text-white transition-colors cursor-pointer text-left">Advanced Facilities</button>
              <button onClick={() => { setActiveTab("events"); window.scrollTo(0,0); }} className="hover:text-white transition-colors cursor-pointer text-left">Calendar Workshops</button>
            </nav>
          </div>

          {/* Info contact list */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-extrabold font-sans">Student Help center</h4>
            <nav className="flex flex-col gap-3 text-xs font-bold text-slate-400">
              <button onClick={() => { setActiveTab("bookings"); window.scrollTo(0,0); }} className="hover:text-white transition-colors cursor-pointer text-left">Your Reservations Check-in</button>
              <button onClick={() => { setActiveTab("contact"); window.scrollTo(0,0); }} className="hover:text-white transition-colors cursor-pointer text-left">Submit Consumable query</button>
              <a href="#about" onClick={(e) => { e.preventDefault(); setActiveTab("about"); window.scrollTo(0,0); }} className="hover:text-white transition-colors cursor-pointer text-left">Mission & Vision Values</a>
            </nav>
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="border-t border-slate-800/80 px-6 py-6 text-center text-slate-500 font-semibold text-[10px] sm:text-xs">
          <span>© 2026 SJCET IDEALab Palai. All rights reserved. Created in compliance with AICTE guidelines.</span>
        </div>
      </footer>

    </div>
  );
}
export const is_app_loaded = true;

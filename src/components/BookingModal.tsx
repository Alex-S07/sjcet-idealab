import React, { useState } from "react";
import { Equipment, Booking } from "../types";
import { X, Calendar, Clock, User, Mail, Phone, BookOpen, Layers, CheckCircle, ShieldAlert, Award } from "lucide-react";

interface BookingModalProps {
  equipment: Equipment | null;
  equipmentList: Equipment[];
  onClose: () => void;
  onBookingSuccess: (booking: Booking) => void;
}

export default function BookingModal({ equipment, equipmentList, onClose, onBookingSuccess }: BookingModalProps) {
  const [selectedEqId, setSelectedEqId] = useState(equipment?.id || equipmentList[0]?.id || "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dept, setDept] = useState("Computer Science & Engineering");
  const [batch, setBatch] = useState("S6 CSE - Alpha");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("09:30 AM - 11:30 AM");
  const [purpose, setPurpose] = useState("");
  const [safetyChecked, setSafetyChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedEq = equipmentList.find(eq => eq.id === selectedEqId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !date || !purpose || !safetyChecked) {
      alert("Please fill in all fields and agree to the safety protocols.");
      return;
    }

    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      const newBooking: Booking = {
        id: `SJCET-IDEA-${Math.floor(100000 + Math.random() * 900000)}`,
        equipmentId: selectedEqId,
        equipmentName: selectedEq?.name || "Equipment",
        userName: name,
        userEmail: email,
        userPhone: phone,
        department: dept,
        batchOrRole: batch,
        date,
        timeSlot,
        purpose,
        status: "Pending", // Set as pending for realistic workflow
        createdAt: new Date().toISOString()
      };

      onBookingSuccess(newBooking);
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-fadeIn flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#005aa3] to-[#1a73c8] text-white p-6 relative flex justify-between items-center shrink-0">
          <div>
            <h3 className="text-xl font-bold font-sans">Book an IDEALab Facility</h3>
            <p className="text-blue-100 text-xs mt-1">Schedule high-precision engineering workspace slots</p>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 overflow-y-auto flex-1">
          
          {/* Equipment Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Select Equipment / Station
            </label>
            <select
              value={selectedEqId}
              onChange={(e) => setSelectedEqId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm text-slate-800 transition-all outline-none"
            >
              {equipmentList.map((eq) => (
                <option key={eq.id} value={eq.id}>
                  {eq.name} ({eq.category})
                </option>
              ))}
            </select>
          </div>

          {/* Quick specs notice if equipment is selected */}
          {selectedEq && (
            <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100/50 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" />
                <span><strong>Bay:</strong> {selectedEq.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600" />
                <span><strong>Usage:</strong> Authorization Required</span>
              </div>
            </div>
          )}

          {/* Persona details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" /> Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-sm transition-all outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> SJCET Email ID
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@sjcetpalai.ac.in"
                className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-sm transition-all outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" /> Phone Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 9447123456"
                className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-sm transition-all outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" /> Department
              </label>
              <select
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-sm transition-all outline-none"
              >
                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Electronics & Communication Engineering">Electronics & Communication Engineering</option>
                <option value="Electrical & Electronics Engineering">Electrical & Electronics Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
                <option value="MBA / MCA Wing">MBA / MCA Department</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Batch / Role Title
              </label>
              <input
                type="text"
                required
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                placeholder="e.g. S6 CSE - B, Faculty, researcher"
                className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-sm transition-all outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> Reservation Date
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-sm transition-all outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" /> Time Slot Selection
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                "09:30 AM - 11:30 AM",
                "11:30 AM - 01:30 PM",
                "02:00 PM - 04:00 PM"
              ].map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTimeSlot(slot)}
                  className={`border px-4 py-3 rounded-xl text-center text-xs font-medium cursor-pointer transition-all ${
                    timeSlot === slot
                      ? "border-primary bg-blue-50 text-primary shadow-sm"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Project Statement & Purpose of Fabrication
            </label>
            <textarea
              required
              rows={3}
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="What are you building? List materials you plan to use (e.g., 5mm acrylic board to mill model quadcopter frame legs)..."
              className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-sm transition-all outline-none resize-none"
            />
          </div>

          {/* Safety Protocols section */}
          {selectedEq && (
            <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-4 md:p-5 space-y-3">
              <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-500" /> Safety & Compliance Brief
              </h4>
              <ul className="list-disc pl-4 space-y-1 text-xs text-rose-700">
                {selectedEq.safetyRules.slice(0, 3).map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
              <div className="pt-2 border-t border-rose-100 flex items-start gap-2">
                <input
                  type="checkbox"
                  id="safety-agree"
                  checked={safetyChecked}
                  onChange={(e) => setSafetyChecked(e.target.checked)}
                  className="mt-0.5 rounded text-rose-600 border-slate-300 focus:ring-rose-500"
                />
                <label htmlFor="safety-agree" className="text-xs text-rose-800 font-medium cursor-pointer">
                  I certify that I have read the safety rules, hold valid operator clearance, and will follow lab rules.
                </label>
              </div>
            </div>
          )}

          {/* Submit details */}
          <div className="pt-4 flex justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-2.5 rounded-full text-white text-sm font-medium shadow-md transition-all flex items-center gap-2 cursor-pointer ${
                isSubmitting 
                  ? "bg-slate-400 cursor-not-allowed" 
                  : "bg-primary hover:bg-[#1a73c8] hover:shadow-[0_4px_14px_rgba(0,90,163,0.3)] hover:-translate-y-0.5 active:translate-y-0"
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Registering...
                </>
              ) : (
                <>
                  Confirm Booking Slot
                  <CheckCircle className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

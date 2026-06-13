import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, FileText, ChevronDown, ChevronUp, Check, MapPin, Mail, Phone, Clock, MessageSquare, Info } from "lucide-react";
import { FaqItem, LabMessage } from "../types";

interface ContactViewProps {
  faqItems: FaqItem[];
  onSubmitMessage: (msg: LabMessage) => void;
}

export default function ContactView({ faqItems, onSubmitMessage }: ContactViewProps) {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Prototyping Assistance Request");
  const [body, setBody] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [simulatedReply, setSimulatedReply] = useState<string | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !body) return;

    const newMsg: LabMessage = {
      id: `MSG-${Date.now()}`,
      name,
      email,
      subject,
      message: body,
      createdAt: new Date().toISOString()
    };

    onSubmitMessage(newMsg);
    setShowSuccess(true);

    // Simulate smart automated system reply based on subject or content
    setTimeout(() => {
      let reply = "Thank you for reaching out to SJCET IDEALab! Our Lab Assistant will review your query within 24 working hours. ";
      
      if (body.toLowerCase().includes("laser") || subject.toLowerCase().includes("laser")) {
        reply += "Regarding laser cutting requests: Acrylic sheets (up to 8mm) and MDF boards (up to 6mm) are physically stocked and ready in Bay B. Ensure your file is in .DXF or .CDR format before booking your check-in slot.";
      } else if (body.toLowerCase().includes("3d") || body.toLowerCase().includes("print") || subject.toLowerCase().includes("print")) {
        reply += "Regarding additive 3D printing requests: Please process your parametric models inside Cura or PrusaSlicer, save the sliced file in a FAT32 thumb drive, and ensure your time block is approved before walking into the rapid prototyping bay.";
      } else if (body.toLowerCase().includes("pcb") || body.toLowerCase().includes("milling") || subject.toLowerCase().includes("pcb")) {
        reply += "Regarding Rolan PCB Milling router requests: Bring standard single/double-sided FR-1 blank copper clads. Standard Gerber vector layers processed inside Eagle/Altium are certified for instant engraving.";
      } else {
        reply += "For general project access and custom hardware requests, feel free to visit our Ground Floor desk or register via the 'Book a Facility' button.";
      }

      setSimulatedReply(reply);
    }, 1200);

    // Clear form inputs
    setName("");
    setEmail("");
    setBody("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5 }}
      className="space-y-24 pb-16"
    >
      {/* FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-3 py-1 bg-blue-50 border border-blue-100 rounded-full">
            Knowledge Hub
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-3">
            Quick answers regarding operator badges, material logs, project team approvals, and walk-in guidelines.
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden text-left hover:border-slate-200 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-slate-800 hover:text-primary transition-colors cursor-pointer select-none text-sm font-extrabold"
                >
                  <span>{item.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-4" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 pt-1 text-slate-500 text-xs sm:text-sm leading-relaxed border-t border-slate-50 font-normal">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Inquiry and Contact Forms Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left panel: Info map segment */}
          <div className="space-y-8 text-left">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#006e1c] px-3 py-1 bg-[#94f990]/10 border border-[#94f990]/20 rounded-full">
                Reach out
              </span>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">Need Project Advice?</h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                If you are planning an extensive graduation project, need custom bit recommendations, or want to invite schools for an IDEALab visit, submit your info here.
              </p>
            </div>

            {/* Direct details cards */}
            <div className="space-y-4 text-xs font-bold text-slate-600">
              <div className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <MapPin className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h4 className="text-slate-800 font-extrabold text-xs">Laboratory Block Location</h4>
                  <p className="text-slate-400 text-[10px] mt-0.5">SJCET Autonomous Campus, Palai-Ponkunnam Road, Palai, Kerala 686579</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <Mail className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h4 className="text-slate-800 font-extrabold text-xs">Primary Email Channels</h4>
                  <p className="text-slate-400 text-[10px] mt-0.5">idealab@sjcetpalai.ac.in | office.idealab@sjcetpalai.ac.in</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <Phone className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h4 className="text-slate-800 font-extrabold text-xs">Help desk Hotlines</h4>
                  <p className="text-slate-400 text-[10px] mt-0.5">Phone: +91 4822 239700 | Mobile: +91 9447 123456</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: Active Contact form */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-left">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 mb-6">
              <MessageSquare className="w-5 h-5 text-primary" /> Direct Consultation Desk
            </h3>

            {showSuccess ? (
              <div className="space-y-6">
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                    <Check className="w-6 h-6 shrink-0" />
                  </div>
                  <h4 className="font-extrabold text-emerald-800 text-sm">Message Successfully Logged!</h4>
                  <p className="text-emerald-700 text-xs leading-relaxed max-w-sm mx-auto">
                    Your query was received. Our team coordinator has been notified.
                  </p>
                </div>

                {simulatedReply && (
                  <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 space-y-2 text-xs">
                    <h5 className="font-extrabold text-slate-800 flex items-center gap-1">
                      <Info className="w-4 h-4 text-blue-500" /> Automated SJCET Assistant reply:
                    </h5>
                    <p className="text-slate-600 leading-relaxed font-medium">
                      {simulatedReply}
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => { setShowSuccess(false); setSimulatedReply(null); }}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs py-3 rounded-full transition cursor-pointer"
                >
                  Send another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleMessageSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-xs font-semibold outline-none transition-all text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">SJCET Email ID</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@sjcetpalai.ac.in"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-xs font-semibold outline-none transition-all text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">General Inquiry Subject</label>
                  <select 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-xs font-semibold outline-none transition-all text-slate-800"
                  >
                    <option value="Prototyping Assistance Request">Prototyping / CAD Assistance Request</option>
                    <option value="Material Consumable Request">Material Consumable Request</option>
                    <option value="Operator Badge Authorization">Operator Badge Authorization</option>
                    <option value="External / Incubative Support">External College / School Visit Request</option>
                    <option value="Patent drafting help">Patent / Start-up Pitch help</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Message Detail</label>
                  <textarea 
                    required
                    rows={4}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="What can we help you with? List specific machinery if relevant..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-2.5 text-xs font-semibold outline-none transition-all resize-none text-slate-800"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-[#1a73c8] text-white font-bold text-xs py-3 rounded-xl transition shadow hover:shadow-md flex items-center justify-center gap-2 cursor-pointer pt-3"
                >
                  Send Inquiry Message
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </motion.div>
  );
}
export const is_contact_loaded = true;

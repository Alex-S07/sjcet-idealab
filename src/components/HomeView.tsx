import { motion } from "motion/react";
import { ArrowRight, Cpu, Sparkles, Zap, Award, BookOpen, Clock, PenTool } from "lucide-react";
import { Equipment, LabStat } from "../types";

interface HomeViewProps {
  stats: LabStat[];
  onNavigate: (tab: string) => void;
  featuredEquipment: Equipment[];
  onSelectEquipment: (eq: Equipment) => void;
}

export default function HomeView({ stats, onNavigate, featuredEquipment, onSelectEquipment }: HomeViewProps) {
  // Mock student innovation showcase
  const projects = [
    {
      title: "SJCET Autonomous Drone Charger",
      students: "S6 Mechanical & ECE Combo Team",
      desc: "Designed and milled down a heavy carbon-fiber landing platform featuring auto-locking electromagnetic contacts for field service drone charging.",
      badge: "Robotics & Aviation",
      image: "eq-4"
    },
    {
      title: "Tactile Braille E-Reader Pad",
      students: "S8 CSE Project Group",
      desc: "3D printed micro solenoids paired with localized ESP32 registers translating standard digital text paragraphs into readable dynamic braille pins, cost-reduced by 80%.",
      badge: "Assistive Tech",
      image: "eq-1"
    },
    {
      title: "Solar-tracking Smart Irrigation Matrix",
      students: "S4 EEE Innovator Group",
      desc: "Etched and populated dynamic PCBs on our SRM-20 milling router. Integrates automated moisture sensors powered entirely by autonomous active dynamic solar nodes.",
      badge: "IoT & Sustainable",
      image: "eq-3"
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
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 pt-12 md:pt-20 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* Left side texts */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-primary font-medium text-xs self-start backdrop-blur-sm animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Empowering Future SJCET Engineers
          </div>

          <div className="space-y-4">
            <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-800 tracking-tight leading-none">
              SJCET <span className="text-secondary">IDEA</span>Lab
            </h1>
            <h2 className="font-black text-3xl sm:text-4xl lg:text-5xl text-primary leading-tight">
              Innovate. Create. Transform.
            </h2>
          </div>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
            A premier facility fostering creativity, design thinking, and practical STEM skills. We bridge the gap between theoretical knowledge and real-world industrial application through state-of-the-art equipment and hands-on learning.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button 
              onClick={() => onNavigate("facilities")}
              className="bg-primary hover:bg-[#1a73c8] text-white px-8 py-3.5 rounded-full font-semibold text-sm shadow-[0_4px_14px_rgba(0,90,163,0.3)] transition-all hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              Explore Facilities
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onNavigate("about")}
              className="bg-transparent border-2 border-primary hover:bg-primary-container/5 text-primary px-8 py-3 rounded-full font-semibold text-sm transition-all cursor-pointer"
            >
              Learn Our Approach
            </button>
          </div>
        </div>

        {/* Right side vector/lab image */}
        <div className="w-full lg:w-1/2 relative h-[380px] sm:h-[450px] md:h-[520px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-teal-500/10 blur-xl z-0"></div>
          <img 
            alt="Modern Engineering Lab at SJCET" 
            className="absolute inset-0 w-full h-full object-cover z-10 hover:scale-105 transition-transform duration-700" 
            src="/images/lab-hero.png"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent z-10"></div>
          
          {/* Real-time overlay glass card */}
          <div className="absolute bottom-6 left-6 right-6 z-20 bg-white/80 backdrop-blur-xl border border-white/50 p-6 rounded-2xl shadow-lg flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Cpu className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">State of the Art</h3>
              <p className="text-slate-500 text-xs mt-0.5">Rapid CAD Simulation & Advanced Fabrication Bay</p>
            </div>
          </div>
        </div>

      </section>

      {/* Stats Counter Strip */}
      <section className="bg-primary text-white py-12 px-6 w-full relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,white_1.5px,transparent_1.5px)] [background-size:20px_20px]"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10 divide-x divide-white/10 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center">
              <span className="font-extrabold text-3xl sm:text-5xl mb-2 bg-gradient-to-b from-white to-blue-100 bg-clip-text text-transparent">
                {stat.value}
              </span>
              <span className="font-medium text-xs sm:text-sm text-blue-100 uppercase tracking-wider px-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Equipment Grid / Carousel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#005aa3] mb-2 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-secondary" /> Precision Machinery
            </h2>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">
              Featured Prototyping Facilities
            </h3>
          </div>
          <button 
            type="button"
            onClick={() => onNavigate("facilities")}
            className="text-primary font-bold text-sm flex items-center gap-1.5 hover:gap-2.5 transition-all self-start cursor-pointer"
          >
            Browse All 20+ Equipment
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredEquipment.slice(0, 3).map((eq) => (
            <div 
              key={eq.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  alt={eq.name} 
                  src={eq.image} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full text-white shadow-sm ${
                  eq.status === "Available" ? "bg-emerald-500" : "bg-amber-500"
                }`}>
                  {eq.status}
                </span>
                <span className="absolute bottom-4 left-4 bg-slate-900/40 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white">
                  {eq.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h4 className="font-extrabold text-slate-800 text-lg group-hover:text-primary transition-colors line-clamp-1 mb-2">
                  {eq.name}
                </h4>
                <p className="text-slate-500 text-sm line-clamp-3 mb-6 leading-relaxed flex-1">
                  {eq.description}
                </p>
                <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-400">{eq.location}</span>
                  <button 
                    type="button"
                    onClick={() => onSelectEquipment(eq)}
                    className="text-primary hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    View Specs & Rules
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Showcase of Student Innovations */}
      <section className="bg-slate-50/50 border-y border-slate-200/50 py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-primary px-3 py-1 bg-blue-50 border border-blue-100 rounded-full">
              SJCET Innovation Showcase
            </span>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight mt-4">
              Designed & Tinkered Here
            </h3>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed">
              Explore custom engineering hardware, embedded IoT devices, and products created by SJCET students inside the AICTE IDEALab workspace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((proj, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 bg-amber-50 rounded-full text-amber-700 font-bold text-[10px] uppercase tracking-wider border border-amber-100">
                    {proj.badge}
                  </span>
                  <Award className="w-5 h-5 text-secondary" />
                </div>
                <h4 className="font-extrabold text-[#005aa3] text-lg mb-2">
                  {proj.title}
                </h4>
                <p className="text-slate-400 text-xs font-bold mb-4">
                  By {proj.students}
                </p>
                <p className="text-slate-600 text-sm flex-1 leading-relaxed">
                  {proj.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core values / Pillars section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary flex items-center gap-1">
            <Zap className="w-4 h-4 text-amber-500" /> Key Pillars
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
            How SJCET IDEALab Drives Skill Engineering
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Unlike standard academic laboratories, the SJCET IDEALab encourages multi-department lateral tinkering throughout the year. 
          </p>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-primary shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-800 text-sm">Peer-to-Peer Training Matrix</h4>
                <p className="text-slate-500 text-xs mt-1">Certified student instructors conduct weekly introductory sessions to ease freshman entry shock.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center text-emerald-600 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-800 text-sm">Flexible Workspace Booking System</h4>
                <p className="text-slate-500 text-xs mt-1">Students can block time slots for CNC and SLA printers, ensuring continuous project focus without delays.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#fff6f4] border border-rose-100 flex items-center justify-center text-tertiary-container shrink-0">
                <PenTool className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-800 text-sm">Hardware Startup Business Incubation</h4>
                <p className="text-slate-500 text-xs mt-1">We assist stellar student ideas towards active patent draft writing, seed funding, and batch pre-production setups.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-tr from-[#005aa3] to-slate-800 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:24px_24px]"></div>
          
          <div className="relative z-10 space-y-6">
            <h4 className="text-xl font-bold font-sans">Ready to turn thoughts into hardware?</h4>
            <p className="text-blue-100 text-sm leading-relaxed">
              Register is open for SJCET student projects! Get active mentorship support, free material filaments up to limits, and authorization to operate high precision instrumentation.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button 
                type="button"
                onClick={() => onNavigate("facilities")}
                className="bg-white text-primary hover:bg-slate-50 px-6 py-3 rounded-full text-xs font-bold text-center transition-all cursor-pointer shadow-md"
              >
                Register Project / Book Slot
              </button>
              <button 
                type="button"
                onClick={() => onNavigate("events")}
                className="bg-transparent border border-white/40 hover:bg-white/10 text-white px-6 py-3 rounded-full text-xs font-bold text-center transition-all cursor-pointer"
              >
                View Upcoming Workshops
              </button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
export const is_home_loaded = true;

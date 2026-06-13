import React, { useState } from "react";
import { motion } from "motion/react";
import { Search, Layers, ShieldCheck, CheckCircle2, SlidersHorizontal, ArrowRight, ShieldAlert, BadgeCheck, HelpCircle } from "lucide-react";
import { Equipment } from "../types";

interface FacilitiesViewProps {
  equipmentList: Equipment[];
  onBookSelect: (eq: Equipment) => void;
  onSelectDetail: (eq: Equipment) => void;
}

export default function FacilitiesView({ equipmentList, onBookSelect, onSelectDetail }: FacilitiesViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Prototyping", "Fabrication", "Electronics", "Design & Computing", "Woodworking & Metal"];

  // Filter logic
  const filteredEquipment = equipmentList.filter((eq) => {
    const matchesSearch = eq.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          eq.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          eq.specs.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || eq.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5 }}
      className="space-y-12 pb-16"
    >
      {/* Search Header banner */}
      <section className="bg-gradient-to-r from-slate-900 via-[#005aa3] to-slate-900 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden shadow-xl mt-6">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(white_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
        <div className="relative z-10 max-w-2xl text-left space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#94f990] bg-[#006e1c]/40 px-3 py-1 rounded-full border border-emerald-500/30">
            Resource Catalog
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">SJCET IDEALab Equipment Inventory</h2>
          <p className="text-blue-100 text-sm leading-relaxed">
            Reserve certified slots for additive printing, chemical-free board etching, precision fiber routers, or multi-axis heavy laser cutters.
          </p>

          {/* Quick search board inside banner */}
          <div className="pt-4 max-w-lg relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search machine name, specs, PLA, CO2, soldering, locations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-slate-800 placeholder-slate-400 pl-11 pr-4 py-3 rounded-full text-xs font-semibold shadow-inner outline-none focus:ring-2 focus:ring-blue-300 transition-all border border-transparent"
            />
          </div>
        </div>
      </section>

      {/* Categories select tabs and stats header */}
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between border-b border-slate-200/50 pb-6">
        
        {/* Category lists tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                selectedCategory === cat 
                  ? "bg-primary border-primary text-white shadow-sm" 
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {cat}
              {cat !== "All" && (
                <span className={`ml-1.5 text-[10px] px-1.5 py-0.25 rounded-full ${
                  selectedCategory === cat ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"
                }`}>
                  {equipmentList.filter(eq => eq.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Counter */}
        <p className="text-slate-400 font-bold text-xs">
          Showing {filteredEquipment.length} of {equipmentList.length} operational stations
        </p>
      </div>

      {/* Facilities inventory grid */}
      {filteredEquipment.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEquipment.map((eq) => (
            <div 
              key={eq.id}
              className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group relative"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  alt={eq.name} 
                  src={eq.image} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                
                {/* Status sticker */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full text-white shadow-sm flex items-center gap-1 ${
                    eq.status === "Available" 
                      ? "bg-emerald-500" 
                      : eq.status === "In Use" 
                        ? "bg-blue-500" 
                        : "bg-amber-500"
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                    {eq.status}
                  </span>
                </div>

                <span className="absolute bottom-4 left-4 bg-slate-900/40 backdrop-blur-sm shadow-inner px-3 py-1 rounded-full text-[10px] font-black uppercase text-white tracking-widest border border-white/10">
                  {eq.category}
                </span>
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-1 text-left space-y-4">
                <div>
                  <h3 className="font-extrabold text-slate-800 text-lg group-hover:text-[#005aa3] transition-colors leading-snug">
                    {eq.name}
                  </h3>
                  <p className="text-slate-400 font-bold text-[10px] mt-1 flex items-center gap-1 uppercase tracking-wider">
                    <Layers className="w-3.5 h-3.5 text-slate-400" /> {eq.location}
                  </p>
                </div>

                <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                  {eq.description}
                </p>

                {/* Micro specification points */}
                <div className="bg-slate-50/50 rounded-xl p-3 border border-slate-100 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Key Specs:</span>
                  <ul className="text-[10px] text-slate-600 space-y-0.5 list-disc pl-3">
                    {eq.specs.slice(0, 2).map((s, idx) => (
                      <li key={idx} className="truncate">{s}</li>
                    ))}
                  </ul>
                </div>

                {/* Footer interactive actions */}
                <div className="pt-4 border-t border-slate-50 flex items-center gap-2 justify-between shrink-0">
                  <button 
                    type="button"
                    onClick={() => onSelectDetail(eq)}
                    className="text-xs font-bold text-slate-500 hover:text-primary hover:underline transition-colors cursor-pointer"
                  >
                    Operator Guide & Rules
                  </button>

                  <button 
                    type="button"
                    onClick={() => onBookSelect(eq)}
                    className="bg-[#005aa3] hover:bg-[#1a73c8] text-white font-bold text-xs px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-1 cursor-pointer"
                  >
                    Book Slot
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 rounded-3xl p-16 text-center max-w-xl mx-auto border border-slate-100">
          <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-700">No equipment matches found</h3>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            Double-check spelling or switch category to 'All'. If the machine is custom or rare, reach out to physical coordinators directly.
          </p>
        </div>
      )}

      {/* Interactive FAQ box footer strip */}
      <section className="bg-slate-50 rounded-3xl p-8 border border-slate-100 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 justify-between text-left">
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-primary shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-800 text-sm">Need raw materials or customized bits?</h4>
            <p className="text-slate-500 text-xs mt-1">
              PLA, ABS, chemical boards, copper clads, and wood logs are maintained at the laboratory supply store. Check-in directly with lab superintendents.
            </p>
          </div>
        </div>
        <a 
          href="#contact" 
          onClick={(e) => { e.preventDefault(); alert("Please scroll to down or click 'Contact Us' tab to submit a consumable request list!"); }}
          className="bg-transparent border border-slate-300 hover:bg-slate-100 text-slate-600 font-bold text-xs px-4 py-2.5 rounded-full shrink-0 transition-colors"
        >
          Special Requests Desk
        </a>
      </section>
    </motion.div>
  );
}
export const is_facilities_loaded = true;

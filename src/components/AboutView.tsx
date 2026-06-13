import { motion } from "motion/react";
import { ChevronRight, CheckCircle, Eye, SpaceIcon, Compass, BookOpen, PenTool, Lightbulb, TrendingUp, MapPin, Mail, Phone, ExternalLink } from "lucide-react";

export default function AboutView() {
  const fiveEs = [
    {
      step: "E",
      title: "Engage",
      desc: "Connecting SJCET students with real-world problems and sparking active, lateral curiosity.",
      bg: "bg-primary text-white"
    },
    {
      step: "E",
      title: "Explore",
      desc: "Investigating design solutions through academic research, structured brainstorming, and design thinking.",
      bg: "bg-emerald-600 text-white"
    },
    {
      step: "E",
      title: "Experience",
      desc: "Immersive hands-on operation with industrial-grade tools, heavy routers, and high-spec design softwares.",
      bg: "bg-rose-600 text-white"
    },
    {
      step: "E",
      title: "Express",
      desc: "Physical CAD modeling, multi-layer etching, and prototype refinement to achieve ready models.",
      bg: "bg-amber-500 text-white"
    },
    {
      step: "E",
      title: "Excel",
      desc: "Refining hardware products, assisting with patent filings, commercialization, and incubative scaling.",
      bg: "bg-blue-300 text-slate-800"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5 }}
      className="space-y-24"
    >
      {/* Breadcrumbs/Hero Header */}
      <section className="relative py-20 text-center bg-blue-50/40 border-b border-slate-200/40 overflow-hidden rounded-3xl mt-6 px-6">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#005aa3_1.5px,transparent_1.5px)] [background-size:20px_20px]"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <nav className="flex justify-center items-center gap-1.5 mb-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span className="hover:text-primary transition-colors cursor-pointer">SJCET Home</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-primary">About IDEALab</span>
          </nav>
          <h1 className="font-black text-4xl sm:text-5xl text-slate-800 tracking-tight leading-tight relative inline-block">
            About SJCET IDEALab
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-primary rounded-full"></span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-6 max-w-2xl mx-auto leading-relaxed">
            A state-of-the-art multi-disciplinary innovation center fostering creative engineering, design thinking, and rapid prototyping capabilities.
          </p>
        </div>
      </section>

      {/* What is IDEALab Core Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-primary px-3 py-1 bg-blue-50 border border-blue-100 rounded-full">
              Core Mandate
            </span>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">What is IDEALab?</h2>
            
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <p>
                The AICTE IDEA (Innovation, Design, Entrepreneurship, and Application) Lab is an initiative by the All India Council for Technical Education. It aims to encourage students for application of science, technology, engineering and mathematics (STEM) fundamentals towards enhanced hands-on experience, learning by doing and even product development.
              </p>
              <p>
                Host campuses provide a dedicated and unrestricted workspace where students can experiment with complex files, collaborate across traditional boundaries, and transform CAD models into operational prototypes using industrial equipment.
              </p>
            </div>
          </div>

          <div className="bg-slate-50/80 rounded-3xl p-8 border border-slate-100 flex items-center justify-center shadow-inner hover:bg-slate-50/30 transition-all duration-300">
            <img 
              alt="IDEALab lightbulb concept graphic" 
              src="/images/about-lab.png" 
              className="max-h-[300px] w-auto object-contain drop-shadow-xl animate-float"
            />
          </div>
        </div>
      </section>

      {/* SJCET x AICTE Partnership Collaboration details */}
      <section className="bg-slate-50/50 border-y border-slate-200/50 py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="flex justify-center order-2 lg:order-1">
              <div className="bg-white p-12 rounded-[2rem] shadow-sm border border-slate-100 w-full flex items-center justify-center max-w-lg hover:shadow-md transition-shadow">
                <img 
                  alt="SJCET Autonomous Institution Logo" 
                  src="/images/sjcet_college_logo.png" 
                  className="max-h-24 w-auto object-contain"
                />
              </div>
            </div>

            <div className="space-y-6 text-left order-1 lg:order-2">
              <div className="inline-block px-4 py-1.5 bg-[#006e1c]/10 text-[#006e1c] rounded-full font-bold text-xs border border-[#006e1c]/20">
                Strategic Partnership
              </div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">AICTE x SJCET Autonomous Collaboration</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                St. Joseph's College of Engineering and Technology, Palai is proud to host the AICTE IDEALab, bridging the gap between theoretical knowledge and practical innovation. This collaboration brings advanced manufacturing, prototyping, and design facilities to our campus, empowering the next generation of engineers and entrepreneurs.
              </p>
              
              <ul className="space-y-4 text-slate-800 font-medium text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Access to advanced industrial prototyping equipment.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Interdisciplinary collaboration platform across 7+ departments.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>Focus on patent generation, startup incubation, and real solving.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Vision & Mission segment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Core Core Ideals</h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Our guiding principles defining the vision and strategic objectives of SJCET IDEALab.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Vision card block */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border-t-8 border-t-primary shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative flex flex-col items-start text-left">
            <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-primary mb-6">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Our Vision</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To be a premier hub of innovation, transforming creative ideas into tangible solutions through advanced technology, interdisciplinary collaboration, and hands-on learning, ultimately contributing to societal advancement and technological self-reliance.
            </p>
          </div>

          {/* Mission card block */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border-t-8 border-t-[#006e1c] shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative flex flex-col items-start text-left">
            <div className="w-14 h-14 bg-green-50 border border-green-100 rounded-2xl flex items-center justify-center text-[#006e1c] mb-6">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">Our Mission</h3>
            <ul className="space-y-4 text-slate-600 text-sm leading-relaxed w-full">
              <li className="flex items-start gap-3">
                <ChevronRight className="w-4 h-4 text-[#006e1c] shrink-0 mt-0.5" />
                <span>Provide state-of-the-art facilities for high precision CAD-modeling, dynamic drafting, laser carving, and 3D prototyping.</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="w-4 h-4 text-[#006e1c] shrink-0 mt-0.5" />
                <span>Cultivate an academic and entrepreneurial culture of lateral thinking, tinkering, learning-by-doing, and real product prototyping.</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="w-4 h-4 text-[#006e1c] shrink-0 mt-0.5" />
                <span>Bridge the gap between static classroom lectures and dynamic industry requirements through continuous training.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* The 5 E's Framework flow */}
      <section className="bg-blue-50/20 py-20 overflow-hidden border-y border-blue-100/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full font-bold text-xs uppercase tracking-wider mb-4">
            Educational Methodology
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">The 5 E's Structural Framework</h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Our structured approach designed to translate student questions into robust physical solutions.
          </p>
        </div>

        {/* Scrollable list of 5E's */}
        <div className="flex gap-6 overflow-x-auto px-4 sm:px-6 pb-6 scrollbar-hide">
          {fiveEs.map((eItem, idx) => (
            <div 
              key={idx}
              className="min-w-[280px] sm:min-w-[320px] bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex-shrink-0 flex flex-col hover:shadow-md transition-shadow relative text-left"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl mb-6 shadow-md shadow-slate-100 ${eItem.bg}`}>
                {eItem.step}
              </div>
              <h3 className="font-extrabold text-slate-800 text-lg mb-2">{eItem.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed flex-1">{eItem.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Location & Contact strip info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <div className="bg-slate-800 text-white rounded-[2rem] p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative overflow-hidden shadow-lg select-text divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:20px_20px] z-0"></div>
          
          <div className="flex flex-col items-center py-6 md:py-0 px-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary-fixed-dim border border-white/15 mb-4">
              <MapPin className="w-6 h-6 text-blue-300" />
            </div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-2">Visit SJCET Campus</h4>
            <p className="text-sm text-slate-200 font-medium">IDEALab Block, Ground Floor<br />SJCET Campus, Palai<br />Kerala 686579</p>
          </div>

          <div className="flex flex-col items-center py-6 md:py-0 px-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary-fixed-dim border border-white/15 mb-4">
              <Mail className="w-6 h-6 text-blue-300" />
            </div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-2">Email Desk</h4>
            <p className="text-sm text-slate-200 font-medium">idealab@sjcetpalai.ac.in<br />office@sjcetpalai.ac.in<br />Direct: support@sjcetpalai.ac.in</p>
          </div>

          <div className="flex flex-col items-center py-6 md:py-0 px-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary-fixed-dim border border-white/15 mb-4">
              <Phone className="w-6 h-6 text-blue-300" />
            </div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-2">Call Office</h4>
            <p className="text-sm text-slate-200 font-medium">+91 4822 239700<br />+91 9447 123456<br />Fax: +91 4822 239300</p>
          </div>
        </div>
      </section>

    </motion.div>
  );
}

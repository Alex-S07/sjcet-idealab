import { Equipment, LabEvent, LabStat, FaqItem } from "./types";

export const MOCK_EQUIPMENT: Equipment[] = [
  {
    id: "eq-1",
    name: "Ultimaker S5 Professional FDM 3D Printer",
    category: "Prototyping",
    description: "Dual-extrusion industrial 3D printer with huge build volume (330x240x300mm), automatic bed leveling, and material recognition. Ideal for functional prototyping, engineering models, and complex geometries with water-soluble support structure.",
    status: "Available",
    image: "/images/3d-printer.png",
    specs: [
      "Build Volume: 330 x 240 x 300 mm",
      "Layer Resolution: Up to 20 microns (0.02 mm)",
      "Supported Filament: PLA, Tough PLA, ABS, Nylon, CPE, PVA, TPU",
      "Nozzle Temperatures: Dual Extrusion, up to 280°C"
    ],
    safetyRules: [
      "Never touch the extruder nozzles or heated build plate during printing.",
      "Ensure proper ventilation is turned on before starting materials like ABS/Nylon.",
      "Do not leave the printer unattended during the first layer of printing.",
      "Wait at least 5 minutes after model completion for parts to cool before removing."
    ],
    location: "Rapid Prototyping Bay, Ground Floor"
  },
  {
    id: "eq-2",
    name: "SIL 1390 CO2 Laser Cutter & Engraver",
    category: "Fabrication",
    description: "High-precision 130W heavy-duty CO2 laser system suited for laser-cutting and engraving flat sheets of acrylic, wood, MDF, leather, cork, and rubber. Cannot cut or engrave metals or chlorinated materials.",
    status: "Available",
    image: "/images/laser-cutter.png",
    specs: [
      "Bed Area: 1300 x 900 mm",
      "Laser Source: 130W CO2 Glass Tube",
      "Cutting Speed: 0-400 mm/s",
      "Maximum Cutting Thickness: 15mm Acrylic, 12mm Wood"
    ],
    safetyRules: [
      "NEVER operate the laser cutter without the exhaust system and air compressor active.",
      "Strictly prohibited: PVC, Vinyl, Polycarbonate, or any chlorinated plastic (hazardous chlorine gas release).",
      "Always wear appropriate laser-safety glasses (OD6+ in 10600nm) while the beam is operating.",
      "Maintain active supervision throughout the entire cutting process. Keep fire extinguisher handy."
    ],
    location: "Laser Machining Compartment, Lab Zone B"
  },
  {
    id: "eq-3",
    name: "Roland MonoFab SRM-20 CNC Milling Machine",
    category: "Electronics",
    description: "A compact desktop milling machine designed for rapid prototyping of printed circuit boards (PCBs) and 3D modeling blocks. Carves circuits with micron level flatness, removing the need for acid chemically-etched boards.",
    status: "Available",
    image: "/images/cnc-mill.png",
    specs: [
      "Work Area: 203.2 x 152.4 x 60.5 mm",
      "Spindle Speed: 7,000 RPM max",
      "Acceptable Materials: FR-1 (PCB blanks), Acrylic, Modeling Wax, Chemical Wood",
      "Mechanical Resolution: 0.000996 mm/step"
    ],
    safetyRules: [
      "Strictly use FR-1 copper clad boards; FR-4 generates toxic fiberglass dust that will destroy spindles.",
      "Ensure the safety enclosure shield is completely closed before starting the milling file.",
      "Clean fiberglass residue and acrylic shavings with the vacuum cleaner after every project step.",
      "Always inspect bits for chipping or cracks before spinning at 7,000 RPM."
    ],
    location: "Embedded Systems & PCB Station"
  },
  {
    id: "eq-4",
    name: "Heavy Duty 3-Axis Woodworking CNC Router",
    category: "Woodworking & Metal",
    description: "Robust industrial CNC router featuring a continuous liquid-cooled high-frequency spindle. Excels at cutting, jointing, relief carving, and profiling heavy wood timbers, thick plywood, plastics, composites, and aluminum plates.",
    status: "In Use",
    image: "/images/cnc-router.png",
    specs: [
      "Travel Area: 1200 x 1200 mm",
      "Spindle: 3.2 kW Water-Cooled, 24,000 RPM max",
      "Clamping style: Aluminum T-slot table with mechanical clamps",
      "Collets Supported: ER20 size (3mm, 6mm, 12mm bits)"
    ],
    safetyRules: [
      "Safety goggles, ear defense muffs, and thick closed shoes are mandatory in this bay.",
      "Verify that the material stock is extremely securely clamped before starting. Never stand directly in front.",
      "Ensure the emergency stop mushroom button is within reach at all times.",
      "Tie back long hair, roll up long sleeves, and remove any neck-straps or bracelets before operating."
    ],
    location: "Heavy Woodworking and Metal Bay, Zone C"
  },
  {
    id: "eq-5",
    name: "Advanced IoT and Embedded Design Workbench",
    category: "Electronics",
    description: "State-of-the-art testing workspace for digital circuits and microcontrollers. Outfitted with high-speed multi-channel digital oscilloscopes, isolated laboratory bench power supplies, solder stations, thermal imaging, and component kit drawers.",
    status: "Available",
    image: "/images/iot-bench.png",
    specs: [
      "DSO: Rigol 4-Channel 100MHz Digital Storage Oscilloscope",
      "Solder System: Weller Professional Temperature Controlled ESD-safe ESD-200",
      "Power Supply: 0-30V 5A Adjustable Triple Output Lab Supply",
      "Kits Available: Arduino, ESP32, STM32, Raspberry Pi Pico, and extensive sensor boards"
    ],
    safetyRules: [
      "Ensure the active fume extractor nozzle is positioned within 10cm of soldering to prevent lead inhalations.",
      "Always shut down bench power supplies and return testing cables to hanger hooks when work completes.",
      "Double-check polarities and resistance limits before turning on high current modules.",
      "Solder irons must reside exclusively in their heavy safety spring mounts during heating."
    ],
    location: "IOT and Electronics Innovation Zone"
  },
  {
    id: "eq-6",
    name: "EinScan Pro HD Multi-functional 3D Scanner",
    category: "Design & Computing",
    description: "Professional multi-functional handheld 3D scanner capable of rapid scan modes and fixed hd modes. Great for reverse-engineering mechanical components, high-fidelity digitizing, or modeling real-world organic forms into ready-to-print meshes.",
    status: "Available",
    image: "/images/3d-scanner.png",
    specs: [
      "Accuracy: Up to 0.04 mm in Fixed Scan Mode",
      "Volumetric Scan Seed: 1,200,000 points/s max",
      "Output Formats: OBJ, STL, PLY, ASC",
      "Software: EXScan Pro post-processing suite"
    ],
    safetyRules: [
      "Avoid direct visual contact with the blue light light engine projector inside the scanner head.",
      "Carry the device exclusively using SJCET shockproof padded straps; never set loosely on table tables.",
      "Always inspect and dust the optical lenses using the specified microfiber air puffer before scanning."
    ],
    location: "CAD/CAM Simulation & VR Cube, Floor 1"
  }
];

export const MOCK_EVENTS: LabEvent[] = [
  {
    id: "evt-1",
    title: "Dual Extrusion 3D Printing & Filament Slicing Masterclass",
    description: "Get certified to operate our Ultimaker S5 fleet. Learn complete slicing settings, dissolvable supports, dual color prints, and bed-level calibration.",
    detailDescription: "Join SJCET IDEALab's signature 3D printing workshop! We take you through the complete workflows of modern additive manufacturing. Begin by designing parametric functional parts in Fusion360, explore slicing secrets in Cura, utilize water-soluble PVA filament for complex internal overhangs, and configure optimal print profiles. By completing this workshop, SJCET students receive active 'Badge A-3D' enabling independent printer booking authorization on the Web Portal.",
    category: "Workshop",
    date: "2026-06-20",
    time: "09:30 AM - 04:00 PM",
    venue: "Rapid Prototyping Bay, IDEALab Ground Floor",
    instructorName: "Dr. Siby S.",
    instructorTitle: "Senior Lab Coordinator & Associate Professor in ME",
    seatsTotal: 25,
    seatsRegistered: 18,
    status: "Upcoming",
    image: "/images/workshop.png"
  },
  {
    id: "evt-2",
    title: "IoT Architecture & Edge TinyML Hands-On Bootcamp",
    description: "Build robust distributed electronic sensors. Code ESP32, wire communication protocols (I2C, SPI, MQTT), and design a localized anomaly sensor using voice input.",
    detailDescription: "This intensive 3-day bootcamp covers the boundary line of hardware meet software. Participants will program real ESP32 MCUs, read environmental sensor matrices, set up MQTT clusters, and push telemetry to standard IoT gateways. On Day 3, we dive into edge artificial intelligence, deploying a compiled neural net on tiny microcontrollers using EdgeImpulse to identify acoustic signatures or device motor vibration faults.",
    category: "Bootcamp",
    date: "2026-06-25",
    time: "09:00 AM - 04:30 PM",
    venue: "Embedded Systems lab, SJCET Main Wing",
    instructorName: "Mr. Alex Joseph",
    instructorTitle: "Design Engineer & SJCET Alumni Entrepreneur",
    seatsTotal: 30,
    seatsRegistered: 29,
    status: "Upcoming",
    image: "/images/iot-bootcamp.png"
  },
  {
    id: "evt-3",
    title: "3-Axis Acrylic Robotic Arm Assembly & Programming Tournament",
    description: "Assemble a functional mechatronic arm in a team of three. Compete to code optimal motion sequencing for sorting blocks by color.",
    detailDescription: "Form your teams and dive into the ultimate mechatronics battle. We provide each team with precision laser-cut cast acrylic sheets, 4 high-torque metal gear servos, an Arduino Uno, sensor shield, breadboards, and color sensor kits. Day 1 is dedicated to mechanical assembly and motor calibration. Day 2 centers on kinematic sweep coding, sorting algorithms, and speed accuracy tests. Huge cash prizes and trophies await the champion team!",
    category: "Hackathon",
    date: "2026-07-02",
    time: "08:30 AM - 05:00 PM",
    venue: "Central Tinkering Area, IDEALab Arena",
    instructorName: "Prof. Abraham Kurian",
    instructorTitle: "SJCET Robotics Club Lead & Associate Professor, ECE Dept.",
    seatsTotal: 40,
    seatsRegistered: 34,
    status: "Upcoming",
    image: "/images/hackathon.png"
  },
  {
    id: "evt-4",
    title: "Advanced Parametric SolidWorks & Dynamic Simulation FDP",
    description: "Faculty Development Program targeting modeling complex part features, surface molding, and conducting thermal and fluid simulation analysis.",
    detailDescription: "Exclusively tailored training for research scholars and faculty. Master advanced drafting models, solid surfaces, drafting tolerances, thermal stress calculations, dynamic flow modeling, and rapid design-cycle testing templates. Certified SolidWorks Professional (CSWP) mock testing guidelines provided.",
    category: "FDP",
    date: "2026-05-12",
    time: "10:00 AM - 03:30 PM",
    venue: "CAD Simulation Lab & VR Wing, Floor 1",
    instructorName: "Engr. Rajesh Kumar",
    instructorTitle: "CAD/CAM Solutions Architect & DS SolidWorks Trainer",
    seatsTotal: 20,
    seatsRegistered: 20,
    status: "Completed",
    image: "/images/cad-fdp.png"
  }
];

export const MOCK_STATS: LabStat[] = [
  { value: "850+", label: "Students Trained" },
  { value: "35+", label: "High-Tech Facilities & Stations" },
  { value: "50+", label: "Completed Prototypes" },
  { value: "24/7", label: "Project Guidance Support" }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Who can access SJCET IDEALab facilities?",
    answer: "The IDEALab is open to all students, research scholars, and faculty members of St. Joseph's College of Engineering and Technology, Palai across all departments. External colleges, startup incubators, and school students are also permitted access through authorized industrial visits, guest workshops, or special project request approvals."
  },
  {
    question: "How do I secure permission to run high-value machinery?",
    answer: "Every student must complete a basic safety orientation and tool training workshop (e.g. 3D printing masterclass, laser cutter safety). Once the respective coordinator verifies your skills, they issue a specialized equipment badge. You can then book a reservation slot on this portal and check in directly on site with your physical SJCET ID."
  },
  {
    question: "Are there any charges for consumables (plastic filament, wood beds)?",
    answer: "For academic curiculum coursework and initial prototyping iterations, SJCET provides common PLA filaments, MDF sheets, and basic resistors free of charge up to a monthly volume limit. If your project is highly material-intensive (e.g. customized solid resin printing, dense alloy milling, heavy grade chemical lumber), you are encouraged to bring or purchase approved raw materials through our campus cooperative inventory."
  },
  {
    question: "How does the facility booking process operate?",
    answer: "It's simple. Switch to the 'Facilities' tab, select the equipment you require, search for available dates, choose your time slots, provide your project purpose details, and submit! You can check the approval status under your profile. We store all bookings locally in your web session so you never lose track of scheduled tinkering."
  },
  {
    question: "Can I bring my own project team members to code and build?",
    answer: "Absolutely! Collaboration is the foundational pillar of the IDEALab. Our central discussion zone features write-on whiteboards, movable tables, high-speed campus Wi-Fi, and modular electric nodes where your team can develop plans prior to machining."
  }
];

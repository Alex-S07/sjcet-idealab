export interface Equipment {
  id: string;
  name: string;
  category: "Prototyping" | "Fabrication" | "Electronics" | "Design & Computing" | "Woodworking & Metal";
  description: string;
  status: "Available" | "Maintenance" | "In Use";
  image: string;
  specs: string[];
  safetyRules: string[];
  location: string;
}

export interface Booking {
  id: string;
  equipmentId: string;
  equipmentName: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  department: string;
  batchOrRole: string; // e.g., "S1 CSE", "S5 ME", "Faculty", "External"
  date: string;
  timeSlot: string;
  purpose: string;
  status: "Pending" | "Approved" | "Completed" | "Cancelled";
  createdAt: string;
}

export interface LabEvent {
  id: string;
  title: string;
  description: string;
  detailDescription?: string;
  category: "Workshop" | "Bootcamp" | "FDP" | "Hackathon" | "Exhibition";
  date: string;
  time: string;
  venue: string;
  instructorName: string;
  instructorTitle: string;
  seatsTotal: number;
  seatsRegistered: number;
  status: "Upcoming" | "Completed" | "Ongoing";
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface LabStat {
  value: string;
  label: string;
}

export interface LabMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

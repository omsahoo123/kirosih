import type { UserRole } from "@/types";

export interface DummyUser {
  role: UserRole;
  email: string;
  password: string;
  name: string;
  phone: string;
  // role-specific fields
  dob?: string;
  gender?: string;
  state?: string;
  language?: string;
  district?: string;
  age?: number;
  caregiver_name?: string;
  caregiver_phone?: string;
  pregnancy_status?: string;
  disease_type?: string;
  is_anonymous?: boolean;
  license_no?: string;
  specialization?: string;
  hospital_name?: string;
  reg_no?: string;
  city?: string;
  bed_capacity?: number;
  // dashboard display extras
  healthScore?: number;
  lastCheckIn?: string;
  upcomingAppointment?: string;
}

export const DUMMY_USERS: DummyUser[] = [
  {
    role: "patient",
    email: "patient@aarogya.ai",
    password: "Test@1234",
    name: "Riya Sharma",
    phone: "+91 98765 43210",
    dob: "1995-06-15",
    gender: "Female",
    healthScore: 78,
    lastCheckIn: "Today, 9:00 AM",
    upcomingAppointment: "Dr. Mehta – 25 Aug, 3:00 PM",
  },
  {
    role: "rural",
    email: "rural@aarogya.ai",
    password: "Test@1234",
    name: "Ramkishan Yadav",
    phone: "+91 94532 11023",
    state: "Rajasthan",
    language: "Hindi",
    district: "Barmer",
    lastCheckIn: "Yesterday, 7:30 AM",
    upcomingAppointment: "PHC Barmer – 26 Aug",
  },
  {
    role: "elderly",
    email: "elderly@aarogya.ai",
    password: "Test@1234",
    name: "Savitri Devi",
    phone: "+91 99012 34567",
    age: 72,
    caregiver_name: "Arun Devi",
    caregiver_phone: "+91 98011 22334",
    lastCheckIn: "Today, 8:15 AM",
    upcomingAppointment: "Dr. Joshi – 27 Aug, 11:00 AM",
  },
  {
    role: "women",
    email: "women@aarogya.ai",
    password: "Test@1234",
    name: "Anjali Singh",
    phone: "+91 87654 32109",
    pregnancy_status: "Pregnant",
    lastCheckIn: "Today, 10:00 AM",
    upcomingAppointment: "Dr. Priya Nair – 28 Aug, 2:00 PM",
  },
  {
    role: "chronic",
    email: "chronic@aarogya.ai",
    password: "Test@1234",
    name: "Suresh Agarwal",
    phone: "+91 91234 56789",
    disease_type: "Type 2 Diabetes",
    healthScore: 64,
    lastCheckIn: "Today, 7:00 AM",
    upcomingAppointment: "Dr. Kapoor – 29 Aug, 10:00 AM",
  },
  {
    role: "mental",
    email: "mental@aarogya.ai",
    password: "Test@1234",
    name: "Karan Mehra",
    phone: "+91 80987 65432",
    is_anonymous: false,
    lastCheckIn: "Yesterday, 9:00 PM",
    upcomingAppointment: "Therapist Session – 30 Aug, 6:00 PM",
  },
  {
    role: "doctor",
    email: "doctor@aarogya.ai",
    password: "Test@1234",
    name: "Dr. Priya Nair",
    phone: "+91 99887 76655",
    license_no: "MCI-2018-45231",
    specialization: "Gynaecologist",
    hospital_name: "Apollo Hospitals, Mumbai",
    upcomingAppointment: "12 consultations today",
  },
  {
    role: "hospital",
    email: "hospital@aarogya.ai",
    password: "Test@1234",
    name: "Fortis Admin",
    phone: "+91 22 4444 5555",
    hospital_name: "Fortis Hospital",
    reg_no: "MH-HOS-2005-0342",
    city: "Pune",
    bed_capacity: 450,
    upcomingAppointment: "Board meeting – 25 Aug, 11:00 AM",
  },
];

export function findDummyUser(email: string, password: string): DummyUser | null {
  return (
    DUMMY_USERS.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    ) ?? null
  );
}

export function getDummyUserByRole(role: UserRole): DummyUser | undefined {
  return DUMMY_USERS.find((u) => u.role === role);
}

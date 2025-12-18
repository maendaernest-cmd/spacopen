export type PropertyMode = 'LIVING' | 'BUSINESS' | 'PRODUCTION' | 'TRAVEL';

export type LogCategory = 
  | 'TRUST'       // Verification, ID
  | 'LEGAL'       // Contracts, DocuSign
  | 'SPATIAL'     // Maps, Boundaries, LandGlide
  | 'FINANCIAL'   // Price changes, ROI, Bills
  | 'MAINTENANCE' // Repairs, Upgrades
  | 'SOCIAL'      // Reviews, Roommate matching
  | 'MEDIA'       // Virtual Tours
  | 'POLICY'      // Rules, No Fees
  | 'COMMUNICATION' // Chat, WhatsApp, SMS, Email
  | 'USER';       // User actions, Custom Search, Saves

export interface LogEvent {
  id: string;
  date: string;
  category: LogCategory;
  title: string;
  description: string;
  verified: boolean;
  metadata?: {
    [key: string]: string | number;
  };
}

export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  currency: string;
  mode: PropertyMode;
  image: string;
  specs: {
    label: string;
    value: string;
  }[];
  summaryScore: number; // 0-100 Trust Score
  logs: LogEvent[];
  coordinates: { lat: number; lng: number };
}

export interface User {
  name: string;
  role: 'Buyer' | 'Seller' | 'Tenant' | 'Landlord' | 'Investor';
  verified: boolean;
}
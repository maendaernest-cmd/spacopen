import { Property, LogEvent } from './types';

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Plot 452 - Evergreen Agricultural Stand',
    address: 'Mutare Road, 20km from Harare CBD',
    price: 45000,
    currency: 'USD',
    mode: 'PRODUCTION',
    image: 'https://picsum.photos/seed/land1/800/600',
    summaryScore: 92,
    coordinates: { lat: -17.82, lng: 31.05 },
    specs: [
      { label: 'Size', value: '5 Acres' },
      { label: 'Zoning', value: 'Agricultural' },
      { label: 'Soil Type', value: 'Red Loam' }
    ],
    logs: [
      {
        id: 'ev-1',
        date: '2023-10-24',
        category: 'SPATIAL',
        title: 'Boundary Walk Verified',
        description: 'GPS path matched Deed Diagram #GH-991 via LandGlide integration.',
        verified: true,
      },
      {
        id: 'ev-2',
        date: '2023-10-25',
        category: 'TRUST',
        title: 'Ownership Verified',
        description: 'Title Deeds check complete via DealMachine API. No liens found.',
        verified: true,
      },
      {
        id: 'ev-3',
        date: '2023-11-02',
        category: 'FINANCIAL',
        title: 'Soil Productivity Report',
        description: 'Nitrogen levels High. Suitable for Maize and Tobacco.',
        verified: true,
        metadata: { 'Yield Potential': 'High' }
      },
      {
        id: 'ev-4',
        date: '2023-11-10',
        category: 'MEDIA',
        title: 'Virtual Tour Uploaded',
        description: 'Owner verified on-site presence via GPS. Viewable in OpenProp mode.',
        verified: true,
      },
      {
        id: 'ev-new-1',
        date: '2023-11-12',
        category: 'MEDIA',
        title: 'Verified Virtual Tour Uploaded',
        description: 'High-definition 360° tour with verified GPS timestamps via OpenProp.',
        verified: true,
      }
    ]
  },
  {
    id: 'prop-2',
    title: 'Modern Loft - Tech Hub',
    address: 'Central Plaza, Nairobi',
    price: 1200,
    currency: 'USD',
    mode: 'LIVING',
    image: 'https://picsum.photos/seed/loft/800/600',
    summaryScore: 88,
    coordinates: { lat: -1.29, lng: 36.82 },
    specs: [
      { label: 'Type', value: '2 Bed Apt' },
      { label: 'Internet', value: 'Fiber Ready' },
      { label: 'Furnished', value: 'Yes' }
    ],
    logs: [
      {
        id: 'ev-5',
        date: '2023-11-15',
        category: 'POLICY',
        title: 'No Viewing Fee Commitment',
        description: 'Host committed to OpenProp Zero-Fee policy.',
        verified: true,
      },
      {
        id: 'ev-6',
        date: '2023-12-01',
        category: 'MAINTENANCE',
        title: 'HVAC Serviced',
        description: 'Air conditioning unit repaired and gassed.',
        verified: true,
      },
      {
        id: 'ev-7',
        date: '2024-01-05',
        category: 'LEGAL',
        title: 'Lease Template Ready',
        description: 'State-compliant lease generated via DocuSign integration.',
        verified: true,
      },
      {
        id: 'ev-11',
        date: '2024-02-14',
        category: 'POLICY',
        title: 'No Viewing Fee Commitment',
        description: 'Reaffirmed Zero-Fee policy for all interested tenants.',
        verified: true,
      }
    ]
  },
  {
    id: 'prop-3',
    title: 'Retail Fix & Flip Opportunity',
    address: '14 Main St, Cape Town',
    price: 180000,
    currency: 'USD',
    mode: 'BUSINESS',
    image: 'https://picsum.photos/seed/shop/800/600',
    summaryScore: 74,
    coordinates: { lat: -33.92, lng: 18.42 },
    specs: [
      { label: 'Area', value: '150 sqm' },
      { label: 'Frontage', value: '12m' },
      { label: 'Power', value: '3-Phase' }
    ],
    logs: [
      {
        id: 'ev-8',
        date: '2024-01-10',
        category: 'FINANCIAL',
        title: 'Distressed Asset Signal',
        description: 'Property identified as pre-foreclosure via DealMachine.',
        verified: true,
      },
      {
        id: 'ev-9',
        date: '2024-01-12',
        category: 'SPATIAL',
        title: 'Footfall Analytics',
        description: 'High traffic zone identified via LoopNet data.',
        verified: false, // Pending verification
      },
      {
        id: 'ev-10',
        date: '2024-01-14',
        category: 'MAINTENANCE',
        title: 'Roof Inspection Failed',
        description: 'Major leaks detected. Rehab cost estimated at $15k.',
        verified: true,
        metadata: { 'Risk': 'High' }
      }
    ]
  },
  {
    id: 'prop-4',
    title: 'Sunny Side Cottage - Short Stay',
    address: 'Victoria Falls, Zimbabwe',
    price: 85,
    currency: 'USD',
    mode: 'TRAVEL',
    image: 'https://picsum.photos/seed/travel1/800/600',
    summaryScore: 96,
    coordinates: { lat: -17.92, lng: 25.85 },
    specs: [
      { label: 'Sleeps', value: '4 Guests' },
      { label: 'Rating', value: '4.9/5' },
      { label: 'WiFi', value: 'Starlink' }
    ],
    logs: [
      {
        id: 'travel-1',
        date: '2023-12-20',
        category: 'MEDIA',
        title: 'Verified Virtual Tour',
        description: '3D walkthrough verified by OpenProp. Matches current furniture.',
        verified: true,
      },
      {
        id: 'travel-2',
        date: '2024-01-02',
        category: 'MAINTENANCE',
        title: 'Deep Clean Verified',
        description: 'Professional cleaning crew logged exit clean. Ready for check-in.',
        verified: true,
        metadata: { 'Cleaner': 'Spotless Co.' }
      },
      {
        id: 'travel-3',
        date: '2024-01-15',
        category: 'SOCIAL',
        title: 'Superhost Status',
        description: 'Achieved 10 consecutive 5-star reviews.',
        verified: true,
      },
      {
        id: 'travel-4',
        date: '2024-02-01',
        category: 'FINANCIAL',
        title: 'Dynamic Pricing Update',
        description: 'Adjusted rates for peak season based on local event logs.',
        verified: true,
      }
    ]
  },
  {
    id: 'prop-5',
    title: 'Shared Penthouse - Roommate Wanted',
    address: 'Kigali Heights, Rwanda',
    price: 450,
    currency: 'USD',
    mode: 'LIVING',
    image: 'https://picsum.photos/seed/roommate/800/600',
    summaryScore: 82,
    coordinates: { lat: -1.95, lng: 30.09 },
    specs: [
      { label: 'Room', value: 'Master Ensuite' },
      { label: 'Gender', value: 'Mixed' },
      { label: 'Bills', value: 'Split 50/50' }
    ],
    logs: [
      {
        id: 'live-1',
        date: '2024-01-10',
        category: 'SOCIAL',
        title: 'Current Tenant Verified',
        description: 'Identity and employment verification complete for lead tenant.',
        verified: true,
      },
      {
        id: 'live-2',
        date: '2024-01-12',
        category: 'FINANCIAL',
        title: 'Bill History Uploaded',
        description: 'Past 6 months of electricity and water bills uploaded for transparency.',
        verified: true,
        metadata: { 'Avg Cost': '$45/mo' }
      },
      {
        id: 'live-3',
        date: '2024-01-20',
        category: 'SPATIAL',
        title: 'Commute Analysis',
        description: '10 min walk to Convention Center verified via Rightmove integration.',
        verified: true,
      }
    ]
  },
  {
    id: 'prop-6',
    title: 'Blue Chip Office Park',
    address: 'Sandton, Johannesburg',
    price: 3500,
    currency: 'USD',
    mode: 'BUSINESS',
    image: 'https://picsum.photos/seed/office/800/600',
    summaryScore: 95,
    coordinates: { lat: -26.10, lng: 28.05 },
    specs: [
      { label: 'Grade', value: 'AAA' },
      { label: 'Parking', value: '10 Bays' },
      { label: 'Backup', value: 'Solar + Gen' }
    ],
    logs: [
      {
        id: 'biz-1',
        date: '2023-09-15',
        category: 'TRUST',
        title: 'Commercial Zoning Verified',
        description: 'Zoning certificate verified. Approved for Financial Services.',
        verified: true,
      },
      {
        id: 'biz-2',
        date: '2023-11-20',
        category: 'MAINTENANCE',
        title: 'Solar Installation Log',
        description: '50kW Solar System commissioned. Grid-tie authorized.',
        verified: true,
        metadata: { 'Savings': '40% Power' }
      },
      {
        id: 'biz-3',
        date: '2024-02-10',
        category: 'SPATIAL',
        title: 'Connectivity Scan',
        description: 'Fiber dark line active. 5G coverage verified.',
        verified: true,
      }
    ]
  },
  {
    id: 'prop-7',
    title: 'Golden Valley Wheat Farm',
    address: 'Chisamba, Zambia',
    price: 320000,
    currency: 'USD',
    mode: 'PRODUCTION',
    image: 'https://picsum.photos/seed/wheat/800/600',
    summaryScore: 89,
    coordinates: { lat: -14.96, lng: 28.25 },
    specs: [
      { label: 'Arable', value: '50 Hectares' },
      { label: 'Water', value: 'River Rights' },
      { label: 'Center Pivot', value: '2 Units' }
    ],
    logs: [
      {
        id: 'agri-1',
        date: '2023-05-10',
        category: 'SPATIAL',
        title: 'Land id Map Layer',
        description: 'Topography and flood lines mapped. 95% arable land confirmed.',
        verified: true,
      },
      {
        id: 'agri-2',
        date: '2023-08-15',
        category: 'FINANCIAL',
        title: 'Crop Yield History',
        description: 'Past 3 seasons production logs uploaded. Avg 7 tons/ha.',
        verified: true,
      },
      {
        id: 'agri-3',
        date: '2024-01-20',
        category: 'LEGAL',
        title: 'Water Rights Verified',
        description: 'Extraction permit valid until 2030.',
        verified: true,
      }
    ]
  },
  {
    id: 'prop-8',
    title: 'Distressed Victorian Fixer-Upper',
    address: 'Woodstock, Cape Town',
    price: 110000,
    currency: 'USD',
    mode: 'BUSINESS',
    image: 'https://picsum.photos/seed/fixer/800/600',
    summaryScore: 65,
    coordinates: { lat: -33.93, lng: 18.45 },
    specs: [
      { label: 'Strategy', value: 'Flip' },
      { label: 'ARV', value: '$195k' },
      { label: 'Condition', value: 'Poor' }
    ],
    logs: [
      {
        id: 'flip-1',
        date: '2024-02-15',
        category: 'FINANCIAL',
        title: '70% Rule Analysis',
        description: 'Asking price is 65% of ARV minus repairs. Green light.',
        verified: true,
        metadata: { 'Potential Profit': '$35k' }
      },
      {
        id: 'flip-2',
        date: '2024-02-16',
        category: 'MAINTENANCE',
        title: 'Structural Engineer Report',
        description: 'Foundation cracking detected. Est repair $5,000.',
        verified: true,
        metadata: { 'Risk': 'Medium' }
      },
      {
        id: 'flip-3',
        date: '2024-02-17',
        category: 'USER',
        title: 'Renovation Budget Draft',
        description: 'FlipperForce integration: Kitchen ($8k), Bath ($4k), Paint ($3k).',
        verified: false,
      }
    ]
  }
];
export const defaultValues = {
  email: '',
  contact: '',
  company: '',
  fullName: '',
  username: '',
  country: null,
  stage: null
};

export const stageOptions = [
  { label: 'cold', value: 'cold' },
  { label: 'warm', value: 'warm' },
  { label: 'hot', value: 'hot' }
];

export const countryOptions = [
  { label: 'Australia', value: 'Australia' },
  { label: 'Bangladesh', value: 'Bangladesh' },
  { label: 'Belarus', value: 'Belarus' },
  { label: 'Brazil', value: 'Brazil' },
  { label: 'Canada', value: 'Canada' },
  { label: 'China', value: 'China' },
  { label: 'France', value: 'France' },
  { label: 'Germany', value: 'Germany' },
  { label: 'India', value: 'India' },
  { label: 'Indonesia', value: 'Indonesia' },
  { label: 'Israel', value: 'Israel' },
  { label: 'Italy', value: 'Italy' },
  { label: 'Japan', value: 'Japan' },
  { label: 'Korea', value: 'Korea' },
  { label: 'Mexico', value: 'Mexico' },
  { label: 'Philippines', value: 'Philippines' },
  { label: 'Russia', value: 'Russia' },
  { label: 'South', value: 'South' },
  { label: 'Thailand', value: 'Thailand' },
  { label: 'Turkey', value: 'Turkey' },
  { label: 'Ukraine', value: 'Ukraine' },
  { label: 'United Arab Emirates', value: 'United Arab Emirates' },
  { label: 'United Kingdom', value: 'United Kingdom' },
  { label: 'United States', value: 'United States' }
];

export const newPositions = [
  { position: 'Owner' },
  { position: 'Assistant' },
  { position: 'Billing' }
];

export const positionOptions = [
  { value: '', label: 'Select...' },
  { value: 'Owner', label: 'Owner' },
  { value: 'Assistant', label: 'Assistant' },
  { value: 'Billing', label: 'Billing' }
];

export const statusOptions = [
  { value: 'remote', label: 'Remote' },
  { value: 'home', label: 'In house' }
];

export const relationType = [
  { value: '', label: 'Select...' },
  { value: 'Personal', label: 'Personal' },
  { value: 'Business', label: 'Business' },
  { value: 'Other', label: 'Other' }
];

export const clientTypeOptions = [
  { value: 'all', label: 'Show All' },
  { value: 'individual', label: 'Individual' },
  { value: 'company', label: 'Company' }
];

export const status2Options = [
  { value: false, label: 'Active' },
  { value: true, label: 'Former' }
];

export const cvtColor = {
  primary: '#174ae7',
  secondary: '#82868b',
  success: '#28c76f',
  danger: '#ea5455',
  warning: '#ff9f43',
  info: '#00cfe8',
  light: '#FBFBFB',
  dark: '#332D2D',
  'light-primary': '#174ae730',
  'light-secondary': '#82868b30',
  'light-success': '#28c76f30',
  'light-danger': '#ea545530',
  'light-warning': '#ff9f4330',
  'light-info': '#00cfe830',
  'light-light': '#FBFBFB30',
  'light-dark': '#332D2D30'
};

export const noteResponseColor = {
  'Left Message': 'light-info',
  'No Answer': 'light-danger',
  Answer: 'light-success',
  Other: 'light-warning'
};

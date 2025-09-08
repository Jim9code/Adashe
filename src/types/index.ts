/**
 * TypeScript type definitions for Adashe app
 */

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  bankDetails: BankDetails;
  profileImage?: string;
  bvn?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BankDetails {
  accountNumber: string;
  bankName: string;
  accountName: string;
}

// Group Types
export interface Group {
  id: string;
  name: string;
  description?: string;
  contributionAmount: number;
  cycle: 'weekly' | 'monthly';
  maxMembers: number;
  currentMembers: number;
  status: 'active' | 'completed' | 'paused';
  payoutOrder: string[];
  currentPayoutIndex: number;
  createdAt: string;
  updatedAt: string;
  members: GroupMember[];
  adminId: string;
}

export interface GroupMember {
  userId: string;
  user: User;
  payoutOrder: number;
  contributionStatus: 'paid' | 'pending' | 'defaulted';
  joinedAt: string;
  lastContributionAt?: string;
}

// Wallet Types
export interface Transaction {
  id: string;
  userId: string;
  groupId?: string;
  type: 'contribution' | 'payout' | 'topup' | 'withdrawal';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Wallet {
  balance: number;
  transactions: Transaction[];
}

// Auth Types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Navigation Types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

export type MainStackParamList = {
  Tabs: undefined;
  CreateGroup: undefined;
  GroupDetail: { 
    groupId: string; 
    groupName: string; 
    userRole: 'admin' | 'member'; 
  };
  Notifications: undefined;
  Transactions: undefined;
  JoinGroup: undefined;
  ManageMembers: {
    groupId: string;
    groupName: string;
  };
  Payment: {
    groupId?: string;
    groupName?: string;
    amount?: number;
    recipientId?: string;
    recipientName?: string;
  };
  TopUp: undefined;
  Withdraw: undefined;
  PhoneConfirmation: {
    phoneNumber?: string;
    userId?: string;
  };
  UserProfileView: {
    userId: string;
    userName?: string;
    userEmail?: string;
    userPhone?: string;
    userRole?: 'admin' | 'member';
    joinDate?: string;
    isVerified?: boolean;
    groupsCount?: number;
    totalContributions?: number;
    reliabilityScore?: number;
  };
};

export type TabParamList = {
  HomeTab: undefined;
  GroupsTab: undefined;
  WalletTab: undefined;
  ProfileTab: undefined;
};

// Form Types
export interface CreateGroupForm {
  name: string;
  description: string;
  contributionAmount: string;
  cycle: 'weekly' | 'monthly';
  maxMembers: string;
}

export interface JoinGroupForm {
  inviteCode: string;
}

// Error Types
export interface AppError {
  message: string;
  code?: string;
  field?: string;
}

export type Role = 'client' | 'collaborateur' | 'admin'

export interface User {
  email: string
  role: Role
  id?: string
  name?: string
}

export interface LoginDto {
  email: string
  password: string
  role?: Role
}

export interface AuthResponse {
  user: User
  accessToken: string
}

/** Register payload aligned with RegisterTypeSection form (multi-step). */
export interface RegisterDto {
  // Step 1 – Organisation
  organizationName: string
  legalForm?: string
  activitySectors: string[]
  otherActivity?: string
  companySize?: string
  otherCompanySize?: string
  country: string
  city?: string
  website?: string
  // Step 2 – Contact
  contactName: string
  sex: 'femme' | 'homme'
  countryOfOrigin: string
  contactFunction?: string
  contactPhone?: string
  // Step 3 – Besoin
  serviceInterest: string[]
  otherService?: string
  hasPartner: boolean
  // Step 4 – Compte
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
  acceptContact?: boolean
  /** Type de compte (entreprise | agence) from URL or selection */
  accountType?: 'entreprise' | 'agence'
}

/** Contact form (landing) – subject, message, email, phone optional */
export interface ContactSimpleDto {
  subject: string
  message: string
  email: string
  phone?: string
}

/** Contact form (page dédiée) – full fields */
export interface ContactFullDto {
  subject: string
  subjectDetail: string
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  contactPreference: 'email' | 'phone' | 'both'
  availability: 'morning' | 'afternoon' | 'evening' | 'indifferent'
  acceptPrivacy: boolean
}

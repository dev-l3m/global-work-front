import { http } from '@/api/http'
import type { ContactFullDto, ContactSimpleDto } from '@/api/types/contact'

export function sendContactSimple(data: ContactSimpleDto): Promise<void> {
  return http.post('/contact', { ...data, source: 'landing' }).then(() => undefined)
}

export function sendContactFull(data: ContactFullDto): Promise<void> {
  return http.post('/contact', { ...data, source: 'page' }).then(() => undefined)
}

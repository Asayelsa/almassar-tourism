// ============================================================================
// API CLIENT
// ============================================================================

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

// Types

export interface ApiError {
  detail: string
}


// API request helper
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  }


  const response = await fetch(url, {
    ...options,
    headers,
  })


  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Request failed' }))
    throw new Error(error.detail || 'Request failed')
  }

  return response.json()
}


// ============================================================================
// CONTACT & NEWSLETTER API
// ============================================================================

export async function submitContact(data: {
  name: string
  email: string
  message: string
  company?: string
  phone?: string
  country?: string
  area_of_interest?: string
}): Promise<{ id: string }> {
  return request<{ id: string }>('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function subscribeNewsletter(email: string): Promise<{ message: string }> {
  return request<{ message: string }>('/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  })
}

export async function unsubscribeNewsletter(email: string): Promise<{ message: string }> {
  return request<{ message: string }>('/newsletter/unsubscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  })
}

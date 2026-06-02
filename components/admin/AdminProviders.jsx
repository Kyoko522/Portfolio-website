'use client'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// One QueryClient per browser session (created lazily so it isn't shared across
// server requests).
export default function AdminProviders({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
      }),
  )
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

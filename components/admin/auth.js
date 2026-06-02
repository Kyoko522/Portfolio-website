'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { adminApi } from '../../src/lib/adminApi'

// Current user. A 401 means "not logged in" (returns null), not an error.
export function useMe() {
  return useQuery({
    queryKey: ['admin-me'],
    queryFn: async () => {
      try {
        const { user } = await adminApi.get('/auth/me')
        return user
      } catch (err) {
        if (err.status === 401) return null
        throw err
      }
    },
    retry: false,
  })
}

export function useLogin() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (creds) => adminApi.post('/auth/login', creds),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-me'] }),
  })
}

export function useLogout() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: () => adminApi.post('/auth/logout'),
    onSuccess: () => qc.setQueryData(['admin-me'], null),
  })
}

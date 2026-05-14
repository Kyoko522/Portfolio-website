'use client'
import dynamic from 'next/dynamic'

// ssr: false so the component initialises auth directly from sessionStorage
// without needing a useState-in-effect pattern
const VaultContent = dynamic(() => import('./VaultContent'), { ssr: false })

export default function VaultSecret() {
  return <VaultContent />
}

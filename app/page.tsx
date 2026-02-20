import { Metadata } from 'next'
import HomepageClient from '@/components/HomepageClient'

export const metadata: Metadata = {
  title: 'Luxury digital marketing for interior designers'
}

export default function Home() {
  return (
    <HomepageClient />
  )
}

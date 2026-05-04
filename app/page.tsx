import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import HowItWorks from '@/components/sections/HowItWorks'
import Stats from '@/components/sections/Stats'
import Partners from '@/components/sections/Partners'
import CTA from '@/components/sections/CTA'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <HowItWorks />
      <Stats />
      <Partners />
      <CTA />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}

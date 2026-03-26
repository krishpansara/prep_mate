import { useNavigate } from 'react-router-dom'
import Navbar from '@components/layout/Navbar'
import Footer from '@components/layout/Footer'
import HeroSection from '@components/sections/HeroSection'
import TopicsGrid from '@components/sections/TopicsGrid'
import WhySection from '@components/sections/WhySection'
import CTASection from '@components/sections/CTASection'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      <Navbar showSearch={false} />

      <main>
        <HeroSection
          onPrimaryClick={() => navigate('/dashboard')}
          onSecondaryClick={() => {
            document.getElementById('topics')?.scrollIntoView({ behavior: 'smooth' })
          }}
        />

        <div id="topics">
          <TopicsGrid />
        </div>

        <WhySection />

        <CTASection onAction={() => navigate('/dashboard')} />
      </main>

      <Footer />
    </div>
  )
}

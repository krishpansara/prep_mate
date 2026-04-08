import { useNavigate } from 'react-router-dom'
import Navbar from '@components/layout/Navbar'
import Footer from '@components/layout/Footer'
import HeroSection from '@components/sections/HeroSection'
import TopicsGrid from '@components/sections/TopicsGrid'
import WhySection from '@components/sections/WhySection'
import CTASection from '@components/sections/CTASection'
import { useAuth } from '@contexts/AuthContext'

export default function LandingPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const handleCTA = () => navigate(user ? '/app/dashboard' : '/register')

  return (
    <div className="min-h-screen bg-background">
      <Navbar showSearch={false} />

      <main>
        <HeroSection
          onPrimaryClick={handleCTA}
          onSecondaryClick={() => {
            document.getElementById('topics')?.scrollIntoView({ behavior: 'smooth' })
          }}
        />

        <div id="topics">
          <TopicsGrid />
        </div>

        <WhySection />

        <CTASection onAction={handleCTA} />
      </main>

      <Footer />
    </div>
  )
}

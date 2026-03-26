import { Link } from 'react-router-dom'
import Button from '@components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      {/* Decorative blob */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-md">
        <p className="text-8xl font-black text-primary font-headline mb-4">404</p>
        <h1 className="text-3xl font-bold text-on-surface mb-4 font-headline">Page not found</h1>
        <p className="text-on-surface-variant mb-10 leading-relaxed">
          This page doesn't exist or may have been moved. Head back home and continue learning.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="primary" size="md" icon="home" iconPosition="left">
              Back to Home
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="secondary" size="md" icon="dashboard" iconPosition="left">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

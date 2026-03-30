import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Spinner from '@components/ui/Spinner'

// Public pages
import LandingPage from '@pages/LandingPage'
import NotFoundPage from '@pages/NotFoundPage'

// Lazy-load all heavy pages for code splitting
const DashboardPage = lazy(() => import('@pages/DashboardPage'))
const InterviewQuestionsPage = lazy(() => import('@pages/InterviewQuestionsPage'))
const TopicPagePython = lazy(() => import('@pages/TopicPagePython'))
const DeepDiveQuestionPage = lazy(() => import('@pages/DeepDiveQuestionPage'))
const LearningConceptsPage = lazy(() => import('@pages/LearningConceptsPage'))
const LibraryPage = lazy(() => import('@pages/LibraryPage'))
const CurriculumPage = lazy(() => import('@pages/CurriculumPage'))

// Admin pages
const AdminDashboardPage = lazy(() => import('@pages/admin/AdminDashboardPage'))
const UserManagementPage = lazy(() => import('@pages/admin/UserManagementPage'))
const TopicManagementPage = lazy(() => import('@pages/admin/TopicManagementPage'))
const ConceptManagementPage = lazy(() => import('@pages/admin/ConceptManagementPage'))
const QuestionEditorPage = lazy(() => import('@pages/admin/QuestionEditorPage'))
const TopicEditorPage = lazy(() => import('@pages/admin/TopicEditorPage'))
const AnalyticsDashboardPage = lazy(() => import('@pages/admin/AnalyticsDashboardPage'))
const AdminPanelPage = lazy(() => import('@pages/admin/AdminPanelPage'))

const PageLoader = () => <Spinner size="page" label="Loading page..." />

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />

          {/* Learner app */}
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/library/:courseId" element={<CurriculumPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/practice" element={<InterviewQuestionsPage />} />
          <Route path="/topics/python" element={<TopicPagePython />} />
          <Route path="/deep-dive" element={<DeepDiveQuestionPage />} />
          <Route path="/concepts" element={<LearningConceptsPage />} />

          {/* Admin panel */}
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<UserManagementPage />} />
          <Route path="/admin/topics" element={<TopicManagementPage />} />
          <Route path="/admin/topics/new" element={<TopicEditorPage />} />
          <Route path="/admin/topics/:id/edit" element={<TopicEditorPage />} />
          <Route path="/admin/concepts" element={<ConceptManagementPage />} />
          <Route path="/admin/questions" element={<QuestionEditorPage />} />
          <Route path="/admin/questions/new" element={<QuestionEditorPage />} />
          <Route path="/admin/deep-dive" element={<AdminPanelPage />} />
          <Route path="/analytics" element={<AnalyticsDashboardPage />} />

          {/* 404 catch-all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

import { Suspense, lazy, useEffect, useState } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

import MainLayout from "./layouts/MainLayout.jsx"
import Background from "./components/Background.jsx"
import CustomCursor from "./components/CustomCursor.jsx"
import LoadingScreen from "./components/LoadingScreen.jsx"
import RouteScrollReset from "./components/RouteScrollReset.jsx"
import Home from "./pages/Home.jsx"
import NotFound from "./pages/NotFound.jsx"

// Routes a visitor rarely opens are split out of the initial bundle.
const ProjectDetail = lazy(() => import("./pages/ProjectDetail.jsx"))
const AdminPage = lazy(() => import("./pages/AdminPage.jsx"))

// A small, visible spinner while a lazy route chunk loads. An invisible
// fallback here made a stuck load look identical to a blank page, which is
// exactly what made this bug hard to notice.
const RouteFallback = () => (
  <div
    className="grid min-h-[60svh] place-items-center"
    role="status"
    aria-live="polite"
  >
    <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-violet-400" />
    <span className="sr-only">Loading…</span>
  </div>
)

export default function App() {
  const [booting, setBooting] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 750)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Background />
      <CustomCursor />
      <RouteScrollReset />

      <AnimatePresence>
        {booting && <LoadingScreen key="boot" />}
      </AnimatePresence>

      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="projects/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Suspense>
    </>
  )
}

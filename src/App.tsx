import { useState } from 'react'
import { InputForm } from './components/InputForm'
import { AnalysisView } from './components/AnalysisView'
import { ResumeBuilder } from './components/ResumeBuilder'
import { analyzeResume } from './services/gemini'
import type { ATSAnalysis } from './services/gemini'
import { ScanLine, LayoutTemplate } from 'lucide-react'
import TabList from './components/Tab'
import { AutoHeading, Section } from 'automatic-heading-level'
import { useLanguage } from './i18n/LanguageContext'
import { LanguageSwitcher } from './components/LanguageSwitcher'

type ViewMode = 'scanner' | 'builder'

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('scanner')
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [resumeText, setResumeText] = useState('')
  const [jobDescription, setJobDescription] = useState('')

  const { t } = useLanguage()

  const handleAnalyze = async (resume: string, job: string) => {
    setIsAnalyzing(true)
    setError(null)
    setResumeText(resume)
    setJobDescription(job)

    try {
      const result = await analyzeResume(resume, job)
      setAnalysis(result)
    } catch (err) {
      setError(t('app_analyze_error'))
      console.error(err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleReset = () => {
    setAnalysis(null)
    setError(null)
    setResumeText('')
    setJobDescription('')
  }

  const handleEdit = () => {
    setAnalysis(null)
    setError(null)
  }

  return (
    <>
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <ScanLine className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <AutoHeading className="font-bold text-[1.2em] tracking-tight text-slate-900">{t('app_title')}</AutoHeading>
          </div>

          <TabList
            items={[
              {
                id: 'scanner',
                name: <>
                  <ScanLine className="w-4 h-4" aria-hidden="true" />
                  {t('app_tab_scanner')}
                </>,
                style: `px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${viewMode === 'scanner' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-700 hover:text-slate-700'}`,
              },
              {
                id: 'builder',
                name: <>
                  <LayoutTemplate className="w-4 h-4" aria-hidden="true" />
                  {t('app_tab_builder')}
                </>,
                style: `px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${viewMode === 'builder' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-700 hover:text-slate-700'}`,
              },
            ]}
            value={viewMode}
            onChange={(id) => setViewMode(id as ViewMode)}
          />

          <LanguageSwitcher />
        </div>
      </header>

      <main
        className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full"
      >
        {viewMode === 'scanner' ? (
          <Section
            as="div"
            role="tabpanel"
            id="tabpanel-scanner"
            aria-labelledby="tab-scanner"
            tabIndex={0}
            className="outline-none"
          >
            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium text-center">
                {error}
              </div>
            )}

            {analysis ? (
              <AnalysisView analysis={analysis} onReset={handleReset} onEdit={handleEdit} id="analysis-view" />
            ) : (
              <InputForm
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
                initialResume={resumeText}
                initialJob={jobDescription}
                key={`${resumeText.length}-${jobDescription.length}`}
              />
            )}
          </Section>
        ) : (
          <ResumeBuilder />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-600 text-sm space-y-2">
          <p>{t('app_footer')}</p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://linkedin.com/in/micaelaavigliano"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 transition-colors"
              aria-label="LinkedIn profile"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/micaavigliano"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 transition-colors"
              aria-label="GihHub profile"
            >
              Github
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

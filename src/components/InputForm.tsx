import React, { useState, useRef } from 'react'
import { motion } from 'motion/react'
import { FileText, Briefcase, ArrowRight, Loader2, FileUp, X } from 'lucide-react'
import { extractTextFromPdf } from '../lib/pdf'
import { AutoHeading } from 'automatic-heading-level'
import { useLanguage } from '../i18n/LanguageContext'

interface InputFormProps {
  onAnalyze: (resume: string, job: string) => void;
  isAnalyzing: boolean;
  initialResume?: string;
  initialJob?: string;
}

export function InputForm({ onAnalyze, isAnalyzing, initialResume = '', initialJob = '' }: InputFormProps) {
  const [resumeText, setResumeText] = useState(initialResume)
  const [jobDescription, setJobDescription] = useState(initialJob)
  const [isProcessingPdf, setIsProcessingPdf] = useState(false)
  const [pdfError, setPdfError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { t } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (resumeText.trim() && jobDescription.trim()) {
      onAnalyze(resumeText, jobDescription)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      setPdfError(t('input_pdf_error_type'))
      return;
    }

    setIsProcessingPdf(true)
    setPdfError(null)

    try {
      const text = await extractTextFromPdf(file)
      if (text.length < 50) {
        setPdfError(t('input_pdf_error_scanned'))
      } else {
        setResumeText(text)
      }
    } catch (err) {
      setPdfError(err instanceof Error ? err.message : t('input_pdf_error_parse'))
    } finally {
      setIsProcessingPdf(false);
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-10">
        <AutoHeading className="text-4xl font-bold text-slate-900 tracking-tight mb-4" id="input-form-heading">
          {t('input_hero_title')}
        </AutoHeading>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          {t('input_hero_subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Resume Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="resume-textarea" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <FileText className="w-4 h-4" aria-hidden="true" />
                {t('input_resume_label')}
              </label>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-indigo-600 hover:text-indigo-700 text-xs font-medium flex items-center gap-1"
                disabled={isProcessingPdf}
              >
                <FileUp className="w-3 h-3" aria-hidden="true" />
                {t('input_upload_pdf')}
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="application/pdf"
              className="hidden"
            />

            <div className="relative group">
              {isProcessingPdf && (
                <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center rounded-2xl backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-2 text-indigo-600">
                    <Loader2 className="w-8 h-8 animate-spin" aria-hidden="true" />
                    <span className="text-sm font-medium">{t('input_extracting_text')}</span>
                  </div>
                </div>
              )}

              <textarea
                id="resume-textarea"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder={t('input_resume_placeholder')}
                className={`
                  w-full h-80 p-4 rounded-2xl border bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-all shadow-sm group-hover:shadow-md text-sm leading-relaxed ${pdfError ? "border-red-300 focus:ring-red-200" : "border-slate-200"}
                `}
                required
              />
              <div className="absolute bottom-4 right-4 text-xs text-slate-500 pointer-events-none bg-white/80 px-2 py-1 rounded">
                <span className='sr-only'>{resumeText.length} {' '} {t('shared_chars_long')}</span>
                {resumeText.length} {t('shared_chars')}
              </div>
            </div>
            {pdfError && (
              <div className="text-red-500 text-xs flex items-center gap-1 mt-1">
                <X className="w-3 h-3" aria-hidden="true" />
                {pdfError}
              </div>
            )}
            <p className="text-xs text-slate-500">
              {t('input_pdf_tip')}
            </p>
          </div>

          {/* Job Description Input */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2" htmlFor="job-description-textarea">
              <Briefcase className="w-4 h-4" aria-hidden="true" />
              {t('input_job_label')}
            </label>
            <div className="relative group">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder={t('input_job_placeholder')}
                id="job-description-textarea"
                className="w-full h-80 p-4 rounded-2xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-all shadow-sm group-hover:shadow-md text-sm leading-relaxed"
                required
              />
              <div className="absolute bottom-4 right-4 text-xs text-slate-500 pointer-events-none bg-white/80 px-2 py-1 rounded">
                <span className='sr-only'>{jobDescription.length} {' '} {t('shared_chars_long')}</span>
                {jobDescription.length} {t('shared_chars')}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            type="submit"
            disabled={isAnalyzing || !resumeText || !jobDescription || isProcessingPdf}
            className={`
              group relative px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold text-lg shadow-xl shadow-indigo-500/20 transition-all hover:scale-105 hover:bg-indigo-500 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed w-full md:w-auto min-w-50 flex items-center justify-center gap-2
              ${isAnalyzing ? "cursor-wait" : ""}
            `}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                {t('input_analyzing')}
              </>
            ) : (
              <>
                {t('input_scan_btn')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  )
}

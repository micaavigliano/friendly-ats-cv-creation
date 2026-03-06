import { ChevronDown, ChevronUp, Edit2, Save, X } from "lucide-react"
import type { ResumeData } from "../../types/resume"
import { useEffect, useRef, useState } from "react"
import { useLanguage } from "../../i18n/LanguageContext"

interface ProSummaryProps {
  data: ResumeData
  updateSummary: (value: string) => void
  commitPreview: () => void
  editingItems: Set<string>
  toggleEdit: (id: string) => void
  summaryInput: React.RefObject<HTMLTextAreaElement | null>
}

export const ProSummary = ({ data, updateSummary, commitPreview, editingItems, toggleEdit, summaryInput }: ProSummaryProps) => {
  const isEditing = editingItems.has('summary')
  const { t } = useLanguage()
  const editRef = useRef<HTMLButtonElement>(null)
  const [snapshot, setSnapshot] = useState<string | null>(null)
  const [shown, setShown] = useState(false)
  const handleToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => setShown(e.currentTarget.open)

  const handleStartEdit = () => {
    setSnapshot(data.summary)
    toggleEdit('summary')
  }

  const handleCancel = () => {
    if (snapshot !== null) {
      updateSummary(snapshot)
    }
    toggleEdit('summary')
  }

  useEffect(() => {
    if (!isEditing) {
      editRef.current?.focus()
    } else if (summaryInput.current) {
      summaryInput.current.focus()
      const len = summaryInput.current.value.length
      summaryInput.current.setSelectionRange(len, len)
    }
  }, [isEditing])

  return (
    <details className="space-y-4" onToggle={handleToggle}>
      <summary className="w-full flex items-center justify-between p-3 rounded-lg font-semibold text-slate-700 hover:bg-slate-100">
        {t('summary_section_title')}
        {shown ? <ChevronUp className="w-4 h-4" aria-hidden="true" /> : <ChevronDown className="w-4 h-4" aria-hidden="true" />}
      </summary>
      <div className="p-4 border border-slate-100 rounded-lg">
        {isEditing ? (
          <div className="space-y-2">
            <label className="sr-only" htmlFor="summary-textarea">{t('summary_section_title')}</label>
            <textarea
              id="summary-textarea"
              className="w-full p-3 border rounded text-sm h-32"
              value={data.summary}
              onChange={e => updateSummary(e.target.value)}
              placeholder={t('summary_placeholder')}
              ref={summaryInput}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 px-2 py-1.5 rounded-md transition-colors"
                aria-label={t('summary_discard_changes_aria')}
                type="button"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
                {t('shared_cancel')}
              </button>
              <button
                onClick={() => { commitPreview(); toggleEdit('summary') }}
                className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-2 py-1.5 rounded-md transition-colors"
                type="button"
              >
                <Save className="w-3.5 h-3.5" aria-hidden="true" />
                {t('shared_save')}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-start gap-4">
            <p className="text-sm text-slate-700 leading-relaxed">{data.summary}</p>
            <button
              onClick={handleStartEdit}
              className="shrink-0 p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
              title={t('summary_edit_aria')}
              type="button"
              ref={editRef}
            >
              <Edit2 className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </details>
  )
}

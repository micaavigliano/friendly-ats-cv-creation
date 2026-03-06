import { ChevronDown, ChevronUp, Edit2, Plus, Save, Trash2 } from 'lucide-react'
import type { ResumeData, EducationItem } from '../../types/resume'
import { useRef, useState } from 'react'
import { AutoHeading } from 'automatic-heading-level'
import { useLanguage } from '../../i18n/LanguageContext'

interface EducationProps {
  data: ResumeData
  refEl: React.RefObject<HTMLInputElement | null>
  addEducation: () => void
  updateEducation: (id: string, field: keyof EducationItem, value: any) => void
  removeEducation: (id: string) => void
  addEducationDetail: (eduId: string) => void
  updateEducationDetail: (eduId: string, index: number, value: string) => void
  removeEducationDetail: (eduId: string, index: number) => void
  editingItems: Set<string>
  toggleEdit: (id: string) => void
  commitPreview: () => void
}

export const Education = ({
  data, refEl, addEducation, updateEducation,
  removeEducation, addEducationDetail, updateEducationDetail, removeEducationDetail,
  editingItems, toggleEdit, commitPreview
}: EducationProps) => {
  const { t } = useLanguage()
  const [shown, setShown] = useState(false)
  const handleToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => setShown(e.currentTarget.open)
  const detailsEdRef = useRef<HTMLDetailsElement>(null)
  const addEdRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const pendingFocusNewItem = useRef(false)
  const firstInputRefs = useRef<Record<string, HTMLInputElement | null>>({})
  const editButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const addButtonRef = useRef<HTMLButtonElement>(null)

  const handleSave = (id: string) => {
    commitPreview()
    toggleEdit(id)
    addButtonRef.current?.focus()
  }

  const handleAddEd = () => {
    if (detailsEdRef.current) detailsEdRef.current.open = true
    pendingFocusNewItem.current = true
    addEducation()
  }

  const handleToggleEdit = (id: string) => {
    toggleEdit(id)
    setTimeout(() => firstInputRefs.current[id]?.focus(), 0)
  }

  const handleRemoveEdBullet = (id: string, index: number) => {
    removeEducationDetail(id, index)
    setTimeout(() => addEdRefs.current[id]?.focus(), 0)
  }

  const handleRemoveEdu = (id: string) => {
    const sorted = [...data.education].sort((a, b) => {
      if (!a.startDate && !b.startDate) return 0
      if (!a.startDate) return -1
      if (!b.startDate) return 1
      return b.startDate.localeCompare(a.startDate)
    })
    const index = sorted.findIndex(e => e.id === id)
    const remaining = sorted.filter(e => e.id !== id)

    removeEducation(id)

    if (remaining.length === 0) {
      if (detailsEdRef.current) detailsEdRef.current.open = false
      addButtonRef.current?.focus()
    } else {
      const targetId = index < remaining.length ? remaining[index].id : remaining[index - 1].id
      setTimeout(() => editButtonRefs.current[targetId]?.focus(), 0)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <details className="group flex-1" onToggle={handleToggle} ref={detailsEdRef}>
        <summary className="w-full flex items-center justify-between p-3 rounded-lg font-semibold text-slate-700 hover:bg-slate-100">
          {t('education_section_title')}
          {shown ? <ChevronUp className="w-4 h-4" aria-hidden="true" /> : <ChevronDown className="w-4 h-4" aria-hidden="true" />}
        </summary>
        <fieldset className="space-y-6 mt-4">
          <legend className="sr-only">{t('education_legend')}</legend>
          {[...data.education]
            .sort((a, b) => {
              if (!a.startDate && !b.startDate) return 0
              if (!a.startDate) return -1
              if (!b.startDate) return 1
              return b.startDate.localeCompare(a.startDate)
            })
            .map((edu, index) => {
            const isEditing = editingItems.has(edu.id)
            return (
              <div key={edu.id} className="p-4 border border-slate-200 rounded-lg relative group/item">
                {isEditing ? (
                  <>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <input
                        className="col-span-2 p-2 border rounded text-sm font-semibold"
                        value={edu.institution}
                        onChange={e => updateEducation(edu.id, 'institution', e.target.value)}
                        placeholder={t('education_institution_placeholder')}
                        type="text"
                        ref={el => {
                          firstInputRefs.current[edu.id] = el
                          if (index === 0 && refEl) (refEl as React.RefObject<HTMLInputElement | null>).current = el
                          if (pendingFocusNewItem.current && el) {
                            pendingFocusNewItem.current = false
                            el.focus()
                          }
                        }}
                      />
                      <input
                        className="p-2 border rounded text-sm"
                        value={edu.degree}
                        onChange={e => updateEducation(edu.id, 'degree', e.target.value)}
                        placeholder={t('education_degree_placeholder')}
                        type="text"
                      />
                      <input
                        className="p-2 border rounded text-sm"
                        value={edu.field}
                        onChange={e => updateEducation(edu.id, 'field', e.target.value)}
                        placeholder={t('education_field_placeholder')}
                        type="text"
                      />
                      <input
                        className="p-2 border rounded text-sm"
                        value={edu.location}
                        onChange={e => updateEducation(edu.id, 'location', e.target.value)}
                        placeholder={t('education_location_placeholder')}
                        type="text"
                      />
                      <input
                        className="p-2 border rounded text-sm"
                        value={edu.gpa}
                        onChange={e => updateEducation(edu.id, 'gpa', e.target.value)}
                        placeholder={t('education_gpa_placeholder')}
                        type="text"
                      />
                      <div className="col-span-2 grid grid-cols-2 gap-4 items-end">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-slate-500 font-medium">{t('education_start_date_label')}</label>
                          <input
                            type="date"
                            className="p-2 border rounded text-sm"
                            value={edu.startDate}
                            onChange={e => updateEducation(edu.id, 'startDate', e.target.value)}
                            aria-label={t('education_start_date_label')}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-slate-500 font-medium">{t('education_end_date_label')}</label>
                          <input
                            type="date"
                            className="p-2 border rounded text-sm disabled:bg-slate-100 disabled:text-slate-400"
                            value={edu.endDate}
                            onChange={e => updateEducation(edu.id, 'endDate', e.target.value)}
                            disabled={edu.isCurrent}
                            aria-label={t('education_end_date_label')}
                          />
                        </div>
                        <div className="col-span-2 flex items-center gap-2 mt-2">
                          <input
                            type="checkbox"
                            id={`current-edu-${edu.id}`}
                            checked={edu.isCurrent}
                            onChange={e => updateEducation(edu.id, 'isCurrent', e.target.checked)}
                            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label htmlFor={`current-edu-${edu.id}`} className="text-sm text-slate-600 cursor-pointer">
                            {t('education_current_label')}
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {edu.description.map((desc, i) => (
                        <div key={i} className="flex gap-2">
                          <label className="sr-only" htmlFor={`edu-detail-${edu.id}-${i}`}>Detail {i + 1}</label>
                          <textarea
                            id={`edu-detail-${edu.id}-${i}`}
                            className="flex-1 p-2 border rounded text-sm h-16"
                            value={desc}
                            onChange={e => updateEducationDetail(edu.id, i, e.target.value)}
                            placeholder={t('education_achievement_placeholder')}
                          />
                          <button
                            onClick={() => handleRemoveEdBullet(edu.id, i)}
                            className="text-slate-400 hover:text-red-500"
                            type="button"
                            title="Remove detail"
                          >
                            <Trash2 className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addEducationDetail(edu.id)}
                        ref={el => { addEdRefs.current[edu.id] = el }}
                        className="text-xs text-indigo-600 font-medium hover:underline flex items-center gap-1"
                        type="button"
                      >
                        <Plus className="w-3 h-3" aria-hidden="true" /> {t('education_add_achievement_btn')}
                      </button>
                    </div>

                    <div className="flex justify-end mb-3 gap-2">
                      <button
                        onClick={() => handleRemoveEdu(edu.id)}
                        className="flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-600 hover:bg-red-50 px-2 py-1.5 rounded-md transition-colors"
                        title={t('education_delete_aria')}
                        type="button"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        {t('shared_remove')}
                      </button>
                      <button
                        onClick={() => handleSave(edu.id)}
                        className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-2 py-1.5 rounded-md transition-colors"
                        title={t('shared_save')}
                        type="button"
                      >
                        <Save className="w-3.5 h-3.5" aria-hidden="true" />
                        {t('shared_save')}
                      </button>
                    </div>
                  </>
                ) : (
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <AutoHeading className="font-semibold text-slate-800" id={`education-${edu.id}-heading`}>
                          {edu.institution}
                          {edu.location && <span className="font-normal text-slate-500"> · {edu.location}</span>}
                        </AutoHeading>
                        {(edu.degree || edu.field) && (
                          <p className="text-sm italic text-slate-600">
                            {[edu.degree, edu.field].filter(Boolean).join(', ')}
                          </p>
                        )}
                        {(edu.startDate || edu.endDate || edu.isCurrent) && (
                          <p className="text-xs text-slate-400 mt-0.5">
                            {edu.startDate} – {edu.isCurrent ? t('experience_present') : edu.endDate}
                          </p>
                        )}
                        {edu.gpa && (
                          <p className="text-xs text-slate-500 mt-0.5">GPA: {edu.gpa}</p>
                        )}
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button
                          onClick={() => handleToggleEdit(edu.id)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                          title="Edit education"
                          type="button"
                          ref={el => { editButtonRefs.current[edu.id] = el }}
                        >
                          <Edit2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <button
                          onClick={() => removeEducation(edu.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title={t('education_remove_aria')}
                          type="button"
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    {edu.description.filter(d => d).length > 0 && (
                      <ul className="mt-2 space-y-1 list-disc list-inside">
                        {edu.description.filter(d => d).map((desc, i) => (
                          <li key={i} className="text-sm text-slate-600">{desc}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </fieldset>
      </details>
      <button
        onClick={handleAddEd}
        className="p-3 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 h-full self-start"
        aria-label={t('education_add_new_aria')}
        type="button"
        ref={addButtonRef}
      >
        <Plus className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  )
}

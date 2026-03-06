import { ChevronDown, ChevronUp, Edit2, Plus, Save, Trash2 } from "lucide-react"
import type { ResumeData } from "../../types/resume"
import { useRef, useState } from "react"
import { AutoHeading } from "automatic-heading-level";
import { useLanguage } from "../../i18n/LanguageContext"

interface ExperienceProps {
  data: ResumeData;
  refEl: React.RefObject<HTMLInputElement | null>
  addExperience: () => void
  updateExperience: (id: string, field: keyof ResumeData['experience'][0], value: any) => void
  removeExperience: (id: string) => void
  addBullet: (expId: string) => void
  updateBullet: (expId: string, bulletIndex: number, value: string) => void
  removeBullet: (expId: string, bulletIndex: number) => void
  editingItems: Set<string>
  toggleEdit: (id: string) => void
  commitPreview: () => void
}

export const Experience = ({
  data, refEl, addExperience, updateExperience,
  removeExperience, addBullet, updateBullet, removeBullet,
  editingItems, toggleEdit, commitPreview
}: ExperienceProps) => {
  const { t } = useLanguage()
  const [shown, setShown] = useState(false)
  const addButtonRef = useRef<HTMLButtonElement>(null)
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const addAchievementRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const firstInputRefs = useRef<Record<string, HTMLInputElement | null>>({})
  const editButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const lastTextareaRefs = useRef<Record<string, HTMLTextAreaElement | null>>({})
  const handleToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => setShown(e.currentTarget.open)

  const handleSave = (id: string) => {
    commitPreview()
    toggleEdit(id)
    addButtonRef.current?.focus()
  }

  const handleRemoveBullet = (expId: string, index: number) => {
    removeBullet(expId, index)
    setTimeout(() => addAchievementRefs.current[expId]?.focus(), 0)
  }

  const handleAddBullet = (expId: string) => {
    addBullet(expId)
    setTimeout(() => lastTextareaRefs.current[expId]?.focus(), 0)
  }

  const handleToggleEdit = (id: string) => {
    toggleEdit(id)
    setTimeout(() => firstInputRefs.current[id]?.focus(), 0)
  }

  const pendingFocusNewItem = useRef(false)

  const handleAddExperience = () => {
    if (detailsRef.current) detailsRef.current.open = true
    pendingFocusNewItem.current = true
    addExperience()
  }

  const handleRemoveExperience = (id: string) => {
    const sorted = [...data.experience].sort((a, b) => {
      if (!a.startDate && !b.startDate) return 0
      if (!a.startDate) return -1
      if (!b.startDate) return 1
      return b.startDate.localeCompare(a.startDate)
    })
    const index = sorted.findIndex(e => e.id === id)
    const remaining = sorted.filter(e => e.id !== id)

    removeExperience(id)

    if (remaining.length === 0) {
      if (detailsRef.current) detailsRef.current.open = false
      addButtonRef.current?.focus()
    } else {
      const targetId = index < remaining.length ? remaining[index].id : remaining[index - 1].id
      setTimeout(() => editButtonRefs.current[targetId]?.focus(), 0)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <details ref={detailsRef} className="group flex-1" onToggle={handleToggle}>
        <summary className="w-full flex items-center justify-between p-3 rounded-lg font-semibold text-slate-700 hover:bg-slate-100">
          {t('experience_section_title')}
          {shown ? <ChevronUp className="w-4 h-4" aria-hidden="true" /> : <ChevronDown className="w-4 h-4" aria-hidden="true" />}
        </summary>
        <fieldset className="space-y-6 mt-4">
          <legend className="sr-only">{t('experience_legend')}</legend>
          {[...data.experience]
            .sort((a, b) => {
              if (!a.startDate && !b.startDate) return 0
              if (!a.startDate) return -1
              if (!b.startDate) return 1
              return b.startDate.localeCompare(a.startDate)
            })
            .map((exp, index) => {
            const isEditing = editingItems.has(exp.id)
            return (
              <div key={exp.id} className="p-4 border border-slate-200 rounded-lg relative group/item">
                {isEditing ? (
                  <>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <input
                        className="p-2 border rounded text-sm font-semibold"
                        value={exp.company}
                        onChange={e => updateExperience(exp.id, 'company', e.target.value)}
                        placeholder={t('experience_company_placeholder')}
                        type="text"
                        ref={el => {
                          firstInputRefs.current[exp.id] = el
                          if (index === 0 && refEl) (refEl as React.RefObject<HTMLInputElement | null>).current = el
                          if (pendingFocusNewItem.current && el) {
                            pendingFocusNewItem.current = false
                            el.focus()
                          }
                        }}
                      />
                      <input
                        className="p-2 border rounded text-sm text-right"
                        value={exp.location}
                        onChange={e => updateExperience(exp.id, 'location', e.target.value)}
                        placeholder={t('experience_location_placeholder')}
                        type="text"
                      />
                      <input
                        className="p-2 border rounded text-sm italic"
                        value={exp.role}
                        onChange={e => updateExperience(exp.id, 'role', e.target.value)}
                        placeholder={t('experience_role_placeholder')}
                        type="text"
                      />
                      <div className="col-span-2 grid grid-cols-2 gap-4 items-end">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-slate-500 font-medium">{t('experience_start_date_label')}</label>
                          <input
                            type="date"
                            className="p-2 border rounded text-sm"
                            value={exp.startDate}
                            onChange={e => updateExperience(exp.id, 'startDate', e.target.value)}
                            aria-label={t('experience_start_date_label')}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs text-slate-500 font-medium">{t('experience_end_date_label')}</label>
                          <input
                            type="date"
                            className="p-2 border rounded text-sm disabled:bg-slate-100 disabled:text-slate-400"
                            value={exp.endDate}
                            onChange={e => updateExperience(exp.id, 'endDate', e.target.value)}
                            disabled={exp.isCurrent}
                            aria-label={t('experience_end_date_label')}
                          />
                        </div>
                        <div className="col-span-2 flex items-center gap-2 mt-2">
                          <input
                            type="checkbox"
                            id={`current-${exp.id}`}
                            checked={exp.isCurrent}
                            onChange={e => updateExperience(exp.id, 'isCurrent', e.target.checked)}
                            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label htmlFor={`current-${exp.id}`} className="text-sm text-slate-600 cursor-pointer">
                            {t('experience_current_work_label')}
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {exp.description.map((desc, i) => (
                        <div key={i} className="flex gap-2">
                          <label className="sr-only" htmlFor={`achievement-${exp.id}-${i}`}>Achievement {i + 1}</label>
                          <textarea
                            id={`achievement-${exp.id}-${i}`}
                            className="flex-1 p-2 border rounded text-sm h-20"
                            value={desc}
                            onChange={e => updateBullet(exp.id, i, e.target.value)}
                            placeholder={t('experience_achievement_placeholder')}
                            ref={el => { lastTextareaRefs.current[exp.id] = el }}
                          />
                          <button
                            onClick={() => handleRemoveBullet(exp.id, i)}
                            className="text-slate-400 hover:text-red-500 h-fit"
                            type="button"
                            title="Remove bullet"
                          >
                            <Trash2 className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>
                      ))}
                      <button
                        ref={el => { addAchievementRefs.current[exp.id] = el }}
                        onClick={() => handleAddBullet(exp.id)}
                        className="text-xs text-indigo-600 font-medium hover:underline flex items-center gap-1"
                        type="button"
                      >
                        <Plus className="w-3 h-3" aria-hidden="true" /> {t('experience_add_achievement_btn')}
                      </button>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleRemoveExperience(exp.id)}
                        className="flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-600 hover:bg-red-50 px-2 py-1.5 rounded-md transition-colors"
                        title={t('experience_delete_aria')}
                        aria-label={t('experience_delete_aria')}
                        type="button"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        {t('shared_remove')}
                      </button>
                      <button
                        onClick={() => handleSave(exp.id)}
                        className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-2 py-1.5 rounded-md transition-colors"
                        title={t('shared_save')}
                        aria-label={t('shared_save')}
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
                        <AutoHeading className="font-semibold text-slate-800" id={`experience-${exp.id}-company-heading`}>{exp.company}
                          {exp.location && <span className="font-normal text-slate-500"> · {exp.location}</span>}
                        </AutoHeading>
                        <p className="text-sm italic text-slate-600">{exp.role}</p>
                        {(exp.startDate || exp.endDate || exp.isCurrent) && (
                          <p className="text-xs text-slate-400 mt-0.5">
                            {exp.startDate} – {exp.isCurrent ? t('experience_present') : exp.endDate}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button
                          ref={el => { editButtonRefs.current[exp.id] = el }}
                          onClick={() => handleToggleEdit(exp.id)}
                          className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                          title="Edit experience"
                          type="button"
                        >
                          <Edit2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <button
                          onClick={() => handleRemoveExperience(exp.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title={t('experience_remove_aria')}
                          type="button"
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    {exp.description.filter(d => d).length > 0 && (
                      <ul className="mt-2 space-y-1 list-disc list-inside">
                        {exp.description.filter(d => d).map((desc, i) => (
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
        ref={addButtonRef}
        onClick={handleAddExperience}
        className="p-3 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 h-full self-start"
        aria-label={t('experience_add_new_aria')}
        type="button"
      >
        <Plus className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  )
}

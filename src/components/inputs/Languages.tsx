import type { ResumeData } from "../../types/resume"
import { ChevronDown, ChevronUp, Edit2, Plus, Save, Trash2 } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "../../i18n/LanguageContext"

interface LanguagesProps {
  data: ResumeData;
  refEl: React.RefObject<HTMLInputElement | null>
  updateLanguage: (id: string, field: 'name' | 'level', value: string) => void
  removeLanguage: (id: string) => void
  addLanguage: () => void
  editingItems: Set<string>
  toggleEdit: (id: string) => void
  commitPreview: () => void
}

export const Languages = ({
  data, refEl, updateLanguage, removeLanguage,
  addLanguage, editingItems, toggleEdit, commitPreview
}: LanguagesProps) => {
  const { t } = useLanguage()
  const [shown, setShown] = useState(false)
  const handleToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => setShown(e.currentTarget.open)

  return (
    <div className='flex items-center gap-2'>
      <details className="group flex-1" onToggle={handleToggle}>
        <summary className="w-full flex items-center justify-between p-3 rounded-lg font-semibold text-slate-700 hover:bg-slate-100">
          {t('languages_section_title')}
          {shown ? <ChevronUp className="w-4 h-4" aria-hidden="true" /> : <ChevronDown className="w-4 h-4" aria-hidden="true" />}
        </summary>
        <div className="space-y-2 p-4 border border-slate-100 rounded-lg mt-4">
          {data.languages.map((lang, index) => {
            const isEditing = editingItems.has(lang.id)
            return (
              <div key={lang.id}>
                {isEditing ? (
                  <div className="flex gap-2 items-center">
                    <input
                      className="flex-1 p-2 border rounded text-sm"
                      value={lang.name}
                      placeholder={t('languages_language_placeholder')}
                      onChange={e => updateLanguage(lang.id, 'name', e.target.value)}
                      ref={index === data.languages.length - 1 ? refEl : null}
                    />
                    <select
                      className="w-1/3 p-2 border rounded text-sm bg-white"
                      value={lang.level}
                      onChange={e => updateLanguage(lang.id, 'level', e.target.value)}
                      aria-label={t('languages_proficiency_aria')}
                    >
                      <option value="Basic">{t('lang_level_basic')}</option>
                      <option value="Intermediate">{t('lang_level_intermediate')}</option>
                      <option value="Advanced">{t('lang_level_advanced')}</option>
                      <option value="Fluent">{t('lang_level_fluent')}</option>
                      <option value="Native">{t('lang_level_native')}</option>
                      <option value="Bilingual">{t('lang_level_bilingual')}</option>
                      <option value="A1">A1</option>
                      <option value="A2">A2</option>
                      <option value="B1">B1</option>
                      <option value="B2">B2</option>
                      <option value="C1">C1</option>
                      <option value="C2">C2</option>
                    </select>
                    <button
                      onClick={() => { commitPreview(); toggleEdit(lang.id) }}
                      className="p-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-md transition-colors"
                      title={t('languages_save_aria')}
                      type="button"
                    >
                      <Save className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => removeLanguage(lang.id)}
                      className="p-2 text-slate-400 hover:text-red-500 rounded-md"
                      title={t('languages_remove_aria')}
                      type="button"
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center p-2 rounded-md hover:bg-slate-50">
                    <span className="text-sm text-slate-700">
                      <span className="font-medium">{lang.name}</span>
                      {lang.level && <span className="text-slate-400"> · {lang.level}</span>}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => toggleEdit(lang.id)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                        title={t('languages_edit_aria')}
                        type="button"
                      >
                        <Edit2 className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => removeLanguage(lang.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title={t('languages_remove_aria')}
                        type="button"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </details>
      <button
        onClick={addLanguage}
        className="p-3 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 h-full self-start"
        aria-label={t('languages_add_new_aria')}
        type="button"
      >
        <Plus className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  )
}

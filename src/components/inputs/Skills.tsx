import { ChevronDown, ChevronUp, Plus, Trash2, Save, Edit2 } from "lucide-react"
import type { ResumeData } from "../../types/resume"
import { useState } from "react"
import { AutoHeading } from "automatic-heading-level";
import { useLanguage } from "../../i18n/LanguageContext"

interface SkillsProps {
  data: ResumeData;
  refEl: React.RefObject<HTMLInputElement | null>
  handleKeyDown: (e: React.KeyboardEvent) => void
  editingItems: Set<string>
  toggleEdit: (id: string) => void
  updateSkill: (id: string, field: 'name' | 'skills', value: string) => void
  removeSkill: (id: string) => void
  addSkill: () => void
  commitPreview: () => void
}

export const Skills = ({
  data,
  refEl,
  handleKeyDown,
  editingItems,
  toggleEdit,
  updateSkill,
  removeSkill,
  addSkill,
  commitPreview
}: SkillsProps) => {
  const { t } = useLanguage()
  const [shown, setShown] = useState(false)
  const handleToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => setShown(e.currentTarget.open)

  return (
    <div className='flex items-center gap-2'>
      <details className="group flex-1" onToggle={handleToggle}>
        <summary className="w-full flex items-center justify-between p-3 rounded-lg font-semibold text-slate-700 hover:bg-slate-100">
          {t('skills_section_title')}
          {shown ? <ChevronUp className="w-4 h-4" aria-hidden="true" /> : <ChevronDown className="w-4 h-4" aria-hidden="true" />}
        </summary>
        <div className="space-y-2 p-4 border border-slate-100 rounded-lg">
          {data.skills.map((skill, index) => (
            <div key={skill.id} className="p-3 border border-slate-100 rounded-lg bg-slate-50">
              {editingItems.has(skill.id) ? (
                <>
                  <div className="flex justify-end mb-2">
                    <button
                      onClick={() => { commitPreview(); toggleEdit(skill.id) }}
                      className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-2 py-1.5 rounded-md transition-colors"
                      title={t('shared_save')}
                    >
                      <Save className="w-3.5 h-3.5" aria-hidden="true" />
                      {t('shared_save')}
                    </button>
                  </div>
                  <div className="space-y-2">
                    <input
                      className="w-full p-2 border rounded text-sm font-semibold"
                      value={skill.name}
                      placeholder={t('skills_category_placeholder')}
                      onChange={e => updateSkill(skill.id, 'name', e.target.value)}
                      onKeyDown={handleKeyDown}
                      ref={index === data.skills.length - 1 ? refEl : null}
                    />
                    <textarea
                      className="w-full p-2 border rounded text-sm h-20"
                      value={skill.skills}
                      placeholder={t('skills_list_placeholder')}
                      onChange={e => updateSkill(skill.id, 'skills', e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <div className="flex justify-between items-start">
                  <div>
                    <AutoHeading className="font-bold text-sm text-slate-800" id={`skill-${skill.id}-heading`}>{skill.name}</AutoHeading>
                    <p className="text-sm text-slate-600 mt-1">{skill.skills}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleEdit(skill.id)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                      title={t('skills_edit_aria')}
                    >
                      <Edit2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title={t('skills_remove_aria')}
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </details>
      <button
        onClick={addSkill}
        className="p-3 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 h-full self-start"
        aria-label={t('skills_add_new_aria')}
        type="button"
      >
        <Plus className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  )
}

import { useRef, useEffect, useMemo } from 'react'
import { ResumePDF } from './ResumePDF'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { Download, Eye, Edit2 } from 'lucide-react'
import { MemoizedPreview } from './MemoizedPreview'
import { useResumeBuilder } from '../hooks/useResumeBuilder'
import { PersonalInfo } from './inputs/PersonalInfo'
import { ProSummary } from './inputs/ProSummary'
import { Experience } from './inputs/Experience'
import { Skills } from './inputs/Skills'
import { Languages } from './inputs/Languages'
import { Education } from './inputs/Education'
import { Section, AutoHeading } from 'automatic-heading-level'
import { useLanguage } from '../i18n/LanguageContext'
import { translations } from '../i18n/translations'

export const ResumeBuilder = () => {
  const {
    data,
    previewData,
    commitPreview,
    editingItems,
    toggleEdit,
    updatePersonalInfo,
    updateProfileImage,
    addLink,
    updateLink,
    removeLink,
    handleKeyDown,
    addEducation,
    updateEducation,
    removeEducation,
    addEducationDetail,
    updateEducationDetail,
    removeEducationDetail,
    addSkill,
    updateSkill,
    removeSkill,
    addLanguage,
    updateLanguage,
    removeLanguage,
    updateSummary,
    addExperience,
    updateExperience,
    removeExperience,
    updateBullet,
    addBullet,
    removeBullet,
  } = useResumeBuilder()

  const { language, t } = useLanguage()
  const pdfTranslations = translations[language]

  const inputExp = useRef<HTMLInputElement>(null)
  const inputEdu = useRef<HTMLInputElement>(null)
  const inputSummary = useRef<HTMLTextAreaElement>(null)
  const inputSkill = useRef<HTMLInputElement>(null)
  const inputLang = useRef<HTMLInputElement>(null)
  const personalInput = useRef<HTMLInputElement>(null)

  const pdfDocument = useMemo(
    () => <ResumePDF data={previewData} pdfTranslations={pdfTranslations} />,
    [previewData, pdfTranslations]
  )

  const prevExpCount = useRef(data.experience.length)
  useEffect(() => {
    if (data.experience.length > prevExpCount.current) inputExp.current?.focus()
    prevExpCount.current = data.experience.length
  }, [data.experience.length])

  const prevEduCount = useRef(data.education.length)
  useEffect(() => {
    if (data.education.length > prevEduCount.current) inputEdu.current?.focus()
    prevEduCount.current = data.education.length
  }, [data.education.length])

  const prevSkillCount = useRef(data.skills.length)
  useEffect(() => {
    if (data.skills.length > prevSkillCount.current) inputSkill.current?.focus()
    prevSkillCount.current = data.skills.length
  }, [data.skills.length])

  const prevLangCount = useRef(data.languages.length)
  useEffect(() => {
    if (data.languages.length > prevLangCount.current) inputLang.current?.focus()
    prevLangCount.current = data.languages.length
  }, [data.languages.length])

  return (
    <div
      role="tabpanel"
      id="tabpanel-builder"
      aria-labelledby="tab-builder"
      tabIndex={0}
      className='flex flex-col md:flex-row gap-3'
    >
      <Section
        as="section"
        className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-y-auto p-6 size-full"
        aria-labelledby='builder-tab'
        identifier='builder-tab'
      >
        <div className="flex items-center justify-between mb-6">
          <AutoHeading className="text-xl font-bold text-slate-800 flex items-center gap-2" id="builder-tab">
            <Edit2 className="w-5 h-5 text-indigo-600" aria-hidden="true" />
            {t('builder_edit_resume')}
          </AutoHeading>
          <PDFDownloadLink
            document={pdfDocument}
            fileName="resume.pdf"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            {({ loading }) => (
              <>
                <Download className="w-4 h-4" aria-hidden="true" />
                {loading ? t('builder_generating') : t('builder_download_pdf')}
              </>
            )}
          </PDFDownloadLink>
        </div>

        <div className="space-y-6">
          <PersonalInfo
            data={data}
            handleKeyDown={handleKeyDown}
            editingItems={editingItems}
            updatePersonalInfo={updatePersonalInfo}
            updateProfileImage={updateProfileImage}
            addLink={addLink}
            updateLink={updateLink}
            removeLink={removeLink}
            toggleEdit={toggleEdit}
            commitPreview={commitPreview}
            personalInput={personalInput}
          />
          <ProSummary
            data={data}
            updateSummary={updateSummary}
            commitPreview={commitPreview}
            editingItems={editingItems}
            toggleEdit={toggleEdit}
            summaryInput={inputSummary}
          />
          <Experience
            data={data}
            refEl={inputExp}
            addExperience={addExperience}
            updateExperience={updateExperience}
            removeExperience={removeExperience}
            addBullet={addBullet}
            updateBullet={updateBullet}
            removeBullet={removeBullet}
            editingItems={editingItems}
            toggleEdit={toggleEdit}
            commitPreview={commitPreview}
          />
          <Education
            data={data}
            refEl={inputEdu}
            addEducation={addEducation}
            updateEducation={updateEducation}
            removeEducation={removeEducation}
            addEducationDetail={addEducationDetail}
            updateEducationDetail={updateEducationDetail}
            removeEducationDetail={removeEducationDetail}
            editingItems={editingItems}
            toggleEdit={toggleEdit}
            commitPreview={commitPreview}
          />
          <Skills
            data={data}
            refEl={inputSkill}
            handleKeyDown={handleKeyDown}
            editingItems={editingItems}
            toggleEdit={toggleEdit}
            updateSkill={updateSkill}
            removeSkill={removeSkill}
            addSkill={addSkill}
            commitPreview={commitPreview}
          />
          <Languages
            data={data}
            refEl={inputLang}
            updateLanguage={updateLanguage}
            removeLanguage={removeLanguage}
            addLanguage={addLanguage}
            editingItems={editingItems}
            toggleEdit={toggleEdit}
            commitPreview={commitPreview}
          />
        </div>
      </Section>

      {/* Preview Panel */}
      <Section
        as="section"
        identifier="preview-panel"
        className="bg-slate-800 rounded-2xl shadow-inner p-6 overflow-scroll w-full "
        aria-labelledby="preview-panel"
      >
        <div className="flex items-center justify-between mb-4 text-white">
          <AutoHeading className="text-xl font-bold flex items-center gap-2" id="preview-panel">
            <Eye className="w-5 h-5" aria-hidden="true" />
            {t('builder_live_preview')}
          </AutoHeading>
        </div>
        <div className="bg-white rounded-lg h-full shadow-2xl">
          <MemoizedPreview data={previewData} pdfTranslations={pdfTranslations} />
        </div>
      </Section>
    </div>
  )
}

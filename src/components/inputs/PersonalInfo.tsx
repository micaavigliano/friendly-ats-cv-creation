import { ChevronDown, ChevronUp, Edit2, Plus, Save, Trash2, X } from "lucide-react"
import type { ResumeData } from "../../types/resume"
import { useEffect, useState, useRef } from "react"
import { AutoHeading, Section } from "automatic-heading-level"
import { useLanguage } from "../../i18n/LanguageContext"

interface PersonalInfoProps {
  data: ResumeData
  editingItems: Set<string>
  toggleEdit: (id: string) => void
  updatePersonalInfo: (field: keyof ResumeData['personalInfo'], value: any) => void
  updateProfileImage: (base64: string | undefined) => void
  addLink: () => void
  updateLink: (id: string, field: 'label' | 'information', value: string) => void
  removeLink: (id: string) => void
  handleKeyDown: (e: React.KeyboardEvent) => void
  commitPreview: () => void
  personalInput: React.RefObject<HTMLInputElement | null>
}

export const PersonalInfo = ({
  data,
  handleKeyDown,
  editingItems,
  toggleEdit,
  updatePersonalInfo,
  updateProfileImage,
  addLink,
  updateLink,
  removeLink,
  commitPreview,
  personalInput
}: PersonalInfoProps) => {
  const [shown, setShown] = useState(false)
  const handleToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => setShown(e.currentTarget.open)
  const [addLinkCount, setAddLinkCount] = useState(0)
  const [deleteLinkCount, setDeleteLinkCount] = useState(0)
  const [snapshot, setSnapshot] = useState<ResumeData['personalInfo'] | null>(null)
  const { t } = useLanguage()
  const refExtraInfoInput = useRef<HTMLInputElement>(null)
  const addExtraRef = useRef<HTMLButtonElement>(null)
  const editRef = useRef<HTMLButtonElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => updateProfileImage(reader.result as string)
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const handleStartEdit = () => {
    setSnapshot({ ...data.personalInfo, additionalLinks: [...data.personalInfo.additionalLinks] })
    toggleEdit('personalInfo')
  }

  const handleCancel = () => {
    if (snapshot) {
      (Object.keys(snapshot) as (keyof ResumeData['personalInfo'])[]).forEach(field => {
        updatePersonalInfo(field, snapshot[field])
      })
    }
    toggleEdit('personalInfo')
  }

  const deleteExtraInput = (id: string) => {
    removeLink(id)
    setDeleteLinkCount(c => c + 1)
  }

  const addExtraInfo = () => {
    addLink()
    setAddLinkCount(c => c + 1)
  }

  useEffect(() => {
    if (addLinkCount > 0) refExtraInfoInput.current?.focus()
  }, [addLinkCount])

  useEffect(() => {
    if (deleteLinkCount > 0) addExtraRef.current?.focus()
  }, [deleteLinkCount])

  useEffect(() => {
    if (editingItems.has('personalInfo')) {
      personalInput.current?.focus()
    } else {
      editRef.current?.focus()
    }
  }, [editingItems.size])

  return (
    <details onToggle={handleToggle} className="space-y-4">
      <summary className="w-full flex items-center justify-between p-3 rounded-lg font-semibold text-slate-700 hover:bg-slate-100">
        {t('personal_section_title')}
        {shown ? <ChevronUp className="w-4 h-4" aria-hidden="true" /> : <ChevronDown className="w-4 h-4" aria-hidden="true" />}
      </summary>
      <Section
        as="section"
        identifier="additional-info-heading"
        className="p-4 border border-slate-100 rounded-lg relative group/item"
      >
        {editingItems.has('personalInfo') ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
              <label className="sr-only" htmlFor="fullname-input">{t('personal_name_placeholder')}</label>
              <input
                className="p-2 border rounded text-sm"
                placeholder={t('personal_name_placeholder')}
                value={data.personalInfo.name}
                onChange={e => updatePersonalInfo('name', e.target.value)}
                onKeyDown={handleKeyDown}
                id="fullname-input"
                aria-autocomplete="list"
                autoComplete="name"
                ref={personalInput}
              />
              <label className="sr-only" htmlFor="job-title-id">{t('personal_title_placeholder')}</label>
              <input
                id="job-title-id"
                className="p-2 border rounded text-sm"
                placeholder={t('personal_title_placeholder')}
                value={data.personalInfo.title}
                onChange={e => updatePersonalInfo('title', e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="organization-title"
                aria-autocomplete="list"
              />
              <label className="sr-only" htmlFor="email-id">{t('personal_email_placeholder')}</label>
              <input
                id="email-id"
                className="p-2 border rounded text-sm"
                placeholder={t('personal_email_placeholder')}
                value={data.personalInfo.email}
                onChange={e => updatePersonalInfo('email', e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="email"
                aria-autocomplete="list"
              />
              <label className="sr-only" htmlFor="phone-id">{t('personal_phone_placeholder')}</label>
              <input
                id="phone-id"
                className="p-2 border rounded text-sm"
                placeholder={t('personal_phone_placeholder')}
                value={data.personalInfo.phone}
                onChange={e => updatePersonalInfo('phone', e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="tel"
                aria-autocomplete="list"
              />
              <label className="sr-only" htmlFor="location-id">{t('personal_location_placeholder')}</label>
              <input
                id="location-id"
                className="p-2 border rounded text-sm"
                placeholder={t('personal_location_placeholder')}
                value={data.personalInfo.location}
                onChange={e => updatePersonalInfo('location', e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="country-name"
                aria-autocomplete="list"
              />
              <label className="sr-only" htmlFor="website-id">{t('personal_website_placeholder')}</label>
              <input
                id="website-id"
                className="p-2 border rounded text-sm"
                placeholder={t('personal_website_placeholder')}
                value={data.personalInfo.website}
                onChange={e => updatePersonalInfo('website', e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="url"
                aria-autocomplete="list"
              />
              <label className="sr-only" htmlFor="github-id">{t('personal_github_placeholder')}</label>
              <input
                id="github-id"
                className="p-2 border rounded text-sm"
                placeholder={t('personal_github_placeholder')}
                value={data.personalInfo.github}
                onChange={e => updatePersonalInfo('github', e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="url"
                aria-autocomplete="list"
              />
            </div>

            {/* Profile photo */}
            <div className="mt-4 flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                id="profile-photo-input"
                aria-label={t('personal_photo_upload_aria')}
                onChange={handlePhotoChange}
              />
              {data.personalInfo.profileImage ? (
                <>
                  <img
                    src={data.personalInfo.profileImage}
                    alt={t('personal_photo_preview_alt')}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200"
                  />
                  <button
                    type="button"
                    onClick={() => updateProfileImage(undefined)}
                    className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-md transition-colors"
                    aria-label={t('personal_photo_remove_aria')}
                  >
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                    {t('shared_remove')}
                  </button>
                </>
              ) : (
                <label
                  htmlFor="profile-photo-input"
                  className="cursor-pointer flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-2 py-1.5 rounded-md transition-colors border border-indigo-200"
                >
                  <Plus className="w-3 h-3" aria-hidden="true" />
                  {t('personal_photo_upload_aria')}
                </label>
              )}
            </div>

            {/* Additional information */}
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex flex-col gap-4">
                <AutoHeading 
                  className="text-sm font-semibold text-slate-700" 
                  id="additional-info-heading"
                >
                  {t('personal_additional_info_title')}
                </AutoHeading>
                {data.personalInfo.additionalLinks?.map((link, index) => (
                  <div key={link.id} className="flex gap-2 items-center">
                    <label className="sr-only" htmlFor={`link-label-${link.id}`}>{link.label || t('personal_link_label_placeholder')}</label>
                    <input
                      className="w-1/3 p-2 border rounded text-sm"
                      placeholder={t('personal_link_label_placeholder')}
                      value={link.label}
                      onChange={e => updateLink(link.id, 'label', e.target.value)}
                      onKeyDown={handleKeyDown}
                      id={`link-label-${link.id}`}
                      aria-autocomplete="none"
                      autoComplete="off"
                      ref={index === data.personalInfo.additionalLinks.length - 1 ? refExtraInfoInput : null}
                    />
                    <label className="sr-only" htmlFor={`link-info-${link.id}`}>{t('personal_link_url_placeholder')}</label>
                    <input
                      className="flex-1 p-2 border rounded text-sm"
                      placeholder={t('personal_link_url_placeholder')}
                      value={link.information}
                      onChange={e => updateLink(link.id, 'information', e.target.value)}
                      onKeyDown={handleKeyDown}
                      id={`link-info-${link.id}`}
                      aria-autocomplete="none"
                      autoComplete="off"
                    />
                    <button
                      onClick={() => deleteExtraInput(link.id)}
                      className="text-slate-400 hover:text-red-500 p-2"
                      title="Remove link"
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addExtraInfo}
                  className="text-xs text-indigo-600 font-medium hover:underline flex items-center gap-1 w-fit"
                  aria-label={t('personal_add_link_aria')}
                  ref={addExtraRef}
                >
                  <Plus className="w-3 h-3" aria-hidden="true" />
                  <span aria-hidden="true">{t('personal_extra_info_btn')}</span>
                </button>
              </div>
              <div className="flex flex-row justify-end gap-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 px-2 py-1.5 h-fit rounded-md transition-colors"
                  title="Cancel editing"
                  aria-label={t('personal_discard_changes_aria')}
                  type="button"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                  {t('shared_cancel')}
                </button>
                <button
                  onClick={() => { toggleEdit('personalInfo'); commitPreview() }}
                  className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-2 py-1.5 h-fit rounded-md transition-colors"
                  title="Save changes"
                  aria-label={t('personal_save_aria')}
                  type="button"
                >
                  <Save className="w-3.5 h-3.5" aria-hidden="true" />
                  <span aria-hidden="true">{t('shared_save')}</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                {data.personalInfo.profileImage && (
                  <img
                    src={data.personalInfo.profileImage}
                    alt={t('personal_photo_preview_alt')}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
                  />
                )}
                <div>
                  <AutoHeading className="text-lg font-bold text-slate-800" id="personal-info-name">{data.personalInfo.name}</AutoHeading>
                  <p className="text-indigo-600 font-medium">{data.personalInfo.title}</p>
                </div>
              </div>
              <button
                onClick={handleStartEdit}
                className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                title="Edit personal info"
                ref={editRef}
              >
                <Edit2 className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm text-slate-600">
              {data.personalInfo.email && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-500 w-16">{t('personal_label_email')}</span>
                  <span>{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-500 w-16">{t('personal_label_phone')}</span>
                  <span>{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-500 w-16">{t('personal_label_location')}</span>
                  <span>{data.personalInfo.location}</span>
                </div>
              )}
              {data.personalInfo.website && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-500 w-16">{t('personal_label_website')}</span>
                  <span>{data.personalInfo.website}</span>
                </div>
              )}
              {data.personalInfo.github && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-500 w-16">{t('personal_label_github')}</span>
                  <span>{data.personalInfo.github}</span>
                </div>
              )}
              {data.personalInfo.additionalLinks?.map(link => (
                <div key={link.id} className="flex items-center gap-2">
                  <span className="font-medium text-slate-500 w-16">{link.label || 'Link'}:</span>
                  <span>{link.information}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>
    </details>
  )
}

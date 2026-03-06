import { useState } from "react"
import type { ResumeData } from "../types/resume"

const INITIAL_EXP_ID = 'exp-initial'

const createInitialData = (): ResumeData => ({
  personalInfo: {
    name: '',
    title: '',
    email: '',
    location: '',
    website: '',
    github: '',
    phone: '',
    additionalLinks: []
  },
  summary: '',
  experience: [{
    id: INITIAL_EXP_ID,
    company: '',
    location: '',
    role: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    description: ['']
  }],
  education: [],
  skills: [],
  languages: []
})

export const useResumeBuilder = () => {
  const [data, setData] = useState<ResumeData>(createInitialData)
  const [previewData, setPreviewData] = useState<ResumeData>(createInitialData)
  const [editingItems, setEditingItems] = useState<Set<string>>(
    new Set(['personalInfo', 'summary', 'experience', 'education', 'skills', 'languages', INITIAL_EXP_ID])
  )

  const commitPreview = () => setPreviewData(data)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      (e.target as HTMLElement).blur()
    }
  }

  const toggleEdit = (id: string) => {
    setEditingItems(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: any) => {
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }))
  }

  const addLink = () => {
    const newId = Date.now().toString()
    setData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        additionalLinks: [
          ...(prev.personalInfo.additionalLinks || []),
          { id: newId, label: '', information: '' }
        ]
      }
    }))
  }

  const updateLink = (id: string, field: 'label' | 'information', value: string) => {
    setData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        additionalLinks: (prev.personalInfo.additionalLinks || []).map(link =>
          link.id === id ? { ...link, [field]: value } : link
        )
      }
    }))
  }

  const removeLink = (id: string) => {
    setData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        additionalLinks: (prev.personalInfo.additionalLinks || []).filter(link => link.id !== id)
      }
    }))
  }

  const updateProfileImage = (base64: string | undefined) =>
    setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, profileImage: base64 } }))

  const updateSummary = (value: string) => {
    setData(prev => ({
      ...prev,
      summary: value
    }))
  }

  const updateExperience = (id: string, field: string, value: any) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const addExperience = () => {
    const newId = Date.now().toString()
    setData(prev => ({
      ...prev,
      experience: [
        {
          id: newId,
          company: '',
          location: '',
          role: '',
          startDate: '',
          endDate: '',
          isCurrent: false,
          description: ['']
        },
        ...prev.experience
      ]
    }))
    setEditingItems(prev => new Set([...prev, newId]))
  }

  const removeExperience = (id: string) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }))
  }

  const updateBullet = (expId: string, index: number, value: string) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id !== expId) return exp
        const newDesc = [...exp.description]
        newDesc[index] = value
        return { ...exp, description: newDesc }
      })
    }))
  }

  const addBullet = (expId: string) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id !== expId) return exp
        return { ...exp, description: [...exp.description, ''] }
      })
    }))
  }

  const removeBullet = (expId: string, index: number) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id !== expId) return exp
        return { ...exp, description: exp.description.filter((_, i) => i !== index) }
      })
    }))
  }

  const addEducation = () => {
    const newId = Date.now().toString()
    setData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: newId,
          institution: '',
          degree: '',
          field: '',
          location: '',
          startDate: '',
          endDate: '',
          isCurrent: false,
          gpa: '',
          description: []
        }
      ]
    }))
    setEditingItems(prev => new Set([...prev, newId]))
  }

  const updateEducation = (id: string, field: keyof import('../types/resume').EducationItem, value: any) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }))
  }

  const removeEducation = (id: string) => {
    setData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }))
  }

  const addEducationDetail = (eduId: string) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map(edu => {
        if (edu.id !== eduId) return edu
        return { ...edu, description: [...edu.description, ''] }
      })
    }))
  }

  const updateEducationDetail = (eduId: string, index: number, value: string) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map(edu => {
        if (edu.id !== eduId) return edu
        const newDesc = [...edu.description]
        newDesc[index] = value
        return { ...edu, description: newDesc }
      })
    }))
  }

  const removeEducationDetail = (eduId: string, index: number) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map(edu => {
        if (edu.id !== eduId) return edu
        return { ...edu, description: edu.description.filter((_, i) => i !== index) }
      })
    }))
  }

  const addSkill = () => {
    const newId = Date.now().toString()
    setData(prev => ({
      ...prev,
      skills: [...prev.skills, { id: newId, name: '', skills: '' }]
    }))
    setEditingItems(prev => new Set([...prev, newId]))
  }

  const updateSkill = (id: string, field: keyof import('../types/resume').SkillCategory, value: string) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }))
  }

  const removeSkill = (id: string) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }))
  }

  const addLanguage = () => {
    const newId = Date.now().toString()
    setData(prev => ({
      ...prev,
      languages: [...prev.languages, { id: newId, name: '', level: 'Basic' }]
    }))
    setEditingItems(prev => new Set([...prev, newId]))
  }

  const updateLanguage = (id: string, field: keyof import('../types/resume').LanguageItem, value: string) => {
    setData(prev => ({
      ...prev,
      languages: prev.languages.map(lang =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    }))
  }

  const removeLanguage = (id: string) => {
    setData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang.id !== id)
    }))
  }

  return {
    data,
    previewData,
    commitPreview,
    editingItems,
    handleKeyDown,
    toggleEdit,
    updatePersonalInfo,
    updateProfileImage,
    updateLink,
    updateSummary,
    updateExperience,
    addExperience,
    removeExperience,
    updateBullet,
    addBullet,
    removeBullet,
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
    removeLink,
    addLink
  }
}

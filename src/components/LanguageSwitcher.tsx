import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import type { Language } from '../i18n/translations'

const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  it: 'Italiano',
}

const LANGUAGES = Object.keys(LANGUAGE_NAMES) as Language[]

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [announcedName, setAnnouncedName] = useState('')
  const [alignment, setAlignment] = useState<'left' | 'right'>('left')

  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([])

  const updateFocusedIndex = (i: number) => {
    setFocusedIndex(i)
    optionRefs.current[i]?.focus()
  }

  const switchLanguage = (target: Language) => {
    if (target === language) {
      setIsOpen(false)
      return
    }
    setIsOpen(false)
    setFocusedIndex(-1)
    setAnnouncedName(LANGUAGE_NAMES[target])
    setLanguage(target)
    buttonRef.current?.focus()
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
        event.preventDefault()
        setIsOpen(true)
        const idx = Math.max(0, LANGUAGES.indexOf(language))
        setTimeout(() => updateFocusedIndex(idx), 0)
      }
      return
    }
    if (event.key === 'Escape') {
      event.preventDefault()
      setIsOpen(false)
      buttonRef.current?.focus()
    }
  }

  const handleOptionKeyDown = (event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case 'Escape':
        event.preventDefault()
        event.stopPropagation()
        setIsOpen(false)
        setFocusedIndex(-1)
        requestAnimationFrame(() => buttonRef.current?.focus())
        break
      case 'ArrowDown': {
        event.preventDefault()
        const nextIndex = index < LANGUAGES.length - 1 ? index + 1 : 0
        updateFocusedIndex(nextIndex)
        break
      }
      case 'ArrowUp': {
        event.preventDefault()
        const prevIndex = index > 0 ? index - 1 : LANGUAGES.length - 1
        updateFocusedIndex(prevIndex)
        break
      }
      case 'Enter':
      case ' ':
        event.preventDefault()
        switchLanguage(LANGUAGES[index])
        break
      case 'Home':
        event.preventDefault()
        updateFocusedIndex(0)
        break
      case 'End':
        event.preventDefault()
        updateFocusedIndex(LANGUAGES.length - 1)
        break
      case 'Tab':
        if (event.shiftKey && index === 0) {
          event.preventDefault()
          setIsOpen(false)
          setFocusedIndex(-1)
          buttonRef.current?.focus()
        } else if (!event.shiftKey && index === LANGUAGES.length - 1) {
          setIsOpen(false)
          setFocusedIndex(-1)
        }
        break
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setFocusedIndex(-1)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
      optionRefs.current[focusedIndex]?.focus()
    }
  }, [isOpen, focusedIndex])

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect()
      const spaceRight = window.innerWidth - rect.right
      const spaceLeft = rect.left
      setAlignment(spaceRight < 200 && spaceLeft > spaceRight ? 'right' : 'left')
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => {
          const open = !isOpen
          setIsOpen(open)
          if (open) {
            const idx = Math.max(0, LANGUAGES.indexOf(language))
            setTimeout(() => updateFocusedIndex(idx), 0)
          } else {
            setFocusedIndex(-1)
          }
        }}
        onKeyDown={handleKeyDown}
        className="px-3 py-1.5 rounded-md text-sm font-medium border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 transition-colors flex items-center gap-1.5"
        aria-label={t('app_lang_toggle_aria')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        id="language-button"
        aria-controls="language-listbox"
      >
        <Globe className="w-4 h-4" aria-hidden="true" />
        <span className="flex items-center gap-2">
          <span className="hidden sm:inline">{LANGUAGE_NAMES[language]}</span>
          <span className="sm:hidden">{language.toUpperCase()}</span>
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          className={`absolute z-50 mt-1 min-w-32.5 rounded-md border border-slate-200 bg-white shadow-lg py-1 ${
            alignment === 'right' ? 'right-0' : 'left-0'
          }`}
          role="listbox"
          aria-labelledby="language-button"
          id="language-listbox"
        >
          {LANGUAGES.map((lang, index) => {
            const isSelected = language === lang
            const isFocused = focusedIndex === index

            return (
              <button
                key={lang}
                ref={(el) => { optionRefs.current[index] = el }}
                id={`language-option-${lang}`}
                onClick={() => switchLanguage(lang)}
                onKeyDown={(e) => handleOptionKeyDown(e, index)}
                onMouseEnter={() => document.activeElement !== optionRefs.current[index] && setFocusedIndex(index)}
                onFocus={() => setFocusedIndex(index)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm gap-2 ${
                  isSelected ? 'font-semibold text-indigo-600 bg-indigo-50' : 'text-slate-700 hover:bg-slate-50'
                } ${isFocused ? 'bg-slate-100 outline-none' : ''}`}
                role="option"
                aria-selected={isSelected}
                tabIndex={isFocused || isSelected ? 0 : -1}
              >
                <span className="font-medium flex-1 text-left">{LANGUAGE_NAMES[lang]}</span>
                <span className="text-xs text-slate-400 uppercase" aria-hidden="true">{lang}</span>
                {isSelected && <Check className="w-4 h-4 text-indigo-600 shrink-0" aria-hidden="true" />}
              </button>
            )
          })}
        </div>
      )}

      {isOpen && (
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          <p>Language menu open. {LANGUAGES.length} options.</p>
        </div>
      )}
      {announcedName && (
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          <p>Language changed to {announcedName}</p>
        </div>
      )}
    </div>
  )
}

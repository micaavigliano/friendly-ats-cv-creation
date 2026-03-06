export type Language = 'en' | 'es' | 'it'

export interface Translations {
  // App shell
  app_title: string
  app_tab_scanner: string
  app_tab_builder: string
  app_lang_toggle_aria: string
  app_analyze_error: string
  app_footer: string

  // InputForm
  input_hero_title: string
  input_hero_subtitle: string
  input_resume_label: string
  input_upload_pdf: string
  input_extracting_text: string
  input_resume_placeholder: string
  input_job_label: string
  input_job_placeholder: string
  input_pdf_error_type: string
  input_pdf_error_scanned: string
  input_pdf_error_parse: string
  input_pdf_tip: string
  input_analyzing: string
  input_scan_btn: string
  input_sample_data_btn: string

  // AnalysisView
  analysis_executive_summary: string
  analysis_missing_keywords: string
  analysis_no_missing_keywords: string
  analysis_suggested_improvements: string
  analysis_formatting_checks: string
  analysis_edit_rescan_btn: string
  analysis_scan_new_btn: string

  // ResumeBuilder
  builder_edit_resume: string
  builder_generating: string
  builder_download_pdf: string
  builder_live_preview: string

  // PersonalInfo
  personal_section_title: string
  personal_name_placeholder: string
  personal_title_placeholder: string
  personal_email_placeholder: string
  personal_phone_placeholder: string
  personal_location_placeholder: string
  personal_website_placeholder: string
  personal_github_placeholder: string
  personal_additional_info_title: string
  personal_link_label_placeholder: string
  personal_link_url_placeholder: string
  personal_add_link_aria: string
  personal_extra_info_btn: string
  personal_discard_changes_aria: string
  personal_save_aria: string
  personal_label_email: string
  personal_label_phone: string
  personal_label_location: string
  personal_label_website: string
  personal_label_github: string
  personal_photo_upload_aria: string
  personal_photo_remove_aria: string
  personal_photo_preview_alt: string

  // ProSummary
  summary_section_title: string
  summary_placeholder: string
  summary_edit_aria: string
  summary_discard_changes_aria: string

  // Experience
  experience_section_title: string
  experience_legend: string
  experience_company_placeholder: string
  experience_location_placeholder: string
  experience_role_placeholder: string
  experience_start_date_label: string
  experience_end_date_label: string
  experience_current_work_label: string
  experience_achievement_placeholder: string
  experience_add_achievement_btn: string
  experience_present: string
  experience_add_new_aria: string
  experience_remove_aria: string
  experience_delete_aria: string

  // Skills
  skills_section_title: string
  skills_category_placeholder: string
  skills_list_placeholder: string
  skills_edit_aria: string
  skills_remove_aria: string
  skills_add_new_aria: string

  // Languages
  languages_section_title: string
  languages_language_placeholder: string
  languages_proficiency_aria: string
  languages_save_aria: string
  languages_remove_aria: string
  languages_edit_aria: string
  languages_add_new_aria: string

  // Language proficiency levels (natural language only; CEFR codes are not translated)
  lang_level_basic: string
  lang_level_intermediate: string
  lang_level_advanced: string
  lang_level_fluent: string
  lang_level_native: string
  lang_level_bilingual: string

  // Education
  education_section_title: string
  education_legend: string
  education_institution_placeholder: string
  education_degree_placeholder: string
  education_field_placeholder: string
  education_location_placeholder: string
  education_gpa_placeholder: string
  education_start_date_label: string
  education_end_date_label: string
  education_current_label: string
  education_achievement_placeholder: string
  education_add_achievement_btn: string
  education_add_new_aria: string
  education_remove_aria: string
  education_delete_aria: string

  // PDF section titles
  pdf_about_me: string
  pdf_experience: string
  pdf_education: string
  pdf_technical_skills: string
  pdf_languages: string
  pdf_current: string

  // Shared
  shared_save: string
  shared_cancel: string
  shared_remove: string
  shared_chars: string
  shared_chars_long: string
}

export const translations: Record<Language, Translations> = {
  en: {
    // App shell
    app_title: 'ATS Assistant',
    app_tab_scanner: 'Scanner',
    app_tab_builder: 'CV Builder',
    app_lang_toggle_aria: 'Select language',
    app_analyze_error: 'Failed to analyze resume. Please try again.',
    app_footer: `© ${new Date().getFullYear()} ATS Assistant. Built by Mica Avigliano`,

    // InputForm
    input_hero_title: 'Optimize Your Resume for ATS',
    input_hero_subtitle: 'Upload your resume (PDF) or paste the text. Our AI will analyze how well you match the job description.',
    input_resume_label: 'Resume Content',
    input_upload_pdf: 'Upload PDF',
    input_extracting_text: 'Extracting text...',
    input_resume_placeholder: 'Paste your resume text here or upload a PDF...',
    input_job_label: 'Job Description',
    input_job_placeholder: 'Paste the job description here...',
    input_pdf_error_type: 'Please upload a PDF file.',
    input_pdf_error_scanned: 'Could not extract enough text. Is this a scanned image? ATS systems cannot read images.',
    input_pdf_error_parse: 'Failed to parse PDF',
    input_pdf_tip: 'Tip: Uploading a PDF will extract the text so you can see exactly what an ATS sees.',
    input_analyzing: 'Analyzing...',
    input_scan_btn: 'Scan Resume',
    input_sample_data_btn: 'Use sample data',

    // AnalysisView
    analysis_executive_summary: 'Executive Summary',
    analysis_missing_keywords: 'Missing Keywords',
    analysis_no_missing_keywords: 'No critical keywords missing. Great job!',
    analysis_suggested_improvements: 'Suggested Improvements',
    analysis_formatting_checks: 'Formatting & Parsing Checks',
    analysis_edit_rescan_btn: 'Edit & Rescan',
    analysis_scan_new_btn: 'Scan New Resume',

    // ResumeBuilder
    builder_edit_resume: 'Edit Resume',
    builder_generating: 'Generating...',
    builder_download_pdf: 'Download PDF',
    builder_live_preview: 'Live Preview',

    // PersonalInfo
    personal_section_title: 'Personal Information',
    personal_name_placeholder: 'Full Name',
    personal_title_placeholder: 'Job Title',
    personal_email_placeholder: 'Email',
    personal_phone_placeholder: 'Phone',
    personal_location_placeholder: 'Location',
    personal_website_placeholder: 'Website',
    personal_github_placeholder: 'GitHub',
    personal_additional_info_title: 'Additional Information',
    personal_link_label_placeholder: 'Label (e.g. Portfolio)',
    personal_link_url_placeholder: 'URL',
    personal_add_link_aria: 'Add a new link, an alternative telephone number or social media profile',
    personal_extra_info_btn: 'Extra info',
    personal_discard_changes_aria: 'Discard changes to personal information',
    personal_save_aria: 'Save personal information',
    personal_label_email: 'Email:',
    personal_label_phone: 'Phone:',
    personal_label_location: 'Location:',
    personal_label_website: 'Website:',
    personal_label_github: 'GitHub:',
    personal_photo_upload_aria: 'Upload profile photo',
    personal_photo_remove_aria: 'Remove profile photo',
    personal_photo_preview_alt: 'Profile photo preview',

    // ProSummary
    summary_section_title: 'Professional Summary',
    summary_placeholder: 'Write a short professional summary...',
    summary_edit_aria: 'Edit summary',
    summary_discard_changes_aria: 'Discard changes to summary',

    // Experience
    experience_section_title: 'Experience',
    experience_legend: 'List of professional experiences',
    experience_company_placeholder: 'Company',
    experience_location_placeholder: 'Location',
    experience_role_placeholder: 'Role',
    experience_start_date_label: 'Start Date',
    experience_end_date_label: 'End Date',
    experience_current_work_label: 'I currently work here',
    experience_achievement_placeholder: 'Describe an achievement or responsibility',
    experience_add_achievement_btn: 'Add Achievement',
    experience_present: 'Present',
    experience_add_new_aria: 'Add new experience',
    experience_remove_aria: 'Remove experience',
    experience_delete_aria: 'Delete this experience',

    // Education
    education_section_title: 'Education',
    education_legend: 'List of educational background',
    education_institution_placeholder: 'Institution',
    education_degree_placeholder: 'Degree (e.g. Bachelor of Science)',
    education_field_placeholder: 'Field of Study',
    education_location_placeholder: 'Location',
    education_gpa_placeholder: 'GPA (optional)',
    education_start_date_label: 'Start Date',
    education_end_date_label: 'End Date',
    education_current_label: 'Currently studying here',
    education_achievement_placeholder: 'Relevant coursework, honors, or activities',
    education_add_achievement_btn: 'Add Detail',
    education_add_new_aria: 'Add new education',
    education_remove_aria: 'Remove education',
    education_delete_aria: 'Delete this education',

    // Skills
    skills_section_title: 'Skills',
    skills_category_placeholder: 'Category (e.g. Core Frontend)',
    skills_list_placeholder: 'List skills (e.g. React, TypeScript, ...)',
    skills_edit_aria: 'Edit skill category',
    skills_remove_aria: 'Remove skill category',
    skills_add_new_aria: 'Add new skill',

    // Languages
    languages_section_title: 'Languages',
    languages_language_placeholder: 'Language',
    languages_proficiency_aria: 'Proficiency Level',
    languages_save_aria: 'Save language',
    languages_remove_aria: 'Remove language',
    languages_edit_aria: 'Edit language',
    languages_add_new_aria: 'Add new language',

    // Language proficiency levels
    lang_level_basic: 'Basic',
    lang_level_intermediate: 'Intermediate',
    lang_level_advanced: 'Advanced',
    lang_level_fluent: 'Fluent',
    lang_level_native: 'Native',
    lang_level_bilingual: 'Bilingual',

    // PDF section titles
    pdf_about_me: 'About Me',
    pdf_experience: 'Work Experience',
    pdf_education: 'Education',
    pdf_technical_skills: 'Technical Skills',
    pdf_languages: 'Languages',
    pdf_current: 'current',

    // Shared
    shared_save: 'Save',
    shared_cancel: 'Cancel',
    shared_remove: 'Remove',
    shared_chars: 'chars',
    shared_chars_long: 'characters'
  },

  es: {
    // App shell
    app_title: 'ATS Assistant',
    app_tab_scanner: 'Escáner',
    app_tab_builder: 'Crear CV',
    app_lang_toggle_aria: 'Seleccionar idioma',
    app_analyze_error: 'Error al analizar el currículum. Por favor, inténtalo de nuevo.',
    app_footer: `© ${new Date().getFullYear()} ATS Assistant. Desarrollado por Mica Avigliano con la API de Gemini.`,

    // InputForm
    input_hero_title: 'Optimiza tu currículum para ATS',
    input_hero_subtitle: 'Sube tu currículum (PDF) o pega el texto. Nuestra IA analizará qué tan bien coincides con la descripción del puesto.',
    input_resume_label: 'Contenido del currículum',
    input_upload_pdf: 'Subir PDF',
    input_extracting_text: 'Extrayendo texto...',
    input_resume_placeholder: 'Pega el texto de tu currículum aquí o sube un PDF...',
    input_job_label: 'Descripción del puesto',
    input_job_placeholder: 'Pega la descripción del puesto aquí...',
    input_pdf_error_type: 'Por favor, sube un archivo PDF.',
    input_pdf_error_scanned: 'No se pudo extraer suficiente texto. ¿Es una imagen escaneada? Los sistemas ATS no pueden leer imágenes.',
    input_pdf_error_parse: 'Error al procesar el PDF',
    input_pdf_tip: 'Consejo: Subir un PDF extraerá el texto para que veas exactamente lo que ve un ATS.',
    input_analyzing: 'Analizando...',
    input_scan_btn: 'Escanear currículum',
    input_sample_data_btn: 'Usar datos de ejemplo',

    // AnalysisView
    analysis_executive_summary: 'Resumen ejecutivo',
    analysis_missing_keywords: 'Palabras clave faltantes',
    analysis_no_missing_keywords: 'No faltan palabras clave críticas. ¡Buen trabajo!',
    analysis_suggested_improvements: 'Mejoras sugeridas',
    analysis_formatting_checks: 'Verificaciones de formato y análisis',
    analysis_edit_rescan_btn: 'Editar y volver a escanear',
    analysis_scan_new_btn: 'Escanear nuevo currículum',

    // ResumeBuilder
    builder_edit_resume: 'Editar currículum',
    builder_generating: 'Generando...',
    builder_download_pdf: 'Descargar PDF',
    builder_live_preview: 'Vista previa',

    // PersonalInfo
    personal_section_title: 'Información personal',
    personal_name_placeholder: 'Nombre completo',
    personal_title_placeholder: 'Puesto de trabajo',
    personal_email_placeholder: 'Correo electrónico',
    personal_phone_placeholder: 'Teléfono',
    personal_location_placeholder: 'Ubicación',
    personal_website_placeholder: 'Sitio web',
    personal_github_placeholder: 'GitHub',
    personal_additional_info_title: 'Información adicional',
    personal_link_label_placeholder: 'Etiqueta (ej. Portafolio)',
    personal_link_url_placeholder: 'URL',
    personal_add_link_aria: 'Agregar un nuevo enlace, número de teléfono alternativo o perfil en redes sociales',
    personal_extra_info_btn: 'Info extra',
    personal_discard_changes_aria: 'Descartar cambios en información personal',
    personal_save_aria: 'Guardar información personal',
    personal_label_email: 'Correo:',
    personal_label_phone: 'Teléfono:',
    personal_label_location: 'Ubicación:',
    personal_label_website: 'Web:',
    personal_label_github: 'GitHub:',
    personal_photo_upload_aria: 'Subir foto de perfil',
    personal_photo_remove_aria: 'Eliminar foto de perfil',
    personal_photo_preview_alt: 'Vista previa de la foto de perfil',

    // ProSummary
    summary_section_title: 'Resumen profesional',
    summary_placeholder: 'Escribe un breve resumen profesional...',
    summary_edit_aria: 'Editar resumen',
    summary_discard_changes_aria: 'Descartar cambios en el resumen',

    // Experience
    experience_section_title: 'Experiencia',
    experience_legend: 'Lista de experiencias profesionales',
    experience_company_placeholder: 'Empresa',
    experience_location_placeholder: 'Ubicación',
    experience_role_placeholder: 'Cargo',
    experience_start_date_label: 'Fecha de inicio',
    experience_end_date_label: 'Fecha de fin',
    experience_current_work_label: 'Actualmente trabajo aquí',
    experience_achievement_placeholder: 'Describe un logro o responsabilidad',
    experience_add_achievement_btn: 'Agregar logro',
    experience_present: 'Presente',
    experience_add_new_aria: 'Agregar nueva experiencia',
    experience_remove_aria: 'Eliminar experiencia',
    experience_delete_aria: 'Eliminar esta experiencia',

    // Education
    education_section_title: 'Educación',
    education_legend: 'Lista de formación académica',
    education_institution_placeholder: 'Institución',
    education_degree_placeholder: 'Título (ej. Licenciatura en Ciencias)',
    education_field_placeholder: 'Campo de estudio',
    education_location_placeholder: 'Ubicación',
    education_gpa_placeholder: 'Promedio (opcional)',
    education_start_date_label: 'Fecha de inicio',
    education_end_date_label: 'Fecha de fin',
    education_current_label: 'Actualmente estudio aquí',
    education_achievement_placeholder: 'Cursos relevantes, honores o actividades',
    education_add_achievement_btn: 'Agregar detalle',
    education_add_new_aria: 'Agregar nueva educación',
    education_remove_aria: 'Eliminar educación',
    education_delete_aria: 'Eliminar esta educación',

    // Skills
    skills_section_title: 'Habilidades',
    skills_category_placeholder: 'Categoría (ej. Frontend principal)',
    skills_list_placeholder: 'Lista de habilidades (ej. React, TypeScript, ...)',
    skills_edit_aria: 'Editar categoría de habilidades',
    skills_remove_aria: 'Eliminar categoría de habilidades',
    skills_add_new_aria: 'Agregar nueva habilidad',

    // Languages
    languages_section_title: 'Idiomas',
    languages_language_placeholder: 'Idioma',
    languages_proficiency_aria: 'Nivel de competencia',
    languages_save_aria: 'Guardar idioma',
    languages_remove_aria: 'Eliminar idioma',
    languages_edit_aria: 'Editar idioma',
    languages_add_new_aria: 'Agregar nuevo idioma',

    // Language proficiency levels
    lang_level_basic: 'Básico',
    lang_level_intermediate: 'Intermedio',
    lang_level_advanced: 'Avanzado',
    lang_level_fluent: 'Fluido',
    lang_level_native: 'Nativo',
    lang_level_bilingual: 'Bilingüe',

    // PDF section titles
    pdf_about_me: 'Sobre mí',
    pdf_experience: 'Experiencia laboral',
    pdf_education: 'Educación',
    pdf_technical_skills: 'Habilidades técnicas',
    pdf_languages: 'Idiomas',
    pdf_current: 'actual',

    // Shared
    shared_save: 'Guardar',
    shared_cancel: 'Cancelar',
    shared_remove: 'Eliminar',
    shared_chars: 'caract.',
    shared_chars_long: 'carácteres'
  },

  it: {
    // App shell
    app_title: 'ATS Assistant',
    app_tab_scanner: 'Scanner',
    app_tab_builder: 'Crea CV',
    app_lang_toggle_aria: 'Seleziona lingua',
    app_analyze_error: 'Analisi del curriculum fallita. Riprova.',
    app_footer: `© ${new Date().getFullYear()} ATS Assistant. Sviluppato da Mica Avigliano con le API di Gemini.`,

    // InputForm
    input_hero_title: 'Ottimizza il tuo curriculum per gli ATS',
    input_hero_subtitle: 'Carica il tuo curriculum (PDF) o incolla il testo. La nostra IA analizzerà quanto sei compatibile con la descrizione del lavoro.',
    input_resume_label: 'Contenuto del curriculum',
    input_upload_pdf: 'Carica PDF',
    input_extracting_text: 'Estrazione del testo...',
    input_resume_placeholder: 'Incolla qui il testo del tuo curriculum o carica un PDF...',
    input_job_label: 'Descrizione del lavoro',
    input_job_placeholder: 'Incolla qui la descrizione del lavoro...',
    input_pdf_error_type: 'Carica un file PDF.',
    input_pdf_error_scanned: 'Impossibile estrarre testo sufficiente. È un\'immagine scansionata? I sistemi ATS non possono leggere le immagini.',
    input_pdf_error_parse: 'Errore nell\'elaborazione del PDF',
    input_pdf_tip: 'Suggerimento: Caricare un PDF estrarrà il testo in modo da vedere esattamente ciò che vede un ATS.',
    input_analyzing: 'Analisi in corso...',
    input_scan_btn: 'Scansiona curriculum',
    input_sample_data_btn: 'Usa dati di esempio',

    // AnalysisView
    analysis_executive_summary: 'Sintesi esecutiva',
    analysis_missing_keywords: 'Parole chiave mancanti',
    analysis_no_missing_keywords: 'Nessuna parola chiave critica mancante. Ottimo lavoro!',
    analysis_suggested_improvements: 'Miglioramenti suggeriti',
    analysis_formatting_checks: 'Controlli di formattazione e analisi',
    analysis_edit_rescan_btn: 'Modifica e ripeti la scansione',
    analysis_scan_new_btn: 'Scansiona un nuovo curriculum',

    // ResumeBuilder
    builder_edit_resume: 'Modifica curriculum',
    builder_generating: 'Generazione in corso...',
    builder_download_pdf: 'Scarica PDF',
    builder_live_preview: 'Anteprima',

    // PersonalInfo
    personal_section_title: 'Informazioni personali',
    personal_name_placeholder: 'Nome completo',
    personal_title_placeholder: 'Titolo professionale',
    personal_email_placeholder: 'Email',
    personal_phone_placeholder: 'Telefono',
    personal_location_placeholder: 'Località',
    personal_website_placeholder: 'Sito web',
    personal_github_placeholder: 'GitHub',
    personal_additional_info_title: 'Informazioni aggiuntive',
    personal_link_label_placeholder: 'Etichetta (es. Portfolio)',
    personal_link_url_placeholder: 'URL',
    personal_add_link_aria: 'Aggiungi un nuovo link, numero di telefono alternativo o profilo social',
    personal_extra_info_btn: 'Info extra',
    personal_discard_changes_aria: 'Annulla le modifiche alle informazioni personali',
    personal_save_aria: 'Salva informazioni personali',
    personal_label_email: 'Email:',
    personal_label_phone: 'Telefono:',
    personal_label_location: 'Località:',
    personal_label_website: 'Sito web:',
    personal_label_github: 'GitHub:',
    personal_photo_upload_aria: 'Carica foto profilo',
    personal_photo_remove_aria: 'Rimuovi foto profilo',
    personal_photo_preview_alt: 'Anteprima foto profilo',

    // ProSummary
    summary_section_title: 'Profilo professionale',
    summary_placeholder: 'Scrivi un breve profilo professionale...',
    summary_edit_aria: 'Modifica profilo',
    summary_discard_changes_aria: 'Annulla le modifiche al profilo',

    // Experience
    experience_section_title: 'Esperienza',
    experience_legend: 'Elenco delle esperienze professionali',
    experience_company_placeholder: 'Azienda',
    experience_location_placeholder: 'Località',
    experience_role_placeholder: 'Ruolo',
    experience_start_date_label: 'Data di inizio',
    experience_end_date_label: 'Data di fine',
    experience_current_work_label: 'Lavoro attualmente qui',
    experience_achievement_placeholder: 'Descrivi un risultato o una responsabilità',
    experience_add_achievement_btn: 'Aggiungi risultato',
    experience_present: 'Presente',
    experience_add_new_aria: 'Aggiungi nuova esperienza',
    experience_remove_aria: 'Rimuovi esperienza',
    experience_delete_aria: 'Elimina questa esperienza',

    // Education
    education_section_title: 'Istruzione',
    education_legend: 'Elenco del percorso formativo',
    education_institution_placeholder: 'Istituto',
    education_degree_placeholder: 'Titolo di studio (es. Laurea in Scienze)',
    education_field_placeholder: 'Campo di studio',
    education_location_placeholder: 'Località',
    education_gpa_placeholder: 'Media voti (opzionale)',
    education_start_date_label: 'Data di inizio',
    education_end_date_label: 'Data di fine',
    education_current_label: 'Attualmente in corso',
    education_achievement_placeholder: 'Corsi rilevanti, premi o attività',
    education_add_achievement_btn: 'Aggiungi dettaglio',
    education_add_new_aria: 'Aggiungi nuova istruzione',
    education_remove_aria: 'Rimuovi istruzione',
    education_delete_aria: 'Elimina questa istruzione',

    // Skills
    skills_section_title: 'Competenze',
    skills_category_placeholder: 'Categoria (es. Frontend principale)',
    skills_list_placeholder: 'Elenca le competenze (es. React, TypeScript, ...)',
    skills_edit_aria: 'Modifica categoria di competenze',
    skills_remove_aria: 'Rimuovi categoria di competenze',
    skills_add_new_aria: 'Aggiungi nuova competenza',

    // Languages
    languages_section_title: 'Lingue',
    languages_language_placeholder: 'Lingua',
    languages_proficiency_aria: 'Livello di competenza',
    languages_save_aria: 'Salva lingua',
    languages_remove_aria: 'Rimuovi lingua',
    languages_edit_aria: 'Modifica lingua',
    languages_add_new_aria: 'Aggiungi nuova lingua',

    // Language proficiency levels
    lang_level_basic: 'Base',
    lang_level_intermediate: 'Intermedio',
    lang_level_advanced: 'Avanzato',
    lang_level_fluent: 'Fluente',
    lang_level_native: 'Madrelingua',
    lang_level_bilingual: 'Bilingue',

    // PDF section titles
    pdf_about_me: 'Chi sono',
    pdf_experience: 'Esperienza lavorativa',
    pdf_education: 'Istruzione',
    pdf_technical_skills: 'Competenze tecniche',
    pdf_languages: 'Lingue',
    pdf_current: 'attuale',

    // Shared
    shared_save: 'Salva',
    shared_cancel: 'Annulla',
    shared_remove: 'Rimuovi',
    shared_chars: 'car.',
    shared_chars_long: 'caratteri'
  },
}

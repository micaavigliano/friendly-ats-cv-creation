import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import type { ResumeData } from '../types/resume';
import type { Translations } from '../i18n/translations';

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const [year, month] = dateString.split('-')
  if (!year || !month) return dateString
  const date = new Date(parseInt(year), parseInt(month) - 1)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

const styles = StyleSheet.create({
  page: {
    paddingVertical: 48,
    paddingHorizontal: 52,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.5,
    color: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerContent: {
    flex: 1,
    textAlign: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
    marginBottom: 3,
  },
  jobTitle: {
    fontSize: 13,
    color: '#333',
    marginBottom: 6,
  },
  contactLine: {
    fontSize: 9,
    color: '#444',
    marginBottom: 2,
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
    paddingBottom: 3,
    marginBottom: 8,
  },
  experienceItem: {
    marginBottom: 10,
  },
  expRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  company: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
  },
  expLocation: {
    fontSize: 9,
    color: '#444',
  },
  role: {
    fontSize: 10,
    color: '#222',
  },
  date: {
    fontSize: 9,
    color: '#444',
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 2,
    paddingLeft: 10,
  },
  bullet: {
    width: 12,
    fontSize: 10,
  },
  bulletContent: {
    flex: 1,
    fontSize: 10,
  },
  skillRow: {
    flexDirection: 'row',
    marginBottom: 2,
    paddingLeft: 10,
  },
  summary: {
    fontSize: 10,
    textAlign: 'justify',
    lineHeight: 1.6,
  },
});

interface ResumePDFProps {
  data: ResumeData;
  pdfTranslations: Translations;
}

const LEVEL_KEYS: Record<string, keyof Translations> = {
  'Basic': 'lang_level_basic',
  'Intermediate': 'lang_level_intermediate',
  'Advanced': 'lang_level_advanced',
  'Fluent': 'lang_level_fluent',
  'Native': 'lang_level_native',
  'Bilingual': 'lang_level_bilingual',
}

export const ResumePDF = ({ data, pdfTranslations }: ResumePDFProps) => {
  const { personalInfo } = data

  const displayLevel = (level: string) => {
    const key = LEVEL_KEYS[level]
    return key ? pdfTranslations[key] : level
  }

  const labeledContact = [
    personalInfo.email    && `${pdfTranslations.personal_label_email} ${personalInfo.email}`,
    personalInfo.phone    && `${pdfTranslations.personal_label_phone} ${personalInfo.phone}`,
    personalInfo.location && `${pdfTranslations.personal_label_location} ${personalInfo.location}`,
    personalInfo.website  && `${pdfTranslations.personal_label_website} ${personalInfo.website}`,
    personalInfo.github   && `${pdfTranslations.personal_label_github} ${personalInfo.github}`,
  ].filter(Boolean) as string[]

  const additionalItems = (personalInfo.additionalLinks ?? [])
    .filter(l => l.information)
    .map(l => l.label ? `${l.label}: ${l.information}` : l.information)

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.name}>{personalInfo.name}</Text>
            {personalInfo.title ? <Text style={styles.jobTitle}>{personalInfo.title}</Text> : null}
            {labeledContact.length > 0 && (
              <Text style={styles.contactLine}>{labeledContact.join('  |  ')}</Text>
            )}
            {additionalItems.length > 0 && (
              <Text style={styles.contactLine}>{additionalItems.join('  |  ')}</Text>
            )}
          </View>
          {personalInfo.profileImage ? (
            <Image style={styles.profileImage} src={personalInfo.profileImage} />
          ) : null}
        </View>

        {data.summary ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{pdfTranslations.pdf_about_me}</Text>
            <Text style={styles.summary}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience.some(e => e.company || e.role) ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{pdfTranslations.pdf_experience}</Text>
            {data.experience.filter(e => e.company || e.role).map(exp => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.expRow}>
                  <Text style={styles.company}>{exp.company}</Text>
                  {exp.location ? <Text style={styles.expLocation}>{exp.location}</Text> : null}
                </View>
                <View style={styles.expRow}>
                  <Text style={styles.role}>{exp.role}</Text>
                  {(exp.startDate || exp.isCurrent) ? (
                    <Text style={styles.date}>
                      {formatDate(exp.startDate)} – {exp.isCurrent ? pdfTranslations.pdf_current : formatDate(exp.endDate)}
                    </Text>
                  ) : null}
                </View>
                {exp.description.filter(d => d).map((desc, i) => (
                  <View key={i} style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletContent}>{desc}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ) : null}

        {data.education.some(e => e.institution || e.degree) ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{pdfTranslations.pdf_education}</Text>
            {data.education.filter(e => e.institution || e.degree).map(edu => (
              <View key={edu.id} style={styles.experienceItem}>
                <View style={styles.expRow}>
                  <Text style={styles.company}>{edu.institution}</Text>
                  {edu.location ? <Text style={styles.expLocation}>{edu.location}</Text> : null}
                </View>
                <View style={styles.expRow}>
                  <Text style={styles.role}>
                    {[edu.degree, edu.field].filter(Boolean).join(', ')}
                  </Text>
                  {(edu.startDate || edu.isCurrent) ? (
                    <Text style={styles.date}>
                      {formatDate(edu.startDate)} – {edu.isCurrent ? pdfTranslations.pdf_current : formatDate(edu.endDate)}
                    </Text>
                  ) : null}
                </View>
                {edu.gpa ? (
                  <Text style={{ ...styles.role, fontSize: 9, color: '#444' }}>GPA: {edu.gpa}</Text>
                ) : null}
                {edu.description.filter(d => d).map((desc, i) => (
                  <View key={i} style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletContent}>{desc}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ) : null}

        {data.skills.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{pdfTranslations.pdf_technical_skills}</Text>
            {data.skills.map(skill => (
              <View key={skill.id} style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletContent}>
                  {skill.name}{skill.skills ? `: ${skill.skills}` : ''}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {data.languages.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{pdfTranslations.pdf_languages}</Text>
            {data.languages.map(lang => (
              <View key={lang.id} style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletContent}>
                  {lang.name}{lang.level ? ` — ${displayLevel(lang.level)}` : ''}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

      </Page>
    </Document>
  )
}

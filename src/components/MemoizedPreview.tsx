import { memo } from "react"
import { PDFViewer } from "@react-pdf/renderer"
import type { ResumeData } from "../types/resume"
import { ResumePDF } from "./ResumePDF"
import type { Translations } from "../i18n/translations"

interface MemoizedPreviewProps {
  data: ResumeData
  pdfTranslations: Translations
}

export const MemoizedPreview = memo(({ data, pdfTranslations }: MemoizedPreviewProps) => (
  <PDFViewer width="100%" height="100%" className="border-none">
    <ResumePDF data={data} pdfTranslations={pdfTranslations} />
  </PDFViewer>
), (prevProps, nextProps) => {
  return prevProps.data === nextProps.data && prevProps.pdfTranslations === nextProps.pdfTranslations
})

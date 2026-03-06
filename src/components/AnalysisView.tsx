import { motion } from 'motion/react';
import { AlertCircle, FileText, List, Type } from 'lucide-react';
import type { ATSAnalysis } from '../services/gemini';
import { ScoreGauge } from './ScoreGauge';
import { AutoHeading } from 'automatic-heading-level';
import { useLanguage } from '../i18n/LanguageContext';

interface AnalysisViewProps {
  analysis: ATSAnalysis;
  onReset: () => void;
  onEdit: () => void;
  id: string;
}

export const AnalysisView = ({ analysis, onReset, onEdit, id }: AnalysisViewProps) => {
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Score Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center justify-center md:col-span-1">
          <ScoreGauge score={analysis.score} />
          <div className={`-mt-5 px-4 py-1 rounded-full text-sm font-medium ${
            analysis.matchStatus === 'High' ? 'bg-green-100 text-green-700' :
            analysis.matchStatus === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {analysis.matchStatus}
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:col-span-2">
          <AutoHeading className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2" id={`${id}-summary-heading`}>
            <FileText className="w-5 h-5 text-indigo-500" />
            {t('analysis_executive_summary')}
          </AutoHeading>
          <p className="text-slate-600 leading-relaxed">
            {analysis.summary}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <AutoHeading className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2" id={`${id}-missing-keywords-heading`}>
            <AlertCircle className="w-5 h-5 text-red-500" />
            {t('analysis_missing_keywords')}
          </AutoHeading>
          {analysis.missingKeywords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {analysis.missingKeywords.map((keyword, idx) => (
                <span key={idx} className="px-3 py-1 bg-red-50 text-red-700 rounded-lg text-sm font-medium border border-red-100">
                  {keyword}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 italic">{t('analysis_no_missing_keywords')}</p>
          )}
        </div>

        {/* Improvements */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <AutoHeading className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2" id={`${id}-suggested-improvements-heading`}>
            <List className="w-5 h-5 text-indigo-500" />
            {t('analysis_suggested_improvements')}
          </AutoHeading>
          <ul className="space-y-3">
            {analysis.improvements.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Formatting Issues */}
      {analysis.formattingIssues.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <AutoHeading className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2" id={`${id}-formatting-issues-heading`}>
            <Type className="w-5 h-5 text-orange-500" />
            {t('analysis_formatting_checks')}
          </AutoHeading>
          <ul className="space-y-2">
            {analysis.formattingIssues.map((issue, idx) => (
              <li key={idx} className="flex items-center gap-2 text-slate-600 text-sm">
                <AlertCircle className="w-4 h-4 text-orange-400" />
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-center gap-4 pt-8">
        <button
          onClick={onEdit}
          className="px-8 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm"
        >
          {t('analysis_edit_rescan_btn')}
        </button>
        <button
          onClick={onReset}
          className="px-8 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
        >
          {t('analysis_scan_new_btn')}
        </button>
      </div>
    </motion.div>
  );
}

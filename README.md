# Accessible CV ATS

An accessible, AI-powered resume scanner and CV builder. Paste your resume and a job description to get an instant ATS match score powered by Gemini, or build a polished PDF resume from scratch.

## Features

### ATS Scanner
- Upload or paste your resume text and a job description
- Get an AI-generated match score (0–10) with a `Low / Medium / High` status
- Receive a detailed breakdown:
  - Executive summary
  - Missing keywords
  - Suggested improvements
  - Formatting issues
- Powered by **Google Gemini 2.5 Pro** via a Netlify serverless function
- Rate-limited to 10 requests per minute per IP (using Netlify Blobs)

### CV Builder
- Build a resume section by section: Personal Info, Professional Summary, Experience, Education, Skills, Languages
- Live preview panel updates as you type
- Export your resume as a PDF with one click

### Accessibility
- Semantic heading hierarchy managed automatically via [automatic-heading-level](https://github.com/micaavigliano/automatic-heading-level)
- Proper ARIA roles and labels throughout (`tabpanel`, `aria-labelledby`, etc.)
- Focus management and focus roving
- Language switcher supporting **English**, **Spanish**, and **Italian**

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| Build tool | Vite |
| AI | Google Gemini 2.5 Pro (`@google/genai`) |
| PDF | `@react-pdf/renderer` |
| PDF parsing | `pdfjs-dist` |
| Charts | Recharts |
| Animations | Motion (Framer Motion) |
| Backend | Netlify Functions + Netlify Blobs |
| Accessibility | `automatic-heading-level` |

## Future improvements

For the sake of times, I deployed with the app with the following tech debt

- Improve SEO
- Improve Accessibility
- Fix minor bugs on the charts
- Pulish prompt

any suggestion is welcomed

## Author

Made by [Micaela Avigliano](https://linkedin.com/in/micaelaavigliano) · [GitHub](https://github.com/micaavigliano)


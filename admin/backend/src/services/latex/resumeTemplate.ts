// The ATS-safe résumé skeleton. Single column, standard fonts, no tables, no
// multi-column layouts, machine-readable section headings — exactly what an
// applicant tracking system parses cleanly (and what the "unrejectable résumé"
// playbook prescribes). The tailoring model is told to keep this preamble
// verbatim and only fill the body, so every generated résumé compiles reliably
// with the same Tectonic pipeline the rest of the app uses.
export const RESUME_PREAMBLE = String.raw`\documentclass[11pt]{article}
\usepackage[margin=0.7in]{geometry}
\usepackage{enumitem}
\usepackage{titlesec}
\usepackage[hidelinks]{hyperref}
\usepackage{parskip}
\pagestyle{empty}
\setlength{\parindent}{0pt}
\titleformat{\section}{\large\bfseries}{}{0em}{}[\titlerule]
\titlespacing{\section}{0pt}{10pt}{4pt}
\setlist[itemize]{leftmargin=1.3em, itemsep=1pt, topsep=2pt, parsep=0pt}
\newcommand{\name}[1]{\begin{center}{\LARGE\bfseries #1}\end{center}}
\newcommand{\contact}[1]{\begin{center}{\small #1}\end{center}\vspace{2pt}}
\begin{document}`;

export const RESUME_DOC_END = String.raw`\end{document}`;

// A worked example handed to the model so it copies the structure/commands
// exactly — name + contact, then single-column sections with bullet lists.
export const RESUME_EXAMPLE = String.raw`\name{Jane Doe}
\contact{jane@example.com $\cdot$ (555) 123-4567 $\cdot$ github.com/janedoe $\cdot$ Toronto, ON}

\section{Summary}
Backend engineer with 3 years building high-throughput Node.js services. Specializes in ...

\section{Skills}
\textbf{Languages:} TypeScript, Python, Go \\
\textbf{Frameworks:} Node.js, Express, React \\
\textbf{Infrastructure:} PostgreSQL, Docker, AWS

\section{Experience}
\textbf{Senior Developer} \hfill Jan 2022 -- Present \\
\textit{Acme Corp, Toronto ON}
\begin{itemize}
  \item Cut API p95 latency 42\% by introducing Redis caching across 12 endpoints.
\end{itemize}

\section{Projects}
\textbf{TaskTonic} \hfill \href{https://example.com}{example.com}
\begin{itemize}
  \item Built a habit tracker used by 400+ users, ...
\end{itemize}

\section{Education}
\textbf{B.Sc. Computer Science} \hfill 2019 -- 2023 \\
\textit{University of Example}`;

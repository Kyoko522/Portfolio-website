// Wraps plain cover-letter text in a minimal LaTeX document so it can be
// compiled to a clean PDF by the same Tectonic pipeline the résumé uses.

// Escape LaTeX special characters in a single pass (the replacements contain
// braces but aren't re-processed, so this is safe and injection-proof).
const SPECIAL = /[\\&%$#_{}~^]/g;
const REPLACEMENTS: Record<string, string> = {
  '\\': '\\textbackslash{}',
  '&': '\\&',
  '%': '\\%',
  $: '\\$',
  '#': '\\#',
  _: '\\_',
  '{': '\\{',
  '}': '\\}',
  '~': '\\textasciitilde{}',
  '^': '\\textasciicircum{}',
};

function escapeLatex(text: string): string {
  return text.replace(SPECIAL, (ch) => REPLACEMENTS[ch]);
}

export function coverLetterToLatex(content: string): string {
  // Blank lines separate paragraphs; single newlines collapse to spaces (prose).
  const paragraphs = content
    .trim()
    .split(/\n{2,}/)
    .map((p) => escapeLatex(p.trim()))
    .filter(Boolean)
    .join('\n\n');

  // Tectonic uses XeTeX, which is UTF-8 native — accents, em dashes, and curly
  // quotes pass through without an inputenc package.
  return `\\documentclass[11pt]{article}
\\usepackage[margin=1in]{geometry}
\\usepackage{parskip}
\\pagestyle{empty}
\\begin{document}
${paragraphs}
\\end{document}
`;
}

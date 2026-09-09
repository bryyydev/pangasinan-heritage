const fs = require('fs');
const path = require('path');

// Simple Markdown to HTML parser tailored for our reports
function markdownToHtml(md) {
  let html = md
    // Headers
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold border-b-2 border-amber-600 pb-2 mb-4 mt-6">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-slate-800 mb-3 mt-8 border-b pb-1">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-amber-700 mb-2 mt-6">$1</h3>')
    .replace(/^#### (.*$)/gim, '<h4 class="text-lg font-semibold text-slate-700 mb-2 mt-4">$1</h4>')
    // Bold & Italics
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Horizontal Rule
    .replace(/^---$/gim, '<hr class="my-6 border-slate-300"/>');

  // Parse tables
  const lines = html.split('\n');
  let inTable = false;
  let tableHtml = '';
  let resultLines = [];

  for (let line of lines) {
    if (line.trim().startsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableHtml = '<div class="overflow-x-auto my-4"><table class="w-full text-left border-collapse border border-slate-300 shadow-sm text-sm">';
      }
      const cells = line.split('|').slice(1, -1).map(c => c.trim());
      if (line.includes('---')) {
        // separator line, skip
        continue;
      }
      if (!tableHtml.includes('<thead>')) {
        tableHtml += '<thead class="bg-slate-100 font-semibold text-slate-800"><tr>';
        cells.forEach(c => tableHtml += `<th class="p-3 border border-slate-300">${c}</th>`);
        tableHtml += '</tr></thead><tbody>';
      } else {
        tableHtml += '<tr class="hover:bg-slate-50">';
        cells.forEach(c => tableHtml += `<td class="p-3 border border-slate-300">${c}</td>`);
        tableHtml += '</tr>';
      }
    } else {
      if (inTable) {
        inTable = false;
        tableHtml += 'tbody></table></div>';
        resultLines.push(tableHtml);
        tableHtml = '';
      }
      resultLines.push(line);
    }
  }
  if (inTable) {
    tableHtml += 'tbody></table></div>';
    resultLines.push(tableHtml);
  }

  html = resultLines.join('\n');

  // Unordered Lists
  html = html.replace(/^\* (.*$)/gim, '<li class="ml-6 list-disc text-slate-700 my-1">$1</li>');
  html = html.replace(/^- (.*$)/gim, '<li class="ml-6 list-disc text-slate-700 my-1">$1</li>');

  // Paragraphs
  html = html.split('\n\n').map(p => {
    if (p.trim().startsWith('<h') || p.trim().startsWith('<div') || p.trim().startsWith('<hr') || p.trim().startsWith('<li') || p.trim().startsWith('<table')) {
      return p;
    }
    return p.trim() ? `<p class="mb-3 text-slate-700 leading-relaxed">${p}</p>` : '';
  }).join('\n');

  return html;
}

const template = (title, content) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @media print {
      body { font-size: 12pt; background: white; color: black; }
      .no-print { display: none; }
      h1, h2 { page-break-after: avoid; }
      table { page-break-inside: avoid; }
    }
  </style>
</head>
<body class="bg-slate-50 text-slate-900 font-sans p-6 md:p-12 max-w-4xl mx-auto min-h-screen">
  <header class="no-print mb-8 p-4 bg-amber-500 text-white rounded-lg shadow flex justify-between items-center">
    <div>
      <h1 class="text-xl font-bold">${title}</h1>
      <p class="text-xs opacity-90">Ready for PDF Export (Press Ctrl+P and select Save as PDF)</p>
    </div>
    <button onclick="window.print()" class="px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded hover:bg-slate-800 transition">
      🖨️ Save / Print as PDF
    </button>
  </header>
  
  <main class="bg-white p-8 md:p-12 rounded-xl shadow-md border border-slate-200">
    ${content}
  </main>
</body>
</html>`;

const docDir = __dirname;
const reportMd = fs.readFileSync(path.join(docDir, 'Framework-Selection-Report.md'), 'utf-8');
const manualMd = fs.readFileSync(path.join(docDir, 'Atomic-Design-System-Manual.md'), 'utf-8');

fs.writeFileSync(path.join(docDir, 'Framework-Selection-Report.html'), template('Deliverable 1.1: Framework Selection Report', markdownToHtml(reportMd)));
fs.writeFileSync(path.join(docDir, 'Atomic-Design-System-Manual.html'), template('Deliverable 1.2: Atomic Design System Manual', markdownToHtml(manualMd)));

console.log('Successfully generated printable HTML reports!');

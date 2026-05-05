const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
}

const targetDir = path.join(__dirname, 'src');
const files = walk(targetDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Backgrounds: brand-black to pink-50/white
  content = content.replace(/bg-brand-black-soft/g, 'bg-pink-50/50');
  content = content.replace(/bg-brand-black-card/g, 'bg-white');
  content = content.replace(/bg-brand-black/g, 'bg-pink-50');
  content = content.replace(/bg-\[#0a0a0a\]/ig, 'bg-pink-50');
  content = content.replace(/bg-\[#141414\]/ig, 'bg-white');
  content = content.replace(/bg-\[#1A1A1A\]/ig, 'bg-white');
  content = content.replace(/bg-\[#111\]/ig, 'bg-white');
  content = content.replace(/bg-\[#000\]/ig, 'bg-white');
  content = content.replace(/bg-\[#111111\]/ig, 'bg-white');
  content = content.replace(/bg-\[#000000\]/ig, 'bg-white');

  content = content.replace(/bg-black\/[0-9]+/g, 'bg-white/80');
  content = content.replace(/bg-black/g, 'bg-white');
  content = content.replace(/bg-zinc-900/g, 'bg-white');
  content = content.replace(/bg-zinc-800/g, 'bg-pink-50');
  content = content.replace(/bg-gray-900/g, 'bg-white');
  content = content.replace(/bg-gray-800/g, 'bg-pink-50');

  // Cream text (which used to be on dark backgrounds) -> dark text
  content = content.replace(/text-brand-cream\/[0-9]+/g, 'text-brand-purple-dark/80');
  content = content.replace(/text-brand-cream/g, 'text-brand-purple-dark');

  // Text colors: dark gray/black to brand-purple-dark
  content = content.replace(/text-brand-black/g, 'text-brand-purple-dark');
  content = content.replace(/text-gray-900/g, 'text-brand-purple-dark');
  content = content.replace(/text-gray-800/g, 'text-brand-purple-dark/90');
  content = content.replace(/text-gray-700/g, 'text-brand-purple-dark/80');

  // Border colors
  content = content.replace(/border-brand-black/g, 'border-pink-200');
  content = content.replace(/border-white\/5/g, 'border-pink-200/50');
  content = content.replace(/border-white\/8/g, 'border-pink-200/50');
  content = content.replace(/border-white\/10/g, 'border-pink-200');
  content = content.replace(/border-white\/15/g, 'border-pink-200');
  content = content.replace(/border-white\/20/g, 'border-pink-300');
  content = content.replace(/border-white\/30/g, 'border-pink-300');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${file}`);
  }
});
console.log('Mass replacement complete!');

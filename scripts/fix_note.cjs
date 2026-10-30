const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'app.js');
let c = fs.readFileSync(appPath, 'utf8');

const regex = /[ \t]*try\s*\{\s*const note = document\.querySelector\('\.shop-meta-note'\);[\s\S]*?\}\s*catch\s*\(e\)\s*\{\}/;

if (!regex.test(c)) {
    console.error('Regex did not match!');
    process.exit(1);
}

c = c.replace(regex, '        // Metadados administrativos (versão, autor e data) ficam restritos ao painel admin (gestao-precos.html).\n        // A vitrine pública mantém estático o selo institucional: "Preços da tabela oficial • Distribuição Direta".');

fs.writeFileSync(appPath, c, 'utf8');
console.log('Successfully updated app.js!');

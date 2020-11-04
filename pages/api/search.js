import fs from 'fs';
import path from 'path';
import getConfig from 'next/config';
import lunr from 'lunr';
const { serverRuntimeConfig } = getConfig();

export default function handler(req, res) {
    const companies = JSON.parse(fs.readFileSync(path.join(serverRuntimeConfig.PROJECT_ROOT, './pages/_data/companies.json')));
    const index = fs.readFileSync(path.join(serverRuntimeConfig.PROJECT_ROOT, './pages/_data/search.json'));
    const idx = lunr.Index.load(JSON.parse(index));
    const searchResults = idx.search(req.query.q);

    let found = [];
    searchResults.forEach(r => {
        const c = companies.filter(c => c.id === r.ref)[0];
        found.push(c);
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        companies: found
    }));
}
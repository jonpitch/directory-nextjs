import fs from 'fs';
import path from 'path';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

export default function handler(_, res) {
    const companies = fs.readFileSync(path.join(serverRuntimeConfig.PROJECT_ROOT, './pages/_data/companies.json'));
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(companies);
}
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## export

in order to generate static site:
- `npm run dev`
- in new tab: `npm run build`
- there seems to be an upstream [bug](https://github.com/vercel/next.js/issues/15874) with running `npm run export`
    - to work around:
    - update `.next/server/pages-manifest.json` with:
    ```json
    {
        "/_app": "pages/_app.js",
        "/_error": "pages/_error.js",
        "/_document": "pages/_document.js",
        "/next/dist/pages/_error": "pages/next/dist/pages/_error.js",
        "/": "pages/index.js",
        "/api/companies": "pages/api/companies.js",
        "/company/[slug]": "pages/company/[slug].js"
    }
    ```
- then run `npm run export`
- full static site located in `/out`
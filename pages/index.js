import Head from 'next/head'
import Link from 'next/link'

export async function getStaticProps(context) {
  const data = await fetch('http://localhost:3000/api/companies');
  const companies = await data.json();
  const subset = companies.slice(0, 20)

  return {
    props: {
      companies: subset
    }
  }
}

export default function Home({ companies }) {
  return (
    <div>
      <Head>
        <title>Directory - NextJS</title>
      </Head>
      <ul>
        {companies && companies.map((company) => (
          <li key={company.id}>
            <Link href={`/company/${encodeURIComponent(company.slug)}`}>
              <a>{company.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

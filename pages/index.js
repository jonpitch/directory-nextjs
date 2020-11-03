import Head from 'next/head'
import Link from 'next/link'
// import styles from '../styles/Index.module.css'

export async function getStaticProps(context) {
  const data = await fetch('http://localhost:3000/api/companies');
  const companies = await data.json();

  // for iteration speed
  const subset = companies.slice(0, 20)

  return {
    props: {
      companies: subset
    }
  }
}

export async function getStaticPaths() {
  const data = await fetch('http://localhost:3000/api/companies');
  const companies = await data.json();
  const paths = companies.map((c) => {
    return { params: { slug: c.slug }};
  });

  return {
    paths,
    fallback: false
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
          <li>
            <Link href={`/company/${encodeURIComponent(company.slug)}`}>
              <a>{company.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

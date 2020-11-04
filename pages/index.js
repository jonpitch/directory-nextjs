import Head from 'next/head'
import Link from 'next/link'
import { useCallback, useRef, useState } from 'react';

// to static render the page, /api/search would not work
export async function getStaticProps() {
  const data = await fetch('http://localhost:3000/api/companies');
  const companies = await data.json();
  const subset = companies.slice(0, 20)

  return {
    props: {
      companies: subset
    }
  }
}

// to server render the page, /api/search works
// export async function getServerSideProps() {
//   const data = await fetch('http://localhost:3000/api/companies');
//   const companies = await data.json();
//   const subset = companies.slice(0, 20)

//   return {
//     props: {
//       companies: subset
//     }
//   }
// }

export default function Home({ companies }) {
  const searchRef = useRef(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const searchEndpoint = (query) => `/api/search?q=${query}`;

  const onChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query);
    if (query.length) {
      fetch(searchEndpoint(query))
        .then(res => res.json())
        .then(res => {
          setResults(res.companies);
        });
    } else {
      setResults([]);
    }
  }, []);

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      window.removeEventListener('click', onClick);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Directory - NextJS</title>
      </Head>
      <input
        onChange={onChange}
        placeholder='search companies'
        type='text'
        value={query}
      />
      { results.length > 0 && (
        <ul>
          {results.map(({ id, slug, name }) => (
            <li key={id}>
              <Link href={`/company/${encodeURIComponent(slug)}`}>
                <a>{name}</a>
              </Link>
            </li>
          ))}
        </ul>
      ) }

      <p>first 20 companies:</p>
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

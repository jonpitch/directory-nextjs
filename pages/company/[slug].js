export async function getStaticProps({ params }) {
    const data = await fetch('http://localhost:3000/api/companies');
    const companies = await data.json();
    const company = companies.filter((c) => {
        return c.slug === params.slug;
    });
  
    return {
      props: {
        company: company[0]
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

export default function Company({ company }) {
    return (
        <div>
            <p>{company && company.name} is certified</p>
        </div>
    )
}
  

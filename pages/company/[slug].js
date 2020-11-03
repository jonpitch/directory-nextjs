import { useRouter } from 'next/router';

const Company = () => {
    const router = useRouter();
    const { slug } = router.query;

    return <p>slug: {slug}</p>
}

export default Company;

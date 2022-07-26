import Head from 'next/head'
import styles from '../styles/Home.module.css'

export interface IRating {
  rate: number,
  count: number
}
export interface IProduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: IRating
}

export async function getStaticProps() {
  const resp = await fetch('https://fakestoreapi.com/products?limit=10')
  const products: IProduct[] = await resp.json()

  return {
    props: {
      products
    },
    revalidate: 30,
  }
}

export interface INextPageProps {
  products: IProduct[]
}

const Home = ({ products }: INextPageProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>e-Hardware</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to e-Hardware Page!
        </h1>

        <p className={styles.description}>
          List of 10 products
        </p>

        <div className={styles.grid}>
          {products && products.map(({id, title, description, image}: IProduct) => {
            return (
              <a key={id} href={`/products/${id}`} className={styles.card}>
                <picture>
                  <source srcSet={image} type='image/webp' />
                  <img src={image} alt={description} width="50px" />
                </picture>
                <h2>{title}&rarr;</h2>
                <p>{description.length > 20 ? description.substring(0,20) + '...' : description}</p>
              </a>
            )
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}

export default Home

import useSWR from 'swr'
import { IProduct } from ".."

export async function getStaticPaths() {
  const resp = await fetch('https://fakestoreapi.com/products?limit=10&sort=desc')
  const products: IProduct[] = await resp.json()

  const paths = products.map(p => {
    return {
      params: {
        id: String(p.id)
      }
    }
  })

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }: any) {
  const resp = await fetch(`https://fakestoreapi.com/products/${params.id}`)
  const product: IProduct = await resp.json()

  return {
    props: {
      product
    }
  }
}

export interface IProductPageProps {
  product: IProduct
}

const ProductPage = ({ product }: IProductPageProps) => {
  const { data } = useSWR("product", async () => {
    const resp = await fetch(`https://fakestoreapi.com/products/${product.id}`)
    return resp.json()
  }, {
    fallbackData: product
  })
  
  if (!product) {
    return <div>Loading...</div>
  }

  const { id, title, description } = product

  return (
    <>
      <div>Product: {id}</div>
      <div>Title: {title}</div>
      <div>Description: {description}</div>
      <div>Price: </div>
    </>
  )
}

export default ProductPage
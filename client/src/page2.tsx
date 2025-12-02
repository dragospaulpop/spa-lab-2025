import { useEffect, useState } from "react"

interface Product {
  id: number
  name: string
  price: number
  description: string
}

export default function Page2() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:3000/page2')
      .then(response => response.json())
      .then(data => setProducts(data))
      .finally(() => setLoading(false))
  }, [])
  return <div>{loading ? <p>Loading...</p> : <ul>
    {products.map(product => (
      <li key={product.id}>{product.name} - {product.price} - {product.description}</li>
    ))}
  </ul>}
  </div>
}
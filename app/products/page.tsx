import { PrismaClient } from "@prisma/client"
import AddProduct from "./addProduct"
import DeleteProduct from "./deleteProduct"
import UpdateProduct from "./updateProduct"
const prisma = new PrismaClient()

const getProducts = async () => {
  try {
    const res = await prisma.product.findMany({
      select: {id: true, title: true, price: true, brand: true, brandId: true}
    })
    return res
  }finally{
    await prisma.$disconnect();
  }
}

const getBrands = async () => {
  try {
    const res = await prisma.brand.findMany()
    return res
  }finally{
    await prisma.$disconnect();
  }
}

const Product = async () => {
  const [products, brands] = await Promise.all([
    getProducts(), 
    getBrands()
  ])
  return (
    <div>
      <div className="mb-2">
        <AddProduct brands={brands} />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Brand</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.brand?.name}</td>
              <td className="flex gap-3">
                <UpdateProduct brands={brands} product={product} />
                <DeleteProduct product={product} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Product
import { db } from "../_lib/prisma";
import ProductImage from "./[id]/_components/product-image";
import ProductDetails from "./[id]/_components/product-details";

interface ProductsPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductsPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return <div>Product not found</div>;
    {
      /* Criar aqui a Pagina 404 com Lottie que eu ja tenho pronta!!! */
    }
  }

  return (
    <div>
      <ProductImage product={product} />
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductPage;

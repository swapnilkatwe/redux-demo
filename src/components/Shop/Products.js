import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    title: "First product",
    description: "This is my first product",
    price: 200,
  },
  {
    id: "p2",
    title: "Second product",
    description: "This is my second product",
    price: 200,
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(product => 
        <ProductItem
          key = {product.id}
          id = {product.id}
          title={product.title}
          price={product.price}
          description={product.description}
        />)}
      </ul>
    </section>
  );
};

export default Products;

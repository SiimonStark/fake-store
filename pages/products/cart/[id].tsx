import React, { useState, useEffect } from "react";
import classes from './cart.module.css';
import ProductTile from "components/ProductTile";
import Catalog from "@/components/Catalog/Catalog";


interface CartProps {
  name: string;
  products: any[];
}

function Cart(props: CartProps): any {
  const { name, products } = props;
  const [userCart, setUserCart] = useState([]);

  useEffect(() => {
    const getCartData = async () => {
      const userCart = await fetch(`https://fakestoreapi.com/carts/user/${1}`)
        .then(res => res.json())
        .then(data => {
          console.log({ data })
          return data[0].products;
        });

      console.log({ userCart })
    }
  }, [])

  return (
    <div className={classes.root}>
      <Catalog name={"Cart"} products={products} />
    </div>
  )
}

export default Cart;

export async function getServerSideProps(context) {
  const { query } = context;
  const { id } = query;

  const userCart = await fetch(`https://fakestoreapi.com/carts/user/${1}`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      return data[0].products;
    });
  console.log(userCart);
  // const products = await 
  const products = [];

  return {
    props: {
      name: id,
      products
    }
  }
}
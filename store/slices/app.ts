import { createSlice } from '@reduxjs/toolkit'
import { rejects } from 'assert';
import { resolve } from 'path';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    categories: [],
    loggedIn: false,
    user: null,
    users: [],
    cart: []
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    }
  },
})

export const { setCategories, setLoggedIn, setUser, setUsers, setCart } = appSlice.actions;

export const login = async (username, password) => {
  console.log(username, password);
  // fetch signin and save JWT response
  // CORS error when trying to fetch, 
  // but not when I use Insomnia or other API checkers
  // fetch('https://fakestoreapi.com/auth/login', {
  //   method: 'POST',
  //   body: JSON.stringify({ username, password })
  // })
  //   .then(res => res.json())
  //   .then(data => console.log(data));
  const users = await fetch('https://fakestoreapi.com/users')
    .then(res => res.json())
    .then(data => data);
  console.log(users);

  const user = users.find(user => user.username === username && user.password === password);
  console.log({ user });

  const cart = await fetch('https://fakestoreapi.com/carts/user/2')
    .then(res => res.json())
    .then(data => data[0])
  console.log({ cart });

  const getProductDetail = (product, url) => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(data => resolve({ ...data, quantity: product.quantity }));
    });
  }

  let productRequests = [];

  cart.products.forEach((p, i) => {
    productRequests.push(
      getProductDetail(p, 'https://fakestoreapi.com/products/' + p.productId));
  });

  let productDetails = await Promise.all(productRequests)
    .then((allProductData) => allProductData);

  console.log({ productDetails });



  async (dispatch) => {
    console.log({ username, password });
    // TODO: implement a mock login flow by storing a token from 'https://fakestoreapi.com/auth/login'
    // Get all users, then verify which one has corresponding credentials
    // Then fetch their cart based on their id

  };
}

export const getAndSetCategories = () => (dispatch) => {
  fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json())
    .then(data => dispatch(setCategories(data)))
}

export const selectCategories = (state) => state.app.categories
export const selectLoginState = (state) => state.app.loggedIn;
export const selectUser = (state) => state.app.user;

export default appSlice.reducer

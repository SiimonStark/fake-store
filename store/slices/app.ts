import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    categories: [],
    loggedIn: true,
    user: null
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
    }
  },
})

export const { setCategories, setLoggedIn } = appSlice.actions;

export const login = (username, password) => {
  console.log(username, password);
  // fetch signin and save JWT response
  // debugger;
  fetch('https://fakestoreapi.com/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username: 'johnd', password: 'm38rmF$' })
  })
    .then(res => res.json())
    .then(data => console.log(data));

  (dispatch) => {
    console.log({ username, password });
    // TODO: implement a mock login flow by storing a token from 'https://fakestoreapi.com/auth/login'
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

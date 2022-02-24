import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    // we initially need the product (pizza) and the total
    products: [],
    total: 0,
    quantity: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      // here we update the intial state
      state.products.push(action.payload);
      // we are pushing the product (pizza) to the empty array
      state.quantity += 1;
      // we add to the quantity state
      state.total += action.payload.price * action.payload.quantity;
      // originally our total is 0, the we add the price of the
      // product, multiplied by how many we ordered. this will
      // be our new total
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
      // we now set the state back to the initialState,
      // which is an empty products array and total of 0
    },
  },
});

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;

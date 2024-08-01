import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
    name : 'data',
    initialState : {
        products : [],
        cartProducts : [],
    },
    reducers : {
        addToList : (state, action) =>{
            state.products.push(...action.payload);            
        },     
        addToCart : (state, action) =>{
            state.cartProducts.push(action.payload);            
        },
        removeFromCart: (state, action) => {
            state.cartProducts = state.cartProducts.filter(item => item.id !== action.payload);
        },  
        increase :(state, action) =>{    
            const {pid, cont} = action.payload;
            const index = state.cartProducts.findIndex(item => item.id === pid);                                
            const product = state.cartProducts[index];
            product.count = cont + 1;
            state.cartProducts.splice(index, 1, product);
        },
        decrease :(state, action) =>{    
            const {pid, cont} = action.payload;
            const index = state.cartProducts.findIndex(item => item.id === pid);                                
            const product = state.cartProducts[index];
            product.count = cont - 1;
            state.cartProducts.splice(index, 1, product);
        }                 
    }
})

export const {addToList, addToCart, removeFromCart, increase, decrease} = dataSlice.actions;
export default dataSlice.reducer;
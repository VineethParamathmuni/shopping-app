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
            const product = [action.payload]
            const productWithCount = product.map(product => ({...product, count : 1}))
            state.cartProducts.push(...productWithCount);            
        },
        removeFromCart: (state, action) => {
           if(window.confirm('Are you sure you want to remove the item from your cart?')){
                state.cartProducts = state.cartProducts.filter(item => item.id !== action.payload);
            }            
        },  
        increase :(state, action) =>{                            
            const index = state.cartProducts.findIndex(item => item.id === action.payload);                                
            const product = state.cartProducts[index];
            product.count += 1;
            state.cartProducts.splice(index, 1, product);
        },
        decrease :(state, action) =>{                
            const index = state.cartProducts.findIndex(item => item.id === action.payload);                                
            const product = state.cartProducts[index];
            product.count -= 1;
            state.cartProducts.splice(index, 1, product);
        },
        emptyCart : (state) =>{
           if(window.confirm('Are you sure you want to empty the cart?')){
             state.cartProducts = []
           }
        }
    }
})

export const {addToList, addToCart, removeFromCart, increase, decrease, emptyCart} = dataSlice.actions;
export default dataSlice.reducer;
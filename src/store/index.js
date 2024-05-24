import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import layoutReducer from "./slices/layout"



const reducer = {
    auth: authReducer,
    layout: layoutReducer,
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
})

export default store;
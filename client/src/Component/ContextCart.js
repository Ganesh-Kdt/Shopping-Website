import React, {  useEffect,useReducer,createContext, useState } from "react"
import {BrowserRouter,Route} from "react-router-dom"
import axios from "axios"
import datai from "../Data/datai"
import App2 from "./App2"
import App from "../Test/testApp"
import Cart from "./Cart"
import products from "../Data/datap"
import Home from "./actualHome"
import appledatap from "../Data/AppleDatap"
import Fp from "../Data/FeaturedProducts"
import fpdata from "../Data/FeaturedProducts"
export const ContextCart=createContext()
const istate={
    items:[],
    totalQuantity:0,
    totalPrice:0
}
export const reducer=(state,action)=>
{
    
    if(action.type==="increment")
    {
        const updatedState=state.items.map((item)=>
        {
            if(item.id===action.payload)
            {
                return{
                    ...item,
                    quantity:item.quantity+1
                }
                
            }
            return{...item}
        })
        return {
            ...state,
            items:updatedState
        }  
    }   
    if(action.type==="decrement")
    {
        const updatedState=state.items.map((item)=>
        {
            if(item.quantity<=0)
            return {...item}
            if(item.id===action.payload)
            {
                return{
                    ...item,
                    quantity:item.quantity-1
                }
            }
            return{...item}
        })
        return{
            ...state,
            items:updatedState
        }
    }
    if(action.type==="remove-item")
    {
        const updatedState=state.items.filter((item)=>
        {
            if(item.id!==action.payload)
            return {...item}

        })
        return{
            ...state,
            items:updatedState
        }
    } 
    if(action.type==="add-item")
    {
        const flag=state.items.some((item)=>
        {
            if(item.id===action.payload.id)
            return true
        })
        if(flag===false)
        {
        return{
            ...state,
            items:[
                ...state.items,
                action.payload
            ]
        }
        }
        else
        return state  //Since this state is same as the previous state,it won't run the useReducer hook again and thus no rendering will happen again.It is like useState hook  where rendering happens only on state and props change.
    }
    if(action.type==="total-price")
    {
        const totalprice=state.items.reduce((accumulator,item)=>
        {
            return accumulator+(item.price*item.quantity)
        },0)
        return{
            ...state,
            totalPrice:totalprice
        }
    }
    if(action.type==="total-quantity")
    {
        const totalquantity=state.items.length
        return{
            ...state,
            totalQuantity:totalquantity
        }
    }
}
function CartState(props)
{
    const [state,dispatch]=useReducer(reducer,istate)
    const [state2,setState2]=useState({fp:null,data:null,appleData:null})
    useEffect(()=>
    {
        async function getData()
        {
            
            const result1=await axios.get("/products")
            const result2=await axios.get("/AppleData")
            const result3=await axios.get("/FeaturedProducts")
            const arr1=result1.data
            const arr2=result2.data
            const arr3=result3.data
            arr3.map((item)=>
            {
                fpdata.some((data)=>
                {
                    if(item.id===data.id)
                    {
                        item.img=data.img
                    }
                })  
            })
            arr2.map((item)=>
            {
                appledatap.some((data)=>
                {
                    if(data.id===item.id)
                    item.img=data.img
                })
            })
            arr1.map((item)=>
            {
                datai.some((data)=>
                {
                    if(data.id===item.id)
                    {
                        item.img=data.img;
                    }
                })
            })
            setState2(()=>
            {
                return{
                    appleData:arr2,
                    data:arr1,
                    fp:arr3
                }
            })
        }
        getData()
    },[])
    
    return(
        <>
        <ContextCart.Provider value={{arr:state.items,quantity:state.totalQuantity,price:state.totalPrice,callreducer:dispatch}}>
             {/*console.log("parentprovider")*/} {/* To check if this also runs when we keep changing the path without updating anything*/}
            <BrowserRouter>      
                <Route exact path="/" render={(props)=><Home {...props} fpdata={state2.fp} appledata={state2.appleData}/>}/>           {/*Only the BrowserRouter runs when we keep changing the path without changing any state */}
                <Route exact path="/app/:name" render={(props)=> <App {...props} products={state2.data}/>}/>
                <Route exact path="/cart" component={Cart}/>
            </BrowserRouter>
        </ContextCart.Provider>
        </>
    )
}
export default CartState
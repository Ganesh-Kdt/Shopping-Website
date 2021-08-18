import react, { useContext, useEffect, useState } from "react"
import {ContextCart} from "./ContextCart"
import "./Cart.css"
import NavBar from "../Test/NavBar"
import Footer from "../Test/Footer"
import { faToggleOff } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
function Cart()
{
    const [codes,setCodes]=useState({code1:null,code2:null})
    const obj=useContext(ContextCart)
    const [state,setState]=useState({input:"",redeem:0,cp:0})
    function Redeem()
    {
           
            if(state.input===codes.code1)        
            {
                if(obj.price+parseInt(obj.price/10)>50)
                {
                setState((prevState)=>
                {
                return{
                    redeem:prevState.input,
                    input:"",
                    cp:50
                }
                })
                }
            }
            if(state.input===codes.code2)
            {
                if(obj.price+parseInt(obj.price/10)>40)
                {
                setState((prevState)=>
                {
                    return{
                        redeem:prevState.input,
                        input:"",
                        cp:40
                    }
                })
                }
            }
        }
    function Toggle(e)
    {
        var a=e.target.value
        setState((prevState)=>
        {
            return{
                ...prevState,
                input:a,
            }
        })
    }
    useEffect(()=>
    {
        console.log("useEffect2")
        obj.callreducer({type:"total-price"})
    },[obj.arr])
    useEffect(()=>
    {
        console.log("useEffect1")
        async function getData()
        {
            const result=await axios.get("/code")
            const a=result.data
            console.log(a)
            setCodes(()=>
            {
                return{
                    code1:a[0].name,
                    code2:a[1].name
                }
            })
        }
        getData()
    },[])
    return(
        <>
        {codes.code1?
        <div className="cart">
        <NavBar></NavBar>
        <div className="disappear" style={{backgroundColor:"rgb(240, 235, 235)",fontFamily:"'Open Sans', sans-serif",fontSize:"1.5rem",fontWeight:"bolder",textAlign:"center",margin:"10px"}}>Cart</div>
        {(obj.arr.length===0)?<div style={{fontFamily:"'Open Sans', sans-serif",fontSize:"2rem",fontWeight:"bolder",textAlign:"center"}}>Cart is Empty</div>:
        <>
        <div className="disappear cart-label"> 
        <div className="product">PRODUCT</div>
        <div className="outer-container">
        <div className="product-name"></div>
        <div className="inner-container">
        <div className="">PRICE</div>
        <div className="">QTY</div>
        </div>
        
        <div className="unit_price">UNIT PRICE</div>
        </div>
        </div>
        <div className="cart-container">
            {
                obj.arr.map((item)=>
                {
                    
                    return(
                        <div className="cart-product" key={item.id}>
                            <div className="product">
                                <button className="remove-button" onClick={()=>obj.callreducer({type:"remove-item",payload:item.id})} style={{display:"inline",border:0,cursor:"pointer",borderRadius:"50%",textAlign:"left",color:" #FF7F7F"}}>x</button>
                                <div className="image-div">
                                <img style={{display:"block",width:"100px",height:"110px"}} src={item.img}/>
                                </div>
                            </div>
                            <div className="outer-container">
                            <div className="product-name">
                                <div style={{width:"100%",wordWrap:"break-word",textAlign:"center"}}>{item.name}</div>
                            </div>
                            <div className="inner-container">
                            <div className="price ">
                                <div>${item.quantity*item.price}</div>
                            </div>
                            
                            <div className="qty">
                                <div className="qty-inside">
                                <button onClick={()=>obj.callreducer({type:"increment",payload:item.id})}>+</button>
                                <div style={{margin:"10px",display:"inline-block"}}>{item.quantity}</div>
                                <button onClick={()=>obj.callreducer({type:"decrement",payload:item.id})}>-</button>  
                                </div>
                            </div>
                            </div>
                            <div className="unit_price disappear">${item.price}</div> 

                            </div> 
                        </div>
                    ) 
                }
                )
            }
        </div>
        </>
        }
        <div className="footer">
            <div className="code-redeem">
                <div className="code" id="input">
                    <input spellCheck="false" className="input-code" value={state.input} onChange={(e)=>Toggle(e)} placeholder="Voucher Code"/>
                </div>
                <div className="redeem" onClick={Redeem}>Redeem</div>
            </div>
            <div className="total-price">
                <div className="sub-total">
                    <div>Subtotal</div>
                    <div>${obj.price}</div>
                </div>
                <div className="sub-total">
                    <div>Shipping fee</div>
                    <div>${parseInt(obj.price/10)}</div>
                </div>
                <div className="sub-total">
                    <div>Coupon</div>
                    <div>
                        {
                            state.redeem!==0 && obj.price+parseInt(obj.price/10)>state.cp?<span>{state.cp}</span>:<span>No</span>
                        }
                    </div>
                </div>
                <div className="sub-total" id="hr"></div>
                <div className="sub-total" id="final-total">
                    <div>TOTAL</div>
                    <div>${obj.price+parseInt(obj.price/10)>state.cp?<span>{obj.price+parseInt(obj.price/10)-state.cp}</span>:<span>{obj.price+parseInt(obj.price/10)}</span>}</div>
                </div>
                <div className="checkout">
                    Check out
                </div>
            </div>
        </div>
        <Footer></Footer>
        </div>
        :console.log("cart-stop")
                    }
        </>
    )
}
export default Cart

import React, { useContext, useEffect } from "react" 
import "./NavBar.css"
import { ContextCart } from "../Component/ContextCart"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faArrowDown, faArrowsAlt, faBars, faCaretSquareDown, faCartArrowDown, faHeart, faSearch, faShoppingBag, faShoppingCart, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
function NavBar()
{
    const obj=useContext(ContextCart)
    function fna()
    {
    var a=document.getElementsByClassName("main-container-nav")
    a[0].classList.toggle("toggle-nav")
    a[0].children[1].children[1].classList.remove("toggleStore-nav")
    }
    function fnb()
    {
        var b=document.getElementsByClassName("sub-container-nav")
        b[0].classList.toggle("toggleStore-nav")
        for(var i=0;i<=b[0].children.length-1;i++)
        {
            if(b[0].children[i].children[1].classList.contains("toggleSubTopics-nav"))
            b[0].children[i].children[1].classList.remove("toggleSubTopics-nav")
        }
    }
    function fnc(e)
    {
        const id=e.target
        id.nextElementSibling.classList.toggle("toggleSubTopics-nav")
    }
    useEffect(()=>
    {
        obj.callreducer({type:"total-quantity"})
        obj.callreducer(({type:"total-price"}))
        console.log("navbar")
    },[obj.arr])
    return(
        <>
        {console.log("navbar-render")}
        <div className="cart-nav">
            <div className="cart-left-nav">
                <div>
                    <span>EN</span>
                    <FontAwesomeIcon icon={faCaretSquareDown}></FontAwesomeIcon>
                </div>
                <div>
                <span>$</span>
                    <FontAwesomeIcon icon={faCaretSquareDown}></FontAwesomeIcon>
                </div>
            </div>
            <div className="cart-right-nav">
                <div>
                    <FontAwesomeIcon icon={faUserAlt}></FontAwesomeIcon>
                    <span>My Profile</span>
                </div>
                <div>
                    <NavLink to="/cart"><FontAwesomeIcon icon={faCartArrowDown}></FontAwesomeIcon></NavLink>
                    <span> {obj.quantity} Items </span>
                    <span> ${obj.price} </span>
                </div>
                <div>
                    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                </div>
            </div>
        </div>
        <div className="line-nav"></div>
        <div className="iShop-nav">iSHOP</div>
        <div className="bar-nav" ><i onClick={fna} className="fa fa-bars iconBars-nav" aria-hidden="true"></i></div>
        <div className="main-container-nav">
            <div className="topics-nav"><NavLink to="/">HOME</NavLink></div>
            <div className="topics-nav hover-nav">
                <div className="store-nav" onClick={fnb}>STORE</div>
                <div className="sub-container-nav">
                    <div className="inner-container-nav">
                        <div  className="inner-topics-nav" onClick={(e)=>fnc(e)}>Accessories</div>
                        <div className="sub-topics-nav">
                            <div className="name-nav"><NavLink to="/app/AirPods & Wireless">AirPods & Wireless</NavLink></div>
                            <div className="name-nav"><NavLink to="/app/Apple Care">Apple Care</NavLink></div>
                            <div className="name-nav"><NavLink to="/app/Bags,Shells & Sleeves">Bags,Shells & Sleeves</NavLink></div>
                            <div className="name-nav"><NavLink to="/app/Business & Security">Business & Security</NavLink></div>
                            <div className="name-nav"><NavLink to="/app/Cables & Docks">Cables & Docks</NavLink></div>
                            <div className="name-nav"><NavLink to="/app/Cameras & Video">Cameras & Video</NavLink></div>
                            <div className="name-nav"><NavLink to="/app/Car & Travel">Car & Travel</NavLink></div>
                            <div className="name-nav"><NavLink to="/app/Cases & Films">Cases & Films</NavLink></div>
                        </div>
                    </div>
                    <div className="inner-container-nav">
                        <div  className="inner-topics-nav" onClick={(e)=>fnc(e)}>Category</div>
                        <div className="sub-topics-nav">
                            <div className="name-nav"><NavLink to="/app/Charging Devices">Charging Devices</NavLink></div>
                            <div className="name-nav"><NavLink to="/app/Connected Home">Connected Home</NavLink></div>
                            <div className="name-nav"><NavLink to="/app/Device Care">Device Care</NavLink></div>
                            <div className="name-nav"><NavLink to="/app/Display & Graphic">Display & Graphic</NavLink></div>
                            <div className="name-nav"><NavLink to="/app/Fitness & Sport">Fitness & Sport</NavLink></div>
                            <div className="name-nav"><NavLink to="/app/Headphones">Headphones</NavLink></div>
                        </div>
                    </div>
                    <div className="inner-container-nav">
                        <div  className="inner-topics-nav" onClick={(e)=>fnc(e)}>Category</div>
                        <div className="sub-topics-nav">
                            <div className="name-nav"><NavLink to="/app/Networking & Server">Networking & Server</NavLink></div>
                            <div className="name-nav"><NavLink to="/app/Keyboards">Keyboards</NavLink></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="topics-nav"><NavLink to="/app/AirPods & Wireless">IPHONE</NavLink></div>
            <div className="topics-nav"><NavLink to="/app/Apple Care">IPAD</NavLink></div>
            <div className="topics-nav"><NavLink to="/app/AirPods & Wireless">MACBOOK</NavLink></div>
            <div className="topics-nav"><NavLink to="/app/Keyboards">ACCESSORIES</NavLink></div>
        </div>
        </>
    )
}
export default NavBar
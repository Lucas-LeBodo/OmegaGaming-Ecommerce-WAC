// Import Libs 
import React, { Fragment } from "react";
import {RiVipCrownLine, RiMoneyDollarBoxLine} from "react-icons/ri"
import {Link} from 'react-router-dom';



function Navbox() {
return (
    <Fragment>
        <div className={'navbox'}>
            <p>
                <span className={"best"}><Link to={'/best-seller'} ><RiVipCrownLine/> Best Sellers</Link></span>
                <span className={"promo"}><Link to={'/discount'} ><RiMoneyDollarBoxLine/> Promo</Link></span>
                <Link to={'/'} >Gaming</Link>
                <Link to={'/'} >Streaming</Link>
            </p>
        </div>
    </Fragment>
);
}

export default Navbox;
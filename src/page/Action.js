import React from "react";
import "../css/Action.css";
import { BsBarChartFill,BsClipboard,BsGraphUp } from "react-icons/bs";
import { FiInstagram } from "react-icons/fi";
import { FaRegThumbsUp } from "react-icons/fa";

const Action=(dong)=>{
    return(
        <div className="Action">
            <div className="sel">
                {dong.dong===""?<p>동을 선택해주세요</p>:<p>{dong.dong}</p>}
                
                <div className="icons">
                    <BsBarChartFill></BsBarChartFill>
                    <BsClipboard></BsClipboard>
                    <FiInstagram></FiInstagram>
                    <FaRegThumbsUp></FaRegThumbsUp>
                    <BsGraphUp></BsGraphUp>
                </div>
            </div>

        </div>
        
    )

}
export default Action;
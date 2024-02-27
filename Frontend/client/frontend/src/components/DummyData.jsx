import React from "react";
import data from "./data.json"
import "./Dummy.css"

function DummyData(){
    return(
        <>
            <h1 className="heading">Collection of Captions COC</h1>
            <div className="container">
                <div className="top">
                    <div className="user">
                        <img src={data.userAvatar} alt="" />
                        <div className="user-details">
                            <h3>{data.userName}</h3>
                            <p>Public Caption ID : {data.captionID}</p>
                        </div>
                    </div>
                    <div className="tags">
                        <div className="tag">
                            <h4>#{data.tags}</h4>
                        </div>
                    </div>
                </div>
                <div className="caption">
                    <h3>{data.caption}</h3>
                </div>
            </div>
        </>
    )
}

export default DummyData;
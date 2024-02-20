import React from "react"; 

import { useParams } from "react-router-dom";
import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt"
import styled from "styled-components";
import keyframes from "styled-components";
import Arrow from "../assets/arrow.png"

const CallFun =() =>{
    const{CallId} = useParams();
    const MyCall =async(element) =>{
        const appId= 165572673;
        const serverSecret = "ea47b11c870b0d05a41761e9847725fa";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId ,serverSecret , CallId, Date.now().toString() ,"Your Name" );
        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container:element,
            sharedLinks:[
                {
                    name:"Copy Link",
                    url:`http://localhost:5173/call/${CallId}`,
                }
            ],
            scenario:{
                mode:ZegoUIKitPrebuilt.OneONoneCall,
            },
            showScreenSharingButton:true
        })
 
    }
    return (
    <Container>
        <div className="call"> 
        <div className="Title">
           
           <div className="name">
           <h3>Join Call Here</h3>
           <CurvedArrow />
           </div>
         
        </div>
        <div className="video">
        <StyledContainer ref={MyCall}/>

        </div>

        </div>
       
    </Container>
    )
  
}
const Container = styled.div` 
background-Color:#756AB6;
width:100vw;
height:100vh;

.call{
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
gap:0.5rem;

}
.name{
    padding:0.7rem;
    background-Color:pink;
    margin-top:0.5rem;
    border-radius:2rem;
    width:250px;
    display:flex;
    align-items:center;
    justify-content:center;
   
}

 
`;
const StyledContainer = styled.div`
height:690px;
        width:1550px;    
.video{
        display:flex;
        justify-content:center;
        align-items:center;
        

    }
    
`;
const arrowAnimation = keyframes`
    0% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(20px);
    }
    100% {
        transform: translateX(0);
    }
`;
const CurvedArrow =styled.div`
position: absolute;
    top: 50%;
    right: -20px;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-image: url(${Arrow});
    background-size: cover;
    animation: ${arrowAnimation} 1s infinite;

`;



export default CallFun;
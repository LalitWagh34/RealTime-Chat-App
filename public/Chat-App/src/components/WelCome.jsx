import React, { useState } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif"
import { FiAlignJustify } from "react-icons/fi";


export default function Welcome({currentUser , }){
    const [sidebarClose, setSidebarClose] = useState(true); // State to track sidebar open/close
    
    const toggleSidebar = () => {
        setSidebarClose(!sidebarClose);
    };
    return (
    <Container >
       
        <img src={Robot} alt="Robot"/>
        <h1>
            Welcome ,
             <span>{currentUser.username}!</span>
        </h1>
        <h3>
            Please Select A chat to  Start.
        </h3>
    </Container>
)}

const Container = styled.div`
        display:flex;
        justify-content:center;
        align-items:center;
        flex-direction:column;
        color:black;
        img{
            height:20rem;
        }
        

`;
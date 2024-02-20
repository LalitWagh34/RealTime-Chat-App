import React, { useState } from "react";
import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {BiPowerOff} from "react-icons/bi"
import { IoVideocam } from "react-icons/io5";
import Modal from "./Modal";
export default function Logout(){
    const [isModalOpen ,setIsModalOpen] = useState(false);
    const navigate =useNavigate();
    const handleClick = async () =>{
        localStorage.clear();
        navigate("/login");
    }
    
    const handleCameraClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <Container>
            <div className="camera" onClick={handleCameraClick}>
            <IoVideocam />
            </div>
        <div className="logout">
            <Button onClick={handleClick}>
         <BiPowerOff/>
        </Button>
            </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}/>
        </Container>
       
    )
}

const Container= styled.div`
   background-color:#0A1D56;
   display:flex;
   .camera{
    background-color:#9a86f3;
    border:none;
    cursor:pointer;
    padding:0.5rem;
    justify-content:center;
    display:flex;
    border-radius:0.5rem;
    align-items:center;
   }
   svg{
    font-size:1.3rem;
    color:#ebe7ff;  
   }
   gap:0.9rem;
   align-items:center;
`;

const Button =styled.button`

display:flex;
justify-content:center;
align-items:center;
padding:0.5rem;
border-radius:0.5rem;
background-color:#9a86f3;
border:none;
cursor:pointer;
svg{
  font-size:1.3rem;
  color:#ebe7ff;  
}
`
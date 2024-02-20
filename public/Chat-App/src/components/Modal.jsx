import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


const Modal = ({ isOpen, onClose }) => {
    const [roomId ,setRoomId] = useState();
    const navigate = useNavigate();
    const handleJoinRoom=useCallback(()=>{
        navigate(`/call/${roomId}`)
    },[navigate , roomId])
    return (
        <ModalOverlay isOpen={isOpen} onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                
                <h3>Join Room </h3>
                <div className="Input">
                    <input placeholder="Enter Call Id" type="text" value={roomId}
                    onChange={(e) =>{
                        setRoomId(e.target.value)
                    }}/>
                </div>
                <div className="Button">
                    <button onClick={handleJoinRoom}>
                        Calling ...
                    </button>
                </div>
                
               
            </ModalContent>
        </ModalOverlay>
    );
};

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  
    background-color: rgba(0, 0, 0, 0.5);
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: #0A1D56;
 
    color:#756AB6;
    font-size:40px;
    padding: 40px;
    width:400px;
    height:250px;
    border-radius: 8px;
    gap:1rem;
    h3{
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .Button{
        align-items:center;
        justify-content:center;
        display:flex;
        button{
            background-color:pink;
            padding:0.5rem;
            width:4rem;
            height:3rem;
            border-radius:0.5rem;
            border:none;
            cursor:pointer;
            width:50%;
            font-size:20px;
            margin-top:1rem;
         

            
        }
    }
    
input{
    padding:0.7rem;
    width:100%;
    border:none;
    border-radius:0.5rem;
    color:black;
}
`;

export default Modal;

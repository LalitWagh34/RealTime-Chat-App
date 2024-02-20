import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import logo from "../assets/logo1.svg";
import { FiAlignJustify } from "react-icons/fi";

export default function Contacts({ contacts, currentUser, changeChat }) {
    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentuserImage, setCurrentuserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const [sidebarOpen, setSidebarOpen] = useState(true); 
    useEffect(() => {
        if (currentUser) {
            setCurrentuserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return <>
        {

            currentuserImage && currentUserName && (
                <Container sidebarOpen={sidebarOpen}>
                    <div className='brand'>
                       
                        <img src={logo} alt="logo" />

                    </div>
                    <div className='contacts'>
                        {contacts.map((contact, index) => {
                            return (
                                <div
                                    key={contact._id}
                                    className={`contact ${
                                        index === currentSelected ? "selected" : ""
                                    }`}
                                    onClick={() => changeCurrentChat(index, contact)}
                                >
                                    <div className="avatar">
                                        <img
                                            src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                            alt=""
                                        />
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className='current-user'>
                        <div className='avatar'>
                            <img src={`data:image/svg+xml;base64,${currentuserImage}`}
                                alt="avatar" />
                        </div>

                        <div className="username">
                            <h2>{currentUserName}</h2>
                        </div>

                    </div>
                </Container>

            )

        }
    </>
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #756AB6;
    transform: ${({ sidebarOpen }) => sidebarOpen ? 'translateX(0)' : 'translateX(-100%)'};
    transition: transform 0.3s ease-in-out;
    .toggle {
        font-size: 24px;
        height: 100px;
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: start;
    }
  


    .brand{
        display:flex;
        align-items:center;
        justify-content:center;
        
        img{
            height:4rem;
        }
        h3{
            color:white;
            text-transform:uppercase;
        }
    }
    .contacts{
        display:flex;
        flex-direction:column;
        align-items:center;
        overflow:auto;
        gap:0.8rem;
        &::-webkit-scrollbar{
            width:0.2rem;
            &-thumb{
                background-color:black;
                width:0.1rem;
                border-radius:1rem;
            }
        }
        .contact{
            background-color:#ffffff39;
            min-height:4rem;
            width:90%;
            cursor:pointer;
            border-radius:0.3rem;
            padding:0.4rem;
            gap:1rem;
            align-items:center;
            display:flex;
            transition:0.5s ease-in-out;
            .avatar{
                img{
                    height:3rem;
                }
            }
            .username{
                h3{
                    color:white;
                }
            }
        }
        .selected{
            background-color:#9186f3;
        }
    }
    .current-user{
        
        background-color:#3C0753;
        display:flex;
        justify-content:center;
        gap:2rem;
        align-items:center;
        .avatar{
            img{
                height:3.5rem;
                max-inline-size:100%
            }
        }
        .username{
            h2{
                color:white;
            }
        }
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            gap:0.6rem;
            .username{
                h2{
                    font-size:1rem;
                }
            }
        }
    }
`;
import React, { useRef, useState } from 'react';
import styled from "styled-components"
import Logout from './Logout';
import ChatInput from './ChatInput';
import axios from 'axios';
import {v4 as uuidv4} from "uuid";
import { getAllMessageRoute, sendMessagesRoute } from '../utils/ApiRoutes';
import { useEffect } from 'react';

export default function ChatContainer ({currentChat , currentUser,socket}){
    
    const[messages , setMessages] = useState([]);
    const [arrivalMsg , setArrivalMsg] = useState(null);
    const scrollRef = useRef()
    // useEffect(async() =>{
    //     const response = await axios.post(getAllMessageRoute,{
    //         from : currentUser._id,
    //         to:currentChat._id,
    //     })
    //     setMessages(response.data)
    // },[currentChat])
    useEffect(() => {
        const fetchData = async () => {
          if (currentUser && currentChat) {
            const response = await axios.post(getAllMessageRoute, {
              from: currentUser._id,
              to: currentChat._id,
            });
            setMessages(response.data);
          }
        };
      
        fetchData();
      }, [currentUser, currentChat]);
      
      const handleSendMsg = async (msg) => {
        try {
          await axios.post(sendMessagesRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
          });
          setMessages(prevMessages => [
            ...prevMessages,
            { from: currentUser._id, to: currentChat._id, message: msg, fromSelf: true }
          ]);
          socket.current.emit("send-msg",{
            from: currentUser._id,
            to:currentChat._id,
            message:msg,

          })
        } catch (error) {
          console.error("Error sending message:", error);
        }
      };
      useEffect(()=>{
        if(socket.current){
            socket.current.on("msg-recieve" ,(msg)=>{
                setArrivalMsg({fromSelf:false , message:msg});
            })
        }
      },[])

      useEffect(()=>{
        arrivalMsg && setMessages((prev)=>[...prev , arrivalMsg])

      },[arrivalMsg])
      
      useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour:"smooth"});

      },[messages]);
    
    return (<>
    {
        currentChat && (
    <Container>
            <div className="chat-header">
            <div className="user-details">
                <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} 
                 alt="avatar"/>

                </div>
                <div className="username">
                  <h3>{currentChat.username}</h3> 
                </div>
            </div>
            <Logout/>
        </div>
        <div className="chat-messages">
           {
            messages.map((message , index ) =>{
                return (<div key={index} ref={scrollRef}>
                    <div className={`message ${message.fromSelf ? "sended" : "received"}`}>
                        <div className="content">
                            <p>
                             {message.message}
                            </p>
                        </div>
                    </div>
                </div>)
            })
           }
          
        </div>
        <ChatInput handleSendMsg={handleSendMsg}/>
    </Container>
        )}
        


    </>)
        
}


const Container  = styled.div`
    padding-top:1rem;
    display:grid;
    grid-template-rows:10% 80% 5%;
    gap:0.1rem;
    overflow:hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
       grid-auto-rows:15% 70% 15%;
      }
    .chat-header{
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding:0 2rem;
        .user-details{
            display:flex;
            align-items:center;
            gap:1rem;
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
    }

    .chat-messages{
        padding:1rem 2rem ;
        display:flex;
        flex-direction:column;
        gap:1rem;
        overflow:auto;
        &::-webkit-scrollbar{
            width:0.4rem;
            &-thumb{
                background-color:black;
                width:0.2rem;
                border-radius:1rem;
            }
        }
        .message{
            display:flex;
            align-items:center;
            
            .content{
                max-width:40%;
                word-wrap:break-word;
                padding:1rem;
                font-size:1.1rem;
                color:white;
                border-radius:1rem;
            }

        }
        .sended{
    
            justify-content:flex-end;
            .content{
                background-color:#4f04ff21;
            }
        }
        .received{
       
            justify-content:flex-start;
            .content{
                background-color:#9900ff20;
            }
        }

    }

`;
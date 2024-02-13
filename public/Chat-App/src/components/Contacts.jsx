import React,{useState , useEffect} from 'react';
import styled from "styled-components" ;
import Logo from "../assets/logo.svg";

export default function Contacts({contacts ,currentUser ,changeChat}){
    const[currentUserName , setCurrentUserName] = useState(undefined)
    const[currentuserImage ,setCurrentuserImage] = useState(undefined);
    const[currentSelected , setCurrentSelected] = useState(undefined);
    useEffect(()=>{
        if(currentUser){
            setCurrentuserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    },[currentUser]);

    const changeCurrentChat = (index , contact ) =>{
        setCurrentSelected(index);
        changeChat(contact);
    };

    return <>
    {

        currentuserImage && currentUserName && (
        <Container>
            <div className='brand'>
                <img src={Logo} alt="logo"/>
                <h3>Snappy</h3>
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
                    alt="avatar"/>
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

const Container =styled.div`
    display:grid;
    grid-template-rows:10% 75% 15%;
    overflow: hidden;
    background-color:#756AB6;
    .brand{
        display:flex;
        align-items:center;
        justify-content:center;
        gap:1rem;
        img{
            height:2rem;
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
        
        background-color:#0d0d30;
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
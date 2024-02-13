import React, { useState, useEffect ,useRef} from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { allUserRouter ,host } from "../utils/ApiRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/WelCome";
import ChatContainer from "../components/Chatcontainer";
import {io} from "socket.io-client"
function Chat() {
  const socket = useRef();

  const [contacts, setContacts]=useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat ,setCurrentChat] = useState(undefined);
  const [isLoaded , setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true)
    }

    };

    fetchData();
  }, []);
  useEffect(() =>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user" , currentUser._id);
    }
  },[currentUser])

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUserRouter}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };

    fetchContacts();
  }, [currentUser]);
  const handleChatChange = (chat)=>{
    setCurrentChat(chat);

  }
  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
        {isLoaded && currentChat === undefined ?(
        <Welcome currentUser={currentUser}/>) :(
            
        <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/> 
        )

        }
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 100vh;
    width: 100vw;
    background-color: #0A1D56;
    display: grid;
    grid-template-columns: 22% 78%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;

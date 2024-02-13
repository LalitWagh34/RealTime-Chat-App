import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

export default function ChatInput() {
  const [showEmoji, setShowEmoji] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPicker = () => {
    setShowEmoji(!showEmoji);
  };

  const handleEmojiClick = (event, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };
  const sendChat =(event) =>{
    event.preventDefault();
    if(msg.length> 0){
        setMsg('')
    }

  }

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPicker} />
          {showEmoji && (
            <PickerContainer>
              <Picker onEmojiClick={handleEmojiClick} />
            </PickerContainer>
          )}
        </div>
      </div>
      <form className="input-container">
        <input
          type="text"
          placeholder="Type Your Message Here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  background-color: #0a1d56;
  padding: 0 2rem;
//   padding-bottom:0.3rem;
  padding-top: 41rem;
  

  .button-container {
    position: relative;
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;

    .emoji {
      position: relative;
      svg {
        font-size: 2rem;
        color: yellow;
        cursor: pointer;
      }
    }
  }

  .input-container {
    width: 95%;
    border-radius: 2rem;
    background-color: #ffffff34;
    display: flex;
    align-items: center;
    gap: 2rem;

    input {
      color: white;
      width: 90%;
      height: 60%;
      background-color: transparent;
      padding-left: 1rem;
      border: none;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      cursor: pointer;
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

const PickerContainer = styled.div`
  position: absolute;
  top: -500px; /* Adjust this value to position the picker correctly */
  .emoji-picker-react {
    box-shadow: 0 5px 10px #9a86f3;
    border-color: #9186f3;

    .emoji-categories button {
      filter: contrast(0);
    }

    .emoji-search {
      background-color: transparent;
      border-color: #9186f3;
    }

    .emoji-group:before {
      background-color: #080420;
    }
  }
`;

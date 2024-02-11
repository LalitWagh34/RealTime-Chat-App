import React from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import {IoMdSend} from "react-icons/io";
import {BsEmojiSmileFill} from "react-icons/bs"

export default function ChatInput(){
    return(
    <Container>
        <div className="button-container">
            <div className="emoji">
                <BsEmojiSmileFill/>
            </div>
        </div> 
        <form className="input-container">
            <input type="text" placeholder="Type Your Message Here"/>
            <button className="submit">
                <IoMdSend/>
            </button>
        </form>       
    </Container>
    )
}

const Container = styled.div``;

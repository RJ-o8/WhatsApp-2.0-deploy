
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, Mic, MoreVert } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components'
import { auth, db } from '../firebase';
import {useCollection} from 'react-firebase-hooks/firestore'
import Message from './Message';
import { useRef, useState } from 'react';
import firebase from 'firebase/app';
import getRecipientEmail from '../utils/getRecipientEmail';
import TimeAgo from 'timeago-react';

function ChatScreen({chat,messages}) {
    const [user] = useAuthState(auth);
    const [input,setInput] = useState("");
    const endOfMessageRef = useRef(null);
    const router = useRouter();
    const [messagesSnapshot] = useCollection(
        db
        .collection('chats')
        .doc(router.query.id)
        .collection('message')
        .orderBy('timestamp','asc')
        );
    const [recipientSnapshot] = useCollection(
        db
            .collection('users')
            .where('email', '==', getRecipientEmail(chat.users,user))
    )  
    const showMessages= ()=>{
        if(messagesSnapshot){
            return messagesSnapshot.docs.map(message =>(
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp:message.data().timestamp?.toDate().getTime(),
                    }}
                />
            ));
        }
        else{
            return JSON.parse(messages).map(message =>(
                <Message key={message.id} user={message.user} message={message}/>
            ))
        }
    };
    const scrollToBottom =() =>{
        endOfMessageRef.current.scrollIntoView({
            behaviour:"smooth",
            block:"start"
        })
    }
    const sendMessage =(e)=>{
        e.preventDefault();

        db.collection('users').doc(user.uid).set(
            {
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            },
            {merge: true}
        );
        db.collection('chats').doc(router.query.id).collection('message').add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            user:user.email,
            photoURL:user.photoURL,
        }); 
        setInput("");
        scrollToBottom();
    }
    const recipientEmail = getRecipientEmail(chat.users,user);
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    return (
        <Container>
            <Header>
                {recipient ?  (
                    <Avatar src={recipient?.photoURL} />
                ):(
                    <Avatar> {recipientEmail[0]} </Avatar>
                )}
                <HeaderInfo>
                    <h3>{recipientEmail}</h3>
                    {recipientSnapshot ? (
                        <p>Last seen: {' '}
                            {recipient?.lastSeen?.toDate() ? (
                                <TimeAgo datetime={recipient?.lastSeen?.toDate()} /> ):("unavalable")}
                        </p>
                    ):(
                        <p>Loading last active...</p>
                    )}


                </HeaderInfo>
                <HeaderIcons>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                    
                </HeaderIcons>
            </Header>
            <MessageContainer>
                {showMessages()}
                <EndOfMessage ref={endOfMessageRef}/>
            </MessageContainer>

            <InputContainer>
                <IconButton>
                <InsertEmoticon />

                </IconButton>
                <Input value={input} onChange={e => setInput(e.target.value)} />
                <button hidden disabled={!input} type="submit" onClick={sendMessage} >Send</button>
                <IconButton>
                <Mic />

                </IconButton>
            </InputContainer>

        </Container>
    )
}

export default ChatScreen

const Container = styled.div``;

const Input = styled.input`
    flex:1;
    outline:0;
    border-radius:10px;
    padding:20px;
    margin-left:15px;
    margin-right:15px;
    background-color:whitesmoke;
    border:none;
`;
const InputContainer = styled.form`
    display:flex;
    align-items:center;
    padding:10px;
    position:sticky;
    bottom:0;
    background-color:#ffffff;
    z-index:100;
`;



const Header = styled.div`
    position:sticky;
    background-color:white;
    z-index:100;
    top:0;
    height:80px;
    display:flex;
    padding:11px;
    align-items:center;
    border-bottom:1px solid whitesmoke;
    border-left:1px solid whitesmoke;

`;

const HeaderInfo = styled.div`
    margin-left:15px;
    flex:1;

    > h3{
        
    }
    >p{
        font-size:14px;
        color:grey;
    }
`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
    padding:30px;
    background-color:#e5ded8;
    min-height:90vh;
`;

const EndOfMessage = styled.div`
    margin-bottom:20px;
`;
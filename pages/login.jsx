
import { Button } from '@material-ui/core';
import Head from 'next/head';
import styled from 'styled-components'
import { auth, provider } from '../firebase';

function login() {
    const signIn = () =>{
        auth.signInWithPopup(provider).catch(alert);
    }

    return (
        <Container>
            <Head>
                <title>Login to WhatsApp</title>
            </Head>

            <LoginContainer>
                <Logo src="https://static.vecteezy.com/system/resources/previews/001/191/986/non_2x/circle-logo-png.png"/>
                <Button variant="contained" color="primary" onClick={signIn}>SignIn with Google</Button>
            </LoginContainer>
        </Container>
    )
}

export default login

const Container = styled.div`
    display:grid;
    place-items:center;
    height:100vh;
    background-color:whitesmoke;
`;

const LoginContainer = styled.div`
    padding:100px;
    display:flex;
    align-items:center;
    flex-direction:column;
    background-color:white;
    border-radius:5px;
    box-shadow: 0px 4px 14px -3px rgba(0,0,0,0.7)
`;
const Logo = styled.img`
    height:200px;
    width:200px;
    margin-bottom:50px;
`;

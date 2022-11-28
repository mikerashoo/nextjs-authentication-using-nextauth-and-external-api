import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css' 
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { signIn, getSession, getProviders } from "next-auth/react";
export default function Signin({ providers, loginError }) { 
    const router = useRouter();

  const [errorMessage, setErrorMessage] = useState(null);
    
    useEffect( () =>{
        if(loginError) {
            console.log("loginError", loginError);
            if(loginError == 'CredentialsSignin'){
                setErrorMessage("Incorrect email or password")
            }
            else {
                setErrorMessage("something went wrong. Please try again")
            }
        };
        const setUp = async () => {
             const session = await getSession()        
        if (session) {
          router.push('/account_page')
        }   
        }
       setUp();
    }, [])

 

  
  const handleLoginUser = async (e) => {    
    e.preventDefault();
    await signIn("credentials", {
      redirect: true,
      email: "mk@gmail.com",
      password: "1234567890"
    });
 
  }
    
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      {errorMessage &&
        <div style={{color: 'red'}}>
            
            {errorMessage}
           <button onClick={() => {setErrorMessage(null)}}>Close</button>
        </div>
        }
        <h1 className={styles.title}>
          Login Page
        </h1>

           <button onClick={handleLoginUser}>Login </button>
      </main>

       
    </div>
  )
}
 

export async function getServerSideProps(context) {
    const { query, req, res } = context;
    var error = ''
    if(Boolean(query.error)) {
      error = query.error
    }
    
    try {    
      const secret = process.env.NEXTAUTH_SECRET
      const token = await getToken({ req, secret })   
      
      return { props: { providers: await getProviders(), loginError: error } };
    } catch (e) {
      return { props: { providers: await getProviders(), loginError: error } };
    }
    
  }
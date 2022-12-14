import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css' 
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { signIn, getSession, getProviders } from "next-auth/react";
import Link from 'next/link';
export default function Signin({session}) { 
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null); 
    
    useEffect( () =>{
        
        const setUp = async () => {    
        if (session) {
          router.push('/profile')
        }   
        }
       setUp();
    }, [])

 

  
  const handleLoginUser = async (e) => {   

    e.preventDefault();
    if(isLoading) return;
    if(email == null || email.length == 0 || password == null || password.length == 0) {
        setErrorMessage("Please fill all required fields");
        return;
    }
    try {
        setErrorMessage(null);
        setIsLoading(true);
        const resp = await signIn("credentials", 
            {
                redirect: false,
                email: email,
                password: password 
            });
            if(resp.ok){
                //login success
                setIsLoading(false);
                router.push('/profile')
            }
            else {
                if(resp.error == 'CredentialsSignin'){
                    setIsLoading(false);
                    setErrorMessage("Incorrect email or password")
                }
                else {
                    setIsLoading(false);
                    setErrorMessage("something went wrong. Please try again")
                }
            } 
  
        } catch (error) {
            setIsLoading(false);
            setErrorMessage("something went wrong. Please try again")

        }

 
  }
    
  if(Boolean(session)){
    return <>Loading ...</>
  }
  return (
    <div className={styles.container}>
        <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
            <div className="relative py-3 sm:w-96 mx-auto text-center">
                
                <span className="text-2xl font-light ">Login to your account</span>
                <div className="mt-4 bg-white shadow-md rounded-lg text-left">
                    <div className="h-2 bg-purple-400 rounded-t-md"></div>
                        <form  onSubmit={handleLoginUser}>
                            <div className="px-8 py-6 ">
                                {errorMessage && 
                                    <div class="flex bg-red-100 rounded-lg p-4 mb-2 text-sm text-red-700" role="alert">
                                        <svg class="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                                        <div>
                                            <span class="font-medium">Failed</span> {errorMessage}
                                        </div>
                                    </div> 
                                }
                                <label className="block font-semibold"> Email </label>
                                <input  value={email} onChange={(e) => setEmail(e.target.value)}
                                        type="email" id="email" name="email" required 
                                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md " />
                                <label className="block mt-3 font-semibold"> Password </label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" 
                                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />
                                
                                <div className="flex justify-between items-baseline">
                                    <button type="submit" className="w-full mt-4 bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600 ">
                                        {isLoading ? 
                                        <svg role="status" className="inline h-8 w-8 animate-spin mr-2 text-gray-200 dark:text-gray-600 fill-blue-600"
                                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor" />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill" />
                                        </svg>
                                        :  'Login' }
                                    </button>
                                    
                                </div>
                            </div>
                        </form>
                    
                    </div>
                </div>
            </div>
        </div>
  )
}
 
export async function getServerSideProps(context) {
    
    return {
      props: {      
        session: await getSession(context)
      },
    };
  }
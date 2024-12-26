import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export const SignIn = ()=> {

  const [providers, setProviders] = useState(null);

  useEffect(()=> {
    const setUpProviders = async ()=>{
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, [])

  return (
    <>
    {providers && Object.values(providers).map((provider)=> (
      <button type="button" key={provider.name} onClick={()=> signIn (provider.id)} className="black_btn">
        Sign In
      </button>
    ))}
    </>
  )
}
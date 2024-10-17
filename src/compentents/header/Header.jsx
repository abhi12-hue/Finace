import React, { useEffect } from 'react';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
const Header = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  useEffect(()=>{
    if(user){
      navigate("/dashboard")
    }
  } , [user , loading])
  const logoutFnc = () => {
    try{
      signOut(auth).then(()=>{
        navigate("/");
      }).catch((error)=>{
        console.log(error);
      });
    }
    catch(error){

    }
  }

  return (
    <header className='bg-[#6556CD] p-4 flex justify-between items-center'>
      {/* Application Title */}
      <h1 className='text-white font-bold text-lg'>Finacely</h1>
      
      {/* Logout Button */}
      {user && 
       <button 
       onClick={logoutFnc} 
       className='bg-white text-[#6556CD] px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition'
     >
       Logout
     </button>
      }
    </header>
  );
}

export default Header;

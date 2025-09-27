import { useEffect, useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Login = () => {

  const [signUpState, setSignUpState] = useState('Login')
  const { setShowLogin } = useContext(AppContext)

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [])

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 
    backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      
    <form className='relative bg-white p-8 rounded-xl text-slate-500 w-full max-w-md'>

      <h1 className='text-center text-3xl text-neutral-700 font-bold'>{ signUpState }</h1>
      
      <p className='text-sm text-center my-2 mb-8'>Welcome back! Please sign in to continue</p>

      <div className='border px-6 py-3 flex items-center gap-4 rounded-full mt-4 w-full'>
        <img src= { assets.email_icon } alt="email_icon" width={22}/>
        <input type='email' className='outline-none text-sm flex-1 bg-transparent'
        placeholder='Email id' required />
      </div>

      { signUpState !== 'Login' && <div className='border px-6 py-3 flex items-center gap-4 rounded-full mt-4 w-full'>
        <img src= { assets.profile_icon } alt="profile_icon" width={28}/>
        <input type='text' className='outline-none text-sm flex-1 bg-transparent'
        placeholder='Full Name' required />
      </div>}

      <div className='border px-6 py-3 flex items-center gap-4 rounded-full mt-4 w-full'>
        <img src= { assets.lock_icon } alt="lock_icon" width={18}/>
        <input type='password' className='outline-none text-sm flex-1 bg-transparent'
        placeholder='Password' required />
      </div>

      <p className='text-sm text-blue-600 my-5 cursor-pointer'>Forgot Password?</p>

      <button className='bg-blue-600 w-full text-white py-3 rounded-full cursor-pointer text-lg'>
        { signUpState === 'Login' ? 'log in' : 'create account'}
      </button>

      { signUpState === 'Login'  ? <p className='mt-4 text-center'>Dont have an account? 
        <span className='text-blue-600 cursor-pointer' onClick={() => setSignUpState('Sign Up')}>
        Sign up</span></p>
        :
        <p className='mt-2 text-center'>Already have an account? 
        <span className='text-blue-600 cursor-pointer' onClick={() => setSignUpState('Login')}>
        Log in</span></p>
      }
      
      <img onClick={()=> setShowLogin(false)} src= { assets.cross_icon } alt="cross-icon" className='absolute top-5 right-5 cursor-pointer' />

    </form>

    </div>
  )
}

export default Login

import { useState } from 'react';
import { assets } from '../assets/assets.js';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  return (
    <div className='
      flex items-center justify-between py-4
    '>
      <Link to='/'>
        <img src = { assets.logo } alt='Site Logo' className='
          w-28 sm:w-32 lg:w-40
        ' />
      </Link>

      <div>
        {
        user ? 
          // this div is for the logged in state
          <div className='flex items-center gap-2 sm:gap-3'>
            <button className='flex items-center gap-2 bg-blue-100
             px-4 sm:px-6 py-1.5 sm:py-3 rounded-full
             hover:scale-105 transition-all duration-700 cursor-pointer'>

              <img className='
                w-5
              ' src= { assets.credit_star } alt='Credits img'/>

              <p className='
                text-xs sm:text-sm font-medium text-gray-600
              '>Credits left: 50</p>
            </button>

            <p className='
              text-gray-600 max-sm:hidden pl-4
            '>Hi, Helios</p>

            <div className='relative group'>
              <img className='
              w-10 drop-shadow
              ' src={ assets.profile_icon } alt='user logo'/>

              <div className='absolute hidden group-hover:block 
              top-0 right-0 z-10 text-black rounded pt-12'>
                <ul className='list-none m-0 p-2 bg-white
                rounded-md border text-sm'>
                  <li className='
                  py-1 px-2 cursor-pointer
                  '>Logout</li>
                </ul>
              </div>
              
            </div>

          </div> :
          // this is for the logged out state
          <div className='
            flex items-center gap-2 sm:gap-5
          '>
            {/* useNavigate hook for navigation to the buying page instead of <link> as it is kind off double rendering and 
            a bad practice */}
            <p className='cursor-pointer' onClick={() => navigate('/buy')}>Pricing</p>

            <button className='
              cursor-pointer
              bg-zinc-800 text-white
              px-7 py-2 sm:px-10 text-sm rounded-full
            '>Login</button>
          </div>
        }

        
        
      </div>

    </div>
  )
}

export default Navbar

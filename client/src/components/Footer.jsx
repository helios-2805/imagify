import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20'>

      <img src={ assets.logo } alt="logo img" width={ 150 } />

      <p className='
        flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden
      '>Copyright &copy; <a href='https://www.github.com/helios-2805'>Helios</a> | All rights reserved.</p>

      <div className='flex gap-2.5'>
        <img src={ assets.facebook_icon } alt="fb_icon" width={35}/>
        <img src={ assets.twitter_icon } alt="twit_icon" width={35}/>
        <img src={ assets.instagram_icon } alt="insta_icon" width={35}/>
      </div>
    </div>
  )
}

export default Footer

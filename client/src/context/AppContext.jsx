import axios from 'axios';
import { createContext, use, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';


export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [credit, setCredit] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const navigate = useNavigate()

  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/v1/user/credits', {
        headers : { token }
      })
      
      if(data.success) {
        setCredit(data.credits)
        setUser(data.user)
      }

    } catch(err) {
      console.log(err)
      toast.error(err.message)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    setUser(null)
    toast.info('Logged out successfully!')
  }

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/v1/image/generate-image', { prompt }, {
        headers: { token }
      })
      if(data.success) {
        loadCreditsData()
        return data.resultImage

      } else {
        toast.error(data.message)
        loadCreditsData()

        if(data.creditBalance === 0) {
          navigate('/buy')
        }
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  useEffect( () => {
    if(token) {
      loadCreditsData()
    }
  }, [token])

  const value = {
    user, setUser, showLogin, setShowLogin, backendUrl,
    token, setToken, credit, setCredit, loadCreditsData, logout,
    generateImage
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
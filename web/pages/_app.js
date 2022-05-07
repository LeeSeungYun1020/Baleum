import '../styles/global.scss'
import {createContext, useState} from "react";

export const LoginContext = createContext({
  isLogin: false,
  id: null,
  pw: null,
  currentUserId: null
})

const Store = (props) => {
  if (typeof window !== "undefined") {
    const [isLogin, setIsLogin] = useState(sessionStorage.getItem("isLogin") || false);
    const [id, setId] = useState(sessionStorage.getItem("id") || null);
    const [pw, setPw] = useState(sessionStorage.getItem("pw") || null);
    const [currentUserId, setCurrentUserId] = useState(sessionStorage.getItem("id") || null);
    return (
        <LoginContext.Provider value = {{isLogin, id, pw, currentUserId, setIsLogin, setId, setPw, setCurrentUserId}}>
          {props.children}
        </LoginContext.Provider>
    )
  }
  else {
    const [isLogin, setIsLogin] = useState(false);
    const [id, setId] = useState(null);
    const [pw, setPw] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    return (
        <LoginContext.Provider value = {{isLogin, id, pw, currentUserId, setIsLogin, setId, setPw, setCurrentUserId}}>
          {props.children}
        </LoginContext.Provider>
    )
  }
}

function MyApp({ Component, pageProps }) {
  return <Store><Component {...pageProps} /></Store>
}

export default MyApp

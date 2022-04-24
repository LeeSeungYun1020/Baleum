import '../styles/global.scss'
import {createContext, useState} from "react";

export const LoginContext = createContext({
  isLogin: false,
  id: null,
  pw: null
})

const Store = (props) => {
  if (typeof window !== "undefined") {
    const [isLogin, setIsLogin] = useState(sessionStorage.getItem("isLogin") || false);
    const [id, setId] = useState(sessionStorage.getItem("id") || null);
    const [pw, setPw] = useState(sessionStorage.getItem("pw") || null);

    return (
        <LoginContext.Provider value = {{isLogin, id, pw, setIsLogin, setId, setPw}}>
          {props.children}
        </LoginContext.Provider>
    )
  }
  else {
    const [isLogin, setIsLogin] = useState(false);
    const [id, setId] = useState(null);
    const [pw, setPw] = useState(null);

    return (
        <LoginContext.Provider value = {{isLogin, id, pw, setIsLogin, setId, setPw}}>
          {props.children}
        </LoginContext.Provider>
    )
  }
}

function MyApp({ Component, pageProps }) {
  return <Store><Component {...pageProps} /></Store>
}

export default MyApp

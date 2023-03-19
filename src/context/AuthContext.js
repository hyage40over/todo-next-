import { createContext, useContext, useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/router"
import { auth } from "../../firebase/init"

const AuthContext = createContext({})

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const isAvailableForViewing =
    router.pathname === "/login" ||
    router.pathname === "/signup"

  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      !user && !isAvailableForViewing && (await router.push("/login"))
    })
    return () => {
      authStateChanged()
    }
  }, [])

  return (
    <AuthContext.Provider value={{user}}>
      {children}
    </AuthContext.Provider>
  )
}
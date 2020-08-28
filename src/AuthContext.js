import React from 'react'
const AuthStateContext = React.createContext()
const AuthDispatchContext = React.createContext()
function authReducer(state, action) {
  switch (action.type) {
    case 'login': {
      return {...state,isAuth:true,user:action.user }
    }
    case 'logout': {
      return {...state,isAuth: false,user:null}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}
function AuthProvider({children}) {
    const token =localStorage.getItem('token')
    const initialState = token?{isAuth:true}:{isAuth:false}
  const [state, dispatch] = React.useReducer(authReducer, initialState)
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}
function useAuthState() {
  const context = React.useContext(AuthStateContext)
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider')
  }
  return context
}
function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext)
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider')
  }
  return context
}
export {AuthProvider, useAuthState, useAuthDispatch}
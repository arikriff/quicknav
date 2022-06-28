import React, { useState } from 'react'
import { defaultDirection } from '../../info/Direction'

const Context = React.createContext(null)
export const getContext = () => React.useContext(Context)

export const ContextProvider = ({children}) => {

  const [state, setState] = useState({
    direction: defaultDirection
  })

  return (
    <Context.Provider value={{state, setState}}>
      {children}
    </Context.Provider>
  )
  
}
import React, { useState } from 'react'
import { defaultDirection } from '../../info/Direction'

const Context = React.createContext(null)
export const getContext = () => React.useContext(Context)

export const ContextProvider = ({data, children}) => {

  const [state, setState] = useState({
    direction: defaultDirection,
    stopId: null
  })

  return (
    <Context.Provider value={{state, setState}}>
      {children}
    </Context.Provider>
  )
  
}
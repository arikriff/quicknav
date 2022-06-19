import React, { useState } from 'react'
import Data from '../info/Data'
import { defaultDirection } from '../info/Direction'

const Context = React.createContext(null)
export const getContext = () => React.useContext(Context)

export const ContextProvider = props => {

  const [state, setState] = useState({
    data: Data(),
    direction: defaultDirection,
    stopId: null
  })

  return (
    <Context.Provider value={{state, setState}}>
      {props.children}
    </Context.Provider>
  )
  
}
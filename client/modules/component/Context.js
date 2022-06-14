import React, { useState } from 'react'
import Direction from '../dataInfo/Direction'

const Context = React.createContext(null)
export const getContext = () => React.useContext(Context)

export const ContextProvider = props => {

  const [state, setState] = useState({
    direction: Direction.unspecified,
    stop: null
  })

  return (
    <Context.Provider value={{state, setState}}>
      {props.children}
    </Context.Provider>
  )
  
}
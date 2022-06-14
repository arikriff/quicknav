import { useState } from "react"
import Direction from "../dataInfo/Direction"

const ContextProvider = () => {

  const [state, setState] = useState({
    direction: Direction.unspecified
  })

  
}
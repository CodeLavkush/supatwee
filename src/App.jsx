import React, { useEffect, useState } from 'react'
import {getAllTweets} from "./api/client"

function App() {

  const [tweets, setTweets] = useState([])

  useEffect(()=>{

  }, [])

  return (
    <div className='text-violet-700'>
      hello world
    </div>
  )
}

export default App

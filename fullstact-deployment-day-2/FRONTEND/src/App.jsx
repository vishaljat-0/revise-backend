import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  const [notes, setnotes] = useState([])


  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("http://localhost:3000/api/get");
      setnotes(res.data.notes);
      console.log(res.data.notes);
      
    }
    getData();
  }, [])

  return (  
    <div className='app'>

{notes.map((note)=>{
  return <div>
    <h1>{note.title}</h1>
    <p>{note.description}</p>
  </div>
})}



    </div>
  )
}

export default App
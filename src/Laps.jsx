import React from 'react'

export default function Laps({lapTab,numberFormatter,deletelap}) {
  return (
   <ul>
    {
    
    lapTab.map((lap,index)=>(<li key={index}><span>Lap {index+1} </span> : <span>{numberFormatter(lap.minutes)} : {numberFormatter(lap.seconds)}</span><button onClick={()=>deletelap(index)}>X</button></li>))
    
    
    
    
    
    }
   </ul>
  )
}

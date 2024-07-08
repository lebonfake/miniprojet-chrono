import { useEffect, useReducer, useRef, useState } from 'react'
import "./App.css"
import Laps from './Laps'
import About from './About'

function App() {
  
  
  const [entre,setentre]=useState()
  const [chrono, setchrono] = useState(59)
  const [minute, setminute] = useState(1)
  const [entrem, seteminute]= useState()
  const [starting ,setStart] = useState(false)
  const [lapTab,setlaps]=useState([])

  const intervalId=useRef(null)
  function handlestart(){
    if(!starting){

      if(chrono == 0){
        if(minute != 0){
          setchrono(59)
          setminute(prev=>prev-1) 
          setTimeout(() => {
            
           
          }, 1000);
          console.log("if d lbdya");
  
  
        }
        else{
          
          clearInterval(intervalId.current)
          console.log("else");
          return
        }
      }
      


  intervalId.current= setInterval(() => {
          
          setchrono(prev=>prev-1)
          
          
  }, 1000);

  setStart(true)

}

}


  function handlereset(){
    const valeur= entre ? entre : 59
    const valeurm= entrem ? entrem : 1
    setchrono(valeur)
    setminute(valeurm)
    setentre(valeur)
    seteminute(valeurm)
    clearInterval(intervalId.current)
    setStart(false)
  }

  function addlap(nowminute,nowchrono){
      setlaps([...lapTab,{minutes: nowminute,seconds: nowchrono}])
  }



  useEffect(()=>{
    if(chrono===0){
      if(minute != 0){
        setchrono(0)
        setTimeout(() => {
          setminute(prev=>prev-1)
          setchrono(59)
          
        }, 1000);
        console.log("if");


      }
      else{
        setchrono(0)
        setminute(0)
        clearInterval(intervalId.current)
        console.log("else");
      }



    }


  },[chrono])



  function numberFormatter(n){
   var string=""
    if(!n.toString()){
      return "00"
    }   
    if(n<10){
    string='0'+n.toString();
    }
    else{
    string=n.toString();
    }
    
    while (string[0] === '0' && string.length > 2) {
      string = string.slice(1); // Remove the first character
  }
  return string

  }

  function deletelap(lapindex){
        setlaps(lapTab.filter((lap,index)=>{
          return index!==lapindex
        }))


  }


  
 

  return (
    <>
    <div className='container'>
      <p>Il vous reste :  </p>
      <div className='monchro'>
        
        <p>{numberFormatter(minute)} : {numberFormatter(chrono)}</p>
      
        <div className="labels">
          <span>Minutes</span>
          <span>Secondes</span>
        </div>
      
      
      </div>
      <div className='buttons'>
      <button onClick={()=>{handlestart()}}>start</button>
      <button onClick={()=>{addlap(minute,chrono)}}>Add lap</button>
      <button onClick={()=>{handlereset()}}>reset</button>
     
      </div>
      <div className="lapsContainer">
        <Laps lapTab={lapTab} numberFormatter={numberFormatter} deletelap={deletelap}></Laps>
      </div>
      <div className='inputs'>
      <input type="text" value={entre} placeholder='Entrer le nombre de sec' onChange={e=>{
       if(e.target.value <60 && e.target.value>=0){
        const maval=e.target.value ? e.target.value : ""
        setentre(maval)
        setchrono(maval)
        clearInterval(intervalId.current)
        setStart(false)
      }
     
      }}/>
       <input type="text" value={entrem} placeholder='Entrer le nombre de minute' onChange={e=>{
        if(Number(e.target.value) || e.target.value=="" || e.target.value==0){
        
        if(e.target.value==0){
          const mavalm=0;
         } else{
          const mavalm=e.target.value ? e.target.value : 1;
        }
        seteminute(e.target.value)
        setminute(mavalm)
        clearInterval(intervalId.current)
        setStart(false)
        }
      }}/>
      </div>
    </div>
    <About></About>
    </>
  )
}

export default App

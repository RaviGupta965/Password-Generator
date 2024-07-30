import { useState, useCallback,useEffect, useRef} from 'react';
import './App.css'
function App() {
  const[length,setlength]=useState(8)
  const[numallowed,setnumallowed]=useState(false)
  const[charallowed,setcharallowed]=useState(false)
  const[pass,setpass]=useState("")

  // useref hook
  const passwordref=useRef(null)

  const passwordgenerator=useCallback(()=>{
    let pass=""
    let s=""
    s+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numallowed)  s+="0123456789"
    if(charallowed) s+="_@&$`~^!"
    for (let index = 0; index < length; index++) {
      const ind=Math.floor(Math.random() * s.length + 1)
      pass+=s[ind];
    }
    setpass(pass)
  },[length,numallowed,charallowed,setpass])

  const copypassword=useCallback(()=>{
    passwordref.current?.select()
    window.navigator.clipboard.writeText(pass)
  },[pass])


  useEffect(()=>{
    passwordgenerator()
  },[length,numallowed,charallowed,passwordgenerator])
  return (
    <>
      <div className='bg-slate-600 w-1/4 m-auto rounded-lg text-white shadow-md justify-center my-3'>
        <div className='flex justify-center text-2xl '>
          Password Generator
        </div>


          <div className='flex overflow-hidden mb-2 p-1'>
            <input type="text" value={pass} className='outline-none w-4/5 py-2 px-2 mx-1 text-black' placeholder='Password' readOnly ref={passwordref}/>
            <button className='outline-none bg-purple-600 text-white mx-1 py-2 px-2 rounded-md' onClick={copypassword}>Copy</button>
          </div>


        <div className=''flex text-sm gap-x-2 p-2>
            <div className='flex items-center gap-x-1'>
              <input type="range" min={6} max={16} value={length} className='cursor-pointer ' 
              onChange={(e)=>{
                setlength(e.target.value)
              }}/>
              <label>length:{length}</label>
              <div className='flex items-center gap-x-1'>
                <input type="checkbox" defaultchecked={numallowed} onChange={()=>{
                  setnumallowed(!numallowed)
                }} />
                <label>Numbers</label>
              </div>
              <div className='flex items-center gap-x-1'>
                <input type="checkbox" defaultchecked={charallowed} onChange={()=>{
                  setcharallowed(!charallowed)
                }} />
                <label>Character</label>
              </div>
            </div>

              
            
        </div>
      </div>
    </>
  )
}

export default App

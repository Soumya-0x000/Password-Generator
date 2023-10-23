import React, { useCallback, useEffect, useRef, useState } from 'react'

const GeneratePswd = () => {

    const [length, setLength] = useState(8);
    const [numAllowed, setNumAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);
    const [pswd, setPswd] = useState("");
    const [selectPswdRange, setSelectPswdRange] = useState(6);

    const passwordGenerator = useCallback(() => {
        let password = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

        if(numAllowed) str += "0123456789"
        if(charAllowed) str += "!@#$%^&*()_-+=<>?,./[]{}|"

        for(let i=0; i<length; i++) {
            password += str.charAt(Math.floor(Math.random() * str.length + 1))
        }

        setPswd(password)
    }, [length, numAllowed, charAllowed])

    useEffect(() => {
        passwordGenerator()
    }, [length, numAllowed, charAllowed, passwordGenerator])

    const pswdRef = useRef(null)
    const copyToClipboard = useCallback(() => {
        pswdRef.current?.select()
        pswdRef.current?.setSelectionRange(0, selectPswdRange)
        window.navigator.clipboard.writeText(pswd)
    }, [pswd, selectPswdRange])
      

  return (
    <>
        <div className='bg-slate-800 h-screen w-screen flex items-center justify-center'>
            <div className='bg-slate-700 w-[23rem] sm:w-[32rem] md:w-[40rem] rounded-xl overflow-hidden'>
                <div className='w-full bg-gray-900 text-orange-400 text-center font-robotoMono font-semibold text-[1.3rem] py-2 '>Password Generator</div>

                <div className='sm:px-4'>
                    <div className='space-y-4 pt-6 pb-3 md:px-5'>
                        {/* Generated PSWD showing field */}
                        <div className='h-[2.4rem] rounded-lg overflow-hidden flex '>
                            <input 
                            type="text"
                            value={pswd}
                            ref={pswdRef}
                            className='w-full bg-slate-800 focus:outline-none focus:border-none px-4 font-lato text-orange-300' 
                            readOnly/>

                            <div 
                            className='cursor-pointer flex items-center justify-center bg-blue-700 text-blue-300 font-semibold text-[1.2rem] font-montserrat tracking-wider w-[6rem] py-2 active:bg-blue-300 active:text-blue-700 transition-all'
                            onClick={copyToClipboard}>Copy</div>
                        </div>

                        {/* Include Characters */}
                        <div className='flex flex-col justify-between gap-x-3'>
                            {/* Slider */}
                            <div className='flex w-full'>
                                <input 
                                type="range"
                                min={8}
                                max={100}
                                value={length}
                                className='cursor-pointer w-full' 
                                onChange={(e) => setLength(e.target.value)}/> 
                            </div>
                            
                            {/* Selection area */}
                            <div className='flex flex-row md:items-center justify-around w-full'>
                                {/* Length */}
                                <label className='text-green-300 '>Length: {length}</label>

                                {/* Numbers */}
                                <div className='space-x-1'>
                                    <input type="checkbox"
                                    defaultChecked={numAllowed}
                                    onChange={() => setNumAllowed(!numAllowed)} />

                                    <label className='text-green-300'>Numbers</label>
                                </div>

                                {/* Characters */}
                                <div className='space-x-1'>
                                    <input 
                                    type="checkbox"
                                    defaultChecked={numAllowed}
                                    onChange={() => setCharAllowed(!charAllowed)} />

                                    <label className='text-green-300'>Special Characters</label>
                                </div>
                            </div>
                        </div>

                        {/* Copy selected password */}
                        <div className='flex flex-col md:flex-row items-center justify-between'>
                            <div className='w-[19rem] '>
                                <input 
                                type="range"
                                className='w-full'
                                min={8}
                                max={length} 
                                value={selectPswdRange}
                                onChange={(e) => (setSelectPswdRange(e.target.value))}/>
                            </div>

                            <label className='text-violet-400 font-mavenPro font-semibold'>Password Selection Range: {selectPswdRange}/{length}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default GeneratePswd
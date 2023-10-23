import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GeneratePswd from './PSWDgenerator/GeneratePswd'

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<GeneratePswd/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
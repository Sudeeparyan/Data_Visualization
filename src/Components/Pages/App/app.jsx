import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ExcelPage from '../Excel_page/excelPage'
import Navbar from '../../Reusables/Navbar/Navbar'

const App = () => {
  return (
    <div>
        <Navbar/>
        <BrowserRouter>
           <Routes>
              <Route path='/Excel' element={<ExcelPage/>}/>
           </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
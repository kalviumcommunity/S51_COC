import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AllRoutes from './AllRoutes'
import SideNav from './layouts/SideNav'

function App() {
  return (
    <>
      <BrowserRouter>
        <AllRoutes/>
      </BrowserRouter>
    </>
  )
}

export default App

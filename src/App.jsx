import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import SimplifiedDes from './Pages/Simplified Des/SimplifiedDes'
import Polyalphabetic from './Pages/Polyalphabetic/Polyalphabetic'
import Playfair from './Pages/Playfair/Playfair'
import RC4 from './Pages/RC4/RC4'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} >
          <Route path='Simplified-Des' element={<SimplifiedDes />} />
          <Route path='Playfair-Cipher' element={<Playfair />} />
          <Route path='Polyalphabetic' element={<Polyalphabetic />} />
          <Route path='RC4' element={<RC4 />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;
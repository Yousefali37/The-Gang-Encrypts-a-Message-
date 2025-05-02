import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import SimplifiedDes from './Pages/Simplified Des/SimplifiedDes'
import Polyalphabetic from './Pages/Polyalphabetic/Polyalphabetic'
import Playfair from './Pages/Playfair/Playfair'
// import Hill from './Pages/Hill/Hill'
import RC4 from './Pages/RC4/RC4'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} >
          <Route path='Simplified-Des' element={<SimplifiedDes />} />
          <Route path='Playfair-Cipher' element={<Playfair />} />
          {/* <Route path='Hill-Cipher' element={<Hill />} /> */}
          <Route path='Polyalphabetic' element={<Polyalphabetic />} />
          <Route path='RC4' element={<RC4 />} />
        </Route>
      </Routes>
    </>
  )
}

export default App


 // {
    //     "name": "Hill Cipher",
    //     "description": "The Hill cipher, developed by Lester S. Hill in 1929, is a polygraphic substitution cipher that operates on blocks of plaintext using concepts from linear algebra.",
    //     "keyFeatures": [
    //         "Uses matrix multiplication for encryption and decryption",
    //         "Can encrypt multiple letters at once (determined by matrix size)",
    //         "Requires a key matrix that must be invertible modulo 26",
    //         "Strong against frequency analysis attacks"
    //     ],
    //     "implementation": "Uses a 2×2 matrix (processes 2 characters at a time). Key must be 4 letters to form the 2×2 matrix.",
    //     "encryptionProcess": [
    //         "Convert the key to a matrix K",
    //         "Split the plaintext into vectors of length 2",
    //         "For each vector v, compute K × v (mod 26)",
    //         "Convert the resulting vectors back to letters"
    //     ],
    //     "decryptionProcess": [
    //         "Calculate the inverse matrix K-1 (mod 26)",
    //         "Split the ciphertext into vectors",
    //         "For each vector v, compute K-1 × v (mod 26)",
    //         "Convert the resulting vectors back to letters"
    //     ]
    // },
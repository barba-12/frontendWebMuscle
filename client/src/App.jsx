import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5063/api/image') // cambia la porta se serve
      .then(res => res.json())
      .then(data => {
        setImages(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Errore fetch:', err)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <div className="card">
        {loading ? (
          <p>Caricamento immagini...</p>
        ) : (
          images.length > 0 ? (
            <ul>
              {images.map(img => (
                <li key={img.id}>
                  <img src={img.url} alt={img.id} />
                </li>
              ))}
            </ul>
          ) : (
            <p>Nessuna immagine trovata</p>
          )
        )}
      </div>
    </>
  )
}

export default App

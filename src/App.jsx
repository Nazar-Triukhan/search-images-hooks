import './App.css'
import Button from './Components/Button/Button'
import ImageGallery from './Components/ImageGallery/ImageGallery'
import Loader from './Components/Loader/Loader'
import Modal from './Components/Modal/Modal'
import Searchbar from './Components/Searchbar/Searchbar'
import { useContext } from 'react'
import { ImageContext } from './ImageContext'

function App() {
  const { images, isLoading, error, modal } = useContext(ImageContext)

  return (
    <>
      <Searchbar />
      {error && <p role="alert">{error}</p>}
      {isLoading && images.length === 0 && <Loader />}
      <ImageGallery />
      {isLoading && images.length > 0 && <Loader />}
      {images.length > 0 && !isLoading && <Button />}
      {modal === true && <Modal />}
    </>
  )
}

export default App

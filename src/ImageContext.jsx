import { createContext, useState } from 'react'
import { fetchImg } from './api'

export const ImageContext = createContext(null)

export function ImageProvider({ children }) {
  const [images, setImages] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [image, setImage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [modal, setModal] = useState(false)

  function hendelModal() {
    setModal(false)
  }

  async function loadImages(text, nextPage, replace = false) {
    setIsLoading(true)
    setError('')

    try {
      const result = await fetchImg(text, nextPage)
      setImages((currentImages) =>
        replace ? result.hits : [...currentImages, ...result.hits],
      )
      setPage(nextPage)
    } catch {
      setError('Не вдалося завантажити зображення. Спробуйте ще раз.')
    } finally {
      setIsLoading(false)
    }
  }

  function hendelImage(text) {
    const value = text.trim()
    if (!value) return

    setSearch(value)
    loadImages(value, 1, true)
  }

  function addPage() {
    if (search && !isLoading) loadImages(search, page + 1)
  }

  function imageBig(img) {
    setImage(img)
    setModal(true)
  }

 

  return (
    <ImageContext.Provider
      value={{
        images,
        hendelImage,
        addPage,
        imageBig,
        image,
        isLoading,
        error,
        hendelModal,
        modal,
      }}
    >
      {children}
    </ImageContext.Provider>
  )
}

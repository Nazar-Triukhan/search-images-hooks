// import { createContext, useState } from 'react'
// import { fetchImg } from './api'

// export const ImageContext = createContext(null)

// export function ImageProvider({ children }) {
//   const [images, setImages] = useState([])
//   const [search, setSearch] = useState('')
//   const [page, setPage] = useState(1)
//   const [image, setImage] = useState('')
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [modal, setModal] = useState(false)

//   function hendelModal() {
//     setModal(false)
//   }

//   async function loadImages(text, nextPage, replace = false) {
//     setIsLoading(true)
//     setError('')

//     try {
//       const result = await fetchImg(text, nextPage)
//       setImages((currentImages) =>
//         replace ? result.hits : [...currentImages, ...result.hits],
//       )
//       setPage(nextPage)
//     } catch {
//       setError('Не вдалося завантажити зображення. Спробуйте ще раз.')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   function hendelImage(text) {
//     const value = text.trim()
//     if (!value) return

//     setSearch(value)
//     loadImages(value, 1, true)
//   }

//   function addPage() {
//     if (search && !isLoading) loadImages(search, page + 1)
//   }

//   function imageBig(img) {
//     setImage(img)
//     setModal(true)
//   }

 

//   return (
//     <ImageContext.Provider
//       value={{
//         images,
//         hendelImage,
//         addPage,
//         imageBig,
//         image,
//         isLoading,
//         error,
//         hendelModal,
//         modal,
//       }}
//     >
//       {children}
//     </ImageContext.Provider>
//   )
// }



// reducer



import { createContext, useReducer } from 'react'
import { fetchImg } from './api'

export const ImageContext = createContext(null)

const initialState = {
  images: [],
  search: '',
  page: 1,
  image: '',
  isLoading: false,
  error: '',
  modal: false,
}

function imageReducer(state, action) {
  switch (action.type) {
    case 'SET_IMAGES':
      return {
        ...state,
        images: action.payload,
      }

    case 'SET_SEARCH':
      return {
        ...state,
        search: action.payload,
      }

    case 'SET_PAGE':
      return {
        ...state,
        page: action.payload,
      }

    case 'SET_IMAGE':
      return {
        ...state,
        image: action.payload,
      }

    case 'SET_ISLOADING':
      return {
        ...state,
        isLoading: action.payload,
      }

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      }

    case 'SET_MODAL':
      return {
        ...state,
        modal: action.payload,
      }

    default:
      return state
  }
}

export function ImageProvider({ children }) {
  const [state, dispatch] = useReducer(imageReducer, initialState)

  function hendelModal() {
    dispatch({
      type: 'SET_MODAL',
      payload: false,
    })
  }

  async function loadImages(text, nextPage, replace = false) {
    dispatch({
      type: 'SET_ISLOADING',
      payload: true,
    })

    dispatch({
      type: 'SET_ERROR',
      payload: '',
    })

    try {
      const result = await fetchImg(text, nextPage)

      dispatch({
        type: 'SET_IMAGES',
        payload: replace
          ? result.hits
          : [...state.images, ...result.hits],
      })

      dispatch({
        type: 'SET_PAGE',
        payload: nextPage,
      })
    } catch {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Не вдалося завантажити зображення. Спробуйте ще раз.',
      })
    } finally {
      dispatch({
        type: 'SET_ISLOADING',
        payload: false,
      })
    }
  }

  function hendelImage(text) {
    const value = text.trim()

    if (!value) return

    dispatch({
      type: 'SET_SEARCH',
      payload: value,
    })

    loadImages(value, 1, true)
  }

  function addPage() {
    if (state.search && !state.isLoading) {
      loadImages(state.search, state.page + 1)
    }
  }

  function imageBig(img) {
    dispatch({
      type: 'SET_IMAGE',
      payload: img,
    })

    dispatch({
      type: 'SET_MODAL',
      payload: true,
    })
  }

  return (
    <ImageContext.Provider
      value={{
        images: state.images,
        hendelImage,
        addPage,
        imageBig,
        image: state.image,
        isLoading: state.isLoading,
        error: state.error,
        hendelModal,
        modal: state.modal,
      }}
    >
      {children}
    </ImageContext.Provider>
  )
}
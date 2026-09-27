import { useContext } from 'react'
import { ImageContext } from '../../ImageContext'
import styles from './Modal.module.css'

function Modal() {
  const { image, hendelModal } = useContext(ImageContext)

  function hendelClose() {
    window.addEventListener("keydown", (e) => {
      if('Escape' === e.code){
        hendelModal()
      }
    })
  }

  hendelClose()
  
  

  return (
    <div className={styles.backdrop} onClick={hendelModal}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <img className={styles.image} src={image} alt="Selected image" />
      </div>
    </div>
  )
}

export default Modal

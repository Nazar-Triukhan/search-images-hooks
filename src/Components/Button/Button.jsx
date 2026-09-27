import { useContext } from 'react'
import { ImageContext } from '../../ImageContext'
import styles from './Button.module.css'

function Button() {


  const { addPage, isLoading } = useContext(ImageContext)

  return (
    <button className={styles.button} type="button" onClick={addPage} disabled={isLoading}>
      Load more
    </button>
  )
}

export default Button

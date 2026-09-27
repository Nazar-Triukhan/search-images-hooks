import { useContext, useRef } from 'react'
import { ImageContext } from '../../ImageContext'
import styles from './Searchbar.module.css'

function Searchbar() {
  const { hendelImage } = useContext(ImageContext)
  const text = useRef(null)

  function hendelSudmit(event) {
    event.preventDefault()
    hendelImage(text.current.value)
  }

  return (
    <header className={styles.header}>
      <form className={styles.form} onSubmit={hendelSudmit}>
        <input
          className={styles.input}
          type="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          ref={text}
          aria-label="Search images"
        />
        <button type="submit" className={styles.submit}>
          Search
        </button>
      </form>
    </header>
  )
}

export default Searchbar
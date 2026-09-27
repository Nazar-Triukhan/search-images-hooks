import { useContext } from 'react'
import { ImageContext } from '../../ImageContext'
import styles from './ImageGalleryItem.module.css'

function ImageGalleryItem({ image }) {
  const { imageBig } = useContext(ImageContext)

  return (
    <li className={styles.item}>
      <button
        className={styles.button}
        type="button"
        onClick={() => imageBig(image.largeImageURL)}
      >
        <img
          className={styles.image}
          src={image.webformatURL}
          alt={image.tags}
          loading="lazy"
        />
      </button>
    </li>
  )
}

export default ImageGalleryItem

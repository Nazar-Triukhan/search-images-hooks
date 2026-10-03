import { useContext } from 'react'
import { ImageContext } from '../../ImageContext'
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import styles from './ImageGallery.module.css'

function ImageGallery() {
  const { images } = useContext(ImageContext)

  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <ImageGalleryItem key={image.id + Math.random()} image={image} />
      ))}
    </ul>
  )
}

export default ImageGallery

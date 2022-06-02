import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css'

export function ImageGalleryItem({ webImage, description, openModal }) {
    return (
        <li className={styles.ImageGalleryItem}>
            <img
                src={webImage}
                alt={description}
                className={styles.ImageGalleryImage}
                onClick={openModal} />
        </li>
    );
}

ImageGalleryItem.propTypes = {
    webImage: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
};
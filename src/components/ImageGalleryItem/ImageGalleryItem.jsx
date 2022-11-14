import { useState } from 'react';
import Modal from 'components/Modal/Modal';
import {
  ImageGalleryItemEl,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  largeImageURL,
  webformatURL,
  tags,
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <ImageGalleryItemEl onClick={() => setShowModal(true)}>
        <ImageGalleryItemImage src={webformatURL} alt={tags} />
      </ImageGalleryItemEl>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          contentModal={largeImageURL}
        />
      )}
    </div>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
};

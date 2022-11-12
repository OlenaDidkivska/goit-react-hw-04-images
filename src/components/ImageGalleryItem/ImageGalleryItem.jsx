import { useState } from 'react';
import Modal from 'components/Modal/Modal';
import {
  ImageGalleryItemEl,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export default function ImageGalleryItem(largeImageURL, webformatURL, tags) {
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState('');

  const toggleModal = () => {
    setShowModal(!showModal);
    setContentModal(largeImageURL);
  };

  return (
    <ImageGalleryItemEl onClick={toggleModal}>
      <ImageGalleryItemImage src={webformatURL} alt={tags} />
      {showModal && <Modal onClose={toggleModal} contentModal={contentModal} />}
    </ImageGalleryItemEl>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
};

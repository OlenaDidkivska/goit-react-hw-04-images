import { ImageGalleryEl } from './ImageGallery.styled';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ images }) => {
  return (
    <>
      <ImageGalleryEl>
        {images &&
          images.map(item => (
            <ImageGalleryItem
              key={item.id}
              webformatURL={item.webformatURL}
              largeImageURL={item.largeImageURL}
              tag={item.tags}
            />
          ))}
      </ImageGalleryEl>
    </>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.array,
};

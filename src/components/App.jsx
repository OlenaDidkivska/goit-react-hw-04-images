import { useState, useEffect } from 'react';
import { fetchImageGallery } from 'services/api';
import { AppEl } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { ImageGalleryIdle } from './ImageGallery/ImageGallery.styled';
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    console.log(query);
    try {
      if (!query) {
        return;
      }

      setStatus('pending');

      const response = fetchImageGallery(query, page);
      console.dir(response);

      if (response.hits.length !== 0) {
        const totalPage = Math.ceil(response.totalHits / 12);
        controlLastPage(totalPage);

        const result = response.hits.map(img => {
          const { id, largeImageURL, webformatURL, tags } = img;
          return {
            id,
            largeImageURL,
            webformatURL,
            tags,
          };
        });

        setImages(state => [...state, ...result]);
        setStatus('resolved');
      }

      Promise.reject(
        new Error(
          toast.error(
            <div>
              Unfortunately, nothing was found for the query <b>{query}</b>
            </div>,
            {
              id: query,
            }
          )
        )
      );
      return setStatus('rejected');
    } catch (error) {
      console.log(error);
      setStatus('rejected');
    }
  }, [query, page]);

  const controlLastPage = totalPage => {
    const isLastPage = page >= totalPage;
    if (isLastPage) {
      toast.success('You have viewed all images!', {
        id: 'lastPage',
      });
      setShowBtn(false);
      return true;
    }
    setShowBtn(true);
    return false;
  };

  const handleFormSubmit = async ({ queryImg }) => {
    console.log(queryImg);
    if (query === queryImg) {
      toast.success('This request has already been completed');
      return;
    }

    if (queryImg === '') {
      toast.error("You didn't enter anything!");
    }

    setQuery(queryImg);
    setPage(1);
    setImages([]);
  };

  const handleGalleryButtonClick = () => {
    setPage(state => [state + 1]);
  };

  return (
    <AppEl>
      <Searchbar onSubmit={handleFormSubmit} />
      {status === 'idle' && (
        <ImageGalleryIdle>
          This is the place for the results of your search
        </ImageGalleryIdle>
      )}
      {!!images.length && (
        <ImageGallery images={images} onClick={handleGalleryButtonClick} />
      )}

      {status === 'pending' && <Loader />}

      {status === 'resolved' && showBtn && (
        <Button onClick={handleGalleryButtonClick} />
      )}

      {status === 'rejected' &&
        toast.error('Try to repeat the request.', {
          id: 'Unfortunately, nothing was found...',
        })}

      <Toaster />
    </AppEl>
  );
}

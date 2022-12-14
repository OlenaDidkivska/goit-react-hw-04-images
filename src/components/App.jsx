import { useState, useEffect } from 'react';
import { fetchImageGallery } from 'services/api';
import { AppEl } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { ImageGalleryIdle } from './ImageGallery/ImageGallery.styled';
import toast, { Toaster } from 'react-hot-toast';
import { transformResponseData } from 'helpers/transformResponseData';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    const controller = new AbortController();
    const fetchData = async () => {
      setStatus('pending');
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
      try {
        const response = await fetchImageGallery(
          query,
          page,
          controller.signal
        );

        if (response.hits.length !== 0) {
          const totalPage = Math.ceil(response.totalHits / 12);
          controlLastPage(totalPage);

          setStatus('resolved');

          const result = transformResponseData(response.hits);
          return setImages(prevstate => [...prevstate, ...result]);
        }
        setShowBtn(false);
        return setStatus('rejected');
      } catch (error) {
        setStatus('rejected');
        setShowBtn(false);
      }
    };

    fetchData();
    return () => {
      controller.abort();
    };
  }, [page, query]);

  useEffect(() => {
    if (status !== 'rejected') return;

    toast.error('Try to repeat the request.', {
      id: 'Unfortunately, nothing was found...',
    });
  }, [status]);

  const handleFormSubmit = async ({ queryImg }) => {
    if (query === queryImg && images.length !== 0) {
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
    setPage(prevstate => prevstate + 1);
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

      <Toaster />
    </AppEl>
  );
}

import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { getData } from '../utils/getPhotos';
import { Spinner } from './Loader/Loader';
import css from './App.module.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showBtnLoad, setShowBtnLoad] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    const getPhotos = async () => {
      setIsLoading(true);
      const currentPage = page;
      const per_page = 15;

      try {
        const { hits, totalHits } = await getData(query, page);

        setPhotos(photos => [...photos, ...hits]);
        setShowBtnLoad(currentPage < Math.ceil(totalHits / per_page));

        if (hits.length === 0) {
          setIsEmpty(true);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getPhotos();
  }, [query, page]);

  const setQueryValue = name => {
    if (name !== query) {
      setQuery(name);
      setPage(1);
      setPhotos([]);
      setIsEmpty(false);
      setShowBtnLoad(false);
    }
  };

  const handleAddPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const show = photos.length > 0;
  return (
    <>
      <div className={css.app}>
        <Searchbar onSubmit={setQueryValue} />
        {show && <ImageGallery data={photos} />}
        {isLoading && <Spinner />}
        {showBtnLoad && <Button onClick={handleAddPage} />}
        {error && <p>{error}</p>}
        {isEmpty && (
          <p textalign="center" className={css.warning}>
            Nothing was found for your request! Please try another fech.
          </p>
        )}
      </div>
    </>
  );
};
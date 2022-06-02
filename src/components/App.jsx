import './App.module.css';
import { useState, useEffect } from 'react';
import {ImageGallery} from 'components/ImageGallery/ImageGallery';
//import pixabayApi from 'components/Service/PixabayApi';
import {Button} from 'components/Button/Button';
import {Modal} from 'components/Modal/Modal';
import {Loader} from 'components/Loader/Loader';
import {SearchBar} from 'components/SearchBar/SearchBar';
import { fetchImages } from 'services/images-api';
import { toast } from 'react-toastify';



export function App () {
  const [searchQuery, setSearchQuery] = useState('');
  const [queryResult, setQueryResult] = useState([]);
  const [totalQueryResult, setTotalQueryResult] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    };

    setLoading(true);
    fetchImages(currentPage, searchQuery)
      .then(images => {
        if (images.hits.length === 0) {
          toast.info('No images found for this query');
          setQueryResult([]);
          setCurrentPage(1)
        }
        setQueryResult(prevState => [...prevState, ...images.hits]);
        setTotalQueryResult(images.totalHits)
      })
      .catch(response => {
        console.log(response);
      })
      .finally(() => setLoading(false))
  }, [searchQuery, currentPage]);

  function handleFormSubmit(searchQuery) {
    setSearchQuery(searchQuery);
    setQueryResult([]);
    setCurrentPage(1)
  };
  function incrementPage() {
    setCurrentPage(prevState => prevState + 1);

    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 160,
        behavior: 'smooth',
      });
    }, 500)
  };

  function toggleModal() {
    setIsModalOpen(prevState => !prevState);
    document.body.style.overflow = isModalOpen ? 'auto' : 'hidden';
  }

  function enlargeImage(clickedImage) {
    toggleModal();
    setModalImage(clickedImage);
  };

    return (
      <div className="App">

        <SearchBar onSubmit={handleFormSubmit} />
        {queryResult && (
        <ImageGallery images={queryResult} openModal={enlargeImage} />
      )}
      {isModalOpen && (
        <Modal
          largeImageURL={modalImage}
          onClose={toggleModal}
          description={searchQuery}
        />
      )}
      {loading && <Loader />}
      {queryResult.length > 11 &&
        queryResult.length !== totalQueryResult &&
        !loading && <Button onClick={incrementPage} />} 
      </div>

    );


  }

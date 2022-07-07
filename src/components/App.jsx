import { useState, useEffect} from "react";
import s from './app.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar';
import ImageGallery from "./ImageGallery";
import Modal from './Modal';
import Button from './Button';
import Loader from './Loader';
import { getPhotos } from '../shared/services/services';

const App = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [error, setError] = useState(null);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1)
  }

  const changeSearch = (el) => {
    if (el !== search) {
      setSearch(el);
      setItems([]);
      setPage(1);
    }
  };
  
  const showModal = (url, tags) => {
    setModalOpen(true)
    setModalContent({
      src: url,
      alt: tags,
    })
  };
  
  const closeModal = () => {
    setModalOpen(false)
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPhotos(search, page);
        const totalPages = Math.ceil(data.totalHits / 12);
        setItems(prevState => {
          return [...prevState, ...data.hits];
        });
        if (data.hits.length === 0) {
          return toast.error('Sorry, no images found');
        }
        if (page === totalPages) {
          return toast.info("These are all pictures. Try entering something else in the field!");
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (search) {
      fetchPosts();
    }
  }, [page, search]);

  return (
    
    
    <div className={s.app}>
      {modalOpen && (
        <Modal closeModal={closeModal}>
          <img
            src={modalContent.src}
            alt={modalContent.alt}
          />
        </Modal>
      )}
      <Searchbar onSubmit={changeSearch} />
      {!error && (
        <ImageGallery onClick={showModal} items={items} />
      )}
      {loading && <Loader />}
      {!loading && items.length >= 12 && <Button onClick={loadMore} text="Load more" />}
      <ToastContainer position="top-right" autoClose={5000} theme="dark" />
    </div>
  );
}

export default App;

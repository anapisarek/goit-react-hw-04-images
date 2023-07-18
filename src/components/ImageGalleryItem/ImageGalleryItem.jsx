import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const showModal = () => {
    setIsShowModal(!isShowModal);
  };

  return (
    <>
      <li className={css.imageGalleryItem} onClick={showModal}>
        <img
          src={webformatURL}
          alt={tags}
          className={css.imageGalleryItemImage}
        />
      </li>

      {isShowModal && (
        <Modal largeImageURL={largeImageURL} tags={tags} onClose={showModal} />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
};
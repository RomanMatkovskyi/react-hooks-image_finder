import { useState } from 'react';

import PopUp from 'components/PopUp/PopUp';

const ImageGalleryItem = ({ imgData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [tempingSrc, setTempingSrc] = useState('');

  const handleModalWindow = src => {
    setTempingSrc(src);
    setModalOpen(true);
  };

  return (
    <>
      {modalOpen && (
        <PopUp
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          tempingSrc={tempingSrc}
        />
      )}
      <li
        className="ImageGalleryItem"
        onClick={() => {
          handleModalWindow(imgData.largeImageURL);
        }}
      >
        <img
          src={imgData.webformatURL}
          alt=""
          className="ImageGalleryItem-image"
          loading="lazy"
        />
      </li>
    </>
  );
};

export default ImageGalleryItem;

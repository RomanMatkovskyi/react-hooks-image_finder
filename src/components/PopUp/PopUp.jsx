import { useEffect } from 'react';
import PropTypes from 'prop-types';

const PopUp = ({ modalOpen, setModalOpen, tempingSrc }) => {
  const onClose = () => {
    setModalOpen(false);
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      setModalOpen(false);
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    function handleKeyDown(e) {
      if (e.code === 'Escape') {
        onClose();
      }
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className={modalOpen ? 'Overlay' : 'Hidden'}
      onClick={handleBackdropClick}
    >
      <div className={modalOpen ? 'Modal' : 'Hidden'}>
        <img src={tempingSrc} alt="" className="modalImage" />
      </div>
    </div>
  );
};

export default PopUp;

PopUp.propTypes = {
  modalOpen: PropTypes.bool,
  setModalOpen: PropTypes.func,
  tempingSrc: PropTypes.string,
};

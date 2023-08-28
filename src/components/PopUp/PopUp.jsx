import { useEffect } from 'react';
import PropTypes from 'prop-types';

const PopUp = ({ modalOpen, setModalOpen, tempingSrc }) => {
  const handleKeyDown = event => {
    if (event.key === 'Escape' && modalOpen) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      className={modalOpen ? 'Overlay' : 'Hidden'}
      onClick={() => {
        setModalOpen(false);
      }}
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

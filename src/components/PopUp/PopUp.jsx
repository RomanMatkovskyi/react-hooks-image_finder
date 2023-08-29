import { useEffect } from 'react';
import PropTypes from 'prop-types';

const PopUp = ({ modalOpen, setModalOpen, tempingSrc }) => {
  useEffect(() => {
    window.addEventListener('keydown', event => {
      if (event.key === 'Escape' && modalOpen) {
        setModalOpen(false);
      }
    });

    return () => {
      window.removeEventListener('keydown', event => {
        if (event.key === 'Escape' && modalOpen) {
          setModalOpen(false);
        }
      });
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

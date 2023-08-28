import axios from 'axios';
import PropTypes from 'prop-types';

const Button = ({
  currentSearch,
  currentPage,
  loadMoreData,
  handleLoading,
}) => {
  const handleLoadMoreData = (search, currentPage) => {
    handleLoading('pending');
    let params = new URLSearchParams({
      key: '37799813-d6baa13d55c299777f9561755',
      q: search,
      orientation: 'horizontal',
      page: currentPage,
      per_page: 15,
    });
    axios
      .get(`https://pixabay.com/api/?${params}`)
      .then(imageArray => {
        if (imageArray.data.hits.length === 0) {
          handleLoading('noMore');
          return;
        }
        loadMoreData(imageArray.data.hits);
        handleLoading('resolved');
      })
      .catch(error => {
        handleLoading('rejected');
      });
  };
  var Scroll = require('react-scroll');
  var scroll = Scroll.animateScroll;
  return (
    <>
      <button
        type="button"
        className="Button"
        onClick={() => {
          handleLoadMoreData(currentSearch, currentPage);
          scroll.scrollToBottom();
        }}
      >
        Load More
      </button>
    </>
  );
};

export default Button;

Button.propTypes = {
  currentSearch: PropTypes.string,
  currentPage: PropTypes.number,
  loadMoreData: PropTypes.func,
  handleLoading: PropTypes.func,
};

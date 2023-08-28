import { useState } from 'react';
import axios from 'axios';

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

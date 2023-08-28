import { useState } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import axios from 'axios';

import SearchBar from './searchbar/searchbar';
import ImageGallery from './imageGallery/imageGallery';
import Button from './button/button';

const App = () => {
  const [data, setData] = useState([]);
  const [currentSearch, setCurrentSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(2);
  const [maxPage, setMaxPage] = useState(1);
  const [status, setStatus] = useState('idle');

  const searchForData = (search, curentPage) => {
    setCurrentPage(2);
    setStatus('pending');

    let params = new URLSearchParams({
      key: '37799813-d6baa13d55c299777f9561755',
      q: search,
      orientation: 'horizontal',
      page: curentPage,
      per_page: 15,
    });
    axios
      .get(`https://pixabay.com/api/?${params}`)
      .then(imageArray => {
        console.log(imageArray.data.totalHits);
        if (imageArray.data.totalHits > 0) {
          setMaxPage(Math.ceil(imageArray.data.totalHits / 15));
        }
        if (imageArray.data.hits.length === 0) {
          setStatus('noQuery');
          setData([]);
          return;
        }
        if (curentPage >= 2) {
          setCurrentSearch(search);
          setData(prevData => [...prevData, ...imageArray.data.hits]);
          setStatus('resolved');
        } else {
          setCurrentSearch(search);
          setData(imageArray.data.hits);
          setStatus('resolved');
        }
      })
      .catch(error => {
        setStatus('rejected');
      });
  };

  const loadMoreData = newData => {
    setCurrentPage(prevPage => (prevPage += 1));
    setData(prevData => [...prevData, ...newData]);
  };

  return (
    <>
      <SearchBar onSearch={searchForData} />
      {status === 'idle' && (
        <h1 className="Preview">Here you can find anything you want.</h1>
      )}
      {status === 'noQuery' && (
        <h1 className="Preview">
          Well, almost everything <span>&#128517;</span>
        </h1>
      )}
      {status === 'rejected' && (
        <h1 className="Error">
          Uuppppss, something went wrong... <span>&#128517;</span>
        </h1>
      )}
      {data.length !== 0 && <ImageGallery data={data} />}
      {status === 'pending' && (
        <div className="Loader">
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          />
        </div>
      )}
      {data.length !== 0 && status !== 'noMore' && maxPage >= currentPage && (
        <Button
          currentSearch={currentSearch}
          currentPage={currentPage}
          loadMoreData={loadMoreData}
          handleLoading={setStatus}
        />
      )}
    </>
  );
};

export default App;

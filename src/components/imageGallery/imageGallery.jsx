import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ data }) => {
  return (
    <ul className="ImageGallery">
      {data.map(img => (
        <ImageGalleryItem key={img.id} imgData={img} />
      ))}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  data: PropTypes.array,
};

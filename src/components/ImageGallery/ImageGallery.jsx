import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import PropTypes from "prop-types";
import s from "./imagegallery.module.css";

function ImageGallery({ items, onClick }) {
  const elements = items.map(({ id, ...rest }) => (
    <ImageGalleryItem key={id} {...rest} onClick={onClick} />
  ));
  return <ul className={s.image_gallery}>{elements}</ul>;
}

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),)
};

export default ImageGallery;
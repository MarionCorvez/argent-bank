import PropTypes from "prop-types";

export default function Features({ id, image, alt, title, description }) {
  return (
    <>
      <div className="feature-item" key={id}>
        <img src={image} alt={alt} className="feature-icon" />
        <h3 className="feature-item-title">{title}</h3>
        <p>{description}</p>
      </div>
    </>
  );
}

Features.propTypes = {
  id: PropTypes.number,
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

import React from 'react';
import './image.css';

const Image = (props) => {

    const { farm, server, id, secret, title } = props;
    const imgUrl = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;

    return (
        <div className="image-container">
            <img src={imgUrl} alt={title} title={title} />
        </div>
    );
};

export default Image;
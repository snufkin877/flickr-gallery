import React from 'react';
import Image from '../image/Image';
import './image-gallery.css';

const ImagesGallery = (props) => {
     const imagesData = props.data ? props.data.photos.photo : [];
     const imagesArray = [];

     imagesData.forEach((image, index) => {
        imagesArray.push(
            <Image
                key = {index} 
                farm = {image.farm}
                server = {image.server}
                id = {image.id}
                secret = {image.secret}
                title = {image.title}
            />
        )
     });

    return (
        <div className="image-gallery-container">
            {imagesArray}
        </div>
    );
};

export default ImagesGallery;
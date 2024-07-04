import React from "react";
import "./ImageStrip.css";

const ImageStrip = () => {
  const images = [
    "/images/dambulla_royal_cave_temple.jpg",
    "/images/ella_rock.jpg",
    "/images/galle_fort.jpg",
    "/images/pinnawala_elephant_orphanage.jpg",
    "/images/sigiriya_village_restaurant.jpg",
    "/images/sigiriya.jpg",
    "/images/temple_of_the_tooth.jpg",
    "/images/yala.jpg",
    "/images/dambulla_royal_cave_temple.jpg",
    "/images/ella_rock.jpg",
    "/images/galle_fort.jpg",
    "/images/pinnawala_elephant_orphanage.jpg",
    "/images/sigiriya_village_restaurant.jpg",
    "/images/sigiriya.jpg",
    "/images/temple_of_the_tooth.jpg",
    "/images/yala.jpg",
    "/images/dambulla_royal_cave_temple.jpg",
    "/images/ella_rock.jpg",
    "/images/galle_fort.jpg",
    "/images/pinnawala_elephant_orphanage.jpg",
    "/images/sigiriya_village_restaurant.jpg",
    "/images/sigiriya.jpg",
    "/images/temple_of_the_tooth.jpg",
    "/images/yala.jpg",

    // Add paths to your images here
  ];

  return (
    <div className="image-strip">
      <div className="image-strip-inner">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Slide ${index + 1}`} />
        ))}
        {/* Repeat the images for smooth continuous scrolling */}
        {images.map((image, index) => (
          <img
            key={index + images.length}
            src={image}
            alt={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageStrip;

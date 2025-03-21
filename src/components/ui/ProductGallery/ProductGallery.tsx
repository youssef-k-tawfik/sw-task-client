import { ChevronIcon } from "@/assets/icons";
import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string>(images[0]);

  const handleImageChange = (direction: number) => {
    const currentIndex = images.indexOf(selectedImage);
    const newIndex = (currentIndex + direction + images.length) % images.length;
    setSelectedImage(images[newIndex]);
  };

  return (
    <div
      className="w-full lg:w-2/3 pe-14 flex gap-2 justify-around h-[575px]"
      data-testid="product-gallery"
    >
      <div className="overflow-auto w-1/3 space-y-5">
        {images.map((img, index) => (
          <img
            key={`img-${index}`}
            src={img}
            alt={`product image-${index + 1}`}
            className={`object-contain w-full h-40 cursor-pointer rounded-lg p-1 ${
              selectedImage === img ? "border-2 border-primary" : ""
            }`}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>
      {/* Main image */}
      <div className="w-2/3 relative">
        <img
          src={selectedImage}
          alt="product image"
          className="w-full h-full object-contain"
        />
        {images.length > 1 && (
          <>
            <ChevronIcon variant="left" onClick={() => handleImageChange(-1)} />
            <ChevronIcon variant="right" onClick={() => handleImageChange(1)} />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;

import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string>(images[0]);

  return (
    <div className="w-full lg:w-2/3 px-4 flex gap-2 justify-around h-[575px]">
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
      <div className="w-2/3">
        <img
          src={selectedImage}
          alt="product image"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default ProductGallery;

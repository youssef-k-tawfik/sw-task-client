import { ChevronIcon } from "@/assets/icons";
import { useEffect, useRef, useState } from "react";

interface ProductGalleryProps {
  images: string[];
}

/**
 * ProductGallery component displays a gallery of product images.
 *
 * @param {string[]} images - Array of image URLs for the product.
 * @returns {JSX.Element} - Rendered ProductGallery component.
 */
const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
}): JSX.Element => {
  const [selectedImage, setSelectedImage] = useState<string>(images[0]);
  const [mainImageHeight, setMainImageHeight] = useState<number>(0);
  const mainImageRef = useRef<HTMLImageElement>(null);

  /**
   * Handles the image load event to set the height of the main image.
   * @param event - The load event from the image element.
   */
  const handleOnMainImageLoad = (
    event: React.SyntheticEvent<HTMLImageElement>
  ) => {
    const img = event.currentTarget;
    if (img.src === images[0]) {
      setMainImageHeight(
        img.naturalHeight * (img.clientWidth / img.naturalWidth)
      );
    }
  };

  // calculate the height when the image is cached
  // and when the window is resized
  useEffect(() => {
    const calcHeight = () => {
      setSelectedImage(images[0]);
      const img = mainImageRef.current;
      if (img) {
        setMainImageHeight(
          img.naturalHeight * (img.clientWidth / img.naturalWidth)
        );
      }
    };

    calcHeight();

    window.addEventListener("resize", calcHeight);
    return () => {
      window.removeEventListener("resize", calcHeight);
    };
  }, [images]);

  /**
   * Handles the image change when the user clicks on the chevron icons.
   * @param direction - negative 1 for previous image, positive 1 for next image
   */
  const handleImageChange = (direction: number) => {
    const currentIndex = images.indexOf(selectedImage);
    const newIndex = (currentIndex + direction + images.length) % images.length;
    setSelectedImage(images[newIndex]);
  };

  return (
    <div
      className="w-full lg:w-2/3 lg:pe-14 flex gap-2 justify-around transition-all duration-300 ease-in-out"
      data-testid="product-gallery"
    >
      <div
        className="overflow-y-auto w-1/4 space-y-4"
        style={{ maxHeight: mainImageHeight || "auto" }}
      >
        {images.map((img, index) => (
          <img
            key={`img-${index}`}
            src={img}
            alt={`product image-${index + 1}`}
            className="object-contain w-full cursor-pointer p-2"
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>
      {/* Main image */}
      <div
        className="w-3/4 relative"
        style={{ height: mainImageHeight || "auto" }}
      >
        <img
          src={selectedImage}
          ref={mainImageRef}
          onLoad={handleOnMainImageLoad}
          alt="selected product image"
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

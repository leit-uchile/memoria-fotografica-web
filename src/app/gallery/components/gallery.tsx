import PhotoAlbum from "react-photo-album";

const PhotoGallery: React.FC<{
  photos: Array<{
    src: string;
    height: number;
    width: number;
    title: string;
    id: string;
  }>;
}> = ({ photos }) => {
  return (
    <PhotoAlbum layout="rows" photos={photos} onClick={(e) => console.log(e)} />
  );
};

export default PhotoGallery;
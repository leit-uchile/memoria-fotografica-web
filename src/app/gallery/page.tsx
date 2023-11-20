"use client";

import RectangleSkeleton from "@/components/animate/RectangleSkeleton";
import { fetchPhotos } from "@/services/fetch";
import { useRouter } from "next/navigation";
import PhotoAlbum from "react-photo-album";
import useSWR from "swr";

const LoadingGallery = () => (
  <div className="flex flex-col space-y-4">
    <div className="flex h-60 w-full space-x-4">
      <RectangleSkeleton sizeClasses="w-96 h-60" />
      <RectangleSkeleton sizeClasses="w-96 h-60" />
      <RectangleSkeleton sizeClasses="w-96 h-60" />
    </div>
    <div className="flex h-60 w-full space-x-4">
      <RectangleSkeleton sizeClasses="w-96 h-60" />
      <RectangleSkeleton sizeClasses="w-96 h-60" />
      <RectangleSkeleton sizeClasses="w-96 h-60" />
    </div>
    <div className="flex h-60 w-full space-x-4">
      <RectangleSkeleton sizeClasses="w-96 h-60" />
      <RectangleSkeleton sizeClasses="w-96 h-60" />
      <RectangleSkeleton sizeClasses="w-96 h-60" />
    </div>
  </div>
);

export default function Gallery() {
  
  const { data: photos, isValidating } = useSWR("gallery", fetchPhotos);

  const parsedPhotos =
    photos?.map((photo: any) => ({
      src: photo.imgSrc,
      width: photo.properties.width,
      height: photo.properties.height,
      title: photo.title,
      idReference: photo.id,
    })) ?? [];

  const router = useRouter();

  // Pick 10 random photos
  const randomPhotos = photos?.sort(() => 0.5 - Math.random()).slice(0, 10);
  console.log(randomPhotos);

  return (
    <div className="relative bg-gray-900">
      {isValidating ? (
        <div
          aria-hidden="true"
          className="overflow-hidden bg-gray-500 bg-blend-darken parallax p-4"
        >
          <LoadingGallery />
        </div>
      ) : (
        <>
          {/* Decorative image and overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden parallax bg-gray-500 bg-blend-darken"
          ></div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gray-900 opacity-50"
          />
          <div className="relative mx-auto max-w-7xl bg-white px-3 py-3">
            <PhotoAlbum
              layout="rows"
              photos={parsedPhotos}
              onClick={(e) => router.push(`/gallery/${e.index}`)}
            />
          </div>
        </>
      )}
    </div>
  );
}

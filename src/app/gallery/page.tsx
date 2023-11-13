"use client";

import { useRouter } from "next/navigation";
import PhotoAlbum from "react-photo-album";
import useSWR from "swr";

async function fetchPhotos() {
  const res = await fetch("http://localhost:3000/fixtures/gallery.json");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function Gallery() {
  const { data: photos, isValidating } = useSWR("gallery", fetchPhotos);

  const parsedPhotos =
    photos?.map((photo: any) => ({
      src: photo.imgSrc,
      width: photo.properties.width,
      height: photo.properties.height,
      title: photo.title,
    })) ?? [];

  const router = useRouter();

  return (
    <div className="relative bg-gray-900">
      {/* Decorative image and overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden parallax"
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
    </div>
  );
}

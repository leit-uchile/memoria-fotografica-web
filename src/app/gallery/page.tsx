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
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-20">
      <PhotoAlbum
        layout="rows"
        photos={parsedPhotos}
        onClick={(e) => router.push(`/gallery/${e.index}`)}
      />
    </div>
  );
}

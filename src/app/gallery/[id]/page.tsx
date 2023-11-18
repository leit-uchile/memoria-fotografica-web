'use client'
import Photo from "./components/photo";
import { useRouter, useParams } from "next/navigation";
import useSWR from "swr";

async function fetchPhotos(index: string) {
  const res = await fetch("http://localhost:3000/fixtures/gallery.json");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const parsed = await res.json();

  return parsed[index];
}

export default function PhotoPage() {
  const query = useParams();

  const currentPhotoId = query.id;

  const { data: currentPhoto, isValidating } = useSWR(currentPhotoId, () =>
    fetchPhotos(currentPhotoId ?? "0"),
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-20">
      {!isValidating && <Photo photo={currentPhoto} loading={isValidating} />}
    </div>
  );
}

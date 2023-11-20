"use client";

import { fetchPhotoDetail } from "@/services/fetch";
import Photo from "./components/photo";
import { useRouter, useParams } from "next/navigation";
import useSWR from "swr";

export default function PhotoPage() {
  const query = useParams();

  const currentPhotoId = query.id;

  const { data: currentPhoto, isValidating } = useSWR(
    currentPhotoId,
    () => fetchPhotoDetail(currentPhotoId ?? "0"),
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

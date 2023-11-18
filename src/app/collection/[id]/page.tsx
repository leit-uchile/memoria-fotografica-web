"use client";

import { useRouter, useParams } from "next/navigation";

async function fetchCollections(collectionId: string) {
  const res = await fetch("http://localhost:3000/fixtures/collections.json");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const parsed = await res.json();

  return parsed[collectionId];
}

async function fetchPhotos() {
  const res = await fetch("http://localhost:3000/fixtures/gallery.json");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Collection() {
  const params = useParams();
  const router = useRouter();

  const collection = await fetchCollections(params.id);

  const photos = await fetchPhotos();

  // Pick 10 random photos
  const randomPhotos = (
    photos?.map((photo: any, index: number) => ({
      ...photo,
      href: `/gallery/${index}`,
    })) ?? []
  )
    ?.sort(() => 0.5 - Math.random())
    .slice(0, 10);

  return (
    <div className="bg-white">
      <div aria-hidden="true" className="relative">
        <img
          src={collection.imgSrc}
          alt=""
          className="h-96 w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white" />
      </div>

      <div className="relative mx-auto -mt-12 max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {collection.title}
          </h2>
          <p className="mt-4 text-gray-500">{collection.description}</p>
        </div>

        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
          {randomPhotos.map((photo: any) => (
            <div key={photo.title} className="border-t border-gray-200 pt-4">
              <img
                src={photo.imgSrc}
                alt=""
                className="mt-2 h-64 w-full object-cover object-center"
              />
              <dt className="font-medium text-gray-900">{photo.title}</dt>
              <dd className="mt-2 text-sm text-gray-500">
                {photo.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

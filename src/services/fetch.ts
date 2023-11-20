export async function fetchPhotos() {
  const res = await fetch("http://localhost:3000/fixtures/gallery.json");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function fetchPhotoDetail(index: string) {
  const res = await fetch("http://localhost:3000/fixtures/gallery.json");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const parsed = await res.json();

  return parsed[index];
}


export async function fetchCollections() {
  const res = await fetch("http://localhost:3000/fixtures/collections.json");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function fetchCollectionDetail(collectionId: string) {
  const res = await fetch("http://localhost:3000/fixtures/collections.json");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const parsed = await res.json();

  return parsed[collectionId];
}

export async function fetchCampuses(){
  const res = await fetch("http://localhost:3000/fixtures/campuses.json");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();

}

export async function fetchTags(){
  const res = await fetch("http://localhost:3000/fixtures/tags.json");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function fetchTagDetails(index: string) {
  const res = await fetch("http://localhost:3000/fixtures/tags.json");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const parsed = await res.json();

  return parsed[index];
}
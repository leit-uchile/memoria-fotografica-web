const posts = [
  {
    id: 1,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    author: {
      name: "Michael Foster",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  // More posts...
];

const defaultAuthor = {
  name: "Biblioteca Central",
  imageUrl:
    "https://ucampus.uchile.cl/d/r/usuario/9d/9d4438c4ec735ef3b745b3b369a43216/perfil/3ee573197dde61aad94aa26359acb3d6.jpg",
}

async function fetchCollections() {
  const res = await fetch("http://localhost:3000/fixtures/collections.json");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Collection() {

  const collections = await fetchCollections();
  const mappedCollections = collections.map((collection: any, index: number) => ({
    ...collection,
    href: `/collection/${index}`,
    imageUrl: collection.imgSrc,
    imageAlt: collection.title,
    datetime: collection.date,
    author: defaultAuthor,
  }));

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Colecciones de la Biblioteca Central
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Explora las colecciones oficiales de la Biblioteca Central y
            colecciones recepcionadas a partir de donaciones de nuestra
            comunidad.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {mappedCollections.map((collection: any) => (
            <article
              key={collection.id}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
            >
              <img
                src={collection.imageUrl}
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

              <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                <time dateTime={collection.datetime} className="mr-8">
                  {collection.date}
                </time>
                <div className="-ml-4 flex items-center gap-x-4">
                  <svg
                    viewBox="0 0 2 2"
                    className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50"
                  >
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <div className="flex gap-x-2.5">
                    <img
                      src={collection.author.imageUrl}
                      alt=""
                      className="h-6 w-6 flex-none rounded-full bg-white/10"
                    />
                    {collection.author.name}
                  </div>
                </div>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                <a href={collection.href}>
                  <span className="absolute inset-0" />
                  {collection.title}
                </a>
              </h3>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

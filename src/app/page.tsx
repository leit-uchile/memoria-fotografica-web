import Image from "next/image";

const categories = [
  {
    name: "Casa Central",
    href: "#",
    imageSrc:
      "https://www.duna.cl/media/2015/08/universidad-de-chile.jpg",
  },
  {
    name: "Tecnologia",
    href: "#",
    imageSrc:
      "https://media.elmostrador.cl/2016/06/fut-1-700x434.jpg",
  },
  {
    name: "Deportes",
    href: "#",
    imageSrc:
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.deporteazul.cl%2Fmain_wp%2Fwp-content%2Fuploads%2F2020%2F08%2FWhatsApp-Image-2020-08-12-at-12.26.51.jpeg&f=1&nofb=1&ipt=7134369cfd15784b8aaaef7ff24e79d636fc9d68e7606a66b93fbcc3730523a7&ipo=images",
  },
  {
    name: "Ciencia",
    href: "#",
    imageSrc:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Ynl7g-2_5flHOlLTEvWgTQHaJ4%26pid%3DApi&f=1&ipt=9dc46857d0a15fa6b5fafd13a349d502963cda3aab075368999eb17fb8740ca7&ipo=images",
  },
  {
    name: "Social",
    href: "#",
    imageSrc:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.theclinic.cl%2Fwp-content%2Fuploads%2F2014%2F10%2F1980-Pedag%25C3%25B2gico-Uchile-Protesta-por-robo-de-un-diario-mural-Junio_2-e1412871361264.jpg&f=1&nofb=1&ipt=12aadd23afb6fcdba155a78149417c079a92aa5285ca346cc71d98c9974f985d&ipo=images",
  },
];

const collections = [
  {
    name: "Andres Bello",
    href: "#",
    imageSrc:
      "https://revistasantiago.cl/cms/wp-content/uploads/2020/08/andresbello-diarioavance.jpg",
    imageAlt:
      "Imagen de Andréss Bello",
    description:
      "Retrato de Andrés Bello, primer rector de la Universidad de Chile.",
  },
  {
    name: "Nicanor Parra",
    href: "#",
    imageSrc:
      "https://www.poblanerias.com/wp-content/archivos/2018/01/0123-Nicanor-Parra.jpg",
    imageAlt:
      "Fotografia en blanco y negro de Nicanor Parra",
    description:
      "Profesor Emerito, antipoeta, Nicanor Parra y su historia con la casa de bello.",
  },
  {
    name: "Focus Collection",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-01-collection-03.jpg",
    imageAlt:
      "Person placing task list card into walnut card holder next to felt carrying case on leather desk pad.",
    description:
      "Be more productive than enterprise project managers with a single piece of paper.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero section */}
      <div className="relative bg-gray-900">
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <Image
            src="/assets/frontis_background.jpg"
            alt=""
            width={1920}
            height={1280}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gray-900 opacity-50"
        />

        {/* Navigation */}

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
          <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
            Memoria fotografica
          </h1>
          <p className="mt-4 text-xl text-white">
            La historia de la Universidad de Chile en imágenes.
          </p>
          <a
            href="#"
            className="mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
          >
            Descubre la historia
          </a>
        </div>
      </div>

      <main>
        {/* Category section */}
        <section
          aria-labelledby="category-heading"
          className="pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8"
        >
          <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
            <h2
              id="category-heading"
              className="text-2xl font-bold tracking-tight text-gray-900"
            >
              Explorar por categoría
            </h2>
            <a
              href="#"
              className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
            >
              Ver todas las categorías
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>

          <div className="mt-4 flow-root">
            <div className="-my-2">
              <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
                <div className="absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                  {categories.map((category) => (
                    <a
                      key={category.name}
                      href={category.href}
                      className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                    >
                      <span aria-hidden="true" className="absolute inset-0">
                        <img
                          src={category.imageSrc}
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                      />
                      <span className="relative mt-auto text-center text-xl font-bold text-white">
                        {category.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 px-4 sm:hidden">
            <a
              href="#"
              className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Ver todas las categorías
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </section>

        {/* Featured section */}
        <section
          aria-labelledby="social-impact-heading"
          className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-32 lg:px-8"
        >
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0">
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffen.uchile.cl%2Fuploads%2Fimages%2Fimages%2FDSC_0011.jpg&f=1&nofb=1&ipt=0de84a61fc7478198d224db028abab03e83bb70222a11ec6507e291c13cd0e98&ipo=images"
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="relative bg-gray-900 bg-opacity-75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
              <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                <h2
                  id="social-impact-heading"
                  className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
                >
                  <span className="block sm:inline">Que es </span>
                  <span className="block sm:inline">Memoria fotografica</span>
                </h2>
                <p className="mt-3 text-xl text-white">
                  El proyecto de memoria fotográfica de la Universidad de Chile
                  es un proyecto estudiantil impulsado por la Biblioteca Central
                  del campus Beauchef con el objectivo de recuperar y compartir
                  la historia de la Universidad a través de materia audiovisual.
                </p>
                <a
                  href="#"
                  className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
                >
                  Aporta aqui
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Collection section */}
        <section
          aria-labelledby="collection-heading"
          className="mx-auto max-w-xl px-4 pt-24 sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8"
        >
          <h2
            id="collection-heading"
            className="text-2xl font-bold tracking-tight text-gray-900"
          >
            Explorar por colección
          </h2>
          <p className="mt-4 text-base text-gray-300">
            Explora las colecciones y aportes de diferentes autores
            colaboradores de la Universidad de Chile.
          </p>

          <div className="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
            {collections.map((collection) => (
              <a
                key={collection.name}
                href={collection.href}
                className="group block"
              >
                <div
                  aria-hidden="true"
                  className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg lg:aspect-h-6 lg:aspect-w-5 group-hover:opacity-75"
                >
                  <img
                    src={collection.imageSrc}
                    alt={collection.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-4 text-base font-semibold text-gray-900">
                  {collection.name}
                </h3>
                <p className="mt-2 text-sm text-gray-300">
                  {collection.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Featured section */}
        <section
          aria-labelledby="comfort-heading"
          className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
        >
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0">
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fagronomia.uchile.cl%2Fdam%2Fjcr%3Adf1cde97-249a-4b4f-9c27-47c7509598b8%2Fhistoria7.jpg&f=1&nofb=1&ipt=edd0401ace8727b6b16496d1bf23221edc277a48e52e67a65728185bfd9969cb&ipo=images"
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="relative bg-gray-900 bg-opacity-75 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
              <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                <h2
                  id="comfort-heading"
                  className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
                >
                  Historia la hacemos todos
                </h2>
                <p className="mt-3 text-xl text-white">
                  La historia de la Universidad de Chile es la historia de
                  todos, y es por eso que queremos que todos puedan ser parte
                  de ella. ¿Quieres aportar con tus fotos? Contactanos!
                </p>
                <a
                  href="#"
                  className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
                >
                  Contactanos
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

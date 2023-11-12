import RectangleSkeleton from "@/components/animate/RectangleSkeleton";

type PhotoProps = {
  photo: {
    imgSrc: string;
    title: string;
    date: string;
    description: string;
    properties: {
      code: string;
      cc: string;
      width: number;
      height: number;
      album: string;
      author: string;
      location: string;
      campus: string;
      format: string;
      process: string;
      support: string;
      photoTechnique: string;
      tone: string;
    };
  };
  loading?: boolean;
};

const LoadingSideComponent: React.FC = () => (
  <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
    <dl className="flex flex-wrap flex-col">
      <div className="flex-auto px-6 py-6 space-y-4">
        <dt className="text-sm font-semibold leading-6 text-gray-900">
          Título
        </dt>
        <RectangleSkeleton />
        <RectangleSkeleton />
        <RectangleSkeleton />
      </div>

      <div className="flex-auto px-6 py-6 space-y-4 gap-x-4 border-t border-gray-900/5">
        <RectangleSkeleton />
        <RectangleSkeleton />
        <RectangleSkeleton />
        <RectangleSkeleton />
        <RectangleSkeleton />
      </div>

      <div className="flex-auto px-6 py-6 space-y-4 gap-x-4 border-t border-gray-900/5">
        <RectangleSkeleton />
        <RectangleSkeleton />
        <RectangleSkeleton />
        <RectangleSkeleton />
      </div>
    </dl>
  </div>
);

const Photo: React.FC<PhotoProps> = ({
  photo: { imgSrc, title, date, description, properties },
  loading,
}) => (
  <section>
    <div className="mx-auto max-w-7xl lg:px-8">
      <div className="mx-auto flex max-w-2xl flex-col items-start justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
        <div className="w-full lg:max-w-3xl lg:flex-auto">
          {loading ? (
            <RectangleSkeleton sizeClasses="h-[34.5rem]" />
          ) : (
            <img
              src={imgSrc}
              alt={title}
              className="aspect-[6/5] w-full rounded-2xl bg-gray-50 object-cover lg:aspect-auto lg:h-[34.5rem]"
            />
          )}
          <div className="mt-10 text-justify">
            <h2 className="font-bold uppercase">Contexto del documento</h2>
            {loading ? (
              <RectangleSkeleton sizeClasses="h-24" />
            ) : (
              <p className="mt-2">{description}</p>
            )}
          </div>
          <div className="mt-8 text-justify">
            <h2 className="font-bold uppercase">Trayectoria del documento</h2>
            <p className="mt-2">
              Documento perteneciente a la Biblioteca Central de la Facultad de
              Ciencias Físicas y Matemáticas de la Universidad de Chile.
            </p>
          </div>
        </div>

        <div className="w-full lg:max-w-xs lg:flex-auto">
          <div className="lg:col-start-3 lg:row-end-1">
            {loading ? (
              <LoadingSideComponent />
            ) : (
              <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                <dl className="flex flex-wrap">
                  <div className="flex-auto pl-6 pt-6">
                    <dt className="text-sm font-semibold leading-6 text-gray-900">
                      Título
                    </dt>
                    {loading ? (
                      <RectangleSkeleton />
                    ) : (
                      <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">
                        {title}
                      </dd>
                    )}
                  </div>
                  <div className="flex-none self-end px-6 pt-4">
                    <dt className="sr-only">CC</dt>
                    <dd className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-black ring-2 ring-inset ring-black">
                      {properties.cc}
                    </dd>
                  </div>
                  <div className="mt-4 flex w-full flex-none px-6">
                    <dt className="flex-none">
                      <span className="sr-only">Date</span>
                    </dt>
                    <dd className="text-sm leading-6 text-gray-500">
                      <time dateTime="2023-01-31">{date}</time>
                    </dd>
                  </div>

                  <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                    <dt className="flex-none">
                      <span className="sr-only">Dimentions</span>
                    </dt>
                    <dd className="text-sm leading-6 text-gray-900">
                      <span className="font-bold">Dimenciones:</span>{" "}
                      {properties.width}cm x {properties.height}cm
                    </dd>
                  </div>
                  <div className="flex w-full flex-none gap-x-4 px-6 pt-6">
                    <dt className="flex-none">
                      <span className="sr-only">Album</span>
                    </dt>
                    <dd className="text-sm leading-6 text-gray-900">
                      <span className="font-bold">Álbum:</span>{" "}
                      {properties.album}
                    </dd>
                  </div>
                  <div className="flex w-full flex-none gap-x-4 px-6 pt-6">
                    <dt className="flex-none">
                      <span className="sr-only">Author</span>
                    </dt>
                    <dd className="text-sm leading-6 text-gray-900">
                      <span className="font-bold">Autor:</span>{" "}
                      {properties.author}
                    </dd>
                  </div>
                  <div className="flex w-full flex-none gap-x-4 px-6 pt-6">
                    <dt className="flex-none">
                      <span className="sr-only">Location</span>
                    </dt>
                    <dd className="text-sm leading-6 text-gray-900">
                      <span className="font-bold">Ubicación:</span>{" "}
                      {properties.location}
                    </dd>
                  </div>
                  <div className="flex w-full flex-none gap-x-4 px-6 pt-6">
                    <dt className="flex-none">
                      <span className="sr-only">Campus</span>
                    </dt>
                    <dd className="text-sm leading-6 text-gray-900">
                      <span className="font-bold">Campus:</span>{" "}
                      {properties.campus}
                    </dd>
                  </div>

                  <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                    <dt className="flex-none">
                      <span className="sr-only">Format</span>
                    </dt>
                    <dd className="text-sm leading-6 text-gray-900">
                      <span className="font-bold">Formato:</span>{" "}
                      {properties.format}
                    </dd>
                  </div>
                  <div className="flex w-full flex-none gap-x-4 px-6 pt-6">
                    <dt className="flex-none">
                      <span className="sr-only">Process</span>
                    </dt>
                    <dd className="text-sm leading-6 text-gray-900">
                      <span className="font-bold">Proceso fotográfico:</span>{" "}
                      {properties.process}
                    </dd>
                  </div>
                  <div className="flex w-full flex-none gap-x-4 px-6 pt-6">
                    <dt className="flex-none">
                      <span className="sr-only">Soporte</span>
                    </dt>
                    <dd className="text-sm leading-6 text-gray-900">
                      <span className="font-bold">Soporte:</span>{" "}
                      {properties.support}
                    </dd>
                  </div>
                  <div className="flex w-full flex-none gap-x-4 px-6 pt-6">
                    <dt className="flex-none">
                      <span className="sr-only">Tecnica</span>
                    </dt>
                    <dd className="text-sm leading-6 text-gray-900">
                      <span className="font-bold">Técnica fotográfica:</span>{" "}
                      {properties.photoTechnique}
                    </dd>
                  </div>
                  <div className="flex w-full flex-none gap-x-4 px-6 pt-6">
                    <dt className="flex-none">
                      <span className="sr-only">Tono</span>
                    </dt>
                    <dd className="text-sm leading-6 text-gray-900">
                      <span className="font-bold">Tono:</span> {properties.tone}
                    </dd>
                  </div>
                </dl>
                <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                  <a
                    href="#"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Solicitar fotografía <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Photo;

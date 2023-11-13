"use client";

import RectangleSkeleton from "@/components/animate/RectangleSkeleton";
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import useSWR from "swr";

async function fetchPhotos(index: string) {
  const res = await fetch("http://localhost:3000/fixtures/gallery.json");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const parsed = await res.json();

  return parsed[index];
}

const ContactForm: React.FC = () => {
  const query = useParams();
  const currentPhotoId = query.id;

  const isRequesting = currentPhotoId !== undefined;

  const { data: currentPhoto, isValidating } = useSWR(currentPhotoId, () =>
    fetchPhotos(currentPhotoId ?? "0"),
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <div className="relative isolate bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
              <svg
                className="absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                    width={200}
                    height={200}
                    x="100%"
                    y={-1}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" strokeWidth={0} fill="white" />
                <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                  fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Formulario de contacto
            </h2>
            <p className="mt-6 text-lg text-justify leading-8 text-gray-600">
              La Biblioteca Central de la FCFM, respondiendo a su misión de
              centralizar, sistematizar y poner a disposición información de
              interés para la comunidad, ofrece al público una recopilación de
              fotografías que evocan la historia de la Escuela de InJeniería de
              la Universidad de Chile, de quienes han pasado por ella y de los
              hitos que han marcado su trayectoria desde sus comienzos hasta la
              actualidad.
              <br></br>
              Los contenidos de este portal están protegidos por la Ley 17.336
              sobre Propiedad Intelectual, por lo que la Universidad sólo puede
              conceder licencias de uso respecto de las imágenes sobre las que
              tiene titularidad. Cuando sean solicitadas licencias sobre
              materiales ajenos a la misma, se remitirá al usuario la
              información de su respectivo titular para que este pueda dirigirse
              ante quien corresponda.
            </p>
            <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <BuildingOffice2Icon
                    className="h-7 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </dt>
                <dd>
                  Beauchef 850
                  <br />
                  Santiago, Chile
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <PhoneIcon
                    className="h-7 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </dt>
                <dd>
                  <a className="hover:text-gray-900" href="tel:+56229784249">
                    +562 2978 4249
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <EnvelopeIcon
                    className="h-7 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </dt>
                <dd>
                  <a
                    className="hover:text-gray-900"
                    href="mailto:referencia@ing.uchile.cl"
                  >
                    referencia@ing.uchile.cl
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <form
          action="#"
          method="POST"
          className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48"
        >
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Nombre
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <UserIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Apellidos
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <UserIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <EnvelopeIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Número de contacto
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <PhoneIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="tel"
                    name="phone-number"
                    id="phone-number"
                    autoComplete="tel"
                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Mensaje
                </label>
                <div className="mt-2.5">
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>
              <>
                {isRequesting && !isValidating ? (
                  <>
                    <div className="sm:col-span-2 relative flex items-start">
                      <div className="w-1/3 relative bg-gray-50 rounded-md rounded-r-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
                        <label
                          htmlFor="photo-code"
                          className="block text-xs font-medium text-gray-900"
                        >
                          Código de la fotografía
                        </label>
                        <input
                          type="text"
                          name="photo-code"
                          id="photo-code"
                          className="block w-full border-0 p-0 text-gray-500 bg-gray-50 cursor-not-allowed placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          value={currentPhoto?.code ?? "N/A"}
                          disabled
                        />
                      </div>
                      <div className="w-2/3 relative bg-gray-50 rounded-md rounded-l-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
                        <label
                          htmlFor="photo-title"
                          className="block text-xs font-medium text-gray-900"
                        >
                          Título de la fotografía solicitada
                        </label>
                        <input
                          type="text"
                          name="photo-title"
                          id="photo-title"
                          className="block w-full border-0 p-0 text-gray-500 bg-gray-50 cursor-not-allowed placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          value={currentPhoto?.title ?? "N/A"}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2 relative flex items-start">
                      <div className="flex h-6 items-center">
                        <input
                          id="terms"
                          aria-describedby="terms-description"
                          name="terms"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          aria-invalid="true"
                        />
                      </div>
                      <div className="ml-3 text-sm leading-6">
                        <label
                          htmlFor="terms"
                          className="font-medium text-gray-900"
                        >
                          He leído y acepto los{" "}
                          <a href="#" className="text-indigo-600">
                            Términos y Condiciones
                          </a>
                        </label>{" "}
                        <span id="terms-description" className="text-gray-500">
                          <span className="sr-only">Terms of Service</span>
                        </span>
                      </div>
                    </div>
                  </>
                ) : isRequesting && isValidating ? (
                  <div className="sm:col-span-2">
                    <RectangleSkeleton sizeClasses="w-full h-[3.5rem]" />
                  </div>
                ) : null}
              </>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Enviar mensaje
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;

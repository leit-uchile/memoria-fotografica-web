"use client";

import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Select from "react-select";
import Creatable from "react-select/creatable";

const options = [
  { value: "Alumno", label: "Alumno" },
  { value: "Ex Alumno", label: "Ex Alumno" },
  { value: "Academico", label: "Academico" },
  { value: "Ex Academico", label: "Ex Academico" },
  { value: "Funcionario", label: "Funcionario" },
  { value: "Externo a la comunidad", label: "Externo a la comunidad" },
];

const cc_options = [
  { value: "CC BY", label: "Atribución" },
  { value: "CC BY-SA", label: "Atribución, Compartir Igual" },
  { value: "CC BY-ND", label: "Atribución, Sin Derivadas" },
  { value: "CC BY-NC", label: "Atribución, No Comercial" },
  { value: "CC BY-NC-SA", label: "Atribución, No Comercial, Compartir Igual" },
  { value: "CC BY-NC-ND", label: "Atribución, No Comercial, Sin Derivadas" },
];

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback(
    (e: any /*  */) => console.log("sending data", e),
    []
  );

  if (false) {
    // TODO: Condicion de formulario cerrado por curadores
    return (
      <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon
              className="h-5 w-5 text-yellow-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Nuestro equipo se encuentra con alta demanda, por lo que el formulario de aportación de fotografías se encuentra cerrado. Disculpe las molestias.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Información de contacto
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Esta información es necesaria para que memoria fotografica pueda
              contactarte por derechos de autor.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nombre
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mainmf-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Apellido
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mainmf-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="personal-role"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ¿Cómo describirias tu rol en la comunidad ?
              </label>
              <div className="mt-2 text-gray-600">
                <Select
                  isMulti
                  options={options}
                  noOptionsMessage={() => "No hay opciones"}
                  placeholder="Selecciona una o más opciones"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Correo electrónico
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mainmf-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Fotografías
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Ingresa aqui la información de la o las fotografías que quieres
              aportar.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="sm:col-span-full">
              <label
                htmlFor="personal-role"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ¿Con qué derechos de Creative Commons quieres compartir las
                imágenes?
              </label>
              <div className="mt-2 text-gray-600">
                <Select
                  options={cc_options}
                  noOptionsMessage={() => "No hay opciones"}
                  placeholder="Selecciona derechos de autor"
                />
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Cuéntanos sobre la foto o las fotos que quieres aportar
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mainmf-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Puedes contarnos cuando fue tomada, donde, por quien, etc.
              </p>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Fotografía(s)
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-mainmf-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-mainmf-600 focus-within:ring-offset-2 hover:text-mainmf-500"
                    >
                      <span>Sube una fotografía</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">o arrastrala a la plataforma</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF hasta 20MB
                  </p>
                </div>
              </div>
            </div>

            <div className="sm:col-span-full">
              <label
                htmlFor="personal-role"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Palabras clave para describir la fotografía
              </label>
              <div className="mt-2 text-gray-600">
                <Creatable
                  isMulti
                  noOptionsMessage={() => "No hay opciones"}
                  placeholder="Ingresa una o más palabras clave"
                  isClearable
                  formatCreateLabel={(inputValue) => `Crear "${inputValue}"`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              ¿Quieres recibir información de nosotros?
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Por favor selecciona las opciones que te interesan.
            </p>
          </div>

          <div className="max-w-2xl space-y-10 md:col-span-2">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                Sobre mi fotografía
              </legend>
              <div className="mt-6 space-y-6">
                {/*                 <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-mainmf-600 focus:ring-mainmf-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="comments"
                      className="font-medium text-gray-900"
                    >
                      Comentarios
                    </label>
                    <p className="text-gray-500">
                      Notificarme cuando alguien comente en mi foto.
                    </p>
                  </div>
                </div> */}
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-mainmf-600 focus:ring-mainmf-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="candidates"
                      className="font-medium text-gray-900"
                    >
                      Aclaración de derechos de autor
                    </label>
                    <p className="text-gray-500">
                      Notificarme cuando alguien quiera usar mi foto.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-mainmf-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-mainmf-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mainmf-600"
        >
          Enviar
        </button>
      </div>
    </form>
  );
}

export default function Donate() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <Form />
    </div>
  );
}

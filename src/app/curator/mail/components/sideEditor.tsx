import SimpleTextArea from "@/components/SimpleTextArea";
import { fetchPhotoDetail } from "@/services/fetch";
import { Dialog, Transition } from "@headlessui/react";
import { PaperClipIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import useSWR from "swr";

type FormFields = {
  answer: string;
  archived: boolean;
};

const defaultForm = {
  answer: "",
  archived: false,
};

export default function SideEditor({
  open,
  setOpen,
  onSave,
  mail,
}: {
  open: boolean;
  setOpen: any;
  onSave: (formFields: FormFields) => void;
  mail?: MailProps;
}) {
  const [formFields, setFormFields] = useState<FormFields>(defaultForm);
  const requestedPhotoId = mail?.photoCode ?? "0"; // TODO: Change this to the correct field
  const { data: requestedPhoto } = useSWR(
    requestedPhotoId,
    () => fetchPhotoDetail("0"),
    {
      revalidateOnFocus: false,
    }
  ); // TODO: Change this to the correct field

  useEffect(() => {
    setFormFields({
      answer: mail?.answer ?? "",
      archived: mail?.archived ?? false,
    });
  }, [mail]);

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleArchivedChange = () => {
    setFormFields((prevFields) => ({
      ...prevFields,
      archived: !prevFields.archived,
    }));
  };

  const handleOnSave = () => {
    onSave(formFields);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="bg-mainmf-700 px-4 py-6 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-white">
                            Conversación
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-gray-100 text-mainmf-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-white">
                            {mail?.solved
                              ? "La conversación está marcada como resuelta"
                              : "La conversación quedará marcada como resuelta una vez envie una respuesta a este mensaje."}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          <div className="space-y-6 pb-5 pt-6">
                            <div>
                              <div className="px-4 sm:px-0">
                                <h3 className="text-base font-semibold leading-7 text-gray-900">
                                  Detalles del correo
                                </h3>
                              </div>
                              <div className="mt-6 border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                      Nombre
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                      {mail?.name} {mail?.lastName}
                                    </dd>
                                  </div>
                                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                      Email
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                      {mail?.email}
                                    </dd>
                                  </div>
                                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                      Teléfono
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                      {mail?.phone}
                                    </dd>
                                  </div>
                                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                      Asunto
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                      {mail?.subject}
                                    </dd>
                                  </div>
                                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                      Mensaje
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                      {mail?.message}
                                    </dd>
                                  </div>
                                  {mail?.solved && (
                                    <>
                                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">
                                          Respuesta
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                          {mail?.answer}
                                        </dd>
                                      </div>
                                      {mail?.approved && (
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                          <dt className="text-sm font-medium leading-6 text-gray-900">
                                            Fotografía adjunta
                                          </dt>
                                          <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                            <ul
                                              role="list"
                                              className="divide-y divide-gray-100 rounded-md border border-gray-200"
                                            >
                                              <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                <div className="flex w-0 flex-1 items-center">
                                                  <PaperClipIcon
                                                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                                                    aria-hidden="true"
                                                  />
                                                  <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                    <span className="truncate font-medium">
                                                      resume_back_end_developer.pdf
                                                    </span>
                                                    <span className="flex-shrink-0 text-gray-400">
                                                      2.4mb
                                                    </span>
                                                  </div>
                                                </div>
                                                <div className="ml-4 flex-shrink-0">
                                                  <a
                                                    href="#"
                                                    className="font-medium text-mainmf-600 hover:text-mainmf-500"
                                                  >
                                                    Download
                                                  </a>
                                                </div>
                                              </li>
                                              <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                <div className="flex w-0 flex-1 items-center">
                                                  <PaperClipIcon
                                                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                                                    aria-hidden="true"
                                                  />
                                                  <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                    <span className="truncate font-medium">
                                                      coverletter_back_end_developer.pdf
                                                    </span>
                                                    <span className="flex-shrink-0 text-gray-400">
                                                      4.5mb
                                                    </span>
                                                  </div>
                                                </div>
                                                <div className="ml-4 flex-shrink-0">
                                                  <a
                                                    href="#"
                                                    className="font-medium text-mainmf-600 hover:text-mainmf-500"
                                                  >
                                                    Download
                                                  </a>
                                                </div>
                                              </li>
                                            </ul>
                                          </dd>
                                        </div>
                                      )}
                                    </>
                                  )}
                                </dl>
                              </div>
                            </div>
                            {mail?.isPhotoRequest && (
                              <div>
                                <div className="px-4 sm:px-0">
                                  <h3 className="text-base font-semibold leading-7 text-gray-900">
                                    Detalles de la fotografía solicitada
                                  </h3>
                                </div>
                                <div className="mt-6 border-t border-gray-100">
                                  <dl className="divide-y divide-gray-100">
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                      <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Código
                                      </dt>
                                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {mail?.photoCode}
                                      </dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                      <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Título
                                      </dt>
                                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {requestedPhoto?.title}
                                      </dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                      <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Creative Commons
                                      </dt>
                                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {requestedPhoto?.properties.cc}
                                      </dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                      <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Vista previa
                                      </dt>
                                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <div className="relative h-40 sm:h-56">
                                          <img
                                            className="absolute h-full w-full object-cover"
                                            src={requestedPhoto?.imgSrc}
                                            alt={requestedPhoto?.title}
                                          />
                                        </div>
                                      </dd>
                                    </div>
                                  </dl>
                                </div>
                              </div>
                            )}
                            {!mail?.solved && (
                              <>
                                <div>
                                  <SimpleTextArea
                                    label="Respuesta"
                                    fieldName="answer"
                                    value={formFields.answer}
                                    onChange={handleTextAreaChange}
                                  />
                                </div>
                                <div className="sm:col-span-2 relative flex items-start">
                                  <div className="flex h-6 items-center">
                                    <input
                                      id="archive"
                                      aria-describedby="archive"
                                      name="archive"
                                      type="checkbox"
                                      className="h-4 w-4 rounded border-gray-300 text-mainmf-600 focus:ring-mainmf-600"
                                      aria-invalid="true"
                                      onChange={() => handleArchivedChange()}
                                    />
                                  </div>
                                  <div className="ml-3 text-sm leading-6">
                                    <label
                                      htmlFor="archive"
                                      className="font-medium text-gray-900"
                                    >
                                      Archivar tras enviar
                                    </label>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() => setOpen(false)}
                      >
                        {mail?.solved ? "Cerrar" : "Cancelar"}
                      </button>
                      {!mail?.solved && (
                        <button
                          type="submit"
                          className="ml-4 inline-flex justify-center rounded-md bg-mainmf-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-mainmf-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mainmf-600"
                          onClick={handleOnSave}
                        >
                          Enviar
                        </button>
                      )}
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

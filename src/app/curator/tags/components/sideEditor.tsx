import { CircularAvatar } from "@/components/CircularAvatar";
import SimpleField from "@/components/SimpleField";
import SimpleTextArea from "@/components/SimpleTextArea";
import { Dialog, Transition } from "@headlessui/react";
import { LinkIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, Fragment, useEffect, useState } from "react";

type FormFields = {
  name: string;
  description: string;
};

const defaultForm = {
  name: "",
  description: "",
};

export default function SideEditor({
  open,
  setClose,
  tag,
}: {
  open: boolean;
  setClose: any;
  tag?: TagProps;
}) {
  const [formFields, setFormFields] = useState<FormFields>(defaultForm);

  useEffect(() => {
    setFormFields({
      name: tag?.name ?? "",
      description: tag?.description ?? "",
    });
  }, [tag]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleOnSave = () => {
    console.log(formFields);
  };

  const handleCopyLink = (tagid: string) => {
    navigator.clipboard.writeText(`/gallery/${tagid}`).catch((err) => {
      console.error("Error al copiar al portapapeles: ", err);
    });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setClose}>
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
                            Editando etiqueta
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-gray-100 text-mainmf-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => setClose()}
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
                            Los cambios serán públicos una vez presione el botón
                            de guardar.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          <div className="space-y-6 pb-5 pt-6">
                            <div>
                              <SimpleField
                                label="Nombre"
                                fieldName="name"
                                value={formFields.name}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div>
                              <SimpleTextArea
                                label="Descripción"
                                fieldName="description"
                                value={formFields.description}
                                onChange={handleTextAreaChange}
                              />
                            </div>
                          </div>
                          <div className="pb-6 pt-4">
                            <div className="flex text-sm">
                              <a
                                href="#"
                                className="group inline-flex items-center font-medium text-mainmf-600 hover:text-mainmf-900"
                              >
                                <LinkIcon
                                  className="h-5 w-5 text-mainmf-500 group-hover:text-mainmf-900"
                                  aria-hidden="true"
                                />
                                <span
                                  className="ml-2"
                                  onClick={() =>
                                    handleCopyLink(tag?.id.toString() ?? "")
                                  }
                                >
                                  Copiar vínculo
                                </span>
                              </a>
                            </div>
                            {tag?.editedBy && (
                              <CircularAvatar fullName={tag.editedBy} />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() => setClose()}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="ml-4 inline-flex justify-center rounded-md bg-mainmf-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-mainmf-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mainmf-600"
                        onClick={handleOnSave}
                      >
                        Guardar
                      </button>
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

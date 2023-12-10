import SearchField from "@/components/SearchField";
import SimpleField from "@/components/SimpleField";
import SimpleTextArea from "@/components/SimpleTextArea";
import { Dialog, Transition } from "@headlessui/react";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, Fragment, useEffect, useRef, useState } from "react";

type FormFields = {
  name: string;
  description: string;
  photos: string[];
};

const defaultForm = {
  name: "",
  description: "",
  photos: [],
};

export default function ModalCreator({
  open,
  setOpen,
  onSave,
  availablePhotos = [],
}: {
  open: boolean;
  setOpen: any;
  onSave: (formFields: FormFields) => void;
  availablePhotos?: PhotoProps[];
}) {
  const cancelButtonRef = useRef(null);
  const [formFields, setFormFields] = useState<FormFields>(defaultForm);

  useEffect(() => {
    setFormFields(defaultForm);
  }, [open]);

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

  const handleAddPhoto = (photoIds: string[]) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      photos: photoIds,
    }));
  };

  const handleRemovePhoto = (photoId: string) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      photos: prevFields.photos.filter((photo) => photo !== photoId),
    }));
  };

  const handleOnSave = () => {
    onSave(formFields);
    setOpen(false);
  };

  const photoList = availablePhotos.map((photo) => {
    return {
      value: photo.id.toString(),
      name: photo.title,
      secondaryText: photo.code,
    };
  });

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="px-4 pt-5">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <PlusCircleIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Creando categoría
                    </Dialog.Title>
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
                      <div>
                        <SearchField
                          label="Agregar fotografías"
                          optionsList={photoList ?? []}
                          selectedOptions={formFields.photos ?? []}
                          setSelectedOptions={handleAddPhoto}
                          multipleSelection
                          hideSelectedOptionsFromList
                        />
                      </div>
                      <div>
                        <ul
                          role="list"
                          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
                        >
                          {formFields.photos.map((photoId: string) => {
                            const photo = availablePhotos.find(
                              (photo) => photo.id.toString() === photoId
                            );
                            if (!photo) return null;
                            return (
                              <li
                                key={photo.imgSrc}
                                className="relative"
                                onClick={() => handleRemovePhoto(photo.id.toString())}
                              >
                                <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-mainmf-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                                  <img
                                    src={photo.imgSrc}
                                    alt=""
                                    className="pointer-events-none object-cover group-hover:opacity-75"
                                  />
                                  <div className="flex items-center justify-center">
                                    <TrashIcon className="w-10 h-10 opacity-0 group-hover:opacity-100" />
                                  </div>
                                  <button
                                    type="button"
                                    className="absolute inset-0 focus:outline-none"
                                  >
                                    <span className="sr-only">
                                      Remove {photo.title}
                                    </span>
                                  </button>
                                </div>
                                <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                                  {photo.title}
                                </p>
                                <p className="pointer-events-none block text-sm font-medium text-gray-500">
                                  {photo.code}
                                </p>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-mainmf-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => handleOnSave()}
                  >
                    Crear
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancelar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

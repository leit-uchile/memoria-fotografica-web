import SearchField from "@/components/SearchField";
import SimpleField from "@/components/SimpleField";
import SimpleTextArea from "@/components/SimpleTextArea";
import { Dialog, Transition } from "@headlessui/react";
import { LinkIcon } from "@heroicons/react/20/solid";
import {
  ArrowPathIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChangeEvent, Fragment, useEffect, useState } from "react";

type FormFields = {
  coverId: string;
  title: string;
  description: string;
  photos: string[];
  visible: boolean;
};

const defaultForm = {
  coverId: "",
  title: "",
  description: "",
  photos: [],
  visible: false,
};

export default function SideEditor({
  open,
  setOpen,
  onSave,
  collection,
  availablePhotos = [],
}: {
  open: boolean;
  setOpen: any;
  onSave: (formFields: FormFields) => void;
  collection?: CollectionProps;
  availablePhotos?: PhotoProps[];
}) {
  const [formFields, setFormFields] = useState<FormFields>(defaultForm);
  const [photoLimit, setPhotoLimit] = useState(7);

  useEffect(() => {
    setFormFields({
      coverId: collection?.imgSrc ?? "", // TODO: Change collection attribute for photo id
      title: collection?.title ?? "",
      description: collection?.description ?? "",
      photos: collection?.properties.photos ?? [],
      visible: collection?.visible ?? false,
    });
  }, [collection]);

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

  const handleChangeCover = (photoId: string[]) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      coverId: photoId[0],
    }));
  };

  const handleAddPhoto = (photoIds: string[]) => {
    const countNewPhotos = photoIds.length - formFields.photos.length;
    setFormFields((prevFields) => ({
      ...prevFields,
      photos: photoIds,
    }));
    setPhotoLimit((prevLimit) => prevLimit + countNewPhotos);
  };

  const handleRemovePhoto = (photoId: string) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      photos: prevFields.photos.filter((photo) => photo !== photoId),
    }));
  };

  const handleVisibilityChange = (value: boolean) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      visible: value,
    }));
  };

  const handleOnSave = () => {
    onSave(formFields);
  };

  const handleCopyLink = (tagid: string) => {
    navigator.clipboard.writeText(`/gallery/${tagid}`).catch((err) => {
      console.error("Error al copiar al portapapeles: ", err);
    });
  };

  const loadMorePhotos = () => {
    setPhotoLimit((prevLimit) => prevLimit + 8);
  };

  const photoList = availablePhotos.map((photo) => {
    return {
      value: photo.id,
      name: photo.title,
      secondaryText: photo.properties.code,
    };
  });

  const subsetPhotosInCollection = formFields.photos.slice(0, photoLimit) ?? [];

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
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="bg-mainmf-700 px-4 py-6 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-white">
                            Editando colección
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
                            Los cambios serán públicos una vez presione el botón
                            de guardar.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          <div className="space-y-6 pb-5 pt-6">
                            <div className="relative h-40 sm:h-56">
                              {formFields.coverId ? (
                                <img
                                  className="absolute h-full w-full object-cover"
                                  src={
                                    availablePhotos.find(
                                      (photo) => photo.id === formFields.coverId
                                    )?.imgSrc
                                  }
                                  alt="Cover image"
                                />
                              ) : (
                                <div className="absolute h-full w-full bg-gray-100 flex items-center justify-center">
                                  <p className="text-gray-400 text-m">
                                    Seleccione una foto de portada
                                  </p>
                                </div>
                              )}
                            </div>
                            <div>
                              <SearchField
                                label="Cambiar foto de portada"
                                optionsList={photoList ?? []}
                                selectedOptions={
                                  formFields.coverId ? [formFields.coverId] : []
                                }
                                setSelectedOptions={handleChangeCover}
                              />
                            </div>
                            <div>
                              <SimpleField
                                label="Título"
                                fieldName="title"
                                value={formFields.title}
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
                            <fieldset>
                              <legend className="text-sm font-medium leading-6 text-gray-900">
                                Privacidad
                              </legend>
                              <div className="mt-2 space-y-4">
                                <div className="relative flex items-start">
                                  <div className="absolute flex h-6 items-center">
                                    <input
                                      id="privacy-public"
                                      name="privacy"
                                      aria-describedby="privacy-public-description"
                                      type="radio"
                                      className="h-4 w-4 border-gray-300 text-mainmf-600 focus:ring-mainmf-600"
                                      checked={formFields.visible}
                                      onChange={() =>
                                        handleVisibilityChange(true)
                                      }
                                    />
                                  </div>
                                  <div className="pl-7 text-sm leading-6">
                                    <label
                                      htmlFor="privacy-public"
                                      className="font-medium text-gray-900"
                                    >
                                      Publico
                                    </label>
                                    <p
                                      id="privacy-public-description"
                                      className="text-gray-500"
                                    >
                                      Todos los visitantes del sitio pueden
                                      verla.
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <div className="relative flex items-start">
                                    <div className="absolute flex h-6 items-center">
                                      <input
                                        id="privacy-private-to-project"
                                        name="privacy"
                                        aria-describedby="privacy-private-to-project-description"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-mainmf-600 focus:ring-mainmf-600"
                                        checked={!formFields.visible}
                                        onChange={() =>
                                          handleVisibilityChange(false)
                                        }
                                      />
                                    </div>
                                    <div className="pl-7 text-sm leading-6">
                                      <label
                                        htmlFor="privacy-private-to-project"
                                        className="font-medium text-gray-900"
                                      >
                                        Oculto
                                      </label>
                                      <p
                                        id="privacy-private-to-project-description"
                                        className="text-gray-500"
                                      >
                                        Solo es visible desde esta interfaz.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </fieldset>
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
                                {subsetPhotosInCollection.map(
                                  (photoId: string) => {
                                    const photo = availablePhotos.find(
                                      (photo) => photo.id === photoId
                                    );
                                    if (!photo) return null;
                                    return (
                                      <li
                                        key={photo.imgSrc}
                                        className="relative"
                                        onClick={() =>
                                          handleRemovePhoto(photo.id)
                                        }
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
                                          {photo.properties.code}
                                        </p>
                                      </li>
                                    );
                                  }
                                )}
                                {formFields.photos.length > photoLimit && (
                                  <li
                                    key="load-more"
                                    className="relative"
                                    onClick={() => loadMorePhotos()}
                                  >
                                    <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-mainmf-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                                      <div className="flex items-center justify-center">
                                        <ArrowPathIcon className="pointer-events-none object-cover text-gray-500 w-10 h-10 group-hover:text-mainmf-500" />
                                      </div>
                                      <button
                                        type="button"
                                        className="absolute inset-0 focus:outline-none"
                                      >
                                        <span className="sr-only">
                                          Load more photos
                                        </span>
                                      </button>
                                    </div>
                                  </li>
                                )}
                              </ul>
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
                                    handleCopyLink(collection?.id ?? "")
                                  }
                                >
                                  Copiar vínculo
                                </span>
                              </a>
                            </div>
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

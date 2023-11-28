import {
  cc,
  photoFormat,
  photoProcess,
  photoSupport,
  photoTechnique,
  photoTone,
} from "@/app/constants";
import DropdownField from "@/components/DropdownField";
import SearchField from "@/components/SearchField";
import SimpleField from "@/components/SimpleField";
import SimpleTextArea from "@/components/SimpleTextArea";
import { dateToISO } from "@/services/string";
import { Dialog, Transition } from "@headlessui/react";
import { LinkIcon, QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, Fragment, useEffect, useState } from "react";

type FormFields = {
  title: string;
  date: string;
  description: string;
  tags: string[];
  width: number;
  height: number;
  author: string;
  location: string;
  albumSelected: string;
  campusSelected: string | null;
  formatSelected: string | null;
  processSelected: string | null;
  supportSelected: string | null;
  techniqueSelected: string | null;
  toneSelected: string | null;
  ccSelected: string | null;
  visible: boolean;
};

const defaultForm = {
  title: "",
  date: "",
  description: "",
  tags: [],
  width: 0,
  height: 0,
  author: "",
  location: "",
  albumSelected: "",
  campusSelected: null,
  formatSelected: null,
  processSelected: null,
  supportSelected: null,
  techniqueSelected: null,
  toneSelected: null,
  ccSelected: null,
  visible: false,
};

export default function SideEditor({
  open,
  setClose,
  photo,
  availableAlbums = [],
  availabileCampuses = [],
  availableTags = [],
}: {
  open: boolean;
  setClose: any;
  photo?: PhotoProps;
  availableAlbums?: CollectionProps[];
  availabileCampuses?: CampusProps[];
  availableTags?: TagProps[];
}) {
  const [formFields, setFormFields] = useState<FormFields>(defaultForm);

  useEffect(() => {
    setFormFields({
      title: photo?.title ?? "",
      date: photo?.date ? dateToISO(photo?.date) : "",
      description: photo?.description ?? "",
      tags: photo?.properties?.tags ?? [],
      width: photo?.properties.width ?? 0,
      height: photo?.properties.height ?? 0,
      author: photo?.properties.author ?? "",
      location: photo?.properties.location ?? "",
      albumSelected: photo?.properties.album ?? "",
      campusSelected: photo?.properties.campus ?? null,
      formatSelected: photo?.properties.format ?? null,
      processSelected: photo?.properties.process ?? null,
      supportSelected: photo?.properties.support ?? null,
      techniqueSelected: photo?.properties.photoTechnique ?? null,
      toneSelected: photo?.properties.tone ?? null,
      ccSelected: photo?.properties.cc ?? null,
      visible: photo?.visible ?? false,
    });
  }, [photo]);

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

  const handleDropdownChange = (name: string, value: string) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleAlbumChange = (value: string[]) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      albumSelected: value[0],
    }));
  };

  const handleTagsChange = (tags: string[]) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      tags,
    }));
  };

  const handleTagsManuallyRemove = (value: string) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      tags: prevFields.tags.filter((tag) => tag !== value),
    }));
  };

  const handleVisibilityChange = (value: boolean) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      visible: value,
    }));
  };

  const handleOnSave = () => {
    console.log(formFields);
  };

  const handleCopyLink = (photoid: string) => {
    navigator.clipboard.writeText(`/gallery/${photoid}`).catch((err) => {
      console.error("Error al copiar al portapapeles: ", err);
    });
  };

  const mappedAlbumes = availableAlbums.map((album) => ({
    name: album.title,
    value: album.id,
  }));

  const mappedTags = availableTags.map((tag) => ({
    name: tag.name,
    value: tag.id.toString(),
  }));

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
                      <div className="bg-indigo-700 px-4 py-6 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-white">
                            {photo?.approved
                              ? "Editando fotografía"
                              : "Curando fotografía"}
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
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
                          <p className="text-sm text-indigo-300">
                            {photo?.approved
                              ? "Los cambios serán públicos una vez presione el botón de guardar."
                              : "Los datos mostrados corresponden a la información enviada por el usuario. Si desea realizar cambios, edite la información antes de presionar el botón de guardar."}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          <div className="space-y-6 pb-5 pt-6">
                            <div className="relative h-40 sm:h-56">
                              <img
                                className="absolute h-full w-full object-cover"
                                src={photo?.imgSrc}
                                alt={photo?.title}
                              />
                            </div>
                            <div>
                              <SimpleField
                                label="Código de la fotografía"
                                fieldName="code"
                                value={photo?.properties.code}
                                disabled
                                onChange={() => {}}
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
                              <SimpleField
                                label="Fecha del documento"
                                fieldName="date"
                                type="date"
                                value={formFields.date}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div>
                              <SimpleTextArea
                                label="Contexto del documento"
                                fieldName="description"
                                value={formFields.description}
                                onChange={handleTextAreaChange}
                              />
                            </div>
                            <div>
                              <SearchField
                                label="Etiquetas"
                                optionsList={mappedTags}
                                selectedOptions={formFields.tags}
                                setSelectedOptions={handleTagsChange}
                                multipleSelection
                                hideSelectedOptionsFromList
                              />
                              {formFields.tags.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
                                  {formFields.tags.map((option) => {
                                    const name = mappedTags.find(
                                      (opt) => opt.value === option
                                    )?.name;
                                    return (
                                      <span
                                        key={option}
                                        onClick={() =>
                                          handleTagsManuallyRemove(option)
                                        }
                                        className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 bg-gray-50 cursor-pointer"
                                      >
                                        {name}{" "}
                                        <XMarkIcon className="h-4 w-4 ml-1" />
                                      </span>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                            <fieldset>
                              <legend className="block text-sm font-medium leading-6 text-gray-900">
                                Dimensiones (cm)
                              </legend>
                              <div className="mt-2 -space-y-px rounded-md bg-white shadow-sm">
                                <div className="flex -space-x-px">
                                  <div className="w-1/2 min-w-0 flex-1">
                                    <label htmlFor="width" className="sr-only">
                                      Ancho
                                    </label>
                                    <input
                                      type="number"
                                      name="width"
                                      id="width"
                                      className="relative block w-full rounded-md rounded-r-none border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      placeholder="Ancho"
                                      value={formFields.width}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <label htmlFor="height" className="sr-only">
                                      Alto
                                    </label>
                                    <input
                                      type="number"
                                      name="height"
                                      id="height"
                                      className="relative block w-full rounded-md rounded-l-none border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      placeholder="Alto"
                                      value={formFields.height}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                </div>
                              </div>
                            </fieldset>
                            <div>
                              <SearchField
                                label="Colección a la que pertenece"
                                optionsList={mappedAlbumes}
                                selectedOptions={
                                  formFields.albumSelected
                                    ? [formFields.albumSelected]
                                    : []
                                }
                                setSelectedOptions={handleAlbumChange}
                              />
                            </div>
                            <div>
                              <SimpleField
                                label="Autor de la fotografía"
                                fieldName="author"
                                value={formFields.author}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div>
                              <SimpleField
                                label="Ubicación"
                                fieldName="location"
                                value={formFields.location}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div>
                              {!availabileCampuses ? null : (
                                <DropdownField
                                  withIcons
                                  label="Campus"
                                  fieldName="campusSelected"
                                  selectedValue={formFields.campusSelected}
                                  onChange={handleDropdownChange}
                                  options={availabileCampuses}
                                />
                              )}
                            </div>
                            <div>
                              <DropdownField
                                label="Formato"
                                fieldName="formatSelected"
                                selectedValue={formFields.formatSelected}
                                onChange={handleDropdownChange}
                                options={photoFormat}
                              />
                            </div>
                            <div>
                              <DropdownField
                                label="Proceso fotográfico"
                                fieldName="processSelected"
                                selectedValue={formFields.processSelected}
                                onChange={handleDropdownChange}
                                options={photoProcess}
                              />
                            </div>
                            <div>
                              <DropdownField
                                label="Soporte"
                                fieldName="supportSelected"
                                selectedValue={formFields.supportSelected}
                                onChange={handleDropdownChange}
                                options={photoSupport}
                              />
                            </div>
                            <div>
                              <DropdownField
                                label="Técnica fotográfica"
                                fieldName="techniqueSelected"
                                selectedValue={formFields.techniqueSelected}
                                onChange={handleDropdownChange}
                                options={photoTechnique}
                              />
                            </div>
                            <div>
                              <DropdownField
                                label="Tono"
                                fieldName="toneSelected"
                                selectedValue={formFields.toneSelected}
                                onChange={handleDropdownChange}
                                options={photoTone}
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
                                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
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
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
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
                              <DropdownField
                                withIcons
                                label="Licencia"
                                fieldName="ccSelected"
                                selectedValue={formFields.ccSelected}
                                onChange={handleDropdownChange}
                                options={cc}
                              />
                            </div>
                          </div>
                          <div className="pb-6 pt-4">
                            <div className="flex text-sm">
                              <a
                                href="#"
                                className="group inline-flex items-center font-medium text-indigo-600 hover:text-indigo-900"
                              >
                                <LinkIcon
                                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-900"
                                  aria-hidden="true"
                                />
                                <span
                                  className="ml-2"
                                  onClick={() =>
                                    handleCopyLink(photo?.id ?? "")
                                  }
                                >
                                  Copiar vínculo
                                </span>
                              </a>
                            </div>
                            <div className="mt-4 flex text-sm">
                              <a
                                href="#"
                                className="group inline-flex items-center text-gray-500 hover:text-gray-900"
                              >
                                <QuestionMarkCircleIcon
                                  className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                                <span className="ml-2">
                                  Aprender más sobre Creative Commons
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
                        onClick={() => setClose()}
                      >
                        {photo?.approved ? "Cancelar" : "Rechazar"}
                      </button>
                      <button
                        type="submit"
                        className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleOnSave}
                      >
                        {photo?.approved ? "Guardar" : "Aprobar"}
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

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
import { Dialog, Transition } from "@headlessui/react";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, Fragment, useEffect, useRef, useState } from "react";

type FormFields = {
  title: string;
  date: string;
  description: string;
  tags: string[];
  width: number;
  height: number;
  author: string;
  location: string;
  collectionSelected: string;
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
  collectionSelected: "",
  campusSelected: null,
  formatSelected: null,
  processSelected: null,
  supportSelected: null,
  techniqueSelected: null,
  toneSelected: null,
  ccSelected: null,
  visible: false,
};

export default function ModalCreator({
  open,
  setOpen,
  onSave,
  availableCollections = [],
  availableCampuses = [],
  availableTags = [],
}: {
  open: boolean;
  setOpen: any;
  onSave: (formFields: FormFields) => void;
  availableCollections?: CollectionProps[];
  availableCampuses?: CampusProps[];
  availableTags?: TagProps[];
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

  const handleDropdownChange = (name: string, value: string) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handlecollectionChange = (value: string[]) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      collectionSelected: value[0],
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
    onSave(formFields);
    setOpen(false);
  };

  const mappedCollections = availableCollections.map((collection) => ({
    name: collection.title,
    value: collection.id.toString(),
  }));

  const mappedTags = availableTags.map((tag) => ({
    name: tag.name,
    value: tag.id.toString(),
  }));

  const mappedCampuses = availableCampuses.map((campus) => ({
    name: campus.name,
    value: campus.id.toString(),
    imgSrc: campus.imgSrc,
  }));

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
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
                      Creando fotografía
                    </Dialog.Title>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="divide-y divide-gray-200 px-4 sm:px-6">
                    <div className="space-y-6 pb-5 pt-6">
                      <div className="flex space-x-6">
                        <div className="w-1/2 space-y-6">
                          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-8">
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
                                <p className="pl-1">
                                  o arrastrala a la plataforma
                                </p>
                              </div>
                              <p className="text-xs leading-5 text-gray-600">
                                PNG, JPG, GIF hasta 20MB
                              </p>
                            </div>
                          </div>
                          <div>
                            <SimpleTextArea
                              label="Contexto del documento"
                              fieldName="description"
                              value={formFields.description}
                              onChange={handleTextAreaChange}
                              rows={4}
                            />
                          </div>
                          <div>
                            {!availableTags ? null : (
                              <SearchField
                                label="Etiquetas"
                                optionsList={mappedTags}
                                selectedOptions={formFields.tags}
                                setSelectedOptions={handleTagsChange}
                                multipleSelection
                                hideSelectedOptionsFromList
                              />
                            )}
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
                                    className="relative block w-full rounded-md rounded-r-none border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-mainmf-600 sm:text-sm sm:leading-6"
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
                                    className="relative block w-full rounded-md rounded-l-none border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-mainmf-600 sm:text-sm sm:leading-6"
                                    placeholder="Alto"
                                    value={formFields.height}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </fieldset>
                          <div>
                            {!availableCollections ? null : <SearchField
                              label="Colección a la que pertenece"
                              optionsList={mappedCollections}
                              selectedOptions={
                                formFields.collectionSelected
                                  ? [formFields.collectionSelected]
                                  : []
                              }
                              setSelectedOptions={handlecollectionChange}
                            />}
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
                            <SimpleField
                              label="Autor de la fotografía"
                              fieldName="author"
                              value={formFields.author}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="w-1/2 space-y-6">
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
                          <div>
                            {!availableCampuses ? null : (
                              <DropdownField
                                withIcons
                                label="Campus"
                                fieldName="campusSelected"
                                selectedValue={formFields.campusSelected}
                                onChange={handleDropdownChange}
                                options={mappedCampuses}
                              />
                            )}
                          </div>
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
                                    Todos los visitantes del sitio pueden verla.
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
                        </div>
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

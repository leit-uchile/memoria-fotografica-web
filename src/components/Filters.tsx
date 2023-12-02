import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/20/solid";
import {
  ChevronRightIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import { Fragment, useState } from "react";

type CheckedFilter = {
  fieldName: string;
  options: {
    name: string;
    value: string;
    checked: boolean;
    imgSrc?: string;
  }[];
}
type FiltersProps = {
  sortOptions: Array<{
    name: string;
    value: string;
  }>;
  setSort: (sortOption: string) => void;
  filters: GroupedFilter[];
  setFilters: (filterBy: GroupedFilter[]) => void;
};

const Filters: React.FC<FiltersProps> = ({
  sortOptions,
  setSort,
  filters,
  setFilters,
}) => {
  const [open, setOpen] = useState(false);

  // Adds "checked" attribute to each option
  const extendFilters = (filters: GroupedFilter[]) => {
    return filters.map((filter) => {
      const extendedOptions = filter.options.map((option) => {
        return {
          ...option,
          checked: false,
        };
      });
      return {
        ...filter,
        options: extendedOptions,
      };
    });
  };

  const defaultFilters = extendFilters(filters);

  const [localFilters, setLocalFilters] = useState(defaultFilters);

  const onCheckOption = (fieldName: string, optionName: string) => {
    const updatedFilters = localFilters.map((group) => {
      if (group.id === fieldName) {
        const updatedOptions = group.options.map((option) => {
          if (option.name === optionName) {
            return {
              ...option,
              checked: !option.checked,
            };
          } else {
            return option;
          }
        });
        return {
          ...group,
          options: updatedOptions,
        };
      } else {
        return group;
      }
    });
    setLocalFilters(updatedFilters);
  };

  const updateFilters = (checkedFilters: CheckedFilter[]) => {
    // Update inherited filters with checked options
    const updatedFilters = filters.map((filter) => {
      // Just keep checked options
      const checkedOptions = checkedFilters.find(
        (checkedFilter) => checkedFilter.fieldName === filter.id
      )?.options ?? [];
      return {
        ...filter,
        options: checkedOptions,
      };
    });
    setFilters(updatedFilters);
  };

  const onSaveFilters = () => {
    // Get all checked options and setFilters as [{field: id, value: [{name: name, value: value, checked: true}]}]
    const checkedFilters = localFilters.map((group) => {
      const checkedOptions = group.options.filter((option) => option.checked);
      return {
        fieldName: group.id,
        options: checkedOptions,
      };
    });
    updateFilters(checkedFilters);
    setOpen(false);
  };

  const onResetFilters = () => {
    setLocalFilters(defaultFilters);
    updateFilters([]);
    setOpen(false);
  };

  return (
    <div className="flex items-center justify-between">
      {sortOptions.length > 0 && (
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
              Ordenar
              <ChevronDownIcon
                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {sortOptions.map((option, index) => (
                  <Menu.Item key={option.name}>
                    {({ active }) => (
                      <a
                        href="#"
                        onClick={() => setSort(option.value)}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm font-medium text-gray-900"
                        )}
                      >
                        {option.name}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
      {localFilters.length > 0 && (
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button
              onClick={() => setOpen(true)}
              className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Filtrar
              <ChevronRightIcon
                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
              <div className="fixed inset-0" />

              <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
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
                        <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                          <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                            <div className="px-4 sm:px-6">
                              <div className="flex items-start justify-between">
                                <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                  Filtros
                                </Dialog.Title>
                                <div className="ml-3 flex h-7 items-center">
                                  <button
                                    type="button"
                                    className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                            </div>
                            <div className="relative mt-6 flex-1 px-4 sm:px-6">
                              <form className="mt-4 border-t border-gray-200">
                                {/* <h3 className="sr-only">Categories</h3>
                                <ul
                                  role="list"
                                  className="px-2 py-3 font-medium text-gray-900"
                                >
                                  {categories.map((category) => (
                                    <li key={category.name}>
                                      <a
                                        href={category.href}
                                        className="block px-2 py-3"
                                      >
                                        {category.name}
                                      </a>
                                    </li>
                                  ))}
                                </ul>

                                <h3 className="sr-only">Collections</h3>
                                <ul
                                  role="list"
                                  className="px-2 py-3 font-medium text-gray-900"
                                >
                                  {collections.map((collection) => (
                                    <li key={collection.name}>
                                      <a
                                        href={collection.href}
                                        className="block px-2 py-3"
                                      >
                                        {collection.name}
                                      </a>
                                    </li>
                                  ))}
                                </ul> */}

                                {localFilters.map((section) => (
                                  <Disclosure
                                    as="div"
                                    key={section.id}
                                    className="border-t border-gray-200 px-4 py-6"
                                  >
                                    {({ open }) => (
                                      <>
                                        <h3 className="-mx-2 -my-3 flow-root">
                                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                            <span className="font-medium text-gray-900">
                                              {section.name}
                                            </span>
                                            <span className="ml-6 flex items-center">
                                              {open ? (
                                                <MinusIcon
                                                  className="h-5 w-5"
                                                  aria-hidden="true"
                                                />
                                              ) : (
                                                <PlusIcon
                                                  className="h-5 w-5"
                                                  aria-hidden="true"
                                                />
                                              )}
                                            </span>
                                          </Disclosure.Button>
                                        </h3>
                                        <Disclosure.Panel className="pt-6">
                                          <div className="space-y-6">
                                            {section.options.map(
                                              (option, optionIdx) => (
                                                <div
                                                  key={option.name}
                                                  className="flex items-center"
                                                >
                                                  <input
                                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                                    name={`${section.id}[]`}
                                                    type="checkbox"
                                                    defaultChecked={
                                                      option.checked
                                                    }
                                                    onChange={() =>
                                                      onCheckOption(
                                                        section.id,
                                                        option.name
                                                      )
                                                    }
                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                  />
                                                  <label
                                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                                  >
                                                    {option.name}
                                                  </label>
                                                </div>
                                              )
                                            )}
                                          </div>
                                        </Disclosure.Panel>
                                      </>
                                    )}
                                  </Disclosure>
                                ))}
                              </form>
                            </div>
                          </div>
                          <div className="flex flex-shrink-0 justify-end px-4 py-4">
                            <button
                              type="button"
                              className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
                              onClick={() => onResetFilters()}
                            >
                              Reiniciar filtros
                            </button>
                            <button
                              type="submit"
                              className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                              onClick={() => onSaveFilters()}
                            >
                              Aplicar
                            </button>
                          </div>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </Menu>
      )}
    </div>
  );
};

export default Filters;

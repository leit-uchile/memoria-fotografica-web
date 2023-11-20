"use client";

import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import React, { Fragment, useState } from "react";

const currencies = ["CAD", "USD", "AUD", "EUR", "GBP"];

type MenuProps = {
  categories: Array<{
    name: string;
    featured: Array<{
      name: string;
      href: string;
      imageSrc: string;
      imageAlt: string;
    }>;
  }>;
  pages: Array<{ name: string; href: string }>;
};

const BlockCategory: React.FC<{
  category: {
    imageSrc: string;
    imageAlt: string;
    name: string;
    href: string;
  };
  linkExtraClasses?: string;
  fontSize?: string;
}> = ({ category, linkExtraClasses, fontSize }) => (
  <div className="group relative">
    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
      <img
        src={category.imageSrc}
        alt={category.imageAlt}
        className="object-cover object-center"
      />
    </div>
    <a
      href={category.href}
      className={`block ${fontSize} font-medium text-gray-900 ${linkExtraClasses}`}
    >
      <span className="absolute inset-0 z-10" aria-hidden="true" />
      {category.name}
    </a>
    <p aria-hidden="true" className={`mt-1 ${fontSize} text-gray-500`}>
      Explorar
    </p>
  </div>
);

const MobileNavigation: React.FC<
  {
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (arg: boolean) => void;
  } & MenuProps
> = ({ mobileMenuOpen, setMobileMenuOpen, categories, pages }) => (
  <Transition.Root show={mobileMenuOpen} as={Fragment}>
    <Dialog
      as="div"
      className="relative z-40 lg:hidden"
      onClose={setMobileMenuOpen}
    >
      <Transition.Child
        as={Fragment}
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>

      <div className="fixed inset-0 z-40 flex">
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Links */}
            <Tab.Group as="div" className="mt-2">
              <div className="border-b border-gray-200">
                <Tab.List className="-mb-px flex space-x-8 px-4">
                  {categories.map((category) => (
                    <Tab
                      key={category.name}
                      className={({ selected }) =>
                        classNames(
                          "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium",
                          {
                            "border-indigo-600 text-indigo-600": selected,
                            "border-transparent text-gray-900": !selected,
                          }
                        )
                      }
                    >
                      {category.name}
                    </Tab>
                  ))}
                </Tab.List>
              </div>
              <Tab.Panels as={Fragment}>
                {categories.map((category) => (
                  <Tab.Panel
                    key={category.name}
                    className="space-y-12 px-4 py-6"
                  >
                    <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                      {category.featured.map((item) => (
                        <BlockCategory
                          key={item.name}
                          category={item}
                          linkExtraClasses="mb-6"
                          fontSize="text-sm"
                        />
                      ))}
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a
                    href={page.href}
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <a
                  href="#"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Crear una cuenta
                </a>
              </div>
              <div className="flow-root">
                <a
                  href="#"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Ingresar
                </a>
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition.Root>
);

const Navigation: React.FC<MenuProps> = (props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <MobileNavigation
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        {...props}
      />
      <header className="relative z-10">
        <nav aria-label="Top">
          {/* Top navigation */}
          <div className="bg-mainmf-700">
            <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex items-center space-x-6">
                <a
                  href="#"
                  className="text-sm font-medium text-white hover:text-gray-100"
                >
                  Ingresar
                </a>
                <a
                  href="#"
                  className="text-sm font-medium text-white hover:text-gray-100"
                >
                  Crear una cuenta
                </a>
              </div>
            </div>
          </div>

          {/* Secondary navigation */}
          <div className="bg-mainmf-900 backdrop-blur-md backdrop-filter">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div>
                <div className="flex h-16 items-center justify-between">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:flex lg:flex-1 lg:items-center">
                    <a href="/">
                      <span className="sr-only">Memoria fotografica</span>
                      <img className="h-8 w-auto" src="/mf.ico" alt="" />
                    </a>
                  </div>

                  <div className="hidden h-full lg:flex">
                    {/* Flyout menus */}
                    <Popover.Group className="inset-x-0 bottom-0 px-4">
                      <div className="flex h-full justify-center space-x-8">
                        {props.categories.map((category) => (
                          <Popover key={category.name} className="flex">
                            {({ open }) => (
                              <>
                                <div className="relative flex">
                                  <Popover.Button className="relative z-10 flex items-center justify-center text-sm font-medium text-white transition-colors duration-200 ease-out">
                                    {category.name}
                                    <span
                                      className={classNames(
                                        open ? "bg-white" : "",
                                        "absolute inset-x-0 -bottom-px h-0.5 transition duration-200 ease-out"
                                      )}
                                      aria-hidden="true"
                                    />
                                  </Popover.Button>
                                </div>

                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-200"
                                  enterFrom="opacity-0"
                                  enterTo="opacity-100"
                                  leave="transition ease-in duration-150"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                    <div
                                      className="absolute inset-0 top-1/2 bg-white shadow"
                                      aria-hidden="true"
                                    />
                                    <div className="relative bg-white">
                                      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                        <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                                          {category.featured.map((item) => (
                                            <BlockCategory
                                              key={item.name}
                                              category={item}
                                              linkExtraClasses="mt-4"
                                            />
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </Popover.Panel>
                                </Transition>
                              </>
                            )}
                          </Popover>
                        ))}

                        {props.pages.map((page) => (
                          <a
                            key={page.name}
                            href={page.href}
                            className="flex items-center text-sm font-medium text-white"
                          >
                            {page.name}
                          </a>
                        ))}
                      </div>
                    </Popover.Group>
                  </div>

                  {/* Mobile menu and search (lg-) */}
                  <div className="flex flex-1 items-center lg:hidden">
                    <button
                      type="button"
                      className="-ml-2 p-2 text-white"
                      onClick={() => setMobileMenuOpen(true)}
                    >
                      <span className="sr-only">Open menu</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Search */}
                    <a href="/gallery" className="ml-2 p-2 text-white">
                      <span className="sr-only">Buscar</span>
                      <MagnifyingGlassIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </a>
                  </div>

                  {/* Logo (lg-) */}
                  <a href="/" className="lg:hidden">
                    <span className="sr-only">Memoria fotografica</span>
                    <img src="/mf.ico" alt="" className="h-8 w-auto" />
                  </a>

                  <div className="flex flex-1 items-center justify-end">
                    <a
                      href="/gallery"
                      className="hidden text-sm font-medium text-white lg:flex space-x-2"
                    >
                      <span>Buscar</span>
                      <MagnifyingGlassIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </a>

                    <div className="flex items-center lg:ml-8">
                      {/* Help */}
                      <a href="#" className="p-2 text-white lg:hidden">
                        <span className="sr-only">Ayuda</span>
                        <QuestionMarkCircleIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </a>
                      <a
                        href="#"
                        className="hidden text-sm font-medium text-white lg:block"
                      >
                        Ayuda
                      </a>

                      {/* Cart */}
                      <div className="ml-4 flow-root lg:ml-8 hidden">
                        <a
                          href="#"
                          className="group -m-2 flex items-center p-2"
                        >
                          <ShoppingBagIcon
                            className="h-6 w-6 flex-shrink-0 text-white"
                            aria-hidden="true"
                          />
                          <span className="ml-2 text-sm font-medium text-white">
                            0
                          </span>
                          <span className="sr-only">
                            items in cart, view bag
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navigation;

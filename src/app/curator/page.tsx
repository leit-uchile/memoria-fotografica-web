"use client";

import CuratorCategories from "./categories/page";
import CuratorCollections from "./collections/page";
import CuratorMails from "./mail/page";
import CuratorPhotos from "./photos/page";
import CuratorTags from "./tags/page";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import {
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  UsersIcon,
  FolderIcon,
  HomeIcon,
  PhotoIcon,
  TagIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useState } from "react";

const navigation = [
  { name: "Resumen", href: "#", icon: HomeIcon },
  { name: "Fotos", href: "#", icon: PhotoIcon, count: "20+" },
  { name: "Etiquetas", href: "#", icon: TagIcon },
  {
    name: "Categorías",
    href: "#",
    icon: FolderIcon,
    count: "12",
  },
  {
    name: "Colecciones",
    href: "#",
    icon: BookOpenIcon,
    count: "10",
  },
  { name: "Correo", href: "#", icon: EnvelopeOpenIcon },
];
const secondaryNavigation = [
  { name: "Creative Commons", href: "/creativecommons", initial: "CC", current: false },
];

const stats = [
  {
    id: 1,
    name: "Visitas totales",
    stat: "71,897",
    icon: UsersIcon,
    change: "122",
    changeType: "increase",
  },
  {
    id: 2,
    name: "Contenido aportado",
    stat: "58.16%",
    icon: EnvelopeOpenIcon,
    change: "5.4%",
    changeType: "increase",
  },
  {
    id: 3,
    name: "Contenido compartido",
    stat: "24.57%",
    icon: CursorArrowRaysIcon,
    change: "3.2%",
    changeType: "decrease",
  },
];

const landing = (
  <div>
    <h3 className="text-base font-semibold leading-6 text-gray-900">
      Últimos 30 días
    </h3>

    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((item) => (
        <div
          key={item.id}
          className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
        >
          <dt>
            <div className="absolute rounded-md bg-mainmf-800 p-3">
              <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">
              {item.name}
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
            <p
              className={classNames(
                item.changeType === "increase"
                  ? "text-green-600"
                  : "text-red-600",
                "ml-2 flex items-baseline text-sm font-semibold"
              )}
            >
              {item.changeType === "increase" ? (
                <ArrowUpIcon
                  className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                  aria-hidden="true"
                />
              ) : (
                <ArrowDownIcon
                  className="h-5 w-5 flex-shrink-0 self-center text-red-500"
                  aria-hidden="true"
                />
              )}

              <span className="sr-only">
                {" "}
                {item.changeType === "increase"
                  ? "Increased"
                  : "Decreased"} by{" "}
              </span>
              {item.change}
            </p>
            <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-mainmf-600 hover:text-mainmf-500"
                >
                  Ver todo
                  <span className="sr-only"> {item.name} stats</span>
                </a>
              </div>
            </div>
          </dd>
        </div>
      ))}
    </dl>
  </div>
);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);

  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return <CuratorPhotos />;
      case 2:
        return <CuratorTags />;
      case 3:
        return <CuratorCategories />;
      case 4:
        return <CuratorCollections />;
      case 5:
        return <CuratorMails />;
      default:
        return landing;
    }
  };

  return (
    <>
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-2xl flex-col items-start justify-between gap-16 lg:flex-row lg:max-w-none">
              {/* Left Column */}
              <div className="w-full lg:w-1/5">
                <nav className="flex flex-1 flex-col" aria-label="Sidebar">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item, index) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              onClick={() => setActiveTab(index)}
                              className={classNames(
                                index === activeTab
                                  ? "bg-gray-100 text-mainmf-700"
                                  : "text-gray-700 hover:text-mainmf-700 hover:bg-gray-100",
                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                              )}
                            >
                              <item.icon
                                className={classNames(
                                  index === activeTab
                                    ? "text-mainmf-700"
                                    : "text-gray-400 group-hover:text-mainmf-700",
                                  "h-6 w-6 shrink-0"
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                              {/* {item.count ? (
                                <span
                                  className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-50 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-gray-600 ring-1 ring-inset ring-gray-200"
                                  aria-hidden="true"
                                >
                                  {item.count}
                                </span>
                              ) : null} */}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>
                      <div className="text-xs font-semibold leading-6 text-gray-400">
                        Ayuda
                      </div>
                      <ul role="list" className="-mx-2 mt-2 space-y-1">
                        {secondaryNavigation.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              target="_blank"
                              className={classNames(
                                item.current
                                  ? "bg-gray-50 text-mainmf-600"
                                  : "text-gray-700 hover:text-mainmf-600 hover:bg-gray-100",
                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                              )}
                            >
                              <span
                                className={classNames(
                                  item.current
                                    ? "text-mainmf-600 border-mainmf-600"
                                    : "text-gray-400 border-gray-200 group-hover:border-mainmf-600 group-hover:text-mainmf-600",
                                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
                                )}
                              >
                                {item.initial}
                              </span>
                              <span className="truncate">{item.name}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
              {/* Right Columna */}
              <div className="w-full lg:w-4/5">{renderTabContent()}</div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

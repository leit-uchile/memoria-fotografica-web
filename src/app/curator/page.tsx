"use client";

import CuratorCategories from "./categories/page";
import CuratorCollections from "./collections/page";
import Landing from "./landing/page";
import CuratorMails from "./mail/page";
import CuratorPhotos from "./photos/page";
import CuratorTags from "./tags/page";
import {
  EnvelopeOpenIcon,
  FolderIcon,
  HomeIcon,
  PhotoIcon,
  TagIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useState } from "react";

const navigation = [
  { name: "Inicio", href: "#", icon: HomeIcon },
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
  {
    name: "Creative Commons",
    href: "/creativecommons",
    initial: "CC",
    current: false,
  },
];

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
        return <Landing />;
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
              {/* Right Column */}
              <div className="w-full lg:w-4/5">{renderTabContent()}</div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

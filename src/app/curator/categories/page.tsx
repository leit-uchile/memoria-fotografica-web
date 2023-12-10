import { availableActions, sortOptions, sortOptionsEnum } from "../constants";
import { genericSort, groupByInitial } from "../utils";
import ModalCreator from "./components/modalCreator";
import SideEditor from "./components/sideEditor";
import ActionsMenu from "@/components/ActionsMenu";
import Filters from "@/components/Filters";
import { fetchCategories, fetchPhotos } from "@/services/fetch";
import { isoToDate } from "@/services/string";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import useSWR from "swr";

export default function CuratorCategories() {
  const [openCreator, setOpenCreator] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<sortOptionsEnum>(
    sortOptionsEnum["name=ASC"]
  );

  const {
    data: categories,
    isValidating,
  }: {
    data: CategoryProps[];
    isValidating: boolean;
  } = useSWR("curator-categories", fetchCategories);
  const {
    data: photos,
    isValidating: isValidatingPhotos,
  }: { data: PhotoProps[]; isValidating: boolean } = useSWR(
    "curator-photos",
    fetchPhotos
  );

  const toggleEditor = (categoryId: number) => {
    setCategoryId(categoryId);
    setOpenEditor(!openEditor);
  };

  const updateSort = (sortOption: string) => {
    const number = sortOptionsEnum[sortOption as keyof typeof sortOptionsEnum];
    setSortBy(number);
  };

  const sortCategories = (
    sortOption: sortOptionsEnum,
    categories: CategoryProps[]
  ) => {
    return genericSort(
      sortOption,
      categories,
      (a, b) => a.name.localeCompare(b.name),
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  };

  const sortedCategories = sortCategories(sortBy, categories ?? []);

  const groupedCategories = groupByInitial(sortedCategories ?? []);

  const sortLocalOptions = sortOptions
    .slice(2, 4)
    .concat(sortOptions.slice(6, 8));

  const router = useRouter();

  const addOnClickFunction = (
    action: {
      href: string;
      icon: React.ReactNode;
      type: string;
      label: string;
    },
    categoryId: number
  ) => {
    return {
      ...action,
      onClick: () => {
        if (action.type === "edit") {
          toggleEditor(categoryId);
        } else if (action.type === "view") {
          router.push(`/gallery/${categoryId}`);
        } else if (action.type === "delete") {
          console.log("delete");
        }
      },
    };
  };

  return (
    <div>
      <div className="mb-8 border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Categorías
          <button
            type="button"
            className="ml-3 inline-flex items-center rounded-md bg-mainmf-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-mainmf-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mainmf-600"
            onClick={() => setOpenCreator(true)}
          >
            Crear
          </button>
        </h3>
        <div className="mt-3 flex sm:ml-4 sm:mt-0">
          <Filters sortOptions={sortLocalOptions} setSort={updateSort} />
        </div>
      </div>
      {isValidating ? null : sortedCategories.length === 0 ? (
        <div className="flex flex-col space-y-3 items-center justify-center text-gray-500">
          <DocumentMagnifyingGlassIcon className="w-10 h-10" />
          <p>No hay nada para mostrar</p>
        </div>
      ) : (
        <table className="min-w-full">
          <thead className="bg-white">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
              >
                Nombre
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Descripción
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Fecha de creación
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Última modificación
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {Object.keys(groupedCategories).map((initial: string) => (
              <Fragment key={initial}>
                <tr className="border-t border-gray-200">
                  <th
                    colSpan={5}
                    scope="colgroup"
                    className="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                  >
                    {initial}
                  </th>
                </tr>
                {groupedCategories[initial].map((category, categoryIdx) => {
                  const categoryActions: ActionItemProps[] = [
                    addOnClickFunction(availableActions.view, category.id),
                    addOnClickFunction(availableActions.edit, category.id),
                    addOnClickFunction(availableActions.delete, category.id),
                  ];
                  return (
                    <tr
                      key={category.name}
                      className={classNames(
                        categoryIdx === 0
                          ? "border-gray-300"
                          : "border-gray-200",
                        "border-t"
                      )}
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {category.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {category.description}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {isoToDate(category.createdAt.toString())}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {isoToDate(category.updatedAt.toString())}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                        <ActionsMenu items={categoryActions} />
                      </td>
                    </tr>
                  );
                })}
              </Fragment>
            ))}
          </tbody>
        </table>
      )}
      <ModalCreator
        open={openCreator}
        setOpen={setOpenCreator}
        onSave={(formFields) => console.log(formFields)}
        availablePhotos={photos}
      />
      {categoryId && (
        <SideEditor
          open={openEditor}
          setOpen={setOpenEditor}
          onSave={(formFields) => console.log(formFields)}
          category={categories.find(
            (category: CategoryProps) => category.id === categoryId
          )}
          availablePhotos={isValidatingPhotos ? [] : photos}
        />
      )}
    </div>
  );
}

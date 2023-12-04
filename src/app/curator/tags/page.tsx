import { availableActions, sortOptions, sortOptionsEnum } from "../constants";
import { genericSort, groupByInitial } from "../utils";
import ModalCreator from "./components/modalCreator";
import SideEditor from "./components/sideEditor";
import ActionsMenu from "@/components/ActionsMenu";
import Filters from "@/components/Filters";
import { fetchTags } from "@/services/fetch";
import { isoToDate } from "@/services/string";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import useSWR from "swr";

export default function CuratorTags() {
  const [openCreator, setOpenCreator] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);
  const [tagId, setTagId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<sortOptionsEnum>(
    sortOptionsEnum["name=ASC"]
  );

  const { data: tags, isValidating } = useSWR("curator-tags", fetchTags);

  const toggleEditor = (tagId: number) => {
    setTagId(tagId);
    setOpenEditor(!openEditor);
  };

  const updateSort = (sortOption: string) => {
    const number = sortOptionsEnum[sortOption as keyof typeof sortOptionsEnum];
    setSortBy(number);
  };

  const sortTags = (sortOption: sortOptionsEnum, tags: TagProps[]) => {
    return genericSort(
      sortOption,
      tags,
      (a, b) => a.name.localeCompare(b.name),
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  };

  const sortedTags = sortTags(sortBy, tags ?? []);

  const groupedTags = groupByInitial(sortedTags ?? []);

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
    tagId: number
  ) => {
    return {
      ...action,
      onClick: () => {
        if (action.type === "edit") {
          toggleEditor(tagId);
        } else if (action.type === "view") {
          router.push(`/gallery/${tagId.toString()}`);
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
          Etiquetas
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
      {isValidating ? null : sortedTags.length === 0 ? (
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
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {Object.keys(groupedTags).map((initial: string) => (
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
                {groupedTags[initial].map((tag, tagIdx) => {
                  const tagActions: ActionItemProps[] = [
                    addOnClickFunction(availableActions.view, tag.id),
                    addOnClickFunction(availableActions.edit, tag.id),
                    addOnClickFunction(availableActions.delete, tag.id),
                  ];
                  return (
                    <tr
                      key={tag.name}
                      className={classNames(
                        tagIdx === 0 ? "border-gray-300" : "border-gray-200",
                        "border-t"
                      )}
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {tag.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {tag.description}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {isoToDate(tag.createdAt.toString())}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                        <ActionsMenu items={tagActions} />
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
      />
      {tagId && (
        <SideEditor
          open={openEditor}
          setClose={() => setOpenEditor(false)}
          tag={tags.find((tag: TagProps) => tag.id === tagId)}
        />
      )}
    </div>
  );
}

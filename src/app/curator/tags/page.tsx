import SideEditor from "../components/sideEditor";
import ActionsMenu from "@/components/ActionsMenu";
import Filters from "@/components/Filters";
import RectangleSkeleton from "@/components/animate/RectangleSkeleton";
import { fetchTags } from "@/services/fetch";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import useSWR from "swr";

const sortOptions = [
  { name: "Alfabético: A->Z", value: "name=ASC" },
  { name: "Alfabético: Z->A", value: "name=DESC" },
];

enum sortOptionsEnum {
  "name=ASC" = 0,
  "name=DESC" = 1,
}

const LoadingTags = () => (
  <div className="flex flex-col space-y-4">
    <div className="flex h-60 w-full space-x-4">
      <RectangleSkeleton sizeClasses="w-96 h-60" />
      <RectangleSkeleton sizeClasses="w-96 h-60" />
      <RectangleSkeleton sizeClasses="w-96 h-60" />
    </div>
    <div className="flex h-60 w-full space-x-4">
      <RectangleSkeleton sizeClasses="w-96 h-60" />
      <RectangleSkeleton sizeClasses="w-96 h-60" />
      <RectangleSkeleton sizeClasses="w-96 h-60" />
    </div>
    <div className="flex h-60 w-full space-x-4">
      <RectangleSkeleton sizeClasses="w-96 h-60" />
      <RectangleSkeleton sizeClasses="w-96 h-60" />
      <RectangleSkeleton sizeClasses="w-96 h-60" />
    </div>
  </div>
);

const actions: {
  [action: string]: {
    href: string;
    icon: React.ReactNode;
    type: string;
    label: string;
  };
} = {
  edit: {
    href: "#",
    type: "edit",
    label: "Editar",
    icon: (
      <PencilIcon
        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
        aria-hidden="true"
      />
    ),
  },
  view: {
    href: "#",
    type: "view",
    label: "Ver fotografías",
    icon: (
      <EyeIcon
        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
        aria-hidden="true"
      />
    ),
  },
  delete: {
    href: "#",
    type: "delete",
    label: "Eliminar",
    icon: (
      <TrashIcon
        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
        aria-hidden="true"
      />
    ),
  },
};

export default function CuratorTags() {
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
    switch (sortOption) {
      case 0: // A -> Z (orden alfabético ascendente por título)
        return tags.slice().sort((a, b) => a.name.localeCompare(b.name));

      case 1: // Z -> A (orden alfabético descendente por título)
        return tags.slice().sort((a, b) => b.name.localeCompare(a.name));

      default:
        console.error("Tipo de orden no reconocido");
        return tags;
    }
  };

  const sortedTags = sortTags(sortBy, tags ?? []);

  const groupTagsByInitial = (tags: TagProps[]) => {
    const groupedTags: { [initial: string]: TagProps[] } = {};

    tags.forEach((tag) => {
      const initial = tag.name.charAt(0).toUpperCase();

      const existsInitial = Object.keys(groupedTags).includes(initial);
      if (!existsInitial) {
        groupedTags[initial] = [] as TagProps[];
      }

      groupedTags[initial].push(tag);
    });

    return groupedTags;
  };

  const groupedTags = groupTagsByInitial(sortedTags ?? []);

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
            className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Crear
          </button>
        </h3>
        <div className="mt-3 flex sm:ml-4 sm:mt-0">
          <Filters
            sortOptions={sortOptions}
            setSort={updateSort}
            filters={[]}
            categories={[]}
            collections={[]}
          />
        </div>
      </div>
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
              <span className="sr-only">Edit</span>
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
                  addOnClickFunction(actions.edit, tag.id),
                  addOnClickFunction(actions.view, tag.id),
                  addOnClickFunction(actions.delete, tag.id),
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
                      {tag.createdAt.toString()}
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
      {tagId && (
        <SideEditor
          open={openEditor}
          setClose={() => setOpenEditor(false)}
          photo={tags.find((tag: TagProps) => tag.id === tagId)}
        />
      )}
    </div>
  );
}

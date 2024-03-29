import { availableActions, sortOptions, sortOptionsEnum } from "../constants";
import { genericSort } from "../utils";
import ModalCreator from "./components/modalCreator";
import SideEditor from "./components/sideEditor";
import ActionsMenu from "@/components/ActionsMenu";
import Filters from "@/components/Filters";
import RectangleSkeleton from "@/components/animate/RectangleSkeleton";
import { fetchCollections, fetchPhotos } from "@/services/fetch";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

const LoadingGallery = () => (
  <div className="flex flex-col space-y-8">
    <div className="flex h-32 w-full space-x-4">
      <RectangleSkeleton sizeClasses="w-52 h-32" />
      <RectangleSkeleton sizeClasses="w-52 h-32" />
      <RectangleSkeleton sizeClasses="w-52 h-32" />
      <RectangleSkeleton sizeClasses="w-52 h-32" />
    </div>
    <div className="flex h-32 w-full space-x-4">
      <RectangleSkeleton sizeClasses="w-52 h-32" />
      <RectangleSkeleton sizeClasses="w-52 h-32" />
      <RectangleSkeleton sizeClasses="w-52 h-32" />
      <RectangleSkeleton sizeClasses="w-52 h-32" />
    </div>
    <div className="flex h-32 w-full space-x-4">
      <RectangleSkeleton sizeClasses="w-52 h-32" />
      <RectangleSkeleton sizeClasses="w-52 h-32" />
      <RectangleSkeleton sizeClasses="w-52 h-32" />
      <RectangleSkeleton sizeClasses="w-52 h-32" />
    </div>
  </div>
);

export default function CuratorCollections() {
  const [openCreator, setOpenCreator] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);
  const [collectionId, setCollectionId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<sortOptionsEnum>(
    sortOptionsEnum["created_at=DESC"]
  );

  const { data: collections, isValidating } = useSWR(
    "curator-collections",
    fetchCollections
  );
  const { data: photos } = useSWR("curator-photos", fetchPhotos);

  const collectionIndexes = collections?.reduce((indexes: {[id: string]: CollectionProps}, collection: CollectionProps) => {
    indexes[collection.id.toString()] = collection;
    return indexes;
  }, {});

  const toggleEditor = (collectionId: number) => {
    setCollectionId(collectionId);
    setOpenEditor(!openEditor);
  };

  const updateSort = (sortOption: string) => {
    const number = sortOptionsEnum[sortOption as keyof typeof sortOptionsEnum];
    setSortBy(number);
  };

  const sortCollections = (
    sortOption: sortOptionsEnum,
    collections: CollectionProps[]
  ) => {
    return genericSort(
      sortOption,
      collections,
      (a, b) => a.title.localeCompare(b.title),
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  };

  const sortedCollections = sortCollections(sortBy, collections ?? []);

  const sortLocalOptions = sortOptions
    .slice(0, 2)
    .concat(sortOptions.slice(6, 8));

  const router = useRouter();

  const addOnClickFunction = (
    action: {
      href: string;
      icon: React.ReactNode;
      type: string;
      label: string;
    },
    collectionId: number
  ) => {
    return {
      ...action,
      onClick: () => {
        if (action.type === "edit") {
          toggleEditor(collectionId);
        } else if (action.type === "view") {
          router.push(`/gallery/${collectionId}`);
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
          Colecciones
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
      {isValidating ? (
        <LoadingGallery />
      ) : sortedCollections.length === 0 ? (
        <div className="flex flex-col space-y-3 items-center justify-center text-gray-500">
          <DocumentMagnifyingGlassIcon className="w-10 h-10" />
          <p>No hay nada para mostrar</p>
        </div>
      ) : (
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
        >
          {sortedCollections.map((collection: CollectionProps) => {
            const collectionActions: ActionItemProps[] = collection.visible
              ? [
                  addOnClickFunction(availableActions.view, collection.id),
                  addOnClickFunction(availableActions.edit, collection.id),
                  addOnClickFunction(availableActions.delete, collection.id),
                ]
              : [
                  addOnClickFunction(availableActions.edit, collection.id),
                  addOnClickFunction(availableActions.delete, collection.id),
                ];
            return (
              <li key={collection.imgSrc} className="relative">
                <div className="group aspect-w-10 block w-full overflow-hidden rounded-lg focus-within:ring-2 focus-within:ring-mainmf-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                  <div className="relative inline-block">
                    <img
                      src={collection.imgSrc}
                      alt={collection.title}
                      className={classNames(
                        "rounded-md pointer-events-none object-cover group-hover:opacity-75",
                        collection.visible ? "opacity-100" : "opacity-25"
                      )}
                    />
                    <span className="absolute top-0 right-0">
                      {!collection.visible && (
                        <span
                          className={classNames(
                            "inline-flex items-center rounded-full  px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10",
                            "bg-red-200"
                          )}
                        >
                          Oculta
                        </span>
                      )}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="absolute inset-0 focus:outline-none"
                    onClick={(e) =>
                      router.push(
                        collection.visible
                          ? `/gallery/${collection.id}`
                          : "/curator"
                      )
                    }
                  >
                    <span className="sr-only">
                      View details for {collection.title}
                    </span>
                  </button>
                </div>
                <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                  {collection.title}
                </p>
                <div className="flex items-center justify-between">
                  <p className="pointer-events-none block text-sm font-medium text-gray-500">
                    {collection.code}
                  </p>
                  <ActionsMenu items={collectionActions} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <ModalCreator
        open={openCreator}
        setOpen={setOpenCreator}
        onSave={(formFields) => console.log(formFields)}
        availablePhotos={photos}
      />
      {collectionId && (
        <SideEditor
          open={openEditor}
          setOpen={setOpenEditor}
          onSave={(formFields) => console.log(formFields)}
          collection={collectionIndexes[collectionId.toString()]}
          availablePhotos={photos}
        />
      )}
    </div>
  );
}

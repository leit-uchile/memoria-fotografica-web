import { availableActions, sortOptions, sortOptionsEnum } from "../constants";
import { genericSort } from "../utils";
import ModalCreator from "./components/modalCreator";
import SideEditor from "./components/sideEditor";
import { groupedFilters } from "@/app/constants";
import ActionsMenu from "@/components/ActionsMenu";
import Filters from "@/components/Filters";
import RectangleSkeleton from "@/components/animate/RectangleSkeleton";
import {
  fetchCampuses,
  fetchCollections,
  fetchPhotos,
  fetchTags,
} from "@/services/fetch";
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

export default function CuratorPhotos() {
  const [openCreator, setOpenCreator] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);
  const [photoId, setPhotoId] = useState("");
  const [sortBy, setSortBy] = useState<sortOptionsEnum>(
    sortOptionsEnum["created_at=DESC"]
  );

  const { data: photos, isValidating } = useSWR("curator-photos", fetchPhotos);
  const { data: tags, isValidating: isValidatingTags } = useSWR(
    "curator-tags",
    fetchTags
  );
  const { data: campuses, isValidating: isValidatingCampus } = useSWR(
    "curator-campuses",
    fetchCampuses
  );
  const { data: albums, isValidating: isValidatingAlbums } = useSWR(
    "curator-albums",
    fetchCollections
  );

  const toggleEditor = (photoId: string) => {
    setPhotoId(photoId);
    setOpenEditor(!openEditor);
  };

  const updateSort = (sortOption: string) => {
    const number = sortOptionsEnum[sortOption as keyof typeof sortOptionsEnum];
    setSortBy(number);
  };

  const sortPhotos = (sortOption: sortOptionsEnum, photos: PhotoProps[]) => {
    return genericSort(
      sortOption,
      photos,
      (a, b) => a.title.localeCompare(b.title),
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };

  const sortedPhotos = sortPhotos(sortBy, photos ?? []);

  // Add option "Todas" to each filter group
  // and add "checked" attribute to each option
  const extendedFilters = groupedFilters.map((group) => {
    const extendedOptions = group.options.map((option) => {
      return {
        ...option,
        checked: false,
      };
    });
    return {
      ...group,
      options: [
        { name: "Todas", value: "all", checked: true },
        ...extendedOptions,
      ],
    };
  });

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
    photoId: string
  ) => {
    return {
      ...action,
      onClick: () => {
        if (action.type === "edit") {
          toggleEditor(photoId);
        } else if (action.type === "view") {
          router.push(`/gallery/${photoId}`);
        } else if (action.type === "delete") {
          console.log("delete");
        } else if (action.type === "curar") {
          console.log("curar");
        } else if (action.type === "rechazar") {
          console.log("rechazar");
        }
      },
    };
  };

  return (
    <div>
      <div className="mb-8 border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Fotografías
          <button
            type="button"
            className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => setOpenCreator(true)}
          >
            Crear
          </button>
        </h3>
        <div className="mt-3 flex sm:ml-4 sm:mt-0">
          <Filters
            sortOptions={sortLocalOptions}
            setSort={updateSort}
            filters={extendedFilters}
            categories={[]}
            collections={[]}
          />
        </div>
      </div>
      {isValidating ? (
        <LoadingGallery />
      ) : (
        
          <ul
            role="list"
            className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
          >
            {sortedPhotos.map((photo: PhotoProps) => {
              const photoActions: ActionItemProps[] =
                photo.approved && photo.visible
                  ? [
                      addOnClickFunction(availableActions.view, photo.id),
                      addOnClickFunction(availableActions.edit, photo.id),
                      addOnClickFunction(availableActions.archive, photo.id),
                    ]
                  : photo.approved
                  ? [addOnClickFunction(availableActions.edit, photo.id)]
                  : [
                      addOnClickFunction(availableActions.curar, photo.id),
                      addOnClickFunction(availableActions.rechazar, photo.id),
                    ];
              return (
                <li key={photo.imgSrc} className="relative">
                  <div className="group aspect-w-10 block w-full overflow-hidden rounded-lg focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                    <div className="relative inline-block">
                      <img
                        src={photo.imgSrc}
                        alt={photo.title}
                        className={classNames(
                          "rounded-md pointer-events-none object-cover group-hover:opacity-75",
                          photo.visible ? "opacity-100" : "opacity-25"
                        )}
                      />
                      <span className="absolute top-0 right-0">
                        <span
                          className={classNames(
                            "inline-flex items-center rounded-full  px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10",
                            photo.approved ? "bg-gray-50" : "bg-red-200"
                          )}
                        >
                          {photo.approved ? "Aprobada" : "Pendiente"}
                        </span>
                        {!photo.visible && (
                          <span
                            className={classNames(
                              "inline-flex items-center rounded-full  px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10",
                              "bg-red-200"
                            )}
                          >
                            {"Oculta"}
                          </span>
                        )}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="absolute inset-0 focus:outline-none"
                      onClick={(e) =>
                        router.push(
                          photo.approved && photo.visible
                            ? `/gallery/${photo.id}`
                            : "/curator"
                        )
                      }
                    >
                      <span className="sr-only">
                        View details for {photo.title}
                      </span>
                    </button>
                  </div>
                  <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                    {photo.title}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="pointer-events-none block text-sm font-medium text-gray-500">
                      {photo.properties.code}
                    </p>
                    <ActionsMenu items={photoActions} />
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
        availableAlbums={isValidatingAlbums ? [] : albums}
        availableCampuses={isValidatingCampus ? [] : campuses}
        availableTags={isValidatingTags ? [] : tags}
      />
      {photoId && (
        <SideEditor
          open={openEditor}
          setOpen={setOpenEditor}
          onSave={(formFields) => console.log(formFields)}
          photo={photos.find((photo: PhotoProps) => photo.id === photoId)}
          availableAlbums={isValidatingAlbums ? [] : albums}
          availableCampuses={isValidatingCampus ? [] : campuses}
          availableTags={isValidatingTags ? [] : tags}
        />
      )}
    </div>
  );
}

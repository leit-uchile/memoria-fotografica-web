import {
    ArchiveBoxArrowDownIcon,
    ChatBubbleLeftRightIcon,
    EyeIcon,
    MagnifyingGlassIcon,
    PencilIcon,
    TrashIcon,
    XCircleIcon,
  } from "@heroicons/react/24/outline";
  
  export const sortOptions = [
    { name: "Alfabético: A->Z", value: "title=ASC" }, // Photos, Collections
    { name: "Alfabético: Z->A", value: "title=DESC" }, // Photos, Collections
    { name: "Alfabético: A->Z", value: "name=ASC" }, // Tags, Categories
    { name: "Alfabético: Z->A", value: "name=DESC" }, // Tags, Categories
    { name: "Alfabético: A->Z", value: "lastName=ASC" }, // Mails
    { name: "Alfabético: Z->A", value: "lastName=DESC" }, // Mails
    { name: "Nuevos primero", value: "created_at=DESC" },
    { name: "Antiguos primero", value: "created_at=ASC" },
  ];
  
  export enum sortOptionsEnum {
    "title=ASC" = 0,
    "title=DESC" = 1,
    "name=ASC" = 2,
    "name=DESC" = 3,
    "lastName=ASC" = 4,
    "lastName=DESC" = 5,
    "created_at=DESC" = 6,
    "created_at=ASC" = 7,
  }
  
  export const availableActions: {
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
    curar: {
      href: "#",
      type: "edit",
      label: "Curar",
      icon: (
        <MagnifyingGlassIcon
          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
      ),
    },
    reply: {
      href: "#",
      type: "edit",
      label: "Responder",
      icon: (
        <ChatBubbleLeftRightIcon
          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
      ),
    },
    view: {
      href: "#",
      type: "view",
      label: "Ver",
      icon: (
        <EyeIcon
          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
      ),
    },
    see: {
      href: "#",
      type: "edit",
      label: "Ver conversación",
      icon: (
        <ChatBubbleLeftRightIcon
          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
      ),
    },
    archive: {
      href: "#",
      type: "delete",
      label: "Archivar",
      icon: (
        <ArchiveBoxArrowDownIcon
          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
      ),
    },
    rechazar: {
      href: "#",
      type: "delete",
      label: "Rechazar",
      icon: (
        <XCircleIcon
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
  
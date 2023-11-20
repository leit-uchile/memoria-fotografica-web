import ActionsMenu from "@/components/ActionsMenu";
import Filters from "@/components/Filters";
import { fetchMails } from "@/services/fetch";
import {
  ArchiveBoxArrowDownIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import useSWR from "swr";

const sortOptions = [
  { name: "Alfabético: A->Z", value: "title=ASC" },
  { name: "Alfabético: Z->A", value: "title=DESC" },
  { name: "Nuevos primero", value: "created_at=DESC" },
  { name: "Antiguos primero", value: "created_at=ASC" },
];

enum sortOptionsEnum {
  "lastName=ASC" = 0,
  "lastName=DESC" = 1,
  "created_at=DESC" = 2,
  "created_at=ASC" = 3,
}

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
    label: "Responder",
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
};

export default function CuratorMails() {
  const [openEditor, setOpenEditor] = useState(false);
  const [mailId, setMailId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<sortOptionsEnum>(
    sortOptionsEnum["created_at=DESC"]
  );

  const { data: mails, isValidating } = useSWR("curator-mails", fetchMails);

  const toggleEditor = (mailId: number) => {
    setMailId(mailId);
    setOpenEditor(!openEditor);
  };

  const updateSort = (sortOption: string) => {
    const number = sortOptionsEnum[sortOption as keyof typeof sortOptionsEnum];
    setSortBy(number);
  };

  const sortMails = (sortOption: sortOptionsEnum, mails: MailProps[]) => {
    switch (sortOption) {
      case 0: // A -> Z (orden alfabético ascendente por apellido)
        return mails
          .slice()
          .sort((a, b) => a.lastname.localeCompare(b.lastname));

      case 1: // Z -> A (orden alfabético descendente por apellido)
        return mails
          .slice()
          .sort((a, b) => b.lastname.localeCompare(a.lastname));

      case 2: // Nuevos primero (orden descendente por fecha)
        return mails
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

      case 3: // Viejos primero (orden ascendente por fecha)
        return mails
          .slice()
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );

      default:
        console.error("Tipo de orden no reconocido");
        return mails;
    }
  };

  const sortedMails = sortMails(sortBy, mails ?? []);

  const groupMailsByType = (mails: MailProps[]) => {
    const groupedMails: { [type: string]: MailProps[] } = {
      "Solicitud de fotografía": [],
      Contacto: [],
    };

    mails.forEach((mail) => {
      const type = mail.isPhotoRequest ? "Solicitud de fotografía" : "Contacto";
      groupedMails[type].push(mail);
    });

    return groupedMails;
  };

  const groupedMails = groupMailsByType(sortedMails ?? []);

  const router = useRouter();

  const addOnClickFunction = (
    action: {
      href: string;
      icon: React.ReactNode;
      type: string;
      label: string;
    },
    mailId: number
  ) => {
    return {
      ...action,
      onClick: () => {
        if (action.type === "edit") {
          toggleEditor(mailId);
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
          Correo
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
              Apellido
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Fecha del primer mensaje
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {Object.keys(groupedMails).map((type: string) => (
            <Fragment key={type}>
              <tr className="border-t border-gray-200">
                <th
                  colSpan={5}
                  scope="colgroup"
                  className="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                >
                  {type}
                </th>
              </tr>
              {groupedMails[type].map((mail, mailIdx) => {
                const tagActions: ActionItemProps[] = [
                  addOnClickFunction(actions.edit, mail.id),
                  addOnClickFunction(actions.archive, mail.id),
                ];
                return (
                  <tr
                    key={mail.id}
                    className={classNames(
                      mailIdx === 0 ? "border-gray-300" : "border-gray-200",
                      "border-t"
                    )}
                  >
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-3">
                      {mail.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {mail.lastname}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {mail.createdAt.toString()}
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
      {/* {mailId && (
        <SideEditor
          open={openEditor}
          setClose={() => setOpenEditor(false)}
          photo={mails.find((mail: MailProps) => mail.id === mailId)}
        />
      )} */}
    </div>
  );
}

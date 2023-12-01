import { availableActions, sortOptions, sortOptionsEnum } from "../constants";
import { genericSort } from "../utils";
import SideEditor from "./components/sideEditor";
import ActionsMenu from "@/components/ActionsMenu";
import Filters from "@/components/Filters";
import { fetchMails } from "@/services/fetch";
import { isoToDate } from "@/services/string";
import classNames from "classnames";
import { Fragment, useState } from "react";
import useSWR from "swr";

export default function CuratorMails() {
  const [openEditor, setOpenEditor] = useState(false);
  const [mailId, setMailId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<sortOptionsEnum>(
    sortOptionsEnum["created_at=DESC"]
  );

  const { data: mails } = useSWR("curator-mails", fetchMails);

  const toggleEditor = (mailId: number) => {
    setMailId(mailId);
    setOpenEditor(!openEditor);
  };

  const updateSort = (sortOption: string) => {
    const number = sortOptionsEnum[sortOption as keyof typeof sortOptionsEnum];
    setSortBy(number);
  };

  const sortMails = (sortOption: sortOptionsEnum, mails: MailProps[]) => {
    return genericSort(
      sortOption,
      mails,
      (a, b) => a.lastName.localeCompare(b.lastName),
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
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

  const sortLocalOptions = sortOptions.slice(4, 8);

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
            sortOptions={sortLocalOptions}
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
              Apellido
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Nombre
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Fecha del primer mensaje
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Código de referencia
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
                const tagActions: ActionItemProps[] = mail.solved
                  ? [
                      addOnClickFunction(availableActions.see, mail.id),
                      addOnClickFunction(availableActions.archive, mail.id),
                    ]
                  : [
                      addOnClickFunction(availableActions.reply, mail.id),
                      addOnClickFunction(availableActions.archive, mail.id),
                    ];
                return (
                  <tr
                    key={mail.id}
                    className={classNames(
                      mailIdx === 0 ? "border-gray-300" : "border-gray-200",
                      "border-t"
                    )}
                  >
                    <td
                      className={classNames(
                        !mail.solved ? "font-bold" : "",
                        "whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-3"
                      )}
                    >
                      {mail.lastName}
                    </td>
                    <td
                      className={classNames(
                        !mail.solved ? "font-bold" : "",
                        "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      )}
                    >
                      {mail.name}
                    </td>
                    <td
                      className={classNames(
                        !mail.solved ? "font-bold" : "",
                        "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      )}
                    >
                      {isoToDate(mail.createdAt.toString())}
                    </td>
                    <td
                      className={classNames(
                        !mail.solved ? "font-bold" : "",
                        "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      )}
                    >
                      {mail.code}
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
      {mailId && (
        <SideEditor
          open={openEditor}
          setOpen={setOpenEditor}
          onSave={(formFields) => console.log(formFields)}
          mail={mails.find((mail: MailProps) => mail.id === mailId)}
        />
      )}
    </div>
  );
}

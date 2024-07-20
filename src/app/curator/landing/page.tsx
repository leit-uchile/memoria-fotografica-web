import { PhotoIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import ToggleModal from "./components/toggleModal";

export default function Landing() {
  const [lockFormModal, setLockFormModal] = useState(false);

  return (
    <div>
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Configuración
      </h3>
      <div
        key="0"
        className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <div
          className="rounded-md bg-mainmf-800 shadow cursor-pointer hover:bg-mainmf-400"
          onClick={() => setLockFormModal(true)}
        >
          <div className="p-4 sm:p-6 flex flex-col items-center space-y-4">
            <PhotoIcon className="h-6 w-6 text-white" aria-hidden="true" />
            <p className="truncate text-sm font-medium text-white">
              Formulario de aportes
            </p>
          </div>
        </div>
      </div>
      <ToggleModal
        open={lockFormModal}
        setOpen={setLockFormModal}
        onSave={() => {}}
      />
    </div>
  );
}

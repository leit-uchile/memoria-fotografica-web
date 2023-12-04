export const CircularAvatar = ({ fullName }: { fullName: string }) => {
  const getInitials = (fullName: string) => {
    const splitted = fullName.split(" ");
    const initials = splitted.map((word) => word.charAt(0));
    return initials.join("");
  };
  return (
    <div className="mt-4 flex text-sm">
      <div className="group inline-flex items-center">
        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-mainmf-500 text-white">
          <span>{getInitials(fullName)}</span>
        </div>
        <p className="text-gray-400 ml-2">Última modificación por {fullName}</p>
      </div>
    </div>
  );
};

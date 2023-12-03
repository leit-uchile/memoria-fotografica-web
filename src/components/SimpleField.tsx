import classNames from "classnames";
import { ChangeEvent } from "react";

type SimpleFieldProps = {
  label: string;
  fieldName: string;
  type?: "text" | "number" | "date";
  value: string | number | readonly string[] | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
};

const SimpleField: React.FC<SimpleFieldProps> = ({
  label,
  fieldName,
  type = "text",
  value,
  onChange,
  disabled = false,
  required = false,
}) => {
  return (
    <>
      <label
        htmlFor={fieldName}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          name={fieldName}
          id={fieldName}
          className={classNames(
            "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mainmf-600 sm:text-sm sm:leading-6",
            disabled
              ? "text-gray-500 bg-gray-50 cursor-not-allowed"
              : "text-gray-900"
          )}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
        />
      </div>
    </>
  );
};

export default SimpleField;

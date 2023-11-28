import { Combobox } from "@headlessui/react";
import {
  MagnifyingGlassCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useState } from "react";

type OptionProps = {
  name: string;
  value: string;
};

type SearchFieldProps = {
  label: string;
  optionsList: OptionProps[];
  selectedOptions: string[];
  setSelectedOptions: (value: string[]) => void;
};
const SearchField: React.FC<SearchFieldProps> = ({
  label,
  optionsList,
  selectedOptions,
  setSelectedOptions,
}) => {
  const [query, setQuery] = useState("");

  const handleSelectedOption = (value: string) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(
        selectedOptions.filter((selectedOption) => {
          return selectedOption !== value;
        })
      );
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  // Remove selected options from options list
  const options = optionsList.filter((option) => {
    return !selectedOptions.includes(option.value);
  });

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          return option.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <>
      <Combobox as="div" onChange={handleSelectedOption}>
        <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </Combobox.Label>
        <div className="relative mt-2">
          <Combobox.Input
            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(option: OptionProps) => option?.name}
          />
          <div className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <MagnifyingGlassCircleIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>

          {filteredOptions.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredOptions.map((option) => (
                <Combobox.Option
                  key={option.name}
                  value={option.value}
                  className={({ active }) =>
                    classNames(
                      "relative cursor-default select-none py-2 pl-3 pr-9",
                      active ? "bg-indigo-600 text-white" : "text-gray-900"
                    )
                  }
                >
                  <span className="block truncate">{option.name}</span>
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
      {selectedOptions.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
          {selectedOptions.map((option) => {
            const name = optionsList.find((opt) => opt.value === option)?.name;
            return (
              <span
                key={option}
                onClick={() => handleSelectedOption(option)}
                className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 bg-gray-50 cursor-pointer"
              >
                {name} <XMarkIcon className="h-4 w-4 ml-1" />
              </span>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SearchField;

import { Combobox } from "@headlessui/react";
import {
  CheckIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useState } from "react";

type OptionProps = {
  name: string;
  secondaryText?: string;
  value: string;
};

type SearchFieldProps = {
  label: string;
  optionsList: OptionProps[];
  selectedOptions: string[];
  setSelectedOptions: (value: string[]) => void;
  multipleSelection?: boolean;
  hideSelectedOptionsFromList?: boolean;
};
const SearchField: React.FC<SearchFieldProps> = ({
  label,
  optionsList,
  selectedOptions,
  setSelectedOptions,
  multipleSelection = false,
  hideSelectedOptionsFromList = false,
}) => {
  const [query, setQuery] = useState("");

  const handleOnWrite = (value: string) => {
    setQuery(value);
    // If multipleSelection is false and there are changes in the input, then we clear the selected options
    if(!multipleSelection){
      setSelectedOptions([]);
    }
  }

  const handleSelectedOption = (value: string) => {
    // If multipleSelection is false, then only one option can be selected
    if (!multipleSelection) {
      setSelectedOptions([value]);
      return;
    }
    // Otherwise we can select multiple options
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
  const options = hideSelectedOptionsFromList
    ? optionsList.filter((option) => {
        return !selectedOptions.includes(option.value);
      })
    : optionsList;

  // Filter options by query
  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          return option.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <>
      <Combobox
        as="div"
        value={
          !multipleSelection && selectedOptions.length == 1
            ? selectedOptions[0]
            : null
        }
        onChange={handleSelectedOption}
      >
        <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </Combobox.Label>
        <div className="relative mt-2">
          <Combobox.Input
            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-mainmf-600 sm:text-sm sm:leading-6"
            onChange={(event) => handleOnWrite(event.target.value)}
            displayValue={(option: string) =>
              optionsList.find((o) => o.value === option)?.name ?? ""
            }
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
                      active ? "bg-mainmf-600 text-white" : "text-gray-900"
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <div className="flex">
                        <span
                          className={classNames(
                            "truncate",
                            selected && "font-semibold"
                          )}
                        >
                          {option.name}
                        </span>
                        <span
                          className={classNames(
                            "ml-2 truncate text-gray-500",
                            active ? "text-mainmf-200" : "text-gray-500"
                          )}
                        >
                          {option.secondaryText}
                        </span>
                      </div>

                      {selected && (
                        <span
                          className={classNames(
                            "absolute inset-y-0 right-0 flex items-center pr-4",
                            active ? "text-white" : "text-mainmf-600"
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    </>
  );
};

export default SearchField;

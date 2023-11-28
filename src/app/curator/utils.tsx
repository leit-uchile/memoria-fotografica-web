import { sortOptionsEnum } from "./constants";

export const genericSort = <T extends SortableProps>(
  sortOption: sortOptionsEnum,
  items: T[],
  compareFn: (a: T, b: T) => number,
  compareDateFn: (a: T, b: T) => number
): T[] => {
  switch (sortOption) {
    case 0:
    case 2:
    case 4:
      return items.slice().sort(compareFn);

    case 1:
    case 3:
    case 5:
      return items.slice().sort((a, b) => compareFn(b, a)); // Invierte el orden

    case 6:
      return items.slice().sort(compareDateFn);

    case 7:
      return items.slice().sort((a, b) => compareDateFn(b, a)); // Invierte el orden

    default:
      console.error("Tipo de orden no reconocido");
      return items;
  }
};

export const groupByInitial = <T extends InitialGroupingProps>(
  items: T[]
): { [initial: string]: T[] } => {
  const groupedItems: { [initial: string]: T[] } = {};

  items.forEach((item) => {
    const initial = item.name.charAt(0).toUpperCase();

    if (!groupedItems[initial]) {
      groupedItems[initial] = [];
    }

    groupedItems[initial].push(item);
  });

  return groupedItems;
};
// Choices from server translated to Spanish

export const photoFormatLabels: {
  [key: number]: string;
} = {
  1: "35mm",
  2: "APS",
  3: "Digital",
  4: "Otro",
};

export const photoProcessLabels: {
  [key: number]: string;
} = {
  1: "Negativo",
  2: "Positivo",
  3: "Otro",
};

export const photoSupportLabels: {
  [key: number]: string;
} = {
  1: "Papel",
  2: "Acetato",
  3: "Otro",
};

export const photoTechniqueLabels: {
  [key: number]: string;
} = {
  1: "Gelatina",
  2: "Cianotipia",
  3: "Platinotipia",
  4: "Otro",
};

export const photoToneLabels: {
  [key: number]: string;
} = {
  1: "Color",
  2: "Blanco y Negro",
  3: "Sepia",
  4: "Otro",
};

export const ccLabels: {
  [key: number]: string;
} = {
  1: "CC BY",
  2: "CC BY-SA",
  3: "CC BY-ND",
  4: "CC BY-NC",
  5: "CC BY-NC-SA",
  6: "CC BY-NC-ND",
};

// Dropdown options

export const photoStatus: { name: string; value: boolean }[] = [
  {
    name: "Aprobada",
    value: true,
  },
  {
    name: "Pendiente",
    value: false,
  },
];

export const photoVisibility: { name: string; value: boolean }[] = [
  {
    name: "Visible",
    value: true,
  },
  {
    name: "Oculta",
    value: false,
  },
];

export const photoFormat: { name: string; value: string }[] = Object.entries(
  photoFormatLabels
).map(([value, name]) => ({
  name,
  value: value,
}));

export const photoProcess: { name: string; value: string }[] = Object.entries(
  photoProcessLabels
).map(([value, name]) => ({
  name,
  value: value,
}));

export const photoSupport: { name: string; value: string }[] = Object.entries(
  photoSupportLabels
).map(([value, name]) => ({
  name,
  value: value,
}));

export const photoTechnique: { name: string; value: string }[] = Object.entries(
  photoTechniqueLabels
).map(([value, name]) => ({
  name,
  value: value,
}));

export const photoTone: { name: string; value: string }[] = Object.entries(
  photoToneLabels
).map(([value, name]) => ({
  name,
  value: value,
}));

export const cc: { name: string; value: string; imgSrc: string }[] = [
  {
    name: "CC BY",
    value: "CC BY",
    imgSrc: "/assets/CC/CCBY.svg",
  },
  {
    name: "CC BY-SA",
    value: "CC BY-SA",
    imgSrc: "/assets/CC/CCBYSA.svg",
  },
  {
    name: "CC BY-ND",
    value: "CC BY-ND",
    imgSrc: "/assets/CC/CCBYND.svg",
  },
  {
    name: "CC BY-NC",
    value: "CC BY-NC",
    imgSrc: "/assets/CC/CCBYNC.svg",
  },
  {
    name: "CC BY-NC-SA",
    value: "CC BY-NC-SA",
    imgSrc: "/assets/CC/CCBYNCSA.svg",
  },
  {
    name: "CC BY-NC-ND",
    value: "CC BY-NC-ND",
    imgSrc: "/assets/CC/CCBYNCND.svg",
  },
];

// Filters

const filters = [
  ...photoStatus,
  ...photoVisibility,
  ...photoFormat,
  ...photoProcess,
  ...photoSupport,
  ...photoTechnique,
  ...photoTone,
  ...cc,
];

export const groupedFilters = [
  { id: "approved", name: "Estado", options: photoStatus },
  { id: "visible", name: "Visibilidad", options: photoVisibility },
  { id: "format", name: "Formato", options: photoFormat },
  { id: "process", name: "Proceso fotográfico", options: photoProcess },
  { id: "support", name: "Soporte", options: photoSupport },
  { id: "technique", name: "Técnica fotográfica", options: photoTechnique },
  { id: "tone", name: "Tono", options: photoTone },
  { id: "cc", name: "Licencia", options: cc },
];

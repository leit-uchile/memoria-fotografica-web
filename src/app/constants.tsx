export const photoStatus = [
  {
    name: "Aprobada",
    value: true,
  },
  {
    name: "Pendiente",
    value: false,
  },
];

export const photoVisibility = [
  {
    name: "Visible",
    value: true,
  },
  {
    name: "Oculta",
    value: false,
  },
];

export const photoFormat = [
  {
    name: "35mm",
    value: "35mm",
  },
  {
    name: "APS",
    value: "APS",
  },
  {
    name: "Digital",
    value: "Digital",
  },
  {
    name: "Otro",
    value: "Other",
  },
];

export const photoProcess = [
  {
    name: "Negativo",
    value: "Negative",
  },
  {
    name: "Positivo",
    value: "Positive",
  },
  {
    name: "Otro",
    value: "Other",
  },
];

export const photoSupport = [
  {
    name: "Papel",
    value: "Paper",
  },
  {
    name: "Acetato",
    value: "Acetate",
  },
  {
    name: "Otro",
    value: "Other",
  },
];

export const photoTechnique = [
  {
    name: "Gelatina",
    value: "Gelatin",
  },
  {
    name: "Cianotipia",
    value: "Cyanotype",
  },
  {
    name: "Platinotipia",
    value: "Platinum",
  },
  {
    name: "Otro",
    value: "Other",
  },
];

export const photoTone = [
  {
    name: "Color",
    value: "Color",
  },
  {
    name: "Blanco y Negro",
    value: "Black and White",
  },
  {
    name: "Sepia",
    value: "Sepia",
  },
  {
    name: "Otro",
    value: "Other",
  },
];

export const cc = [
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

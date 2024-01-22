interface SortableProps {
  id: string | number;
  createdAt?: Date | string;
  name?: string;
  lastname?: string;
  title?: string;
  date?: string;
  description?: string;
}

interface InitialGroupingProps {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
}

type PhotoProps = {
  id: number;
  code: string;
  imgSrc: string;
  title: string;
  description: string;
  date: string;
  cc: string;
  width: number;
  height: number;
  author: string;
  owner: string;
  location: string;
  format: number;
  process: number;
  support: number;
  photoTechnique: number;
  tone: number;
  createdAt: Date;
  updatedAt: Date;
  approved: boolean;
  visible: boolean;
  properties: {
    editedBy: string;
    tags: number[];
    collection: number;
    campus: number;
  };
};

type CollectionProps = {
  id: number;
  code: string;
  imgSrc: string;
  title: string;
  description: string;
  width: number;
  height: number;
  createdAt: Date;
  updatedAt: Date;
  visible: boolean;
  properties: {
    editedBy: string;
    photos: number[];
  };
};

type TagProps = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  properties: {
    editedBy: string;
  };
};

type CategoryProps = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  properties: {
    editedBy: string;
    photos: number[];
  };
};

type CampusProps = {
  id: number;
  name: string;
  imgSrc: string;
};

type MailProps = {
  id: number;
  code: string;
  isPhotoRequest: boolean;
  subject: string;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
  answer: string;
  photoCode: string;
  createdAt: Date;
  updatedAt: Date;
  solved: boolean;
  approved: boolean;
  visible: boolean;
  properties:{
    editedBy: string;
  }
};

type ActionItemProps = {
  href: string;
  icon: React.ReactNode;
  type: string;
  label: string;
  onClick: () => void;
};

type FieldProps = {
  name: string;
  value: string;
};

type ExtendedFieldProps = FieldProps & {
  imgSrc: string;
};

type Filter = {
  name: string;
  value: string;
  imgSrc?: string;
};

type GroupedFilter = {
  id: string;
  name: string;
  options: Filter[];
};

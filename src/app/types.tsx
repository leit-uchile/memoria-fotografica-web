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
  id: string;
  imgSrc: string;
  title: string;
  date: string;
  description: string;
  visible: boolean;
  approved: boolean;
  properties: {
    code: string;
    tags: TagProps[];
    cc: string;
    width: number;
    height: number;
    album: string;
    author: string;
    location: string;
    campus: string;
    format: string;
    process: string;
    support: string;
    photoTechnique: string;
    tone: string;
  };
};

type CollectionProps = {
  id: string;
  imgSrc: string;
  title: string;
  description: string;
  createdAt: Date;
  visible: boolean;
  properties: {
    code: string;
    width: number;
    height: number;
  };
};

type TagProps = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
};

type CategoryProps = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
};

type CampusProps = {
  name: string;
  value: string;
  imgSrc: string;
};

type MailProps = {
  id: number;
  archived: boolean;
  solved: boolean;
  asunto: string;
  name: string;
  lastname: string;
  phone: string;
  message: string;
  code: string;
  isPhotoRequest: boolean;
  photoCode: string;
  createdAt: Date;
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

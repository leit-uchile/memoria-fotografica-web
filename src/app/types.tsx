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

type FieldProps = {
  name: string;
  value: string;
};

type ExtendedFieldProps = FieldProps & {
  imgSrc: string;
};

type TagProps = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
};

type ActionItemProps = {
  href: string;
  icon: React.ReactNode;
  type: string;
  label: string;
  onClick: () => void;
}

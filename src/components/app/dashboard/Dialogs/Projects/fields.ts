import { IProjectsData } from "@/types/types";

export const fields: {
  name: keyof IProjectsData;
  type: string;
  label: string;
  required?: string;
  validate?: boolean;
  showInAdd?: boolean;
  showInEdit?: boolean;
}[] = [
  {
    name: "title_en",
    type: "text",
    label: "title_en",
    required: "englishTitleIsRequired",
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "title_ar",
    type: "text",
    label: "title_ar",
    required: "arabicTitleIsRequired",
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "description_en",
    type: "text",
    label: "description_en",
    required: "englishDescriptionIsRequired",
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "description_ar",
    type: "text",
    label: "description_ar",
    required: "arabicDescriptionIsRequired",
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "image",
    type: "file",
    label: "image",
    required: "imageIsRequired",
    validate: false,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "images",
    type: "file",
    label: "images",
    required: "imageIsRequired",
    validate: false,
    showInAdd: true,
    showInEdit: true,
  },

  {
    name: "link",
    type: "text",
    label: "link",
    required: "linkIsRequired",
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
];

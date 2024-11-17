import { IMetaData } from "@/types/types";

export const fields: {
  name: keyof IMetaData;
  type: string;
  label: string;
  required?: string;
  validate?: boolean;
  showInAdd?: boolean;
  showInEdit?: boolean;
}[] = [
  {
    name: "meta_description_en",
    type: "text",
    label: "meta_description_en",
    required: "meta_description_en_IsRequired",
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "meta_description_ar",
    type: "text",
    label: "meta_description_ar",
    required: "meta_description_ar_IsRequired",
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "meta_title_en",
    type: "text",
    label: "meta_title_en",
    required: "meta_title_en_IsRequired",
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "meta_title_ar",
    type: "text",
    label: "meta_title_ar",
    required: "meta_title_ar_IsRequired",
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "meta_keywords_en",
    type: "text",
    label: "meta_keywords_en",
    required: "meta_keywords_en_IsRequired",
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "meta_keywords_ar",
    type: "text",
    label: "meta_keywords_ar",
    required: "meta_keywords_ar_IsRequired",
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  
];

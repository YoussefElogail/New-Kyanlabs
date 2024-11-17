import { ITeamData } from "@/types/types";

export const fields: {
  name: keyof ITeamData;
  type: string;
  label: string;
  required?: string;
  validate?: boolean;
  showInAdd?: boolean;
  showInEdit?: boolean;
}[] = [
  {
    name: "name_en",
    type: "text",
    label: "name_en",
    required: "arabicNameIsRequired",
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "name_ar",
    type: "text",
    label: "name_ar",
    required: "englishNameIsRequired",
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "position_en",
    type: "text",
    label: "position_en",
    required: "englishPositionIsRequired",
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "position_ar",
    type: "text",
    label: "position_ar",
    required: "arabicPositionIsRequired",
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "email",
    type: "email",
    label: "email",
    required: "EmailRequired",
    validate: false,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "image",
    type: "file",
    label: "image",
    required: "imageIsRequired",
    validate: false ,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "link_facebook",
    type: "text",
    label: "link_facebook",
    required: "facebookLinkIsRequired",
    validate: false,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "link_instagram",
    type: "text",
    label: "link_linkedin",
    required: "linkedinLinkIsRequired",
    validate: false,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "link_twitter",
    type: "text",
    label: "link_twitter",
    required: "twitterLinkIsRequired",
    validate: false,
    showInAdd: true,
    showInEdit: true,
  },
  // {
  //   name: "link_linkedin",
  //   type: "text",
  //   label: "link_linkedin",
  //   required: "linkedinLinkIsRequired",
  //   validate: false,
  //   showInAdd: true,
  //   showInEdit: true,
  // },
];

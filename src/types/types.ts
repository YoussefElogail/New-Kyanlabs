
export interface IProjectsData {
  id: number;
  image: string;
  images: string[];
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  link: string;
}
export interface IProjectData {
  id: number;
  image: string;
  images: string[];
  title: string;
  description: string;
  link: string;
}
export interface ITeamData {
  id: number;
  image: string;
  name_ar: string;
  name_en: string;
  position_ar: string;
  position_en: string;
  email: string;
  link_facebook?: string;
  link_twitter?: string;
  link_instagram?: string;
  link_linkedin?: string;
}
export interface ITeam extends ITeamLinks {
  id?: number;
  image: string;
  name?: string;
  position?: string;
}

export interface IProjects {
  id?: number;
  image: string;
  title?: string;
  description?: string;
  link?: string;
}

export interface IMetaData {
  id: number;
  meta_description_ar: string;
  meta_description_en: string;
  meta_title_ar: string;
  meta_title_en: string;
  meta_keywords_en: string;
  meta_keywords_ar: string;
}
export interface IUserMetaData {
  id: number;
  meta_description: string;

  meta_title: string;
  meta_keywords: string;
}

export interface ICardData extends ITeam,IProjects  {
  cardType: "product" | "team";
}

export interface ContactUsData {
  name: string;
  email: string;
  message: string;
  phone?: string;
}
export interface ITeamLinks {
  link_facebook?: string;
  link_twitter?: string;
  link_instagram?: string;
  link_linkedin?: string;
  email?:string
}
export interface IUserSignIn {
  email: string ;
  password: string;
}
export interface IUserSignUp extends IUserSignIn {
  username: string ;
  phone?: string ;
}

export interface IProfileData {
  label: string ;
  value: string ;
  registerName: keyof IUserSignUp
}

export interface IUser {
  id: number;
  username: string;
  type: string;
  phone: string;
  email: string;
  created_at: string;
  updated_at: string;
  projects: IUserProject[];
}

export interface IUserProject {
  id: number;
  title: string;
  details: string;
  user_id: number;
  status: string;
  created_at: Date;
  updated_at: Date;
  navigateToProject?: (id:string)=> void
}

export interface IUserProjectReports{
  id:number;
  report: string;
  percentage: number;
  created_at?: Date;
  updated_at?: Date;

}


export type INavLinks = {
  label: string,
      url: string,
}
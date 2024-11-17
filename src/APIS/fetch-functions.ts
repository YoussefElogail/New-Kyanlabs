import axios from "axios";
import { baseURL,  showProject,  userMetaData } from "./end-point";

export const getProjects = async (lang: string | undefined) => {
  try {
    const req = await fetch(`${baseURL}/user/company/projects/${lang}`, {
      next: {
        // revalidate: 60 * 60 * 24 ,
      },
    });
    const data = await req.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProject = async(id:string,lang:string)=>{
try {
  const req = await fetch(`${baseURL}${showProject}${id}/${lang}`,
    {
      next: {
        // revalidate: 60 * 60 * 24
      }
    }
  )
  const data = await req.json();
    return data.data;
} catch (error) {
  console.error(error);

}
}

export const getTeam = async (lang: string | undefined) => {
  try {
    const req = await fetch(`${baseURL}/user/team/${lang}`, {
      next: {
        // revalidate: 60 * 60 * 24,
      },
    });
    const data = await req.json();
    return data?.data;
  } catch (error) {
    console.error(error);

  }
};

export const getMetaData = async (lang: string) => {
  try {
    const req = await axios.get(`${baseURL}${userMetaData}${lang}`);
    return req.data?.data;
  } catch (error) {
    console.error(error);
  }
};

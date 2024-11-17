import ProjectsWrapper from '@/components/app/user-Projects/ProjectsWrapper'
import SectionTitleDis from '@/components/SectionTitleDis'
import { useTranslations } from 'next-intl'
import React from 'react'

const ProjectsPage = () => {

  const t = useTranslations("userProjects")
  
  return (
    <div className='my-3 w-full md:container'>
        <SectionTitleDis title={t("title")} classN='main-section-title-dis'  />
            <ProjectsWrapper />
    </div>
  )
}

export default ProjectsPage
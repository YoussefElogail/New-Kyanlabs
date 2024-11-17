
import ProjectCompanyDetailsShow from '@/components/app/project-company-details/ProjectCompanyDetailsShow'
import SectionTitleDis from '@/components/SectionTitleDis'
import CircleSpinner from '@/components/Spanner'
import { useTranslations } from 'next-intl'
import { Suspense } from 'react'

export default  function ProjectCompanyPage({ params: { id } }: { params: { id: string } }) {

 const t = useTranslations("ProjectCompany")

  return (
    <main className="container mx-auto px-4 mt-20 p-6 min-h-[calc(100vh-(95px+328px))] flex flex-col gap-6">
      <SectionTitleDis title={t("title")} classN='main-section-title-dis'  />
      <Suspense fallback={<CircleSpinner />}>
      <ProjectCompanyDetailsShow projectId={id} />
      </Suspense>
    </main>
  )
}
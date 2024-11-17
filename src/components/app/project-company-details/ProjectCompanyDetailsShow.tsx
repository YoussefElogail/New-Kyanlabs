import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from 'lucide-react'
import { IProjectData } from '@/types/types'
import { getProject } from '@/APIS/fetch-functions'
import ImagesShow from './ImagesShow'
import { cookies } from 'next/headers'
import { useTranslations } from 'next-intl'

const ProjectCompanyDetailsShow = async ({projectId}:{projectId:string}) => {
  const t =  useTranslations("ProjectCompany")
  const cookieStore = await cookies()
  const lang = cookieStore.get('NEXT_LOCALE')?.value
  const projectData:IProjectData = await getProject(projectId, lang!)
  return (
    <Card className="w-full min-h-[600px] ">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{projectData?.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(projectData.images && projectData.images) && (
            <ImagesShow projectData={projectData} />
          )}
          <div>
            <h2 className="text-xl font-semibold mb-2">{t("projectDescription")}</h2>
            <p className="text-gray-600 mb-4">{projectData?.description}</p>
            {projectData.link && (
              <Button asChild className="mt-4 main-btn">
                <Link href={projectData.link} target="_blank" rel="noopener noreferrer">
                  {t("Live Preview")}<ExternalLink className="ml-2" size={16} />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProjectCompanyDetailsShow

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { IUserProjectReports } from '@/types/types'
import { formatDate } from '@/utils/formatDate'
import DeleteReport from './Dialogs/DeleteReport'
import EditReport from './Dialogs/EditReport'
import {useTranslations} from "next-intl";
// import Replays from './replays/Replays'

interface ReportCardProps extends IUserProjectReports  {isAdmin: boolean;  ReportNumber?: number;}

export default function ReportCard({reportData}:{reportData:ReportCardProps}) {
    const t = useTranslations("projectReport");

  return (
    <div className="p-4 flex items-center justify-start ">
       <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t("title")} #{reportData?.ReportNumber}</CardTitle>
          <Badge variant="outline">{reportData?.percentage}%</Badge>
        </div>
        <CardDescription>{t("created")}: {formatDate(reportData.created_at!)}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">{reportData?.report}</p>
        <Progress value={reportData?.percentage} className="w-full" />
        <p className="text-xs text-gray-400 dark:text-gray-500">
            {t("lastUpdated")}: {formatDate(reportData.updated_at!)}
        </p>
      </CardContent>
      {reportData?.isAdmin && (
        <CardFooter>
        <EditReport reportData={reportData} />
        <DeleteReport reportData={reportData} />
      </CardFooter>
      )}
      {/* <Replays /> */}
    </Card>
    </div>
  )
}
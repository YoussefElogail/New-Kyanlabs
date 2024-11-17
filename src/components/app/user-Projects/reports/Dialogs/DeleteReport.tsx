import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { IUserProjectReports } from '@/types/types'
import useDeleteData from '@/custom hooks/useDeleteData'
import { Trash2 } from 'lucide-react'
// import { useTranslations } from 'next-intl'
import React from 'react'
import { DeleteOrEditUserProjectReport } from '@/APIS/end-point'

const DeleteReport = ({reportData}:{reportData: IUserProjectReports}) => {
    const { isPending, mutate } = useDeleteData(
      DeleteOrEditUserProjectReport,
      reportData?.id,
        "deleteUserProjectReport",
        "getReports"
      );

      console.log(reportData)
    //   const t = useTranslations("deletePopup");
    
      const handleConfirmDelete = () => {
        mutate();
      };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="mr-2">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] " >
        <DialogHeader>
          <DialogTitle>
            delete this {"=>"}
          </DialogTitle>
          <DialogDescription>test</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            variant="destructive"
            onClick={handleConfirmDelete}
            disabled={isPending}
          >
            ssss
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteReport
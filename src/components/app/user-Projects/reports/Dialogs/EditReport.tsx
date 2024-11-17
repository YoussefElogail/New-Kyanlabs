import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Pencil } from 'lucide-react'
import React from 'react'
import { fields } from './fields'
import useEditData from '@/custom hooks/useEditData'
import { useForm } from 'react-hook-form'
import { IUserProjectReports } from '@/types/types'
import { DeleteOrEditUserProjectReport } from '@/APIS/end-point'

const EditReport = ({reportData}:{reportData:IUserProjectReports}) => {
  const [open, setOpen] = React.useState(false);

  const { register, formState:{errors}, handleSubmit, reset } = useForm<IUserProjectReports>();

  const { mutate } = useEditData<IUserProjectReports>(
    DeleteOrEditUserProjectReport,
    reportData?.id,
    "editUserProjectReport",
    "getReports",
    "put"
  );
  const onSubmit = (data: IUserProjectReports) => {
    reset()
    setOpen(false)
    
    mutate(data);
  };


  React.useMemo(() => {
    if (reportData) {
      reset(reportData);
    }
  }, [reportData, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="mr-2">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>edit</DialogTitle>
        </DialogHeader>
        {/* Add form fields for editing project */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 p-4 max-h-[calc(100vh-200px)] overflow-y-auto"
        >
           {fields
          .filter((field) => field.showInEdit)
          .map((field) => (
            <div className="space-y-2 my-3" key={field.name}>
              <Label htmlFor={field.name} className="text-right">
                {field.label}
              </Label>
              <Input
                id={field.name}
                type={field.type}
                className="col-span-3"
                {...register(
                  field.name,
                  field.validate ? { required: field.required} : {}
                )}
              />
              {errors[field.name] && (
                <div className="text-red-500 w-full">
                  {errors[field.name]?.message}
                </div>
              )}
            </div>
          ))}
          <Button
            // disabled={isPending}
            type="submit"
            className="bg-[#2bbaa5] hover:bg-[#239485]"
          >
            {"editProject"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditReport
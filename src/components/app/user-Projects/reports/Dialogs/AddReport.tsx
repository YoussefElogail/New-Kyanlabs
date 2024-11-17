import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import React, { useEffect } from 'react';
import { fields } from './fields';
import { useForm } from 'react-hook-form';
import { IUserProjectReports } from '@/types/types';
import useAddData from '@/custom hooks/useAddData';
import { useParams } from 'next/navigation';
import { addReport } from '@/APIS/end-point';
import CircleSpinner from '@/components/Spanner';

const AddReport = () => {
  const [open, setOpen] = React.useState(false);

  const { register, formState: { errors }, handleSubmit, reset } = useForm<IUserProjectReports>();
  const { userProjectId } = useParams();
  const { mutate, isSuccess, isPending } = useAddData<IUserProjectReports>(
    addReport,
    'AddReport',
    'getReports'
  );

  const onSubmit = (data: IUserProjectReports) => {
    const d = { ...data, project_id: userProjectId };
    mutate(d);
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      reset();
    }
  }, [isSuccess, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="fixed bottom-24 right-0">
        <Button className="mr-2 rounded-full main-btn">
          Add report
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add</DialogTitle>
        </DialogHeader>
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
                    field.validate
                      ? {
                          required: field.required,
                          min: field.type === 'number' ? { value: 1, message: 'min 1' } : undefined,
                          max: field.type === 'number' ? { value: 100, message: 'max 100' } : undefined,
                        }
                      : {}
                  )}
                />
                {errors[field.name] && (
                  <div className="text-red-500 w-full">
                    {errors[field.name]?.message}
                  </div>
                )}
              </div>
            ))}
          {isPending ? (
            <CircleSpinner />
          ) : (
            <Button type="submit" className="bg-[#2bbaa5] hover:bg-[#239485]">
              Add Report
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReport;

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function AddButton({
  handleAddDialog,
}: {
  handleAddDialog: () => void;
}) {
  const fireHandleAddDialog = () => {
    handleAddDialog();
  };
  const t = useTranslations("Table");
  return (
    <div className="relative justify-center">
      <Button
        className="bg-mainColor hover:bg-mainColor"
        onClick={fireHandleAddDialog}
      >
        {t("add")}
      </Button>
    </div>
  );
}

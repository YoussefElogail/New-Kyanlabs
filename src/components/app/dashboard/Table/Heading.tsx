import { BadgePlus } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Heading({ title }: { title: string }) {
  const t = useTranslations("Table");
  return (
    <h2 className="font-bold text-mainColor  text-3xl flex items-center gap-3">
      <BadgePlus />
      {t("manage")} {title}
    </h2>
  );
}

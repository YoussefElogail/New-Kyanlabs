import MetaData from "@/components/app/dashboard/meta-data/MetaData";
import ProjectTable from "@/components/app/dashboard/ProjectTable";
import TeamsTable from "@/components/app/dashboard/TeamsTable";
import UsersTable from "@/components/app/dashboard/UsersTable";

export default function DashboardPage() {
  return (
    <section className="container mx-auto mt-20 p-6 min-h-[calc(100vh-(95px+352px))]">
      <MetaData />
      <UsersTable />
      <TeamsTable />
      <ProjectTable />
    </section>
  );
}

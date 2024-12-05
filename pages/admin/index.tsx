import DefaultLayout from "@/layouts/default";
import Admin from "../../src/hoc/Admin";
import Table from "@/components/table";

const Dashboard = () => {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <Table />
      </section>
    </DefaultLayout>
  );
}
export default Admin(Dashboard);

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import withAuth from "../../src/hoc/withAuth";
import { getDataModalUsers } from "@/src/firebase/getData";
import { useState } from "react";

function Dashboard() {
  const [value, setValue] = useState("");

  function batata() {
    getDataModalUsers().then((tipo: any) => {
      console.log("Retorno de getUserType:", tipo);
    });
    
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Dashboard</h1>
          <button onClick={batata}>AAA</button>
          <p>Tipo do usuário: {value}</p>
        </div>
      </section>
    </DefaultLayout>
  );
}

export default withAuth(Dashboard); // Presumindo que você está protegendo a rota com HOC

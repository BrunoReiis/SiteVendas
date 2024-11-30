import { useRouter } from "next/router";
import { useState, useEffect, ReactNode } from "react";
import { auth } from "../firebase/authentication";
import { getUserType } from "../firebase/getData";

const Admin = (WrappedComponent: React.ComponentType<any>) => {
  const AdminComponent = (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuthentication = async () => {
        const user = auth.currentUser; 

        if (!user) {
          console.log("Usuário não autenticado, redirecionando para login...");
          router.push("/login");
        } else {
          try {
            const userType = await getUserType();

            if (userType !== 1) {
              router.push("/dashboard");
            } else {
            }
          } catch (error) {

          }
        }

        setLoading(false);
      };

      checkAuthentication(); 

    }, [router]);

    if (loading) {
      return <p>Loading...</p>; 
    }

    return <WrappedComponent {...props} />;
  };

  // Atribuindo nome para o componente HOC
  AdminComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return AdminComponent;
};

export default Admin;

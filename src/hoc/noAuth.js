import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "../firebase/authentication";

const noAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (!user) {
            setLoading(false);
        } else {
            router.replace("/dashboard");
        }
      });

      return () => unsubscribe();
    }, [router]);

    if (loading) {
      return <p>Loading...</p>;
    }

    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `noAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return AuthComponent;
};

export default noAuth;

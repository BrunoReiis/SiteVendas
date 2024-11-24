import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { EyeSlashFilledIcon, EyeFilledIcon, NexusLogo } from "@/components/icons";
import { useState } from "react";
import {
  loginComEmailESenha,
  recuperarSenha,
} from "@/src/firebase/authentication";
import { useRouter } from "next/router";
import noAuth from "../../src/hoc/noAuth";

function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [valueEmail, setValueEmail] = useState("");
  const [valuePwd, setValuePwd] = useState("");
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const buttonSend = () => {
    if (!valueEmail) {
      alert("Email não pode estar vazio!");
      return;
    }
    if (!testEmail()) {
      alert("Email Invalido");
      return;
    }
    if (!testPwd()) {
      alert("Senha menor que 6 digitos");
      return;
    }

    loginComEmailESenha(valueEmail, valuePwd, router);
  };

  function testPwd() {
    if (valuePwd.length < 6) {
      return false;
    }
    return true;
  }

  function testEmail() {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(valueEmail);
  }

  const forgotPwd = () => {
    if (!valueEmail) {
      alert("Email não pode estar vazio!");
      return;
    }
    if (!testEmail()) {
      alert("Email Invalido");
      return;
    }

    recuperarSenha(valueEmail);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 animate-fade-up">
        <div className="inline-block max-w-lg text-center justify-center">
          <div className="space-y-8">
            <div className="flex flex-warp space-x-4 items-center justify-center">
              <h1 className={title({ color: "fullviolet", size: "sm" })}>
                Faça o Login
              </h1>
              <NexusLogo size={60}/>
            </div>
            <div className="space-y-4">
              <Input
                isRequired
                type="email"
                label="Email"
                placeholder="Enter your email"
                onValueChange={setValueEmail}
                className="max-w-xs"
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                onValueChange={setValuePwd}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="max-w-xs"
              />
            </div>
          </div>
          <Button
            onClick={forgotPwd}
            className="flex mb-4 hover:cursor-pointer hover:text-violet-600 bg-transparent"
          >
            Esqueceu a senha?
          </Button>
          <div>
            <Button
              className="w-full font-bold bg-purple-600 text-white"
              color="primary"
              onClick={buttonSend}
            >
              Login
            </Button>
            <a href="/register">
              Não possui uma conta?{" "}
              <span className="text-violet-600 font-bold hover:cursor-pointer">
                Crie aqui!
              </span>
            </a>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

export default noAuth(Login)

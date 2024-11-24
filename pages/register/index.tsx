import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { EyeSlashFilledIcon, EyeFilledIcon, NexusLogo } from "@/components/icons";
import { useState } from "react";
import {
  registrarComEmailESenha,
} from "@/src/firebase/authentication";
import { useRouter } from 'next/router';

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [valueEmail, setValueEmail] = useState("");
  const [valuePwd, setValuePwd] = useState("");
  const [valuePwd2, setValuePwd2] = useState("");
  const [valueName, setValueName] = useState("");
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
      alert("Senha não são iguais");
      return;
    }
    if (!testPwd6()) {
        alert("Senha não pode ser menos que 6 caracteres");
        return;
      }

    registrarComEmailESenha(valueName, valueEmail, valuePwd, router);
    console.log(valueName, valueEmail, valuePwd)
  };

  function testPwd() {
    if (valuePwd == valuePwd2) {
      return true;
    }
    return false;
  }

  function testPwd6() {
    if (valuePwd.length < 6){
        return false;
    }
    return true;
  }

  function testEmail() {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(valueEmail);
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 animate-fade-up ">
        <div className="inline-block max-w-lg text-center justify-center space-y-8">
            <div className="flex flex-warp space-x-4 items-center justify-center">
              <h1 className={title({ color: "fullviolet", size: "sm" })}>
                Registro
              </h1>
              <NexusLogo size={60}/>
            </div>
            <div className="space-y-4">
            <Input
                isRequired
                type="email"
                label="Name"
                placeholder="Enter your name"
                onValueChange={setValueName}
                className="max-w-xs"
              />
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
              <Input
                label="Password"
                placeholder="Repeat your password"
                onValueChange={setValuePwd2}
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
            <Button
              className="w-full font-bold bg-purple-600 text-white"
              color="primary"
              onClick={buttonSend}
            >
              Criar!
            </Button>
            <a href="/login">
              Já possui uma conta?{" "}
              <span className="text-violet-600 font-bold hover:cursor-pointer">
                Faça login!
              </span>
            </a>
        </div>
      </section>
    </DefaultLayout>
  );
}

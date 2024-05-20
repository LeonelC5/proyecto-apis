import { useRef } from "react";
import { userService } from "../services";
import { IAccount } from "../types";
import { useLocation } from "wouter";
import { useSession } from "../hooks/useSession";

export default function Login() {
  const session = useSession();
  const [, navigate] = useLocation();

  const mailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onClick = async () => {
    const mail = mailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!mail || !password) return;

    const res = await userService.get<IAccount[]>("/users");
    const account = res.data.find(
      (acc) => acc.correo === mail && acc.password == password
    );
    if (account) {
      session.add(account);
      navigate("/profile");
    }
  };

  return (
    <main className="flex items-center justify-center h-full">
      <div className="flex flex-col gap-4 max-w-[360px] w-full bg-zinc-800 rounded-md px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-4">Ingresar</h1>
        <input type="text" placeholder="correo" ref={mailRef} />
        <input type="password" placeholder="contraseña" ref={passwordRef} />
        <button className="mt-4" onClick={onClick}>
          Iniciar Sesión
        </button>
      </div>
    </main>
  );
}

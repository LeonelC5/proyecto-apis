import { useEffect } from "react";
import { useSession } from "../hooks/useSession";
import { userService } from "../services";
import { IAccount } from "../types";

export default function Profile() {
  const { data, add } = useSession();

  useEffect(() => {
    (async () => {
      const res = await userService.get<IAccount>(`/user/${data!.id}`);
      add(res.data);
    })();
  }, []);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-[500px] flex gap-4 items-center p-5 bg-zinc-800 rounded-xl">
        <img
          src={data?.imagen || "https://placehold.co/400x400/jpg"}
          alt={data?.description}
          className="rounded-full w-[160px] aspect-square object-cover object-center"
        />
        <div>
          <p className="text-2xl">
            {data?.nombre} {data?.apellido}
          </p>
          <p className="text-zinc-400">{data?.description}</p>
          <p className="mt-4">
            {data?.correo} - {data?.celular}
          </p>
        </div>
      </div>
    </div>
  );
}

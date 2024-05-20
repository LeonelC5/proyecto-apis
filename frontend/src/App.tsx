import { Link, Route } from "wouter";
import Login from "./routes/Login";
import Home from "./routes/Home";
import PageLayout from "./PageLayout";
import { useSession } from "./hooks/useSession";
import Profile from "./routes/Profile";

function App() {
  const session = useSession();
  return (
    <div className="bg-zinc-900 h-screen text-white flex flex-col">
      <div className="bg-zinc-800 px-8 py-4 font-bold flex justify-between">
        <Link to="/">Inicio</Link>
        {session.data && (
          <div className="flex gap-4 items-center">
            <Link to="/profile">😊{session.data.nombre}</Link>
            <button onClick={session.clear}>Cerrar Sesión</button>
          </div>
        )}
      </div>
      <div className="flex-1 px-3 overflow-x-hidden overflow-y-auto">
        <Route path="/login" component={Login} />
        <PageLayout>
          <Route path="/" component={Home} />
          <Route path="/profile" component={Profile} />
        </PageLayout>
      </div>
    </div>
  );
}

export default App;

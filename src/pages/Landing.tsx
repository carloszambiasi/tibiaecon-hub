import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { TrendingUp } from "lucide-react";

export default function Landing() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data?.user);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background text-white flex flex-col">
      {/* Top Bar */}
      <header className="px-6 py-4 flex justify-between items-center border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-primary" />
          <h1 className="text-lg font-bold">TibiaEconomy Tracker</h1>
        </div>

        <div className="space-x-4">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="text-sm font-medium hover:underline">
                Entrar
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 text-sm"
              >
                Começar agora
              </Link>
            </>
          ) : (
            <Link
              to="/dashboard"
              className="text-sm font-medium bg-muted px-4 py-2 rounded hover:opacity-80"
            >
              Ir para o Dashboard
            </Link>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6 py-20 text-center">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold mb-4">
            Controle sua economia no Tibia como nunca antes
          </h2>
          <p className="text-muted-foreground mb-6 text-lg">
            Salve seu histórico de preços, acompanhe suas moedas e imbuements, e acesse tudo de
            qualquer lugar com seu login pessoal.
          </p>

          {!isLoggedIn ? (
            <Link
              to="/register"
              className="inline-block px-6 py-3 bg-primary text-white rounded-md font-semibold text-lg hover:bg-primary/90"
            >
              Crie sua conta gratuitamente
            </Link>
          ) : (
            <Link
              to="/dashboard"
              className="inline-block px-6 py-3 bg-muted text-white rounded-md font-semibold text-lg hover:opacity-90"
            >
              Ir para o Dashboard
            </Link>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-muted-foreground text-sm py-6 border-t border-border">
        <p>© 2025 TibiaEconomy Tracker. Desenvolvido por jogadores para jogadores.</p>
      </footer>
    </div>
  );
}

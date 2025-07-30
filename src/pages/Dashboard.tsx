import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { CoinQuote } from "../components/CoinQuote";
import { GoldWallet } from "../components/GoldWallet";
import { ImbuementManager, Imbuement } from "../components/ImbuementManager";
import { Charts } from "../components/Charts";
import { TrendingUp } from "lucide-react";

export default function Dashboard() {
  const [userId, setUserId] = useState<string | null>(null);
  const [coinQuote, setCoinQuote] = useState<number>(30000);
  const [userGold, setUserGold] = useState<number>(0);
  const [imbuements, setImbuements] = useState<Imbuement[]>([]);

  // Obter o usuário e carregar dados
  useEffect(() => {
    const fetchData = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData?.user?.id;
      if (!uid) return;

      setUserId(uid);

      const { data: wallet } = await supabase
        .from("gold_wallets")
        .select("gold")
        .eq("user_id", uid)
        .single();

      if (wallet?.gold) setUserGold(wallet.gold);

      const { data: quote } = await supabase
        .from("coin_quotes")
        .select("value")
        .eq("user_id", uid)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (quote?.value) setCoinQuote(quote.value);

      const { data: imbData } = await supabase
        .from("imbuements")
        .select("*")
        .eq("user_id", uid);

      if (imbData) setImbuements(imbData);
    };

    fetchData();
  }, []);

  // Atualiza gold
  const handleGoldChange = async (gold: number) => {
    setUserGold(gold);
    if (!userId) return;

    await supabase
      .from("gold_wallets")
      .upsert({ user_id: userId, gold, updated_at: new Date().toISOString() });
  };

  // Atualiza cotação
  const handleQuoteChange = async (value: number) => {
    setCoinQuote(value);
    if (!userId) return;

    await supabase.from("coin_quotes").insert({
      user_id: userId,
      value,
    });
  };

  // Atualiza imbuements
  const handleImbuementsChange = async (list: Imbuement[]) => {
    setImbuements(list);
    if (!userId) return;

    // Apaga os antigos
    await supabase.from("imbuements").delete().eq("user_id", userId);

    // Insere os novos
    if (list.length > 0) {
      const data = list.map((i) => ({ ...i, user_id: userId }));
      await supabase.from("imbuements").insert(data);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">TibiaEconomy Tracker</h1>
              <p className="text-muted-foreground">Gerencie sua economia no Tibia</p>
            </div>
          </div>

          {/* Logout manual (simples) */}
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/login";
            }}
            className="text-sm text-red-500 hover:underline"
          >
            Sair
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <CoinQuote
            currentQuote={coinQuote}
            onQuoteChange={handleQuoteChange}
            userGold={userGold}
          />

          <GoldWallet
            goldAmount={userGold}
            onGoldChange={handleGoldChange}
            coinQuote={coinQuote}
          />

          <ImbuementManager
            imbuements={imbuements}
            onImbuementsChange={handleImbuementsChange}
          />

          <Charts
            imbuements={imbuements}
            userGold={userGold}
            coinQuote={coinQuote}
          />
        </div>
      </main>

      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>TibiaEconomy Tracker - Desenvolvido para jogadores de Tibia</p>
        </div>
      </footer>
    </div>
  );
}

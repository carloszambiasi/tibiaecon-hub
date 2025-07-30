import { useLocalStorage } from '@/hooks/useLocalStorage';
import { CoinQuote } from './CoinQuote';
import { GoldWallet } from './GoldWallet';
import { ImbuementManager, Imbuement } from './ImbuementManager';
import { Charts } from './Charts';
import { TrendingUp } from 'lucide-react';

export function Dashboard() {
  const [coinQuote, setCoinQuote] = useLocalStorage<number>('tibiaeconomy_coin_quote', 30000);
  const [userGold, setUserGold] = useLocalStorage<number>('tibiaeconomy_user_gold', 0);
  const [imbuements, setImbuements] = useLocalStorage<Imbuement[]>('tibiaeconomy_imbuements', []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">TibiaEconomy Tracker</h1>
              <p className="text-muted-foreground">Gerencie sua economia no Tibia</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Top Row - Coin Quote */}
          <CoinQuote 
            currentQuote={coinQuote}
            onQuoteChange={setCoinQuote}
            userGold={userGold}
          />

          {/* Second Row - Gold Wallet */}
          <GoldWallet 
            goldAmount={userGold}
            onGoldChange={setUserGold}
            coinQuote={coinQuote}
          />

          {/* Third Row - Imbuement Manager */}
          <ImbuementManager 
            imbuements={imbuements}
            onImbuementsChange={setImbuements}
          />

          {/* Fourth Row - Charts */}
          <Charts 
            imbuements={imbuements}
            userGold={userGold}
            coinQuote={coinQuote}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>TibiaEconomy Tracker - Desenvolvido para jogadores de Tibia</p>
        </div>
      </footer>
    </div>
  );
}
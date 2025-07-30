import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Wallet, TrendingUp } from 'lucide-react';

interface GoldWalletProps {
  goldAmount: number;
  onGoldChange: (amount: number) => void;
  coinQuote: number;
}

export function GoldWallet({ goldAmount, onGoldChange, coinQuote }: GoldWalletProps) {
  const [goldInput, setGoldInput] = useState(goldAmount.toString());

  const handleGoldUpdate = () => {
    const newAmount = parseFloat(goldInput);
    if (!isNaN(newAmount) && newAmount >= 0) {
      onGoldChange(newAmount);
    }
  };

  const coinEquivalent = goldAmount / coinQuote;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-tibia-gold" />
          Carteira de Gold
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="gold">Saldo Atual (gold)</Label>
          <div className="flex gap-2">
            <Input
              id="gold"
              value={goldInput}
              onChange={(e) => setGoldInput(e.target.value)}
              placeholder="Ex: 1000000"
              type="number"
            />
            <Button onClick={handleGoldUpdate} variant="default">
              Salvar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-tibia-gold/20 to-tibia-gold/5 p-4 rounded-lg border">
            <div className="text-2xl font-bold text-tibia-gold">
              {goldAmount.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">Gold Pieces</p>
          </div>

          <div className="bg-gradient-to-br from-tibia-coin/20 to-tibia-coin/5 p-4 rounded-lg border">
            <div className="text-2xl font-bold text-tibia-coin">
              {coinEquivalent.toFixed(2)}
            </div>
            <p className="text-sm text-muted-foreground">Tibia Coins</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4" />
          <span>Conversão baseada na cotação de {coinQuote.toLocaleString()} gp/TC</span>
        </div>
      </CardContent>
    </Card>
  );
}
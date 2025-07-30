import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { TrendingUp, Coins } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface CoinQuoteProps {
  currentQuote: number;
  onQuoteChange: (quote: number) => void;
  userGold: number;
}

const mockPriceHistory = [
  { day: 'Seg', price: 28500 },
  { day: 'Ter', price: 29200 },
  { day: 'Qua', price: 28800 },
  { day: 'Qui', price: 30100 },
  { day: 'Sex', price: 29800 },
  { day: 'Sáb', price: 30500 },
  { day: 'Dom', price: 30000 },
];

export function CoinQuote({ currentQuote, onQuoteChange, userGold }: CoinQuoteProps) {
  const [quoteInput, setQuoteInput] = useState(currentQuote.toString());

  const handleQuoteUpdate = () => {
    const newQuote = parseFloat(quoteInput);
    if (!isNaN(newQuote) && newQuote > 0) {
      onQuoteChange(newQuote);
    }
  };

  const possibleCoins = Math.floor(userGold / currentQuote);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-tibia-coin" />
            Cotação Tibia Coin
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="quote">Cotação Atual (gold)</Label>
            <div className="flex gap-2">
              <Input
                id="quote"
                value={quoteInput}
                onChange={(e) => setQuoteInput(e.target.value)}
                placeholder="Ex: 30000"
                type="number"
              />
              <Button onClick={handleQuoteUpdate} variant="default">
                Atualizar
              </Button>
            </div>
          </div>
          
          <div className="bg-secondary/50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-tibia-coin">
              {currentQuote.toLocaleString()} gp
            </div>
            <p className="text-sm text-muted-foreground">por Tibia Coin</p>
          </div>

          <div className="bg-card border rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Você pode comprar</div>
            <div className="text-xl font-semibold text-tibia-coin">
              {possibleCoins.toLocaleString()} TC
            </div>
            <div className="text-sm text-muted-foreground">
              com {userGold.toLocaleString()} gp
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Histórico de Preços
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockPriceHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { TrendingUp, PieChart as PieChartIcon } from 'lucide-react';
import { Imbuement } from './ImbuementManager';

interface ChartsProps {
  imbuements: Imbuement[];
  userGold: number;
  coinQuote: number;
}

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export function Charts({ imbuements, userGold, coinQuote }: ChartsProps) {
  const pieData = imbuements.map((imbuement, index) => ({
    name: imbuement.name,
    value: imbuement.totalCost,
    color: COLORS[index % COLORS.length],
  }));

  const barData = [
    {
      name: 'Gold Atual',
      value: userGold,
      color: 'hsl(var(--tibia-gold))',
    },
    {
      name: 'Tibia Coins (equiv.)',
      value: userGold / coinQuote,
      color: 'hsl(var(--tibia-coin))',
    },
  ];

  const CustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null;

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="500"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="h-5 w-5 text-chart-1" />
            Distribuição de Gastos - Imbuements
          </CardTitle>
        </CardHeader>
        <CardContent>
          {imbuements.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center">
                <PieChartIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Adicione imbuements para ver o gráfico</p>
              </div>
            </div>
          ) : (
            <>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={CustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="font-semibold">{item.value.toLocaleString()} gp</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-chart-2" />
            Comparativo: Gold vs Tibia Coins
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => {
                    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                    return value.toString();
                  }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[4, 4, 0, 0]}
                >
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="text-center p-2 bg-tibia-gold/10 rounded border">
              <div className="font-semibold text-tibia-gold">{userGold.toLocaleString()}</div>
              <div className="text-muted-foreground">Gold Pieces</div>
            </div>
            <div className="text-center p-2 bg-tibia-coin/10 rounded border">
              <div className="font-semibold text-tibia-coin">{(userGold / coinQuote).toFixed(2)}</div>
              <div className="text-muted-foreground">Tibia Coins</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
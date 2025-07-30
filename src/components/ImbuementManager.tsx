import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Zap } from 'lucide-react';

export interface Imbuement {
  id: string;
  name: string;
  totalCost: number;
}

interface ImbuementManagerProps {
  imbuements: Imbuement[];
  onImbuementsChange: (imbuements: Imbuement[]) => void;
}

export function ImbuementManager({ imbuements, onImbuementsChange }: ImbuementManagerProps) {
  const [newImbuement, setNewImbuement] = useState({ name: '', totalCost: '' });

  const addImbuement = () => {
    if (newImbuement.name && newImbuement.totalCost) {
      const imbuement: Imbuement = {
        id: Date.now().toString(),
        name: newImbuement.name,
        totalCost: parseFloat(newImbuement.totalCost),
      };
      onImbuementsChange([...imbuements, imbuement]);
      setNewImbuement({ name: '', totalCost: '' });
    }
  };

  const removeImbuement = (id: string) => {
    onImbuementsChange(imbuements.filter(imp => imp.id !== id));
  };

  const costPerHour = (totalCost: number) => totalCost / 20;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-warning" />
          Gestor de Imbuements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-secondary/50 rounded-lg">
          <div className="space-y-2">
            <Label htmlFor="imb-name">Nome do Imbuement</Label>
            <Input
              id="imb-name"
              value={newImbuement.name}
              onChange={(e) => setNewImbuement({ ...newImbuement, name: e.target.value })}
              placeholder="Ex: Powerful Strike"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imb-cost">Custo Total (gp)</Label>
            <Input
              id="imb-cost"
              value={newImbuement.totalCost}
              onChange={(e) => setNewImbuement({ ...newImbuement, totalCost: e.target.value })}
              placeholder="Ex: 50000"
              type="number"
            />
          </div>
          <div className="flex items-end">
            <Button onClick={addImbuement} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </div>

        {imbuements.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Zap className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Nenhum imbuement adicionado ainda</p>
          </div>
        ) : (
          <div className="space-y-3">
            {imbuements.map((imbuement) => (
              <div
                key={imbuement.id}
                className="flex items-center justify-between p-4 bg-card border rounded-lg"
              >
                <div className="flex-1">
                  <div className="font-semibold">{imbuement.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Total: {imbuement.totalCost.toLocaleString()} gp
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <Badge variant="secondary" className="text-warning">
                      {costPerHour(imbuement.totalCost).toLocaleString()} gp/h
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">
                      20 horas
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeImbuement(imbuement.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {imbuements.length > 0 && (
          <div className="bg-primary/10 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">Custo total por hora</div>
            <div className="text-2xl font-bold text-primary">
              {imbuements.reduce((total, imp) => total + costPerHour(imp.totalCost), 0).toLocaleString()} gp/h
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
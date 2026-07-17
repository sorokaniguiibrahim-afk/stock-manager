import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  value: string | number;
  icon: LucideIcon;
};

export default function StatCard({ title, value, icon: Icon }: Props) {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <h2 className="mt-2 text-3xl font-bold">{value}</h2>
        </div>

        <Icon className="h-10 w-10 text-blue-600" />
      </CardContent>
    </Card>
  );
}

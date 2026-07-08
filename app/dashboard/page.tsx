import StatCard from "@/components/dashboard/StatCard";

export default function DashboardPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>

        <p className="text-gray-500 mt-2">
          Bienvenue dans votre espace de gestion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Produits" value={0} icon="📦" />

        <StatCard title="Valeur du stock" value="0 FCFA" icon="💰" />

        <StatCard title="Stock faible" value={0} icon="⚠️" />

        <StatCard title="Valeur de vente" value="0 FCFA" icon="📈" />
      </div>
    </>
  );
}

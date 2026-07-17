export default function DashboardHeader() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir";

  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold">{greeting}, Ibrahim 👋</h1>

      <p className="text-muted-foreground mt-2">
        Bienvenue dans votre espace de gestion.
      </p>
    </div>
  );
}

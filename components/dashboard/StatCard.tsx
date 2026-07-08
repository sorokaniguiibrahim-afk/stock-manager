type StatCardProps = {
  title: string;
  value: string | number;
  icon: string;
};

export default function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>

          <h2 className="text-3xl font-bold mt-2">{value}</h2>
        </div>

        <span className="text-4xl">{icon}</span>
      </div>
    </div>
  );
}

export default function PopularThreadsSkeleton() {
  return (
    <div className="flex flex-wrap gap-2">
      {Array(6)
        .fill(null)
        .map((_, idx) => (
          <div
            key={idx}
            className="bg-gray-800 border border-gray-700 rounded-lg h-[60px] w-[160px] animate-pulse"
          />
        ))}
    </div>
  );
}

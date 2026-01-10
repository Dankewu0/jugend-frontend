import PopularThreads from "@/app/_components/PopularThreads";

export default function Home() {
  return (
    <div>
      <span className="font-bold text-white mt-6">
        Популярные темы на форуме
      </span>
      <div className="border-2 border-gray-800 ">
        <PopularThreads />
      </div>
    </div>
  );
}

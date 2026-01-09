import Image from "next/image";

export default function Footer() {
  const itemClass =
    "text-white font-bold text-sm flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2";

  return (
    <footer className="bg-gray-800 px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className={itemClass}>
        <span>Jugend</span>
        <span className="text-xs text-gray-400">
          Все права защищены, правда только наши
        </span>
      </div>

      <div className="flex justify-center sm:justify-end">
        <Image src="/Logo.svg" alt="Logo" width={32} height={32} />
      </div>
    </footer>
  );
}

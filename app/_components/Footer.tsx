import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-gray-800 font-bold p-2 text-white flex justify-between">
      <div className="flex justify-start justify-items-center">
        Jugend <br /> Все права защищены правда только наши
      </div>
      <div className="flex justify-items-center justify-end">
        <Image src="/Logo.svg" alt="Logo" width={32} height={32} />
      </div>
    </footer>
  );
}

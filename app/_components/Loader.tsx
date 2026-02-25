import { LoaderCircle } from "lucide-react";
export default function Loader() {
  return (
    <div className="flex flex-row">
      <LoaderCircle className="animate-spin" />
      Загрузка...
    </div>
  );
}

import { DataTableDemo } from "@/components/Products";

export default function Home() {
  return (
    <div className="my-6 w-full lg:w-3/4 m-auto px-5">
      <h1 className="font-semibold text-3xl">Products</h1>
      <DataTableDemo />
    </div>
  );
}

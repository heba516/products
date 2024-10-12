import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EditProduct, Product } from "@/interfaces";
import { ReactNode, useState } from "react";

interface IProps {
  text: ReactNode;
  desc?: string;
  data?: EditProduct;
  addFn?: (product: Product) => void;
  editFn?: (product: Product, id: string) => void;
}

export function SheetDemo({
  text,
  desc,
  data,
  addFn,
  editFn,
}: IProps): React.JSX.Element {
  const [product, setProduct] = useState<Product>(
    data || {
      name: "",
      price: 0,
      stock: 0,
    }
  );

  // const addNewProduct = async (product: Product) => {
  //   await fetch("http://localhost:3000/api/products", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(product),
  //   });
  // };
  // const editProduct = async (product: Product, id: string) => {
  //   await fetch(`http://localhost:3000/api/products/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(product),
  //   });
  // };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (addFn) {
      addFn(product);
    } else if (data && editFn) {
      await editFn(product, data.id);
    }
    setProduct({ name: "", stock: 0, price: 0 });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={data ? "outline" : "default"}
          size={data ? "icon" : "lg"}
        >
          {text}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center space-x-2">
              {text} {desc}
            </div>
          </SheetTitle>
        </SheetHeader>
        <form className="grid gap-4 py-4" onSubmit={onSubmit}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={product?.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">
              Stock
            </Label>
            <Input
              id="stock"
              className="col-span-3"
              value={product.stock}
              onChange={(e) =>
                setProduct({ ...product, stock: Number(e.target.value) })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              className="col-span-3"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: Number(e.target.value) })
              }
            />
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

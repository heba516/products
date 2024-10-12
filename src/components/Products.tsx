"use client";

import * as React from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pen, Plus, Trash } from "lucide-react";
import { SheetDemo } from "@/components/Sheet";
import { EditProduct, Product } from "@/interfaces";

let editProduct: (product: Product, id: string) => void;
let deleteProduct: (id: string) => void;

export const columns: ColumnDef<EditProduct>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          className="pl-4"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="px-4">{row.getValue("name")}</div>,
  },

  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => <div className="ml-3">{row.getValue("stock")}</div>,
  },

  {
    accessorKey: "price",
    header: () => <div className="text-right mr-3">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));

      // Format the price as a dollar price
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="center text-right font-medium">{formatted}</div>;
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center space-x-4">
          <SheetDemo
            text={<Pen />}
            desc={"Edit Product"}
            data={row.original}
            editFn={editProduct}
          />

          <Button
            variant="outline"
            size="icon"
            className="hover:bg-red-600"
            onClick={() => deleteProduct(row.original.id)}
          >
            <Trash />
          </Button>
        </div>
      );
    },
  },
];

export function DataTableDemo() {
  //Handlers
  const fetchProducts = async () => {
    const response = await fetch("http://localhost:3000/api/products");
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  };
  const addNewProduct = async (product: Product) => {
    await fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
  };
  editProduct = async (product: Product, id: string) => {
    await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
  };
  deleteProduct = async (id: string) => {
    await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
    });
  };

  //Table
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  //Data
  const [data, setData] = React.useState<EditProduct[]>([]);
  const [fetchData, setFetch] = React.useState<number>(0);

  React.useEffect(() => {
    fetchProducts()
      .then((products) => {
        setData(products);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setFetch((prev) => prev + 1);
      });
  }, [fetchData]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full my-4">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between py-4">
        <Input
          placeholder="Search products..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="w-4/5 md:max-w-md py-5 mt-4 md:mt-0"
        />
        <SheetDemo
          text={
            <div className="flex items-center">
              <Plus className="mr-2" /> <p>Add New Product</p>
            </div>
          }
          addFn={addNewProduct}
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

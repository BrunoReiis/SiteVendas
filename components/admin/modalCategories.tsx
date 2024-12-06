import React, { useState, useEffect, useCallback } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "../icons";
import { getDataModelCategories } from "@/src/firebase/getData";
import { deleteCategory } from "@/src/firebase/deleteData";

const statusColorMap: Record<string, "success" | "danger" | "warning"> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const columns = [
  { name: "NAME", uid: "name" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export interface CategoryData {
  id: string;
  status: string;
}

export default function ModalCategories() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await getDataModelCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const renderCell = useCallback((category: CategoryData, columnKey: string) => {
    const cellValue = category[columnKey as keyof CategoryData];

    switch (columnKey) {
      case "name":
        return <h1>{category.id}</h1>;
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[category.status]} size="sm" variant="flat">
            {category.status}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="danger" content="Delete Category">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon onClick={() => handleDelete(category.id)} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const handleDelete = async (categoryId: string) => {
    try {
      await deleteCategory(categoryId); 
      fetchCategories(); 
    } catch (error) {
      console.error("Erro ao excluir a categoria:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <Table aria-label="Categories Table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={categories}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey: any) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

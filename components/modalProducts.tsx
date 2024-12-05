import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { EditIcon, DeleteIcon, EyeIcon } from "./icons";
import { getDataModalProducts } from "@/src/firebase/getData";

type UserStatus = "active" | "paused" | "vacation";

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  team: string;
  status: UserStatus;
}

const statusColorMap: Record<UserStatus, "success" | "danger" | "warning"> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const columns = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export default function modalProdcuts() {
  const [product, setProduct] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts = await getDataModalProducts();
        if (typeof fetchedProducts === "string") {
          console.error(fetchedProducts); 
          setProduct([]); 
        } else {
          setProduct(fetchedProducts); 
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProduct([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const renderCell = useCallback((product: UserData, columnKey: string) => {
    const cellValue = product[columnKey as keyof UserData];

    switch (columnKey) {
      case "name":
        return (
          <User avatarProps={{ radius: "lg", src: product.avatar,  style: {
            width: '80px', 
            height: '80px',
            objectFit: 'cover',
            borderRadius: "50%",
          } }} description={product.email} name={cellValue}>
            {product.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{product.team}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[product.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
        <Table aria-label="">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={product}>
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

import { Button, Table } from "flowbite-react";
import type { FC } from "react";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const ProductsTable: FC<{
  loading: boolean;
  products: any[];
  setSelectedProduct: (product: any) => void;
  setShowDrawer: (isOpen: boolean) => void;
  setShowDeleteDrawer: (isOpen: boolean) => void;
  setImagePreview: (preview: string | null) => void;
}> = function ({
  loading,
  products,
  setSelectedProduct,
  setShowDrawer,
  setShowDeleteDrawer,
  setImagePreview,
}) {
  console.log({ products });

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setShowDrawer(true);
    setImagePreview(product.images[0]?.url || null);
  };

  const handleDelete = (product: any) => {
    setSelectedProduct(product);
    setShowDeleteDrawer(true);
  };

  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>Imagen</Table.HeadCell>
        <Table.HeadCell>Nombre del Producto</Table.HeadCell>
        <Table.HeadCell>Precio</Table.HeadCell>
        <Table.HeadCell>Descuento</Table.HeadCell>
        <Table.HeadCell>Estado</Table.HeadCell>
        <Table.HeadCell>Acciones</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {loading ? (
          Array.from({ length: 7 }).map((_, index) => (
            <Table.Row
              key={index}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Table.Cell className="p-4">
                <Skeleton width="40%" height={20} />
              </Table.Cell>
              <Table.Cell className="p-4">
                <Skeleton width="80%" height={20} />
                <Skeleton width="60%" height={16} />
              </Table.Cell>
              <Table.Cell className="p-4">
                <Skeleton width="70%" height={20} />
              </Table.Cell>
              <Table.Cell className="p-4">
                <Skeleton width="50%" height={20} />
              </Table.Cell>
              <Table.Cell className="p-4">
                <Skeleton width="40%" height={20} />
              </Table.Cell>
              <Table.Cell className="p-4 flex gap-2">
                <Skeleton width={80} height={36} />
                <Skeleton width={80} height={36} />
              </Table.Cell>
            </Table.Row>
          ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <Table.Row
              key={product.id}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-16 h-16 object-cover"
                  />
                ) : (
                  "Sin Imagen"
                )}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  {product.title}
                </div>
                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {product.description}
                </div>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                ${product.price.toFixed(2)}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {product.discount}%
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {product.available ? "Disponible" : "No Disponible"}
              </Table.Cell>
              <Table.Cell className="space-x-2 whitespace-nowrap p-4">
                <div className="flex items-center gap-x-3">
                  <Button color="primary" onClick={() => handleEdit(product)}>
                    <HiPencilAlt className="mr-2 text-lg" />
                    Editar
                  </Button>
                  <Button color="failure" onClick={() => handleDelete(product)}>
                    <HiTrash className="mr-2 text-lg" />
                    Eliminar
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell
              colSpan={6}
              className="p-4 text-center text-gray-500 dark:text-gray-400"
            >
              No hay productos disponibles para mostrar en este momento.
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};

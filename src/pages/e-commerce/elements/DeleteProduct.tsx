import { Button, Modal } from "flowbite-react";
import type { FC } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

import "react-loading-skeleton/dist/skeleton.css";

export const DeleteProductDrawer: FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleDeleteProduct: () => void;
}> = function ({ isOpen, setIsOpen, handleDeleteProduct }) {
  return (
    <Modal onClose={() => setIsOpen(false)} show={isOpen} size="md">
      <Modal.Header className="px-3 pt-3 pb-0">
        <span className="sr-only">Eliminar producto</span>
      </Modal.Header>
      <Modal.Body className="px-6 pb-6 pt-0">
        <div className="flex flex-col items-center gap-y-6 text-center">
          <HiOutlineExclamationCircle className="text-7xl text-red-600" />
          <p className="text-lg text-gray-500 dark:text-gray-300">
            ¿Estás seguro de que deseas eliminar este producto?
          </p>
          <div className="flex items-center gap-x-3">
            <Button color="failure" onClick={handleDeleteProduct}>
              Sí, estoy seguro
            </Button>
            <Button color="gray" onClick={() => setIsOpen(false)}>
              No, cancelar
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

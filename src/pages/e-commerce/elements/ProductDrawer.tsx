import { FC, useEffect } from "react";
import {
  Label,
  Select,
  TextInput,
  Textarea,
  Button,
  Modal,
} from "flowbite-react";
import { Controller, useForm } from "react-hook-form";
import { HiTrash, HiUpload } from "react-icons/hi";

type SeedFood = {
  title: string;
  price: number;
  discount: number;
  description?: string;
  slug: string;
  stock?: number;
  tags: string[];
  images: { publicId: string; url: string }[];
  productType: "Comida" | "Bebidas";
  foodCategory?: string;
  drinkCategory?: string;
  measurementUnit?: "g" | "Kg" | "ml" | "L";
};

interface DrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleCreateOrUpdateProduct: (data: SeedFood) => void;
  isSubmitting: boolean;
  imagePreviews: string[];
  setImagePreviews: (previews: string[]) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleRemoveImage: (index: number) => void;
  selectedProduct?: SeedFood;
  imageFiles: File[];
}

export const ProductDrawer: FC<DrawerProps> = ({
  isOpen,
  setIsOpen,
  handleCreateOrUpdateProduct,
  isSubmitting,
  imagePreviews,
  setImagePreviews,
  handleImageChange,
  handleDrop,
  handleDragOver,
  handleRemoveImage,
  selectedProduct,
  imageFiles,
}) => {
  const { control, handleSubmit, reset } = useForm<SeedFood>({
    defaultValues: {
      title: "",
      price: 0,
      discount: 0,
      slug: "",
      tags: [],
      images: [],
      productType: "Comida",
      description: "",
      measurementUnit: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (selectedProduct) {
        reset({
          ...selectedProduct,
          tags: selectedProduct.tags.join(", "),
        });
        setImagePreviews(selectedProduct.images.map((img) => img.url) || []);
      } else {
        reset({
          title: "",
          price: 0,
          discount: 0,
          slug: "",
          tags: [],
          images: [],
          productType: "Comida",
          description: "",
          measurementUnit: "",
        });
        setImagePreviews([]);
      }
    }
  }, [isOpen, selectedProduct, reset, setImagePreviews]);

  const onSubmit = (data: SeedFood) => {
    handleCreateOrUpdateProduct({
      ...data,
      tags: data.tags.split(",").map((tag) => tag.trim()),
      images: imageFiles.map((file) => {
        return file;
      }),
      // images: imageFiles.map((file) => ({
      //   publicId: file.name,
      //   url: URL.createObjectURL(file),
      // })),
    });
  };

  return (
    <Modal onClose={() => setIsOpen(false)} show={isOpen}>
      <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
        <strong>
          {selectedProduct ? "Editar producto" : "Añadir producto"}
        </strong>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <Label htmlFor="productName">Nombre del producto</Label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextInput
                    id="productName"
                    {...field}
                    placeholder="Ejemplo: Pizza Margarita"
                    className="mt-1"
                  />
                )}
              />
            </div>
            <div>
              <Label htmlFor="category">Categoría</Label>
              <Controller
                name="productType"
                control={control}
                render={({ field }) => (
                  <Select id="category" {...field} className="mt-1">
                    <option value="Comida">Comida</option>
                    <option value="Bebidas">Bebidas</option>
                  </Select>
                )}
              />
            </div>
            <div>
              <Label htmlFor="price">Precio</Label>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <TextInput
                    id="price"
                    {...field}
                    type="number"
                    placeholder="$0.00"
                    className="mt-1"
                  />
                )}
              />
            </div>
            <div>
              <Label htmlFor="discount">Descuento</Label>
              <Controller
                name="discount"
                control={control}
                render={({ field }) => (
                  <TextInput
                    id="discount"
                    {...field}
                    type="number"
                    placeholder="0%"
                    className="mt-1"
                  />
                )}
              />
            </div>
            <div>
              <Label htmlFor="tags">Etiquetas</Label>
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <TextInput
                    id="tags"
                    {...field}
                    placeholder="pizza, italiana"
                    className="mt-1"
                  />
                )}
              />
            </div>
            <div>
              <Label htmlFor="measurementUnit">Unidad de Medida</Label>
              <Controller
                name="measurementUnit"
                control={control}
                render={({ field }) => (
                  <Select id="measurementUnit" {...field} className="mt-1">
                    <option value="">Seleccionar unidad</option>
                    <option value="g">g</option>
                    <option value="Kg">Kg</option>
                    <option value="ml">ml</option>
                    <option value="L">L</option>
                  </Select>
                )}
              />
            </div>
            <div className="lg:col-span-2">
              <Label htmlFor="description">Descripción</Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    id="description"
                    {...field}
                    placeholder="Descripción del producto"
                    rows={6}
                    className="mt-1"
                  />
                )}
              />
            </div>
            <div className="w-full space-y-6 lg:col-span-2">
              {/* Image Previews */}
              {imagePreviews && imagePreviews.length > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {imagePreviews.map((preview, index) => (
                    <div
                      key={index}
                      className="group relative aspect-square w-full max-w-[150px] overflow-hidden rounded-lg mx-auto"
                    >
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors">
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-2 right-2 rounded-full bg-red-500 p-1.5
              opacity-0 group-hover:opacity-100 transition-opacity
              hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                          aria-label="Eliminar imagen"
                        >
                          <HiTrash className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Area */}
              <div className="w-full">
                <label
                  className="flex h-48 w-full cursor-pointer flex-col items-center justify-center
            rounded-lg border-2 border-dashed border-gray-300
            bg-gray-50 transition-colors duration-200 ease-in-out
            hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800
            dark:hover:border-gray-500 dark:hover:bg-gray-700"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <div className="flex flex-col items-center justify-center space-y-3 px-4 text-center">
                    <HiUpload className="h-12 w-12 text-gray-400" />
                    <div className="space-y-2">
                      <p className="text-base font-medium text-gray-600 dark:text-gray-400">
                        Subir un archivo o arrastrar y soltar
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        PNG, JPG, GIF hasta 10MB
                      </p>
                    </div>
                  </div>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className="hidden"
                    multiple
                    accept="image/png,image/jpeg,image/gif"
                  />
                </label>
              </div>
            </div>
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full mt-4">
            {isSubmitting
              ? "Guardando..."
              : selectedProduct
              ? "Guardar cambios"
              : "Añadir producto"}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductDrawer;

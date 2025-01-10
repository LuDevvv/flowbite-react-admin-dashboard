import { Breadcrumb, Button } from "flowbite-react";
import type { FC } from "react";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Pagination } from "../users/list";
import Cookies from "js-cookie";
import { foods } from "../../api";
import { ProductsTable } from "./elements/ProductsTable";
import { SearchForProducts } from "./elements/Search";
import { DeleteProductDrawer } from "./elements/DeleteProduct";
import ProductDrawer from "./elements/ProductDrawer";

const EcommerceProductsPage: FC = function () {
  const [products, setProducts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDeleteDrawer, setShowDeleteDrawer] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (term = "") => {
    setLoading(true);
    try {
      let fetchedProducts = [];

      if (term.trim()) {
        const result = await foods.getFoodByTerm(term);
        fetchedProducts = Array.isArray(result) ? result : [result];
      } else {
        fetchedProducts = await foods.getFoods();
      }

      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchProducts(searchTerm);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateOrUpdateProduct = async (data) => {
    console.log({ data });

    setIsSubmitting(true);

    const token = Cookies.get("azteliAuthToken");

    if (!token) {
      alert("Token de autenticación no encontrado");
      setIsSubmitting(false);
      return;
    }

    const requestBody = {
      title: data.title,
      price: parseFloat(data.price),
      productType: data.productType,
      description: data.description,
      discount: data.discount ? parseFloat(data.discount) : 0,
      tags: data.tags,
      measurementUnit: data.measurementUnit,
      available: true,
      images: data.images,
    };

    console.log({ requestBody });

    try {
      let res;
      if (selectedProduct) {
        res = await foods.updateFood(selectedProduct.id, requestBody, token);
      } else {
        res = await foods.createFood(requestBody, token);
      }

      if (res.status === 200 || res.status === 201) {
        setProducts(
          selectedProduct
            ? products.map((product) =>
                product.id === selectedProduct.id ? res.data : product
              )
            : [...products, res.data]
        );
        setShowDrawer(false);
      }
    } catch (error) {
      console.error("Error al crear/actualizar el producto:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    const token = Cookies.get("azteliAuthToken");

    try {
      if (!token) {
        alert("Token de autenticación no encontrado");
        return;
      }

      const res = await foods.deleteFood(selectedProduct.id);
      if (res.status === 200) {
        setProducts(
          products.filter((product) => product.id !== selectedProduct.id)
        );
        setShowDeleteDrawer(false);
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setImageFiles(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveImage = (index) => {
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="#">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Inicio</span>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/e-commerce/products">
                E-commerce
              </Breadcrumb.Item>
              <Breadcrumb.Item>Productos</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Todos los productos
            </h1>
          </div>
          <div className="block items-center sm:flex">
            <SearchForProducts
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              onSearchSubmit={handleSearchSubmit}
            />
            <div className="flex w-full items-center sm:justify-end">
              <Button
                color="primary"
                onClick={() => {
                  setSelectedProduct(null);
                  setImageFiles([]);
                  setImagePreviews([]);
                  setShowDrawer(true);
                }}
              >
                <FaPlus className="mr-3 text-sm" />
                Añadir producto
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <ProductsTable
                loading={loading}
                products={products}
                setSelectedProduct={setSelectedProduct}
                setShowDrawer={setShowDrawer}
                setShowDeleteDrawer={setShowDeleteDrawer}
                setImagePreview={setImagePreviews}
              />
            </div>
          </div>
        </div>
      </div>
      <Pagination />

      {/* Drawer para Crear/Actualizar Producto */}
      <ProductDrawer
        isOpen={showDrawer}
        setIsOpen={setShowDrawer}
        handleCreateOrUpdateProduct={handleCreateOrUpdateProduct}
        isSubmitting={isSubmitting}
        imagePreviews={imagePreviews}
        setImagePreviews={setImagePreviews}
        handleImageChange={handleImageChange}
        handleDrop={handleDrop}
        handleDragOver={handleDragOver}
        handleRemoveImage={handleRemoveImage}
        selectedProduct={selectedProduct}
        imageFiles={imageFiles}
      />

      <DeleteProductDrawer
        isOpen={showDeleteDrawer}
        setIsOpen={setShowDeleteDrawer}
        handleDeleteProduct={handleDeleteProduct}
      />
    </NavbarSidebarLayout>
  );
};

export default EcommerceProductsPage;

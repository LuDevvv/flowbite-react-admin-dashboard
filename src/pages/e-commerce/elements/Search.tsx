import { Label, TextInput, Button } from "flowbite-react";
import type { FC } from "react";

interface SearchForProductsProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const SearchForProducts: FC<SearchForProductsProps> = ({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
}) => {
  return (
    <form
      className="mb-4 flex items-center gap-2 sm:mb-0 sm:pr-3"
      onSubmit={onSearchSubmit}
    >
      <Label htmlFor="products-search" className="sr-only">
        Buscar
      </Label>
      <div className="relative mt-1 lg:w-64 xl:w-96">
        <TextInput
          id="products-search"
          name="products-search"
          placeholder="Buscar productos"
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>
      <Button type="submit" color="primary">
        Buscar
      </Button>
    </form>
  );
};

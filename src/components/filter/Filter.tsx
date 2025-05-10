/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormProvider, useForm } from "react-hook-form";
import CoustomRadioSelect from "../CustomForm/CoustomRadioSelect";
import CustomInput from "../CustomForm/CustomInput";
import { useGetAllbooksQuery } from "../../Redux/Features/Admin/UserManagementApi/bookManagement.api";
import { TBook } from "../Card/BookCard";
import { useEffect } from "react";

const Filter = ({ setShowFilter, showFilter, setFilterParams }: any) => {
  const { data, isLoading } = useGetAllbooksQuery(undefined);

  const methods = useForm({
    defaultValues: {
      min: 0,
      max: 100000,
      inStock: "All",
      category: "All",
      author: "All",
    },
  });

  const { watch } = methods;

  const min = watch("min");
  const max = watch("max");
  const inStock = watch("inStock");
  const category = watch("category");
  const author = watch("author");

useEffect(() => {
  const filterObject: any = {
    minPrice: min !== 0 ? min : undefined,
    maxPrice: max !== 100000 ? max : undefined,
    inStock: inStock !== "All" ? inStock === "in stock" : undefined,
    category: category !== "All" ? category : undefined,
    author: author !== "All" ? author : undefined,
  };

  // Remove undefined values
  Object.keys(filterObject).forEach((key) => {
    if (filterObject[key] === undefined) {
      delete filterObject[key];
    }
  });

  // Generate a filter array only once
  const filterArray = Object.entries(filterObject).map(([key, value]) => ({
    name: key,
    value: value,
  }));

  // Check if the current state is different before setting it
  setFilterParams((prevParams: any) => {
    if (JSON.stringify(prevParams) !== JSON.stringify(filterArray)) {
      console.log("Filter Parameters Updated:", filterArray); // Debugging
      return filterArray;
    }
    return prevParams;
  });
}, [min, max, inStock, category, author, setFilterParams]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const categoryOptions = [
    "All",
    ...new Set(data?.data?.map((book: TBook) => book.category)),
  ] as string[];

  const authorOptions = [
    "All",
    ...new Set(data?.data?.map((book: TBook) => book.author)),
  ] as string[];

  return (
    <FormProvider {...methods}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold mb-5">Filter by</h1>
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="text-2xl mb-5 mr-3 lg:hidden"
        >
          x
        </p>
      </div>
      <form className="space-y-4">
        <div>
          <label className="block text-xl font-medium mb-1">Price Range</label>
          <div className="w-full border border-gray-400 mb-4"></div>
          <div className="flex items-center gap-6 justify-between">
            <CustomInput
              name="min"
              label="Min"
              type="number"
              placeholder="Min"
            />
            <CustomInput
              name="max"
              label="Max"
              type="number"
              placeholder="Max"
            />
          </div>
        </div>
        <div>
          <CoustomRadioSelect
            options={["All", "in stock", "out of stock"]}
            label="Availability"
            name="inStock"
          />
        </div>
        <div>
          <CoustomRadioSelect
            options={categoryOptions}
            label="Category"
            name="category"
          />
        </div>
        <div>
          <CoustomRadioSelect options={authorOptions} label="Author" name="author" />
        </div>
      </form>
    </FormProvider>
  );
};

export default Filter;
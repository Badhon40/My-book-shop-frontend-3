/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import BookCard from "../../../components/Card/BookCard";
import Pagination from "../../../components/pagination/Pagination";
import Filter from "../../../components/filter/Filter";
import { BsFilter } from "react-icons/bs";
import { useGetAllbooksQuery } from "../../../Redux/Features/Admin/UserManagementApi/bookManagement.api";
import Loader from "../../../components/loader/Loader";
import { useSearchParams } from "react-router-dom";




const AllBooks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [showFilter, setShowFilter] = useState(false);
  const [filterParams, setFilterParams] = useState([]);
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const { data: allBook, isLoading } = useGetAllbooksQuery([
    ...filterParams,
    { name: "searchTerm", value: `${search}` },
    ...(category ? [{ name: "category", value: category }] : []),

  ]);
  console.log("allbooks", allBook);

  if (isLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    )
  }

  const allBooks = allBook?.data || [];

  console.log(allBooks);

  const totalPages = Math.ceil(allBooks?.length / itemsPerPage);
  const currentBooks = allBooks?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSeach = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };
  return (
    <div className="bg-gray-100">
      <div className="  lg:max-w-[90%] mx-4 md:mx-6 lg:mx-auto py-4 lg:py-14 ">
        <div className="flex justify-center">
          <input
            onChange={handleSeach}
            type="text"
            placeholder="Seacrh by book name,author & category"
            className="w-[40%] py-3 hidden lg:block rounded-md text-center boreder border-red-400 mb-7"
          />
        </div>
        <div className="grid grid-cols-3 gap-6 ">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="mb-4 text-xl flex items-center gap-1 border border-gray-200 w-24 justify-center p-1 rounded-sm shadow-sm lg:hidden"
          >
            <BsFilter /> <span>Filter</span>
          </p>
          <input
            onChange={handleSeach}
            type="text"
            placeholder="Seacrh by book name,author & category"
            className="w-full py-1 lg:hidden rounded-md col-span-2 text-center mb-4"
          />
        </div>
        <div
          className={`fixed top-0 left-0 h-full w-full md:w-[80%] max-w-sm  bg-gray-100 z-50 p-4 shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden ${
            showFilter ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Filter
            setShowFilter={setShowFilter}
            showFilter={showFilter}
            setFilterParams={setFilterParams}
          />
        </div>
        <div className="grid lg:grid-cols-5 gap-6 ">
          <div className="hidden lg:block">
            <Filter setFilterParams={setFilterParams} />
          </div>
          <div className="col-span-4">
            <div className="grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentBooks.map((book: any) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={(value) => {
                setItemsPerPage(value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBooks;

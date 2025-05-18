/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomForm from "../../components/CustomForm/CustomForm";
import { Button } from "antd";
import CustomInput from "../../components/CustomForm/CustomInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomSelect from "../../components/CustomForm/CustomSelect";
import { CategoryOptions } from "../../Constants/constants";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { useCreateBookMutation } from "../../Redux/Features/Admin/UserManagementApi/bookManagement.api";

const inStockOptions = [
  { label: "Yes", value: "true" },
  { label: "No", value: "false" },
];

const CreateBook = ({ onClose }: { onClose?: () => void }) => {
  const [addBook] = useCreateBookMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Book creating...");
    try {
      // Convert publicationDate to Date object if it's a string
      if (data.publicationDate && typeof data.publicationDate === "string") {
        data.publicationDate = new Date(data.publicationDate);
      }
      // Ensure inStock is boolean
      if (typeof data.inStock === "string") {
        data.inStock = data.inStock === "true";
      }
      await addBook(data).unwrap();
      toast.success("Book created successfully", { id: toastId });
      if (onClose) {
        onClose();
      }
    } catch (error: any) {
      let errorMsg = "Failed to create book";
      if (error?.data?.message) {
        errorMsg = error.data.message;
      }
      if (error?.data?.details) {
        errorMsg += ": " + JSON.stringify(error.data.details);
      }
      toast.error(errorMsg, { id: toastId });
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ x: "100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100vw", opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex justify-center items-center p-6"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create A Book📚
        </h2>
        <CustomForm onSubmit={onSubmit} className="space-y-5">
          <CustomInput name="image" placeholder="Image URL" type="text" />
          <CustomInput name="title" placeholder="Title" type="text" />
          <CustomInput name="author" placeholder="Author" type="text" />
          <CustomInput name="price" placeholder="Price" type="number" />
          <CustomInput name="rating" placeholder="Rating" type="number" />
          <CustomInput name="offers" placeholder="Discount" type="number" />
          <CustomSelect
            name="category"
            label="Category"
            options={CategoryOptions}
          />
          <CustomInput name="description" placeholder="Description" type="text" />
          <CustomInput name="publisher" placeholder="Publisher" type="text" />
          <CustomInput name="publicationDate" placeholder="Publication Date" type="date" />
          <CustomInput name="quantity" placeholder="Quantity" type="number" />
          <CustomSelect
            name="inStock"
            label="In Stock"
            options={inStockOptions}
          />

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              htmlType="submit"
              className="custom-btn"
              style={{ width: "100%" }}
            >
              Submit
            </Button>
          </motion.div>
        </CustomForm>

        <div className="flex justify-center mt-4">
          <Button
            onClick={() => (onClose ? onClose() : undefined)}
            className="custom-btn"
            style={{ width: "100%" }}
          >
            <ArrowLeft /> Back to Dashboard
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CreateBook;
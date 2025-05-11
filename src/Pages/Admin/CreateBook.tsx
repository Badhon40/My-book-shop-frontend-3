import CustomForm from "../../components/CustomForm/CustomForm";
import { Button } from "antd";
import CustomInput from "../../components/CustomForm/CustomInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import CustomSelect from "../../components/CustomForm/CustomSelect";
import { CategoryOptions } from "../../Constants/constants";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCreateBookMutation } from "../../Redux/Features/Admin/UserManagementApi/bookManagement.api";
import { ArrowLeft } from "lucide-react";

const CreateBook = () => {
    const navigate = useNavigate();
  const [addBook] = useCreateBookMutation(undefined);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Book crating...");
    try {
      await addBook(data).unwrap();
      toast.success("Book created successfully", { id: toastId });
        navigate("/admin/dashboard");
    } catch (error) {
      toast.error("Failed to create book", { id: toastId });
      console.log(error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex justify-center items-center   p-6"
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
        <CustomForm onSubmit={onSubmit} className="space-y-6">
          <CustomInput name="title" placeholder="Title" type="text" />
          <CustomInput
            name="description"
            placeholder="Description"
            type="text"
          />
          
          <CustomInput name="price" placeholder="Price" type="number" />
          <CustomInput name="quantity" placeholder="Quantity" type="number" />
          <CustomInput name="author" placeholder="Author" type="text" />
          <CustomSelect
            name="category"
            label="Category"
            options={CategoryOptions}
          />

           <CustomInput name="offers" placeholder="Discout" type="number" />
          <CustomInput name="publication" placeholder="Publication" type="text" />
          <CustomInput name="publicationdate" placeholder="Publication Date" type="text" />


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
            onClick={() => navigate("/admin/dashboard")}
            className="custom-btn"
            style={{ width: "100%" }}
          >
           <ArrowLeft/> Back to Dashboard
          </Button>
        </div>
      </motion.div>
    </motion.div>
    
  );
};

export default CreateBook;

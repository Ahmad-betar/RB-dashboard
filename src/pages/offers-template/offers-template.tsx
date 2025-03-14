import {
  useAddOffersTemplateMutation,
  useDeleteOffersTemplateMutation,
  useOffersTemplatesQuery,
} from "@/api/offers-template/offers-template-query";
import LoadingSpinner from "@/components/loading";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

const OffersTemplatesComponent = () => {
  const { control, handleSubmit } = useForm();
  const { data, isLoading } = useOffersTemplatesQuery();
  const addOffersTemplateMutation = useAddOffersTemplateMutation();
  const deleteOffersTemplateMutation = useDeleteOffersTemplateMutation();

  const onSubmit = (data: any) => {
    addOffersTemplateMutation.mutate(data);
  };

  const handleDelete = (id: string) => {
    deleteOffersTemplateMutation.mutate(id);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Offers Templates</h1>

      {/* Display Offers Templates */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Templates</h2>
        <ul className="space-y-2">
          {data?.data.map((template) => (
            <li
              key={template._id}
              className="flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{template.name}</p>
                <p className="text-sm text-gray-600">
                  Variables: {template.numOfVariables}
                </p>
              </div>
              <Button
                onClick={() => handleDelete(template._id)}
                variant={"outline"}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Offers Template Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Add New Template</h2>

        <TextField name="name" control={control} label="name" />

        <TextField
          control={control}
          name="numOfVariables"
          label="Number Of Variables"
          type="number"
        />

        <Button
          className="w-full"
          type="submit"
          disabled={addOffersTemplateMutation.isPending}
        >
          Add
        </Button>
      </form>
    </div>
  );
};

export default OffersTemplatesComponent;

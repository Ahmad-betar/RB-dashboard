import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { add_operator, delete_operator, get_operators } from "./operators-api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { OperatorFilterParams } from "./type";

export const getOperatorsQuery = (params?: OperatorFilterParams) => {
  const queryResults = useQuery({
    queryKey: ["operators", { ...params }],
    queryFn: async () => {
      const data = await get_operators(params);

      return data;
    },
    placeholderData: keepPreviousData,
  });

  return queryResults;
};

export const addOperatorQuery = () => {
  const navigate = useNavigate();

  const queryResults = useMutation({
    mutationKey: ["add-operator"],
    mutationFn: add_operator,
    onSuccess: () => {
      toast("Operator Added", {
        description: "The operator has been successfully added.",
      });
      navigate(-1);
    },
    onError: () => {
      toast("Error", {
        description: "Failed to add the operator. Please try again.",
      });
    },
  });

  return queryResults;
};

export const deleteOperatorQuery = () => {
  const queryClient = useQueryClient();

  const queryResults = useMutation({
    mutationKey: ["delete-operator"],
    mutationFn: delete_operator,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["operators"] });
    },
  });

  return queryResults;
};

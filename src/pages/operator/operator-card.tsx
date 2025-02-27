import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Operator } from "@/api/operators/type";
import LabeledData from "@/components/labeled-data";
import DeleteDialog from "@/components/delete-dialog";
import { deleteOperatorQuery } from "@/api/operators/operators-query";

interface OperatorCardProps {
  operator: Operator;
}

const OperatorCard = ({ operator }: OperatorCardProps) => {
  const { mutate, isPending } = deleteOperatorQuery();
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg">{operator.name}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <LabeledData label="Email:" value={operator.email} />

        <LabeledData label="Phone:" value={operator.phone} />

        <LabeledData
          label="Created At:"
          value={new Date(operator.createdAt).toLocaleDateString()}
        />

        <LabeledData
          label="Updated At:"
          value={new Date(operator.updatedAt).toLocaleDateString()}
        />

        <Badge variant="outline" className="mt-2">
          Active
        </Badge>
      </CardContent>

      <CardFooter className="justify-end">
        <DeleteDialog
          deleteFn={mutate}
          id={operator._id}
          isLoading={isPending}
        />
      </CardFooter>
    </Card>
  );
};

export default OperatorCard;

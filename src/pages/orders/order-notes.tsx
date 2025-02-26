import LabeledData from "@/components/labeled-data";

interface OrderNotesProps {
  notes: string;
}

const OrderNotes = ({ notes }: OrderNotesProps) => {
  return (
    <LabeledData label="Order Notes" value={notes || "No notes provided."} />
  );
};

export default OrderNotes;

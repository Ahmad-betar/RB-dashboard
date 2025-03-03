import LabeledData from "@/components/labeled-data";

interface OrderNotesProps {
  orderNotes: string;
  adminNotes: string;
}

const OrderNotes = ({ orderNotes, adminNotes }: OrderNotesProps) => {
  return (
    <>
      <LabeledData
        label="Order Notes"
        value={orderNotes || "No notes provided."}
      />

      <LabeledData
        label="Admin Notes"
        value={adminNotes || "No notes provided."}
      />
    </>
  );
};

export default OrderNotes;

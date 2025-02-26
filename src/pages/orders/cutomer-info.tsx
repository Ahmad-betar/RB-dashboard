import LabeledData from "@/components/labeled-data";

interface CustomerInfoProps {
  customer: {
    name: string;
    email: string;
    phone: number;
  };
}

const CustomerInfo = ({ customer }: CustomerInfoProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Customer Information</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <LabeledData label="Name" value={customer?.name} />

        <LabeledData label="Email" value={customer?.email} />

        <LabeledData label="Phone" value={customer?.phone} />
      </div>
    </div>
  );
};

export default CustomerInfo;

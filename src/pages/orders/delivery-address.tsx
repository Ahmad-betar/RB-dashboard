import LabeledData from "@/components/labeled-data";

interface DeliveryAddressProps {
  address: {
    area: string;
    street: string;
    building: {
      number: string;
      floor: string;
      apartment: string;
    };
    notes: string;
  };
}

const DeliveryAddress = ({ address }: DeliveryAddressProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Delivery Address</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <LabeledData label="Area" value={address?.area} />
        
        <LabeledData label="Street" value={address?.street} />
        
        <div>
          <p className="text-sm text-muted-foreground">Building</p>
          <p className="font-medium">
            {address?.building.number}, Floor {address?.building.floor},
            Apartment {address?.building.apartment}
          </p>
        </div>

        <LabeledData label="Notes" value={address?.notes || "N/A"} />
      </div>
    </div>
  );
};

export default DeliveryAddress;

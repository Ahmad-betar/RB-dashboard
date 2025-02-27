// src/components/customer-card.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Customer } from "@/api/customer/type";
import LabeledData from "@/components/labeled-data";

interface CustomerCardProps {
  customer: Customer;
}

export const CustomerCard = ({ customer }: CustomerCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg">{customer.name}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <LabeledData label="Email:" value={customer.email} />

        <LabeledData label="Phone:" value={customer.phone} />

        <LabeledData
          label="Joined:"
          value={new Date(customer.joined).toLocaleDateString()}
        />

        <LabeledData
          label="Last Activity:"
          value={new Date(customer.lastActivity).toLocaleDateString()}
        />

        <Badge variant="outline" className="mt-2">
          Active
        </Badge>
      </CardContent>
    </Card>
  );
};

import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from "@/components/ui";
import { CreditCard, Download, Receipt, Clock } from "lucide-react";

// TODO: Fetch from database
const payments = [
  {
    id: "INV-001",
    date: "Dec 15, 2024",
    amount: "$290.00",
    status: "Completed",
    product: "Pro Annual",
    method: "Visa ****4242",
  },
  {
    id: "INV-002",
    date: "Dec 1, 2023",
    amount: "$29.00",
    status: "Completed",
    product: "Pro Monthly",
    method: "PayPal",
  },
];

export default function BillingPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Billing</h1>
        <p className="text-muted">View your payment history and invoices.</p>
      </div>

      {/* Current subscription */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Current Subscription
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold text-white">Pro Annual</h3>
                <Badge variant="success">Active</Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Renews Dec 15, 2025
                </span>
                <span>$290/year</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Cancel
              </Button>
              <Button variant="default" size="sm">
                Update Payment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment history */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Receipt className="w-5 h-5 mr-2" />
            Payment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {payments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted">
                      Invoice
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted">
                      Product
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted">
                      Method
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-border last:border-0"
                    >
                      <td className="py-3 px-4 text-sm text-white font-mono">
                        {payment.id}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted">
                        {payment.date}
                      </td>
                      <td className="py-3 px-4 text-sm text-white">
                        {payment.product}
                      </td>
                      <td className="py-3 px-4 text-sm text-white">
                        {payment.amount}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            payment.status === "Completed" ? "success" : "warning"
                          }
                        >
                          {payment.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted">
                        {payment.method}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <Receipt className="w-12 h-12 mx-auto mb-4 text-muted" />
              <p className="text-muted">No payments yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

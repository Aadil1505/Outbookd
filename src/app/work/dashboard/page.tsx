import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Activity, ArrowUpRight, CreditCard, DollarSign, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Example data for cards and transactions
const cardData = [
  { title: "Total Revenue", value: "$45,231.89", icon: DollarSign, change: "+20.1% from last month" },
  { title: "Subscriptions", value: "+2350", icon: Users, change: "+180.1% from last month" },
  { title: "Sales", value: "+12,234", icon: CreditCard, change: "+19% from last month" },
  { title: "Active Now", value: "+573", icon: Activity, change: "+201 since last hour" },
];

const transactions = [
  { customer: "Liam Johnson", email: "liam@example.com", type: "Sale", status: "Approved", date: "2023-06-23", amount: "$250.00" },
  { customer: "Olivia Smith", email: "olivia@example.com", type: "Refund", status: "Declined", date: "2023-06-24", amount: "$150.00" },
  { customer: "Noah Williams", email: "noah@example.com", type: "Subscription", status: "Approved", date: "2023-06-25", amount: "$350.00" },
  { customer: "Emma Brown", email: "emma@example.com", type: "Sale", status: "Approved", date: "2023-06-26", amount: "$450.00" },
  { customer: "Liam Johnson", email: "liam@example.com", type: "Sale", status: "Approved", date: "2023-06-27", amount: "$550.00" },
];

const recentSales = [
  { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00", avatar: "/avatars/01.png", fallback: "OM" },
  { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00", avatar: "/avatars/02.png", fallback: "JL" },
  { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+$299.00", avatar: "/avatars/03.png", fallback: "IN" },
  { name: "William Kim", email: "will@email.com", amount: "+$99.00", avatar: "/avatars/04.png", fallback: "WK" },
  { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00", avatar: "/avatars/05.png", fallback: "SD" },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 grid-cols-2 md:gap-8 lg:grid-cols-4">
          {cardData.map((card, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <card.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">{card.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                  Recent transactions from your store.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden xl:table-column">Type</TableHead>
                    <TableHead className="hidden xl:table-column">Status</TableHead>
                    <TableHead className="hidden xl:table-column">Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{transaction.customer}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {transaction.email}
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">{transaction.type}</TableCell>
                      <TableCell className="hidden xl:table-column">
                        <Badge className="text-xs" variant="outline">
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell lg:hidden xl:table-column">{transaction.date}</TableCell>
                      <TableCell className="text-right">{transaction.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              {recentSales.map((sale, index) => (
                <div className="flex items-center gap-4" key={index}>
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src={sale.avatar} alt="Avatar" />
                    <AvatarFallback>{sale.fallback}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">{sale.name}</p>
                    <p className="text-sm text-muted-foreground">{sale.email}</p>
                  </div>
                  <div className="ml-auto font-medium">{sale.amount}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

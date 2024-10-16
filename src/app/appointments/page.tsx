import { auth } from '@/auth';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAppointments } from "@/lib/actions";
import { Appointment } from "@/types";
import { Clock, DollarSign, Scissors, Store, User } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth()
  const user = session?.user

  if (!user || !user.id) {
    redirect('/login')
  }

  const appointments: Appointment[] = await getAppointments(user.id) || []
  console.log(appointments)
  revalidatePath('/appointments')

  return (
    <div className="">
      <main className="container mx-auto py-10 px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="overflow-hidden transition-shadow hover:shadow-lg">
              <CardHeader className="bg-gradient-to-r from-secondary to-secondary-foreground text-primary py-3">
                <CardTitle className="flex items-center justify-between text-base">
                  <span>{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                  <Badge variant="secondary" className="text-xs">
                    {appointment.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 pb-2 px-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-sm font-semibold">
                    <Scissors className="w-4 h-4 mr-2 text-primary" />
                    <span>{appointment.service.name}</span>
                  </div>
                  <div className="flex items-center text-xs text-primary">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>
                      {new Date(appointment.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - 
                      {new Date(new Date(appointment.date).getTime() + appointment.service.duration * 60000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center">
                    <Store className="w-3 h-3 mr-2 text-primary" />
                    <span>{appointment.shop.name}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-3 h-3 mr-2 text-primary" />
                    <span>${appointment.service.price}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-2 text-primary" />
                    <span>{appointment.service.duration} minutes</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-3 h-3 mr-2 text-primary" />
                    <span>Staff: {appointment.staff.name}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
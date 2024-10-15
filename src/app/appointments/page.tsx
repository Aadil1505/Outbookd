import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scissors, Clock, User, Phone, Mail, Clipboard } from 'lucide-react';

type Event = {
    id: string
    title: string
    start: string
    end: string
    color: string
    clientName: string
    clientPhone: string
    clientEmail: string
    notes: string
}

// Mock data for appointments using the Event type
const appointments: Event[] = [
  {
    id: '1',
    title: 'Haircut',
    start: '2024-10-20T10:00:00',
    end: '2024-10-20T11:00:00',
    color: 'blue',
    clientName: 'John Doe',
    clientPhone: '(123) 456-7890',
    clientEmail: 'john@example.com',
    notes: 'Regular trim, style as usual'
  },
  {
    id: '2',
    title: 'Hair Coloring',
    start: '2024-10-21T14:30:00',
    end: '2024-10-21T16:30:00',
    color: 'purple',
    clientName: 'Jane Smith',
    clientPhone: '(987) 654-3210',
    clientEmail: 'jane@example.com',
    notes: 'Full color, wants to try a new shade'
  },
  {
    id: '3',
    title: 'Beard Trim',
    start: '2024-10-22T11:15:00',
    end: '2024-10-22T12:00:00',
    color: 'green',
    clientName: 'Mike Johnson',
    clientPhone: '(555) 123-4567',
    clientEmail: 'mike@example.com',
    notes: 'Maintain current style, but slightly shorter'
  },
];

export default function ClientAppointmentsPage() {
  return (
    <div className="">
      <main className="container mx-auto py-10 px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="overflow-hidden transition-shadow hover:shadow-lg">
              <CardHeader className="bg-gradient-to-r from-secondary to-secondary-foreground text-primary py-3">
                <CardTitle className="flex items-center justify-between text-base">
                  <span>{new Date(appointment.start).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                  <Badge variant="secondary" className="text-xs">
                    {new Date(appointment.start).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 pb-2 px-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-sm font-semibold">
                    <Scissors className="w-4 h-4 mr-2 text-primary" />
                    <span>{appointment.title}</span>
                  </div>
                  <div className="flex items-center text-xs text-primary">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>
                      {new Date(appointment.start).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - 
                      {new Date(appointment.end).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center">
                    <User className="w-3 h-3 mr-2 text-primary" />
                    <span>{appointment.clientName}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-3 h-3 mr-2 text-primary" />
                    <span>{appointment.clientPhone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-3 h-3 mr-2 text-primary" />
                    <span className="truncate">{appointment.clientEmail}</span>
                  </div>
                  <div className="flex items-start">
                    <Clipboard className="w-3 h-3 mr-2 text-primary mt-1" />
                    <span className="text-primary italic line-clamp-2">{appointment.notes}</span>
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
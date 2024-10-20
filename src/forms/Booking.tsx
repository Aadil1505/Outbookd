"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function BookingForm() {
  const [selectedStaff, setSelectedStaff] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [selectedServices, setSelectedServices] = useState([])

  const staffMembers = [
    { id: 1, name: "John Doe", image: "/placeholder.svg" },
    { id: 2, name: "Jane Smith", image: "/placeholder.svg" },
    { id: 3, name: "Bob Johnson", image: "/placeholder.svg" },
    { id: 4, name: "Sarah Lee", image: "/placeholder.svg" },
  ]

  const services = [
    { id: 1, name: "Haircut", price: 25 },
    { id: 2, name: "Shampoo & Style", price: 35 },
    { id: 3, name: "Color", price: 50 },
    { id: 4, name: "Manicure", price: 20 },
    { id: 5, name: "Pedicure", price: 30 },
  ]

  const availableTimes = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  ]

  const handleStaffSelect = (staff) => {
    setSelectedStaff(staff)
    setSelectedTime(null)
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setSelectedTime(null)
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
  }

  const handleServiceSelect = (service) => {
    setSelectedServices(prev => 
      prev.some(s => s.id === service.id)
        ? prev.filter(s => s.id !== service.id)
        : [...prev, service]
    )
  }

  const [date, setDate] = useState<Date | undefined>(new Date())


  const totalPrice = selectedServices.reduce((total, service) => total + service.price, 0)

  const isBookingComplete = selectedStaff && selectedDate && selectedTime && selectedServices.length > 0

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Book an Appointment</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>1. Choose Your Stylist</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {staffMembers.map((staff) => (
              <Button
                key={staff.id}
                variant={selectedStaff?.id === staff.id ? "default" : "outline"}
                className="h-auto flex flex-col items-center p-4"
                onClick={() => handleStaffSelect(staff)}
              >
                <Avatar className="w-20 h-20 mb-2">
                  <AvatarImage src={staff.image} alt={staff.name} />
                  <AvatarFallback>{staff.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span>{staff.name}</span>
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Select Date & Time</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={{ before: new Date() }
            }
            className="h-full w-full flex"
            classNames={{
              months:
                "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
              month: "space-y-4 w-full flex flex-col",
              table: "w-full h-full border-collapse space-y-1",
              head_row: "",
              row: "w-full mt-2",
              cell: 
                "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
            }}
          />
            {selectedDate && (
              <div className="grid grid-cols-3 gap-2">
                {availableTimes.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Choose Services</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {services.map((service) => (
              <Button
                key={service.id}
                variant={selectedServices.some(s => s.id === service.id) ? "default" : "outline"}
                onClick={() => handleServiceSelect(service)}
                className="justify-between"
              >
                <span>{service.name}</span>
                <Badge variant="secondary">${service.price}</Badge>
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Review & Book</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedStaff && (
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={selectedStaff.image} alt={selectedStaff.name} />
                  <AvatarFallback>{selectedStaff.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedStaff.name}</p>
                  <p className="text-sm text-muted-foreground">Your Stylist</p>
                </div>
              </div>
            )}
            {selectedDate && selectedTime && (
              <div>
                <p className="font-medium">Appointment Time</p>
                <p className="text-sm text-muted-foreground">
                  {selectedDate.toLocaleDateString()} at {selectedTime}
                </p>
              </div>
            )}
            {selectedServices.length > 0 && (
              <div>
                <p className="font-medium">Selected Services</p>
                <ul className="text-sm text-muted-foreground">
                  {selectedServices.map(service => (
                    <li key={service.id} className="flex justify-between">
                      <span>{service.name}</span>
                      <span>${service.price}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex justify-between font-medium">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
            )}
            <Button className="w-full" disabled={!isBookingComplete}>
              Book Appointment
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, CheckCircle, Clock, Droplet, Footprints, HandMetal, Palette, Scissors } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const stylists = [
  { id: "jd", name: "John Doe", initials: "JD", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "js", name: "Jane Smith", initials: "JS", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "bj", name: "Bob Johnson", initials: "BJ", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "sl", name: "Sarah Lee", initials: "SL", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "bj2", name: "Bill Jones", initials: "BJ", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "sl2", name: "Susan Lee", initials: "SL", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "bj3", name: "Ben Johnson", initials: "BJ", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "sl3", name: "Samantha Lee", initials: "SL", avatar: "/placeholder.svg?height=40&width=40" },
]

const services = [
  { id: "haircut", name: "Haircut", price: 25, icon: Scissors },
  { id: "shampoo", name: "Shampoo & Style", price: 35, icon: Droplet },
  { id: "color", name: "Color", price: 50, icon: Palette },
  { id: "manicure", name: "Manicure", price: 20, icon: HandMetal },
  { id: "pedicure", name: "Pedicure", price: 30, icon: Footprints },
  { id: "highlights", name: "Highlights", price: 70, icon: Palette },
  { id: "facial", name: "Facial", price: 60, icon: Droplet },
  { id: "massage", name: "Massage", price: 80, icon: HandMetal },
]

const appointmentTimes = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
]

const formSchema = z.object({
  stylist: z.string().min(1, { message: "Please select a stylist" }),
  date: z.date({ required_error: "Please select a date" }),
  time: z.string().min(1, { message: "Please select an appointment time" }),
  services: z.array(z.string()).min(1, { message: "Please select at least one service" }),
})

export default function AppointmentForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stylist: "",
      services: [],
      time: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    alert("Appointment booked successfully!")
  }

  const selectedStylist = stylists.find(s => s.id === form.watch("stylist"))
  const selectedServices = services.filter(s => form.watch("services").includes(s.id))
  const total = selectedServices.reduce((sum, service) => sum + service.price, 0)

  return (
    <div className="container mx-auto p-4 bg-gradient-to-b from-background to-secondary/10 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Book Your Appointment</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-accent/20">
              <CardHeader>
                <CardTitle className="text-2xl">1. Choose Your Stylist</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="stylist"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-2 gap-4"
                          >
                            {stylists.map((stylist) => (
                              <FormItem key={stylist.id}>
                                <FormControl>
                                  <RadioGroupItem
                                    value={stylist.id}
                                    id={stylist.id}
                                    className="peer sr-only"
                                  />
                                </FormControl>
                                <FormLabel
                                  htmlFor={stylist.id}
                                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all duration-300 ease-in-out"
                                >
                                  <Avatar className="w-16 h-16 mb-2">
                                    <AvatarImage src={stylist.avatar} alt={stylist.name} />
                                    <AvatarFallback>{stylist.initials}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-lg font-medium">{stylist.name}</span>
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </ScrollArea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-accent/20">
              <CardHeader className="">
                <CardTitle className="text-2xl">2. Select Date</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormControl>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={{ before: new Date() }}
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-accent/20">
              <CardHeader className="">
                <CardTitle className="text-2xl">3. Select Time</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                          <div className="grid grid-cols-2 gap-2">
                            {appointmentTimes.map((time) => (
                              <Button
                                key={time}
                                type="button"
                                variant={field.value === time ? "default" : "outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  field.value === time ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground"
                                )}
                                onClick={() => field.onChange(time)}
                              >
                                <Clock className="mr-2 h-4 w-4" />
                                {time}
                              </Button>
                            ))}
                          </div>
                        </ScrollArea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-accent/20">
              <CardHeader className="">
                <CardTitle className="text-2xl">4. Choose Services</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <FormField
                  control={form.control}
                  name="services"
                  render={() => (
                    <FormItem>
                      <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                        <div className="grid gap-4">
                          {services.map((service) => (
                            <FormField
                              key={service.id}
                              control={form.control}
                              name="services"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={service.id}
                                    className="flex flex-row items-center space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(service.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, service.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== service.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-lg flex items-center space-x-2 cursor-pointer">
                                      <service.icon className="w-6 h-6 text-primary" />
                                      <span>{service.name}</span>
                                      <Badge variant="secondary" className="ml-auto">${service.price}</Badge>
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                      </ScrollArea>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 mt-8 border-accent/20">
            <CardHeader className="">
              <CardTitle className="text-2xl">5. Review & Book</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {selectedStylist && (
                    <div className="flex items-center space-x-3 bg-accent/10 p-3 rounded-lg">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={selectedStylist.avatar} alt={selectedStylist.name} />
                        <AvatarFallback>{selectedStylist.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-lg">{selectedStylist.name}</p>
                        <p className="text-sm text-muted-foreground">Your Stylist</p>
                      </div>
                    </div>
                  )}
                  {form.watch("date") && (
                    <div className="flex items-center space-x-3 bg-accent/10 p-3 rounded-lg">
                      <CalendarIcon className="w-6 h-6 text-primary" />
                      <div>
                        <p className="font-semibold">{format(form.watch("date"), "MMMM d, yyyy")}</p>
                        <p className="text-sm text-muted-foreground">Appointment Date</p>
                      </div>
                    </div>
                  )}
                  {form.watch("time") && (
                    <div className="flex items-center space-x-3 bg-accent/10 p-3 rounded-lg">
                      <Clock className="w-6 h-6 text-primary" />
                      <div>
                        <p className="font-semibold">{form.watch("time")}</p>
                        <p className="text-sm text-muted-foreground">Appointment Time</p>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-lg text-primary">Selected Services:</h4>
                  <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                    <ul className="space-y-2">
                      {selectedServices.length > 0 ? selectedServices.map((service) => (
                        <li key={service.id} className="flex items-center justify-between bg-accent/10 p-2 rounded-md">
                          
                          <span className="flex items-center space-x-2">
                            <service.icon className="w-5 h-5 text-primary" />
                            <span>{service.name}</span>
                          </span>
                          <Badge variant="secondary">${service.price}</Badge>
                        </li>
                      )): <div className="flex items-center justify-center">No services selected</div>}
                    </ul>
                  </ScrollArea>
                  <div className="flex justify-between items-center text-xl font-bold mt-4 p-2 bg-primary/10 rounded-lg">
                    <span>Total:</span>
                    <span>${total}</span>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-6" type="submit" size="lg">
                <CheckCircle className="mr-2 h-5 w-5" /> Confirm Booking
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}
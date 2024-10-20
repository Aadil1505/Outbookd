"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

const stylists = [
  { id: "jd", name: "John Doe", initials: "JD" },
  { id: "js", name: "Jane Smith", initials: "JS" },
  { id: "bj", name: "Bob Johnson", initials: "BJ" },
  { id: "sl", name: "Sarah Lee", initials: "SL" },
]

const services = [
  { id: "haircut", name: "Haircut", price: 25 },
  { id: "shampoo", name: "Shampoo & Style", price: 35 },
  { id: "color", name: "Color", price: 50 },
  { id: "manicure", name: "Manicure", price: 20 },
  { id: "pedicure", name: "Pedicure", price: 30 },
]

const formSchema = z.object({
  stylist: z.string().min(1, { message: "Please select a stylist" }),
  date: z.date({ required_error: "Please select a date" }),
  services: z.array(z.string()).min(1, { message: "Please select at least one service" }),
})

export default function AppointmentForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stylist: "",
      services: [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Here you would typically send the form data to your backend
    alert("Appointment booked successfully!")
  }

  const selectedStylist = stylists.find(s => s.id === form.watch("stylist"))
  const selectedServices = services.filter(s => form.watch("services").includes(s.id))
  const total = selectedServices.reduce((sum, service) => sum + service.price, 0)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Book an Appointment</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>1. Choose Your Stylist</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="stylist"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
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
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                              >
                                <span className="text-2xl font-bold">{stylist.initials}</span>
                                <span className="mt-2">{stylist.name}</span>
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Select Date & Time</CardTitle>
              </CardHeader>
              <CardContent>
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Choose Services</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="services"
                  render={() => (
                    <FormItem>
                      <div className="grid grid-cols-1 gap-4">
                        {services.map((service) => (
                          <FormField
                            key={service.id}
                            control={form.control}
                            name="services"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={service.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
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
                                  <FormLabel className="font-normal">
                                    {service.name} (${service.price})
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Review & Book</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedStylist && (
                  <p className="mb-2">
                    <span className="font-semibold">Stylist:</span> {selectedStylist.name}
                  </p>
                )}
                {form.watch("date") && (
                  <p className="mb-2">
                    <span className="font-semibold">Date:</span> {format(form.watch("date"), "PPP")}
                  </p>
                )}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Selected Services:</h4>
                  <ul className="list-disc list-inside">
                    {selectedServices.map((service) => (
                      <li key={service.id}>
                        {service.name} - ${service.price}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="font-bold text-lg">Total: ${total}</p>
                <Button className="w-full mt-4" type="submit">Book Appointment</Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  )
}
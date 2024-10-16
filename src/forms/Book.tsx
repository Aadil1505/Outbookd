"use client"

import { useState, useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, Clock } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"

const FormSchema = z.object({
  date: z.date({
    required_error: "A date is required.",
  }),
  time: z.string({
    required_error: "A time slot is required.",
  }),
  stylist: z.string({
    required_error: "A stylist must be selected.",
  }),
  services: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You must select at least one service.",
  }),
})

const workers = [
  { name: "Alice Johnson", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Bob Smith", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Carol Williams", avatar: "/placeholder.svg?height=32&width=32" },
]

const services = [
  { id: "haircut", name: "Haircut", duration: 30, price: 30 },
  { id: "coloring", name: "Hair Coloring", duration: 90, price: 120 },
  { id: "styling", name: "Hair Styling", duration: 60, price: 80 },
]

export default function PremiumBooking() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      services: [],
    },
  })

  const [totalPrice, setTotalPrice] = useState(0)
  const [totalTime, setTotalTime] = useState(0)

  useEffect(() => {
    const selectedServices = form.watch("services")
    const filteredServices = services.filter(service => selectedServices.includes(service.id))
    const newTotal = filteredServices.reduce((sum, service) => sum + service.price, 0)
    const newTime = filteredServices.reduce((sum, service) => sum + service.duration, 0)
    setTotalPrice(newTotal)
    setTotalTime(newTime)
  }, [form.watch("services")])

  function formatTime(minutes: number) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours > 0 ? `${hours}h ` : ''}${mins}min`
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Book Your Appointment</CardTitle>
            <CardDescription>Select your preferred date, time, stylist, and services.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Time</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          {field.value ? field.value : <span>Pick a time</span>}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-52" align="start">
                      <div className="grid grid-cols-3 gap-2">
                        {["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"].map(
                          (t) => (
                            <Button
                              key={t}
                              type="button"
                              variant="outline"
                              className="text-xs"
                              onClick={() => field.onChange(t)}
                            >
                              {t}
                            </Button>
                          )
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stylist"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stylist</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a stylist" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {workers.map((worker) => (
                        <SelectItem key={worker.name} value={worker.name}>
                          <div className="flex items-center">
                            <img
                              src={worker.avatar}
                              alt={worker.name}
                              className="w-6 h-6 rounded-full mr-2"
                            />
                            {worker.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="services"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Services</FormLabel>
                    <FormDescription>
                      Select the services you'd like to book.
                    </FormDescription>
                  </div>
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
                              {service.name} - {formatTime(service.duration)} - ${service.price}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <div className="w-full text-right mb-2">
              <strong>Total Time: {formatTime(totalTime)}</strong>
            </div>
            <div className="w-full text-right mb-4">
              <strong>Total Price: ${totalPrice}</strong>
            </div>
            <Button type="submit" className="w-full">Book Appointment</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
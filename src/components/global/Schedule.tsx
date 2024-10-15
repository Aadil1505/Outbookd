"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Event } from '@/types'
import { addDays, differenceInMinutes, endOfDay, format, getMonth, getYear, isSameDay, isSameMonth, parseISO, setMonth, startOfDay, startOfWeek } from 'date-fns'
import { Calendar, ChevronLeft, ChevronRight, Clock, Mail, Phone, User, Users } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

// Change to fetch events for a specific day only when that day is clicked

function EventDialog({ event }: { event: Event }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div 
          className={`p-2 rounded-md ${event.color} cursor-pointer hover:opacity-80 transition-opacity w-full h-full overflow-hidden`}
        >
          <p className="font-semibold truncate">{event.title}</p>
          <p className="text-xs opacity-75 truncate">
            {format(parseISO(event.start), 'h:mm a')} - {format(parseISO(event.end), 'h:mm a')}
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <User className="h-4 w-4" />
            <span className="col-span-3">{event.clientName}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Phone className="h-4 w-4" />
            <span className="col-span-3">{event.clientPhone}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Mail className="h-4 w-4" />
            <span className="col-span-3">{event.clientEmail}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Clock className="h-4 w-4" />
            <span className="col-span-3">
              {format(parseISO(event.start), 'h:mm a')} - {format(parseISO(event.end), 'h:mm a')}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Calendar className="h-4 w-4" />
            <span className="col-span-3">{format(parseISO(event.start), 'MMMM d, yyyy')}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-semibold">Notes:</span>
            <span className="col-span-3">{event.notes}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function WorkerCalendar({ events }: { events: Event[] }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const weekStart = useMemo(() => startOfWeek(currentDate, { weekStartsOn: 1 }), [currentDate])

  const changeWeek = useCallback((days: number) => () => {
    setCurrentDate(prevDate => addDays(prevDate, days))
  }, [])

  const goToToday = useCallback(() => {
    const today = new Date()
    setCurrentDate(today)
    setSelectedDate(today)
  }, [])

  const changeMonth = useCallback((month: string) => {
    const newDate = setMonth(currentDate, parseInt(month))
    setCurrentDate(newDate)
    setSelectedDate(newDate)
  }, [currentDate])

  const renderWeekDay = useCallback((dayIndex: number) => {
    const day = addDays(weekStart, dayIndex)
    const isToday = isSameDay(day, new Date())
    const isSelected = isSameDay(day, selectedDate)
    const isCurrentMonth = isSameMonth(day, currentDate)

    return (
      <button
        key={dayIndex}
        className={`p-2 text-center transition-colors rounded-lg hover:bg-gray-100 ${
          isSelected
            ? 'bg-accent text-accent-foreground'
            : isToday
            && 'bg-green-300 text-accent-foreground'
        } ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}`}
        onClick={() => setSelectedDate(day)}
      >
        <div className="text-xs sm:text-sm font-medium">{format(day, 'EEE')}</div>
        <div className={`text-sm sm:text-lg ${isSelected || isToday ? 'font-bold' : ''}`}>
          {format(day, 'd')}
        </div>
      </button>
    )
  }, [weekStart, currentDate, selectedDate])

  const getEventsForDay = useCallback((date: Date) => {
    const dayStart = startOfDay(date)
    const dayEnd = endOfDay(date)
    return events
      .filter(event => {
        const eventStart = parseISO(event.start)
        const eventEnd = parseISO(event.end)
        return (eventStart >= dayStart && eventStart < dayEnd) || 
               (eventEnd > dayStart && eventEnd <= dayEnd) ||
               (eventStart < dayStart && eventEnd > dayEnd)
      })
      .sort((a, b) => parseISO(a.start).getTime() - parseISO(b.start).getTime())
  }, [events])

  const renderEvent = useCallback((event: Event) => {
    const startDate = parseISO(event.start)
    const endDate = parseISO(event.end)
    const dayStart = startOfDay(selectedDate)
    const dayEnd = endOfDay(selectedDate)

    const displayStart = startDate < dayStart ? dayStart : startDate
    const displayEnd = endDate > dayEnd ? dayEnd : endDate

    const durationInMinutes = differenceInMinutes(displayEnd, displayStart)
    const heightInPixels = Math.max(durationInMinutes, 60) // Minimum height of 60px

    return (
      <TableRow key={event.id}>
        <TableCell className="font-medium w-24 align-top py-2">
          {format(displayStart, 'h:mm a')}
        </TableCell>
        <TableCell className="py-2">
          <div style={{ height: `${heightInPixels}px`, minHeight: '60px' }} className="flex items-stretch">
            <EventDialog event={event} />
          </div>
        </TableCell>
      </TableRow>
    )
  }, [selectedDate])

  const dayEvents = useMemo(() => getEventsForDay(selectedDate), [getEventsForDay, selectedDate])

  return (
    <div className="flex flex-col h-screen bg-background px-4 sm:px-6 lg:px-8 py-6 rounded-md max-w-full mx-auto">
      <header className="flex flex-col sm:flex-row items-center justify-between mb-4">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <Calendar className="h-5 w-5 text-gray-600" />
          <h1 className="text-xl font-bold text-gray-800">{format(currentDate, 'MMMM yyyy')}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={changeWeek(-7)} aria-label="Previous week">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToToday}>Today</Button>
          <Select onValueChange={changeMonth} value={getMonth(currentDate).toString()}>
            <SelectTrigger className="w-[180px] h-8">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i} value={i.toString()}>
                  {format(new Date(getYear(currentDate), i, 1), 'MMMM')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={changeWeek(7)} aria-label="Next week">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {Array.from({ length: 7 }).map((_, index) => renderWeekDay(index))}
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="sticky top-0 z-20 bg-gray-50 px-4 py-2 text-sm font-semibold border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            {format(selectedDate, 'EEEE, MMMM d')}
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="inline-block h-4 w-4 mr-1" />
            <span>{dayEvents.length} {dayEvents.length === 1 ? 'appointment' : 'appointments'}</span>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-16rem)] md:h-[calc(100vh-12rem)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Time</TableHead>
                <TableHead>Event</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dayEvents.length > 0 ? (
                dayEvents.map(renderEvent)
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center py-4 text-gray-500">
                    No events scheduled for this day.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  )
}
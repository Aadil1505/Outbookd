import Schedule from '@/components/global/Schedule'
import React from 'react'
import { Event } from '@/types'


// Page that will query events and display it for the logged in user

export default function Page() {

    // Temporary example events
    const exampleEvents: Event[] = [
        {
          id: '1',
          title: 'Haircut',
          start: '2024-10-04T09:00:00',
          end: '2024-10-04T10:00:00',
          color: 'bg-blue-200 text-blue-800',
          clientName: 'John Doe',
          clientPhone: '(555) 123-4567',
          clientEmail: 'john.doe@example.com',
          notes: 'Regular trim, prefers scissors over clippers'
        },
        {
          id: '2',
          title: 'Color Treatment',
          start: '2024-10-04T11:30:00',
          end: '2024-10-04T13:00:00',
          color: 'bg-pink-200 text-pink-800',
          clientName: 'Jane Smith',
          clientPhone: '(555) 987-6543',
          clientEmail: 'jane.smith@example.com',
          notes: 'Full head highlights, ash blonde'
        },
        {
          id: '3',
          title: 'Styling',
          start: '2024-10-04T14:00:00',
          end: '2024-10-04T15:00:00',
          color: 'bg-green-200 text-green-800',
          clientName: 'Mike Johnson',
          clientPhone: '(555) 246-8135',
          clientEmail: 'mike.johnson@example.com',
          notes: 'Formal updo for wedding'
        },
        {
          id: '4',
          title: 'Beard Trim',
          start: '2024-10-04T10:00:00',
          end: '2024-10-04T10:30:00',
          color: 'bg-purple-200 text-purple-800',
          clientName: 'Tom Wilson',
          clientPhone: '(555) 369-2580',
          clientEmail: 'tom.wilson@example.com',
          notes: 'Maintain current beard shape, trim sideburns'
        },
        {
          id: '5',
          title: 'Manicure',
          start: '2024-10-04T15:30:00',
          end: '2024-10-04T16:30:00',
          color: 'bg-yellow-200 text-yellow-800',
          clientName: 'Sarah Brown',
          clientPhone: '(555) 147-2589',
          clientEmail: 'sarah.brown@example.com',
          notes: 'Gel manicure, prefers neutral colors'
        },
        {
          id: '6',
          title: 'Pedicure',
          start: '2024-10-04T22:45:00',
          end: '2024-10-05T00:00:00',
          color: 'bg-indigo-200 text-indigo-800',
          clientName: 'Emily Davis',
          clientPhone: '(555) 753-9514',
          clientEmail: 'emily.davis@example.com',
          notes: 'Regular pedicure with bright red polish'
        }
      ]

  return (
    <Schedule events={exampleEvents}/>
  )
}
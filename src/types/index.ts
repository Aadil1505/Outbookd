export type Event = {
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


// Types used throughout the application
export type Appointment = {
    id: number;
    date: string;
    status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
    shop: {
      id: number;
      name: string;
    };
    staff: {
      id: number;
      name: string;
      email: string;
    };
    client: {
      id: number;
      name: string;
      email: string;
    };
    services: {
      id: number;
      name: string;
      price: number;
      duration: number;
    }[];
  };
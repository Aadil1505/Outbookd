"use server"

import { db } from "./db";
import { Appointment } from "@/types";

// Displayed to the client, 10 most recent appointments, with the services
export async function getClientAppointments(clientId: string, limit = 10): Promise<Appointment[]> {
  try {
    const query = `
      SELECT 
        a.id,
        a.date,
        a.status,
        s.id AS shop_id,
        s.name AS shop_name,
        u_staff.id AS staff_id,
        u_staff.name AS staff_name,
        u_staff.email AS staff_email,
        u_client.id AS client_id,
        u_client.name AS client_name,
        u_client.email AS client_email,
        (
          SELECT json_agg(json_build_object(
            'id', srv.id,
            'name', srv.name,
            'price', srv.price,
            'duration', srv.duration
          ))
          FROM appointment_services aps
          JOIN services srv ON aps.service_id = srv.id
          WHERE aps.appointment_id = a.id
        ) AS services
      FROM appointments a
      JOIN shops s ON a.shop_id = s.id
      JOIN staff st ON a.staff_id = st.id
      JOIN users u_staff ON st.user_id = u_staff.id
      JOIN users u_client ON a.client_id = u_client.id
      WHERE a.client_id = $1
      ORDER BY a.date DESC
      LIMIT $2;
    `;

    const result = await db.query(query, [clientId, limit]);
    
    return result.rows.map(row => ({
      id: row.id,
      date: row.date,
      status: row.status,
      shop: {
        id: row.shop_id,
        name: row.shop_name
      },
      staff: {
        id: row.staff_id,
        name: row.staff_name,
        email: row.staff_email
      },
      client: {
        id: row.client_id,
        name: row.client_name,
        email: row.client_email
      },
      services: row.services || []
    }));
  } catch (error) {
    console.error("Error fetching client appointments:", error);
    throw new Error("Could not retrieve client appointments");
  }
}







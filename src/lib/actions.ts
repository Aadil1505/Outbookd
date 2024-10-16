"use server"

import { db } from "./db";
import { Appointment } from "@/types";

export async function getAppointments(userId: string): Promise<Appointment[]> {
    const query = `
    SELECT 
      a.id, a.date, a.status,
      s.id AS service_id, s.name AS service_name, s.price AS service_price, s.duration AS service_duration,
      sh.id AS shop_id, sh.name AS shop_name,
      st.id AS staff_id, su.name AS staff_name, su.email AS staff_email,
      c.id AS client_id, c.name AS client_name, c.email AS client_email
    FROM 
      appointments a
      JOIN services s ON a.service_id = s.id
      JOIN shops sh ON a.shop_id = sh.id
      JOIN staff st ON a.staff_id = st.id
      JOIN users su ON st.user_id = su.id
      JOIN users c ON a.client_id = c.id
    WHERE 
      a.client_id = $1
    ORDER BY 
      a.date ASC
    `;

  try {
    const result = await db.query(query, [userId]);
    return result.rows.map(row => ({
      id: row.id,
      date: row.date,
      status: row.status,
      service: {
        id: row.service_id,
        name: row.service_name,
        price: row.service_price,
        duration: row.service_duration
      },
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
      }
    }));
  } catch (error) {
    console.error('Error fetching detailed client appointments:', error);
    throw error;
  }
}
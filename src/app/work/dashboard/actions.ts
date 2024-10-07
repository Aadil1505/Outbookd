"use server"

import db from "@/lib/db"

export async function getAllShops() {
  try {
    const shops = await db.shop.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        phone: true,
        email: true,
      },
    })
    console.log(`Retrieved ${shops.length} shops`)
    console.log("shops at 0", shops[0].name)
    return shops
  } catch (error) {
    console.error('Error fetching shops:', error)
  }
}


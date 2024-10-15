import { auth } from "@/auth";
 
export default async function Page() {
  const session = await auth();
  console.log(session?.user)
 
  if (session?.user?.role === "client") {
    return <p>You are an admin, welcome!</p>;
  }
 
  return <p>You are not authorized to view this {session?.user.name} page!</p>;
}
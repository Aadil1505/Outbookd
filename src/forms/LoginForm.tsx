// "use client"
// import { login } from '@/lib/actions'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { useToast } from '@/hooks/use-toast'
// import { zodResolver } from "@hookform/resolvers/zod"
// import Link from 'next/link'
// import { useRouter } from "next/navigation"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { useTransition } from 'react'

// const FormSchema = z.object({
//   email: z.string().min(1, 'Email is required').email('Invalid email address'),
//   password: z.string().min(1, 'Password is required'),
// });

// export default function LoginForm() {
//   const [isPending, startTransition] = useTransition()
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   })

//   const { toast } = useToast();
//   const router = useRouter()

//   const onSubmit = (data: z.infer<typeof FormSchema>) => {
//     startTransition(async () => {
//       const formData = new FormData();
//       formData.append('email', data.email);
//       formData.append('password', data.password);
      
//       const result = await login(formData)
      
//       if (result?.error) {
//         toast({
//           title: "Login failed",
//           description: result.error,
//           variant: "destructive",
//         })
//       } else {
//         toast({
//           title: "Login successful",
//           description: "You have successfully logged in!",
//         })
//         router.push("/private") // Redirect to the private page on successful login
//       }
//     })
//   }

//   return (
//     <Card className="mx-auto max-w-sm my-24 shadow-lg">
//       <CardHeader>
//         <CardTitle className="text-2xl">Login</CardTitle>
//         <CardDescription>
//           Enter your credentials below.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
//             {/* EMAIL SECTION */}
//             <div className="grid gap-2">
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter your email" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             {/* PASSWORD SECTION */}
//             <div className="grid gap-2">
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <div className="flex items-center">
//                       <FormLabel>Password</FormLabel>
//                       <Link href="#" className="ml-auto inline-block text-sm underline">
//                         Forgot your password?
//                       </Link>
//                     </div>
//                     <FormControl>
//                       <Input type="password" placeholder="***************" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <Button type="submit" className="w-full" disabled={isPending}>
//               {isPending ? 'Logging in...' : 'Login'}
//             </Button>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   )
// }
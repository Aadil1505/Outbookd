// "use client"

// import { signup } from '@/lib/actions'
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
//   email: z.string().min(1, 'Email is required'),
//   password: z.string().min(1, 'Password is required'),
// });

// export default function SignUpForm() {
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

//   const onSubmit = (formData: z.infer<typeof FormSchema>) => {
//     startTransition(async () => {
//       const data = new FormData();
//       data.append('email', formData.email);
//       data.append('password', formData.password);

//       const res = await signup(data);

//       if (res?.error) {
//         toast({
//           title: "Sign Up Failed",
//           description: res.error.message,
//           variant: "destructive",
//         });
//       } else {
//         toast({
//           title: "Sign Up Successful",
//           description: "You have successfully signed up!",
//         });
//         // Redirect after successful sign-up if necessary
//         router.push('/private');
//       }
//     })
//   }

//   return (
//     <Card className="mx-auto max-w-sm my-24 shadow-lg">
//       <CardHeader>
//         <CardTitle className="text-2xl">Sign Up</CardTitle>
//         <CardDescription>
//           Enter your credentials below.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         {/* BEGINNING OF FORM */}
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
//               {isPending ? 'Signing Up...' : 'Sign Up'}
//             </Button>
//           </form>
//         </Form>
//         {/* END OF FORM */}
//       </CardContent>
//     </Card>
//   )
// }
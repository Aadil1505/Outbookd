import Link from 'next/link'
import { Menu, User, LogOut, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import ModeToggle from "@/components/global/ModeToggle"
import { auth, signOut, signIn } from "@/auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default async function Navbar() {
  const session = await auth()
  const user = session?.user

  const navItems = [
    {id: 1, path: "/", name: "Home"},
    {id: 2, path: "/search", name: "Search"},
    {id: 3, path: "/student", name: "Add Student"},
    {id: 4, path: "/employee", name: "Add Employee"},
    {id: 5, path: "/training", name: "Add Training"}
  ]

  return (
    <nav className="shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href='/' className="text-2xl font-bold text-foreground">
              Outbookd
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8 h-full">
              {navItems.map(item => (
                <Link
                  key={item.id}
                  href={item.path}
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-muted-foreground hover:border-primary hover:text-foreground relative group"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ModeToggle />
            
            {/* User Dropdown for larger screens */}
            <div className="hidden sm:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    {user?.image ? (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.image} alt="User image" />
                        <AvatarFallback>
                          {user.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {session ? (
                    <>
                      <DropdownMenuItem disabled className="flex flex-col items-start">
                        <span className="font-medium">{user?.name}</span>
                        <span className="text-xs text-muted-foreground">{user?.email}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <form action={async () => {
                          'use server';
                          await signOut();
                        }}>
                          <button className="w-full text-left flex items-center">
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign out
                          </button>
                        </form>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem asChild>
                      <Button variant="outline" className="w-full text-left flex items-center" asChild>
                          <Link href="/login"><LogIn className="mr-2 h-4 w-4" />Login</Link>
                        </Button>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="sm:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="flex flex-col h-full">
                  <SheetClose asChild>
                    <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-6">
                      <span className="text-2xl font-bold text-foreground">Outbookd</span>
                    </Link>
                  </SheetClose>

                  <div className="flex-grow">
                    {navItems.map(item => (
                      <SheetClose asChild key={item.id}>
                        <Link
                          href={item.path}
                          className="block py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                        >
                          {item.name}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>

                  <div className="border-t border-muted pt-4 mt-auto">
                    {session ? (
                      <>
                        <div className="flex items-center mb-4">
                          {user?.image && (
                            <Avatar>
                              <AvatarImage src={user.image} alt="User image" />
                              <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
                            </Avatar>
                          )}
                          <div className="ml-3">
                            <div className="text-base font-medium text-foreground">{user?.name}</div>
                            <div className="text-sm font-medium text-muted-foreground">{user?.email}</div>
                          </div>
                        </div>
                        <SheetClose asChild>
                          <form action={async () => {
                            'use server';
                            await signOut();
                          }}>
                              <Button variant="outline" className="w-full">
                                <LogOut className="mr-2 h-4 w-4" />
                                Sign out
                              </Button>
                          </form>
                        </SheetClose>
                      </>
                    ) : (
                      <SheetClose asChild>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/login"><LogIn className="mr-2 h-4 w-4" />Login</Link>
                        </Button>
                      </SheetClose>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
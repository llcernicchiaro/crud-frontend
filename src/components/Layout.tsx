import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { LogOut } from "lucide-react";
import { signOut } from "aws-amplify/auth";

export function Layout() {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container mx-auto flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 px-4">
          <div className="flex gap-6 md:gap-10">
            <a href="/" className="flex items-center space-x-2">
              <span className="inline-block font-bold">Agent Management</span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <ModeToggle />
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="md:hidden"
                size="icon"
              >
                <LogOut className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="hidden md:block"
              >
                Sign Out
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="container py-8 px-4 mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

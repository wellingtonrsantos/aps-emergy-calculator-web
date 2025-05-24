import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div>
          <Header />
          <main className="p-4">
            <Outlet />
          </main>
          {/* <Footer /> */}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

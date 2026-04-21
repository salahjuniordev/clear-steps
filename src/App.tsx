import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import Index from "./pages/Index.tsx";
import Maladies from "./pages/Maladies.tsx";
import Quiz from "./pages/Quiz.tsx";
import Annuaire from "./pages/Annuaire.tsx";
import Chat from "./pages/Chat.tsx";
import Blog from "./pages/Blog.tsx";
import APropos from "./pages/APropos.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/maladies" element={<Maladies />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/annuaire" element={<Annuaire />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

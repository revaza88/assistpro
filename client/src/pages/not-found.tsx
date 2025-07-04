import Navigation from "@/components/navigation"; // Added Navigation
import Footer from "@/components/footer"; // Added Footer
import { Button } from "@/components/ui/button"; // For home button
import { Link } from "wouter";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"; // Using Heroicon
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-white"> {/* Changed background */}
      <Navigation />
      <main className="flex-grow flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center p-8 max-w-md w-full"
        >
          <ExclamationCircleIcon className="h-20 w-20 text-brand-gold-500 mx-auto mb-6" /> {/* Updated Icon and color */}
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-blue-700 mb-4">
            404 - Page Not Found
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Oops! The page you are looking for does not exist or has been moved.
          </p>
          <Button asChild size="lg" className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-semibold">
            <Link href="/">Go to Homepage</Link>
          </Button>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

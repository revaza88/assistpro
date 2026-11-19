import Navigation from "@/components/navigation"; // Added Navigation
import Footer from "@/components/footer"; // Added Footer
import { useTranslation } from 'react-i18next';
import PageHeader from '@/components/PageHeader';
import { interfaceCopy } from '@/lib/interface-copy';
import { Link } from "wouter";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"; // Using Heroicon
import { motion } from "framer-motion";

export default function NotFound() {
  const { i18n } = useTranslation(), copy = interfaceCopy(i18n.language);
  return (
    <div className="min-h-screen w-full flex flex-col bg-white"> {/* Changed background */}
      <Navigation />
      <main id="main-content" tabIndex={-1} className="design-wrap flex-grow pb-12">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <PageHeader eyebrow="404" title={copy.missingTitle} description={copy.missingText}>
            <Link href="/" className="site-button">{copy.home}</Link>
          </PageHeader>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

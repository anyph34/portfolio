import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

import { contactDetails } from "@/lib/portfolio";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="footer-brand" href="/">
        Anyph Kipngetich
      </Link>
      <span>Built with care in Kenya.</span>
      <a className="footer-contact" href={`mailto:${contactDetails.email}`}>
        <Mail aria-hidden="true" size={14} />
        {contactDetails.email}
        <ArrowUpRight aria-hidden="true" size={13} />
      </a>
    </footer>
  );
}

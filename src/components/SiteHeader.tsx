"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui";
import { SiteLogo } from "@/components/SiteLogo";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/workshops", label: "Workshops" },
  { href: "/galleries", label: "Galleries" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isAdmin = pathname.startsWith("/admin");

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/95 backdrop-blur-sm">
      <div className="section-shell flex items-center justify-between gap-4 py-3">
        <SiteLogo priority />

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative ${active ? "text-ink" : "text-muted hover:text-ink"}`}
              >
                {link.label}
                {active ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : null}
              </Link>
            );
          })}
          <Button href={isAdmin ? "/admin" : "/galleries"} variant="accent">
            {isAdmin ? "Dashboard" : "Browse Galleries"}
          </Button>
        </nav>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </Button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-background md:hidden"
          >
            <div className="flex flex-col gap-3 px-5 py-4 text-sm font-medium">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-ink"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="text-muted"
              >
                Admin
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

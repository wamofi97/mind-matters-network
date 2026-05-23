"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { mainNavLinks, siteConfig } from "@/constants/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "./container";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full pt-4">
      <Container>
        <nav
          className={cn(
            "flex items-center justify-between gap-6",
            "rounded-full border border-border/60 bg-cream/80 px-5 py-3 backdrop-blur-sm",
            "shadow-soft"
          )}
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="font-heading text-lg font-bold tracking-tight text-ink sm:text-xl"
          >
            Mind Matters
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {mainNavLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-ink/80 transition-colors hover:bg-sage-soft/50 hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <Button variant="donate" size="sm" asChild>
              <Link href={siteConfig.donateHref}>Donate</Link>
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-sage-soft/50 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="mt-3 overflow-hidden rounded-[32px] border border-border/60 bg-cream/95 p-4 shadow-card lg:hidden"
            >
              <ul className="flex flex-col gap-1">
                {mainNavLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block rounded-2xl px-4 py-3 text-base font-medium text-ink hover:bg-sage-soft/50"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <Button variant="donate" className="w-full" asChild>
                    <Link href={siteConfig.donateHref} onClick={() => setOpen(false)}>
                      Donate
                    </Link>
                  </Button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}

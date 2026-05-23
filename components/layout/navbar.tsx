"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mainNavLinks, siteConfig } from "@/constants/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { Container } from "./container";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute left-0 right-0 top-0 z-50 bg-transparent">
      <Container className="pt-5 lg:pt-6">
        <nav
          className="grid grid-cols-[1fr_auto] items-center gap-4 xl:grid-cols-[1fr_auto_1fr]"
          aria-label="Main navigation"
        >
          <Logo className="shrink-0 justify-self-start" />

          <ul className="hidden items-center justify-center gap-0.5 xl:flex xl:col-start-2">
            {mainNavLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full px-3.5 py-2 font-body text-sm font-medium text-ink/85 transition-colors hover:text-ink lg:px-4"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden justify-self-end xl:col-start-3 xl:block">
            <Button variant="donate" size="sm" asChild>
              <Link href={siteConfig.joinHref}>Join the Movement</Link>
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center justify-self-end rounded-full text-ink transition-colors hover:bg-sage-soft/50 xl:col-start-3 xl:hidden"
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
              className="mt-3 overflow-hidden rounded-[32px] border border-border/60 bg-cream/95 p-4 shadow-card xl:hidden"
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
                    <Link
                      href={siteConfig.joinHref}
                      onClick={() => setOpen(false)}
                    >
                      Join the Movement
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

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  HeartHandshake,
  Home,
  Info,
  Mail,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { type NavLink } from "@/lib/content/site";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { Container } from "./container";

const navIcons: Record<string, LucideIcon> = {
  "/": Home,
  "/about": Info,
  "/events": CalendarDays,
  "/resources": BookOpen,
  "/get-involved": HeartHandshake,
  "/contact": Mail,
};

type NavbarProps = {
  navLinks: NavLink[];
  joinHref: string;
};

export function Navbar({ navLinks, joinHref }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const update = () => setHeaderHeight(el.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const heroThreshold = window.innerHeight * 0.8;

      setScrolled(currentY > 24);

      // Don't hide while the mobile menu is open or near the top.
      if (open || currentY < heroThreshold) {
        setHidden(false);
      } else if (currentY > lastScrollY.current) {
        setHidden(true); // scrolling down past the hero
      } else {
        setHidden(false); // scrolling up
      }

      lastScrollY.current = currentY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current?.contains(target) ||
        toggleRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
    <motion.header
      ref={headerRef}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "bg-cream/80 shadow-card backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <Container>
        <nav
          className="relative z-10 grid grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]"
          aria-label="Main navigation"
        >
          <Logo className="shrink-0 justify-self-start" />

          <ul className="hidden items-center justify-center gap-0.5 lg:flex lg:col-start-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full px-3.5 py-2 font-body text-sm transition-colors lg:px-4 ${
                      active
                        ? "bg-sage-soft/60 text-ink font-bold"
                        : "text-ink/85 hover:bg-sage-soft/40 hover:text-ink font-medium"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden justify-self-end lg:col-start-3 lg:block">
            <Button variant="donate" size="sm" asChild>
              <Link href={joinHref}>Join the Movement</Link>
            </Button>
          </div>

          <Button
            ref={toggleRef}
            variant="unstyled"
            size="none"
            type="button"
            className="size-10 justify-self-end rounded-full text-ink transition-colors hover:bg-sage-soft/50 lg:col-start-3 lg:hidden [&_svg]:size-5"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </nav>
      </Container>
    </motion.header>

    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setOpen(false)}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-sm lg:hidden"
        />
      )}
    </AnimatePresence>

    <AnimatePresence>
      {open && (
        <motion.div
          key="menu"
          ref={menuRef}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.35 }}
          style={{ top: headerHeight, height: `calc(100dvh - ${headerHeight}px)` }}
          className="fixed right-0 z-40 flex w-3/4 max-w-sm flex-col overflow-y-auto border-l rounded-bl-card border-border/60 bg-cream/90 backdrop-blur-sm px-4 pb-8 pt-6 shadow-card lg:hidden"
        >
          <ul className="flex flex-1 flex-col justify-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const Icon = navIcons[link.href];
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-8 rounded-2xl px-4 py-4 text-base text-ink ${
                      active ? "bg-sage-soft/30 border border-sage/20 font-bold" : "font-medium hover:bg-sage-soft/50"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {Icon && (
                      <Icon
                        className={`size-5 shrink-0 ${
                          active ? "text-deep-green" : "text-ink/70"
                        }`}
                      />
                    )}
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <Button variant="primary" className="w-full" asChild>
                <Link href={joinHref} onClick={() => setOpen(false)}>
                  Join the Movement
                </Link>
              </Button>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

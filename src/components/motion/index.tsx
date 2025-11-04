'use client';

/**
 * SSR-safe Framer Motion components
 * This file provides dynamic imports for motion components to prevent SSR errors
 */

import dynamic from 'next/dynamic';
import type { HTMLMotionProps } from 'framer-motion';
import { ComponentType } from 'react';

// Fallback component for SSR
const Fallback = ({ children, ...props }: any) => (
  <div {...props} style={{ ...props.style, opacity: 0 }}>
    {children}
  </div>
);

// Dynamic imports for motion components
export const motion = {
  div: dynamic<HTMLMotionProps<'div'>>(
    () => import('framer-motion').then((mod) => mod.motion.div),
    { ssr: false, loading: () => <Fallback as="div" /> }
  ) as ComponentType<HTMLMotionProps<'div'>>,

  section: dynamic<HTMLMotionProps<'section'>>(
    () => import('framer-motion').then((mod) => mod.motion.section),
    { ssr: false, loading: () => <Fallback as="section" /> }
  ) as ComponentType<HTMLMotionProps<'section'>>,

  button: dynamic<HTMLMotionProps<'button'>>(
    () => import('framer-motion').then((mod) => mod.motion.button),
    { ssr: false, loading: () => <Fallback as="button" /> }
  ) as ComponentType<HTMLMotionProps<'button'>>,

  span: dynamic<HTMLMotionProps<'span'>>(
    () => import('framer-motion').then((mod) => mod.motion.span),
    { ssr: false, loading: () => <Fallback as="span" /> }
  ) as ComponentType<HTMLMotionProps<'span'>>,

  h1: dynamic<HTMLMotionProps<'h1'>>(
    () => import('framer-motion').then((mod) => mod.motion.h1),
    { ssr: false, loading: () => <Fallback as="h1" /> }
  ) as ComponentType<HTMLMotionProps<'h1'>>,

  h2: dynamic<HTMLMotionProps<'h2'>>(
    () => import('framer-motion').then((mod) => mod.motion.h2),
    { ssr: false, loading: () => <Fallback as="h2" /> }
  ) as ComponentType<HTMLMotionProps<'h2'>>,

  h3: dynamic<HTMLMotionProps<'h3'>>(
    () => import('framer-motion').then((mod) => mod.motion.h3),
    { ssr: false, loading: () => <Fallback as="h3" /> }
  ) as ComponentType<HTMLMotionProps<'h3'>>,

  p: dynamic<HTMLMotionProps<'p'>>(
    () => import('framer-motion').then((mod) => mod.motion.p),
    { ssr: false, loading: () => <Fallback as="p" /> }
  ) as ComponentType<HTMLMotionProps<'p'>>,

  ul: dynamic<HTMLMotionProps<'ul'>>(
    () => import('framer-motion').then((mod) => mod.motion.ul),
    { ssr: false, loading: () => <Fallback as="ul" /> }
  ) as ComponentType<HTMLMotionProps<'ul'>>,

  li: dynamic<HTMLMotionProps<'li'>>(
    () => import('framer-motion').then((mod) => mod.motion.li),
    { ssr: false, loading: () => <Fallback as="li" /> }
  ) as ComponentType<HTMLMotionProps<'li'>>,

  a: dynamic<HTMLMotionProps<'a'>>(
    () => import('framer-motion').then((mod) => mod.motion.a),
    { ssr: false, loading: () => <Fallback as="a" /> }
  ) as ComponentType<HTMLMotionProps<'a'>>,
};

// Export AnimatePresence with SSR safety
export const AnimatePresence = dynamic(
  () => import('framer-motion').then((mod) => mod.AnimatePresence),
  { ssr: false }
);

// Export hooks
export { useAnimation, useInView } from 'framer-motion';

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { FC } from "react";

export const Accordion: FC = ({ children }) => (
  <AccordionPrimitive.Root type="single" collapsible>
    {children}
  </AccordionPrimitive.Root>
);

export const AccordionItem: FC<{ value: string }> = ({ value, children }) => (
  <AccordionPrimitive.Item value={value}>
    {children}
  </AccordionPrimitive.Item>
);

export const AccordionTrigger: FC = ({ children }) => (
  <AccordionPrimitive.Trigger>{children}</AccordionPrimitive.Trigger>
);

export const AccordionContent: FC = ({ children }) => (
  <AccordionPrimitive.Content>{children}</AccordionPrimitive.Content>
); 
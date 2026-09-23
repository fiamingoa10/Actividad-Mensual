import * as React from "react";
import { Drawer } from "vaul";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

function Sheet({
  shouldScaleBackground = false,
  ...props
}: React.ComponentProps<typeof Drawer.Root>) {
  return <Drawer.Root shouldScaleBackground={shouldScaleBackground} {...props} />;
}

const SheetTrigger = Drawer.Trigger;
const SheetClose = Drawer.Close;
const SheetPortal = Drawer.Portal;

const SheetOverlay = React.forwardRef<
  React.ComponentRef<typeof Drawer.Overlay>,
  React.ComponentPropsWithoutRef<typeof Drawer.Overlay>
>(({ className, ...props }, ref) => (
  <Drawer.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-foreground/40", className)}
    {...props}
  />
));
SheetOverlay.displayName = "SheetOverlay";

const SheetContent = React.forwardRef<
  React.ComponentRef<typeof Drawer.Content>,
  React.ComponentPropsWithoutRef<typeof Drawer.Content> & {
    side?: "left" | "right" | "bottom";
  }
>(({ className, children, side = "left", ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <Drawer.Content
      ref={ref}
      className={cn(
        "fixed z-50 flex flex-col bg-card text-card-foreground shadow-card outline-none",
        side === "left" &&
          "bottom-0 left-0 top-0 w-[min(20rem,86vw)] rounded-r-2xl",
        side === "right" &&
          "bottom-0 right-0 top-0 w-[min(20rem,86vw)] rounded-l-2xl",
        side === "bottom" &&
          "inset-x-0 bottom-0 max-h-[88vh] rounded-t-2xl",
        className,
      )}
      {...props}
    >
      {side === "bottom" && (
        <div className="mx-auto mt-3 h-1.5 w-10 rounded-full bg-border" />
      )}
      {children}
      <Drawer.Close className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground">
        <X className="size-4" />
        <span className="sr-only">Cerrar</span>
      </Drawer.Close>
    </Drawer.Content>
  </SheetPortal>
));
SheetContent.displayName = "SheetContent";

function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("grid gap-1 p-5 pr-12", className)} {...props} />
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof Drawer.Title>) {
  return (
    <Drawer.Title
      className={cn("font-display text-lg font-medium tracking-tight", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof Drawer.Description>) {
  return (
    <Drawer.Description
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
};

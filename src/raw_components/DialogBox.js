import React from "react";
import * as DialogPrimitives from "@radix-ui/react-dialog";
import { cx, focusRing } from "../utils/utils";

// Tremor Raw Dialog [v0.0.0]

const Dialog = (props) => {
  return <DialogPrimitives.Root {...props} />;
};
Dialog.displayName = "Dialog";

const DialogTrigger = DialogPrimitives.Trigger;

DialogTrigger.displayName = "DialogTrigger";

const DialogClose = DialogPrimitives.Close;

DialogClose.displayName = "DialogClose";

const DialogPortal = DialogPrimitives.Portal;

DialogPortal.displayName = "DialogPortal";

const DialogOverlay = React.forwardRef(
  ({ className, ...props }, forwardedRef) => {
    return (
      <DialogPrimitives.Overlay
        ref={forwardedRef}
        className={cx(
          // base
          "fixed inset-0 z-50 overflow-y-auto",
          // background color
          "bg-black/70",
          // transition
          "data-[state=open]:animate-dialogOverlayShow",
          className
        )}
        {...props}
      />
    );
  }
);

DialogOverlay.displayName = "DialogOverlay";

const DialogContent = React.forwardRef(
  ({ className, ...props }, forwardedRef) => {
    return (
      <DialogPortal>
        <DialogOverlay>
          <DialogPrimitives.Content
            ref={forwardedRef}
            className={cx(
              // base
              "fixed left-1/2 top-1/2 z-50 w-[95vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md border p-6 shadow-lg",
              // border color
              "dark:border-gray-200 border-gray-900 ",
              // background color
              " dark:bg-white bg-[#090E1A]",
              // transition
              "data-[state=open]:animate-dialogContentShow",
              focusRing,
              className
            )}
            {...props}
          />
        </DialogOverlay>
      </DialogPortal>
    );
  }
);

DialogContent.displayName = "DialogContent";

const DialogHeader = ({ className, ...props }) => {
  return <div className={cx("flex flex-col gap-y-1", className)} {...props} />;
};

DialogHeader.displayName = "DialogHeader";

const DialogTitle = React.forwardRef(
  ({ className, ...props }, forwardedRef) => (
    <DialogPrimitives.Title
      ref={forwardedRef}
      className={cx(
        // base
        "text-lg font-semibold",
        // text color
        "dark:text-gray-900 text-gray-50",
        className
      )}
      {...props}
    />
  )
);

DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef(
  ({ className, ...props }, forwardedRef) => {
    return (
      <DialogPrimitives.Description
        ref={forwardedRef}
        className={cx("dark:text-gray-500 text-gray-500", className)}
        {...props}
      />
    );
  }
);

DialogDescription.displayName = "DialogDescription";

const DialogFooter = ({ className, ...props }) => {
  return (
    <div
      className={cx(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
      {...props}
    />
  );
};

DialogFooter.displayName = "DialogFooter";

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
};

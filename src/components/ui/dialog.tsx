'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X, Minus, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

// Base Dialog primitives
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

// Shared Types
interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

// Custom Mac-Style Dialog component that supports dragging and resizing
export const MacDialog = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> & {
    initialPosition?: Position
    initialSize?: Size
    minWidth?: number
    minHeight?: number
    title?: React.ReactNode
    description?: React.ReactNode
    className?: string
    contentClassName?: string
    onPositionChange?: (position: Position) => void
    onSizeChange?: (size: Size) => void
  }
>(({
  initialPosition = { x: 10, y: 10 },
  initialSize = { width: 600, height: 400 },
  minWidth = 300,
  minHeight = 300,
  title,
  description,
  className,
  contentClassName,
  children,
  onPositionChange,
  onSizeChange,
  ...props
}, ref) => {
  // State for position and size
  const [position, setPosition] = React.useState<Position>(initialPosition);
  const [size, setSize] = React.useState<Size>(initialSize);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isResizing, setIsResizing] = React.useState(false);
  const [resizeDirection, setResizeDirection] = React.useState<string | null>(null);
  const [dragStart, setDragStart] = React.useState<Position>({ x: 0, y: 0 });
  const [initialPositionOnDrag, setInitialPositionOnDrag] = React.useState<Position>(initialPosition);
  const [initialSizeOnResize, setInitialSizeOnResize] = React.useState<Size>(initialSize);

  // Reference to the dialog content element
  const dialogRef = React.useRef<HTMLDivElement>(null);

  // Find the trigger and content from children
  let triggerElement: React.ReactNode = null;
  let contentElements: React.ReactNode[] = [];

  React.Children.forEach(children, child => {
    if (React.isValidElement(child)) {
      if (child.type === MacDialogTrigger) {
        triggerElement = child;
      } else {
        contentElements.push(child);
      }
    }
  });

  // Handle window resize
  React.useEffect(() => {
    const handleWindowResize = () => {
      if (dialogRef.current) {
        // Ensure dialog stays within viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        setPosition(prev => ({
          x: Math.min(prev.x, viewportWidth - 100),
          y: Math.min(prev.y, viewportHeight - 100),
        }));
      }
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  // Handle drag start
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only start dragging if clicking on the title bar and not on the buttons
    if ((e.target as HTMLElement).closest('.dialog-control-buttons')) {
      return;
    }

    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setInitialPositionOnDrag(position);

    // Prevent text selection during drag
    e.preventDefault();
  };

  // Handle resize start
  const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>, direction: string) => {
    setIsResizing(true);
    setResizeDirection(direction);
    setDragStart({ x: e.clientX, y: e.clientY });
    setInitialSizeOnResize(size);
    setInitialPositionOnDrag(position);

    // Prevent text selection during resize
    e.preventDefault();
  };

  // Handle mouse move for both dragging and resizing
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;

        const newPosition = {
          x: initialPositionOnDrag.x + deltaX,
          y: initialPositionOnDrag.y + deltaY,
        };

        setPosition(newPosition);
        onPositionChange?.(newPosition);
      } else if (isResizing && resizeDirection) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;

        let newWidth = initialSizeOnResize.width;
        let newHeight = initialSizeOnResize.height;
        let newX = position.x;
        let newY = position.y;

        // Handle different resize directions
        if (resizeDirection.includes('e')) {
          newWidth = Math.max(initialSizeOnResize.width + deltaX, minWidth);
        }
        if (resizeDirection.includes('w')) {
          const maxDeltaX = initialSizeOnResize.width - minWidth;
          const effectiveDeltaX = Math.max(-maxDeltaX, deltaX);
          newWidth = initialSizeOnResize.width - effectiveDeltaX;
          newX = initialPositionOnDrag.x + effectiveDeltaX;
        }
        if (resizeDirection.includes('s')) {
          newHeight = Math.max(initialSizeOnResize.height + deltaY, minHeight);
        }
        if (resizeDirection.includes('n')) {
          const maxDeltaY = initialSizeOnResize.height - minHeight;
          const effectiveDeltaY = Math.max(-maxDeltaY, deltaY);
          newHeight = initialSizeOnResize.height - effectiveDeltaY;
          newY = initialPositionOnDrag.y + effectiveDeltaY;
        }

        // Update size and position
        setSize({ width: newWidth, height: newHeight });
        onSizeChange?.({ width: newWidth, height: newHeight });

        if (resizeDirection.includes('w') || resizeDirection.includes('n')) {
          setPosition({ x: newX, y: newY });
          onPositionChange?.({ x: newX, y: newY });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, resizeDirection, initialPositionOnDrag, initialSizeOnResize, position, size, minWidth, minHeight, onPositionChange, onSizeChange]);

  // Custom Dialog Overlay
  const MacDialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
  >(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        'fixed pointer-events-none inset-0 z-50 bg-white/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className,
      )}
      {...props}
    />
  ));
  MacDialogOverlay.displayName = 'MacDialogOverlay';

  // Handle closing and minimizing
  const handleMinimize = () => {
    // For demo purposes, we'll just shrink the dialog
    // setSize(prev => ({ ...prev, height: minHeight }));
  };

  const handleMaximize = () => {
    // Toggle between current size and full viewport size
    if (size.width < window.innerWidth - 50 || size.height < window.innerHeight - 50) {
      setSize({ width: window.innerWidth - 50, height: window.innerHeight - 50 });
      setPosition({ x: 25, y: 25 });
    } else {
      setSize(initialSize);
      setPosition(initialPosition);
    }
  };

  // Render resize handles
  const renderResizeHandles = () => {
    const directions = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];
    const cursors = {
      n: 'cursor-ns-resize',
      ne: 'cursor-nesw-resize',
      e: 'cursor-ew-resize',
      se: 'cursor-nwse-resize',
      s: 'cursor-ns-resize',
      sw: 'cursor-nesw-resize',
      w: 'cursor-ew-resize',
      nw: 'cursor-nwse-resize',
    };

    const positions = {
      n: 'top-0 left-0 right-0 h-1 -translate-y-1/2',
      ne: 'top-0 right-0 w-3 h-3 -translate-x-1/2 -translate-y-1/2',
      e: 'top-0 right-0 bottom-0 w-1 translate-x-1/2',
      se: 'bottom-0 right-0 w-3 h-3 -translate-x-1/2 translate-y-1/2',
      s: 'bottom-0 left-0 right-0 h-1 translate-y-1/2',
      sw: 'bottom-0 left-0 w-3 h-3 translate-x-1/2 translate-y-1/2',
      w: 'top-0 left-0 bottom-0 w-1 -translate-x-1/2',
      nw: 'top-0 left-0 w-3 h-3 translate-x-1/2 -translate-y-1/2',
    };

    return directions.map(dir => (
      <div
        key={dir}
        className={cn(
          'absolute z-50',
          cursors[dir as keyof typeof cursors],
          positions[dir as keyof typeof positions],
        )}
        onMouseDown={(e) => handleResizeStart(e, dir)}
      />
    ));
  };

  return (
    //@ts-ignore
    <Dialog {...props} ref={ref} modal={false}>
      {triggerElement}
      <DialogPortal>
        {/*<MacDialogOverlay />*/}
        <DialogPrimitive.Content
          ref={dialogRef}
          style={{
            position: 'fixed',
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: `${size.width}px`,
            height: `${size.height}px`,
            transform: 'none',
          }}
          className={cn(
            'z-50 border bg-background shadow-lg',
            'flex flex-col rounded-lg overflow-hidden',
            'focus:outline-none',
            className,
          )}
          onPointerDownCapture={e => e.stopPropagation()}
          // Remove onPointerDownOutside handler to prevent closing when clicking outside
          onPointerDownOutside={e => e.preventDefault()}
          // Remove onInteractOutside handler to prevent closing when interacting outside
          onInteractOutside={e => e.preventDefault()}
          // Prevent Escape key from closing the dialog
          onEscapeKeyDown={e => e.preventDefault()}
        >
          {/* Mac-style title bar */}
          <div
            className={cn(
              'flex items-center px-4 py-2 bg-primary border-b',
              isDragging ? 'cursor-grabbing' : 'cursor-grab',
            )}
            onMouseDown={handleDragStart}
          >
            {/* Mac-style window controls */}
            <div className="flex space-x-2 dialog-control-buttons">
              <DialogPrimitive.Close
                className="rounded-full bg-red-500 hover:bg-red-600 w-3 h-3 flex items-center justify-center">
                <X className="h-2 w-2 text-red-800 opacity-0 hover:opacity-100" />
              </DialogPrimitive.Close>
              <button
                className="rounded-full bg-yellow-900 w-3 h-3 flex items-center justify-center"
                onClick={handleMinimize}
              >
                <Minus className="h-2 w-2 text-yellow-800 opacity-0 hover:opacity-100" />
              </button>
              <button
                className="rounded-full bg-green-500 hover:bg-green-600 w-3 h-3 flex items-center justify-center"
                onClick={handleMaximize}
              >
                <Square className="h-2 w-2 text-green-800 opacity-0 hover:opacity-100" />
              </button>
            </div>

            {/* Title */}
            <div className="flex-1 text-center text-sm font-medium">
              {title}
            </div>

            {/* Placeholder for symmetry */}
            <div className="w-14"></div>
          </div>

          {/* Dialog content */}
          <div className={cn('flex-1 overflow-auto', contentClassName)}>
            {description && (
              <p className="text-sm text-muted-foreground mb-4">{description}</p>
            )}
            {contentElements}
          </div>

          {/* Resize handles */}
          {renderResizeHandles()}
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
});

MacDialog.displayName = 'MacDialog';

// Mac-style dialog component parts
const MacDialogTrigger = DialogTrigger;
const MacDialogContent = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div {...props}>{children}</div>
);
const MacDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className,
    )}
    {...props}
  />
);
const MacDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...props}
  />
);
const MacDialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className,
    )}
    {...props}
  />
));
MacDialogTitle.displayName = 'MacDialogTitle';

const MacDialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
MacDialogDescription.displayName = 'MacDialogDescription';

export {
  MacDialogTrigger,
  MacDialogContent,
  MacDialogHeader,
  MacDialogFooter,
  MacDialogTitle,
  MacDialogDescription,
};
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/container';
import Clock from '@/components/clock/Clock';
import TimeCounter from '@/components/time-counter';

interface GridItem {
  id: string;
  content: React.ReactNode;
  size: 'large' | 'small';
  position: number;
}

const HeroSection: React.FC = () => {
  // Define our grid items
  const [items, setItems] = useState<GridItem[]>([
    {
      id: 'widget1',
      content: <TimeCounter />,
      size: 'small',
      position: 0,
    },
    {
      id: 'clock',
      content: <Clock />,
      size: 'large',
      position: 1,
    },
    {
      id: 'widget2',
      content: 'Coming Soon...',
      size: 'small',
      position: 2,
    },
    {
      id: 'widget3',
      content: 'Coming Soon...',
      size: 'small',
      position: 3,
    },
    {
      id: 'widget4',
      content: 'Coming Soon...',
      size: 'small',
      position: 4,
    },
    {
      id: 'widget5',
      content: 'Coming Soon...',
      size: 'small',
      position: 5,
    },
  ]);

  // Track drag state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [targetPosition, setTargetPosition] = useState<number | null>(null);

  // Start dragging an item
  const handleDragStart = (id: string) => {
    setDraggedItem(id);
  };

  // Handle drag over another item
  const handleDragOver = (e: React.DragEvent, position: number) => {
    e.preventDefault();
    setTargetPosition(position);
  };

  // Handle dropping an item
  const handleDrop = (e: React.DragEvent, dropPosition: number) => {
    e.preventDefault();

    if (!draggedItem) return;

    // Find the current positions
    const draggedItemData = items.find(item => item.id === draggedItem);
    if (!draggedItemData) return;

    const draggedPosition = draggedItemData.position;

    // Update positions for all items
    setItems(prev => prev.map(item => {
      // If this is the dragged item, update to the new position
      if (item.id === draggedItem) {
        return { ...item, position: dropPosition };
      }

      // If the item is between the drag start and drop positions, shift it
      if (draggedPosition < dropPosition &&
        item.position > draggedPosition &&
        item.position <= dropPosition) {
        return { ...item, position: item.position - 1 };
      }

      if (draggedPosition > dropPosition &&
        item.position < draggedPosition &&
        item.position >= dropPosition) {
        return { ...item, position: item.position + 1 };
      }

      return item;
    }));

    // Reset drag state
    setDraggedItem(null);
    setTargetPosition(null);
  };

  // Handle drag end (when dropped outside a valid target)
  const handleDragEnd = () => {
    setDraggedItem(null);
    setTargetPosition(null);
  };

  // Sort items by position for rendering
  const sortedItems = [...items].sort((a, b) => a.position - b.position);

  return (
    <section className="w-full h-screen bg-primary overflow-hidden">
      <Container className="h-full pb-24 pt-2">
        <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-4">
          {sortedItems.map((item) => {
            // Determine grid span based on item size
            const spanClass = item.size === 'large'
              ? 'col-span-2 row-span-2'
              : 'col-span-1 row-span-1';

            // Is this item being dragged?
            const isDragging = draggedItem === item.id;

            // Is this position a potential drop target?
            const isDropTarget = targetPosition === item.position && draggedItem !== null;

            return (
              <motion.div
                key={item.id}
                className={`${spanClass} relative`}
                layout
                layoutId={item.id}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: isDragging ? 1.05 : 1,
                  zIndex: isDragging ? 10 : 1,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                }}
                draggable={true}
                onDragStart={() => handleDragStart(item.id)}
                onDragOver={(e) => handleDragOver(e, item.position)}
                onDrop={(e) => handleDrop(e, item.position)}
                onDragEnd={handleDragEnd}
              >
                <div
                  className={`
                    w-full h-full rounded-2xl
                    backdrop-blur-md flex justify-center items-center
                    border-2 transition-all duration-300
                    ${isDragging ? 'cursor-grabbing ring-4 ring-white/40' : 'cursor-grab'}
                    ${isDropTarget ? 'bg-white/20 border-white/40' : 'bg-black/10 border-white/20'}
                  `}
                >
                  {/* Widget content with subtle animation */}
                  <motion.div
                    className="text-6xl z-10 font-bold text-white flex justify-center items-center w-full h-full"
                    whileHover={{ scale: 1 }}
                  >
                    {item.content}
                  </motion.div>

                  {/* Gradient overlay for visual depth */}
                  <div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none"></div>

                  {/* Inner shadow effect */}
                  <div className="absolute inset-0 rounded-2xl shadow-inner pointer-events-none"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;

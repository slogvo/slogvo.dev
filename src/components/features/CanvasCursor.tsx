'use client';

import useCanvasCursor from '@/hooks/use-canvas-cursor';

const CanvasCursor = () => {
  useCanvasCursor();

  return (
    <canvas className="pointer-events-none z-[999] fixed inset-0" id="canvas" />
  );
};
export default CanvasCursor;

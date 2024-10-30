import {
  arrow,
  autoUpdate,
  flip,
  offset,
  Placement,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { RefObject, useEffect, useState } from "react";

interface FloatingLogicProps {
  placement?: Placement;
  arrowRef?: RefObject<SVGSVGElement>;
}

export const useFloatingLogic = ({
  placement = "bottom-start", // Define a posição padrão
  arrowRef,
}: FloatingLogicProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { x, y, strategy, refs, update, context } = useFloating({
    placement,
    whileElementsMounted: autoUpdate,
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(10),
      flip({
        flipAlignment: true,
        fallbackPlacements: ["right", "bottom", "left", "top"],
      }),
      shift(),
      ...(arrowRef ? [arrow({ element: arrowRef })] : []),
    ],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getFloatingProps } = useInteractions([click, dismiss, role]);

  useEffect(() => {
    if (isOpen) update();
  }, [isOpen, update]);

  return {
    isOpen,
    setIsOpen,
    x,
    y,
    strategy,
    refs,
    context,
    getFloatingProps,
  };
};

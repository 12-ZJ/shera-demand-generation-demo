"use client"

import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from "react";

interface Props {
    isOpen: boolean;
    width?: string;
    onClose: () => void;
    readonly children: ReactNode;
}

const ModalLayout = ({ isOpen, width = "1200px", onClose, children }: Props ) => {
    return (
      <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-none z-50" />
            <Dialog.Content className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 shadow" 
              style={{ width }} onInteractOutside={(e) => e.preventDefault()}>
              <Dialog.Title></Dialog.Title>
            <div>
                <div className="space-y-6">
                    {children}
                </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    )
}

export default ModalLayout;
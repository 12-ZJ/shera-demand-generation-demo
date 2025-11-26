import * as Dialog from '@radix-ui/react-dialog';
import { useLoadingStore } from "@/app/store";

export const LoadingModal = () => {
    const { fetching } = useLoadingStore((state) => (state));

    return (
      <Dialog.Root open={fetching}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/10 backdrop-blur-none z-50" />
            <Dialog.Content className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 border-none outline-none">
            <Dialog.Title></Dialog.Title>
                <span className="loader"></span>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    )
}
import * as Toast from '@radix-ui/react-toast';
import { useToast } from '@/hooks/use-toast';

const Toaster = () => {
  const { toasts, dismissToast } = useToast();

  // Debug: Log toasts to confirm rendering
  console.log('Toasts:', toasts);

  return (
    <Toast.Provider swipeDirection='right'>
      {toasts.map(({ id, title, description, variant, open }) => (
        <Toast.Root
          key={id}
          open={open}
          onOpenChange={(isOpen) => !isOpen && dismissToast(id)}
          className={`z-50 rounded-lg p-4 shadow-lg animate-in fade-in duration-300 max-w-xs ${
            variant === 'success'
              ? 'bg-green-600 text-white'
              : 'bg-red-600 text-white'
          }`}
        >
          <Toast.Title className='font-semibold text-lg'>{title}</Toast.Title>
          {description && (
            <Toast.Description className='mt-2 text-sm'>
              {description}
            </Toast.Description>
          )}
          <Toast.Close
            className='absolute top-2 right-2 text-white hover:text-gray-200'
            aria-label='Close'
          >
            <span>×</span>
          </Toast.Close>
        </Toast.Root>
      ))}
      <Toast.Viewport className='fixed top-4 right-4 flex flex-col gap-3 z-50' />
    </Toast.Provider>
  );
};

export { Toaster };

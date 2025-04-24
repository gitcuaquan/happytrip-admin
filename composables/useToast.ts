import { toast } from 'vue-sonner';
export const useToast = () => {

  const successToast = (message: string) => {
    return toast.success(message, {
      duration: 5000,
      classes: {
        title: 'text-green-500',
        description: 'text-green-400',
        icon: 'text-green-500',
      },
    })
  }
  const errorsToast = (message: string) => {
    return toast.error(message, {
      duration: 5000,
      classes: {
        title: 'text-red-500',
        description: 'text-red-400',
        icon: 'text-red-500',
      },
    })
  }

  return {
    successToast,
    errorsToast
  }
}

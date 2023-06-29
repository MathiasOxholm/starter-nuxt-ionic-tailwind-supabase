import { toastController } from '@ionic/vue'

export default async function useToast(position: 'top' | 'middle' | 'bottom', message: string, duration: number = 4000) {
  const toast = await toastController.create({
    message,
    duration,
    position,
  })

  await toast.present()
}

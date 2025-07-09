'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function deletePresentation(id: string) {
  await prisma.presentation.delete({
    where: { id }
  })

  revalidatePath('/')

  return true
}
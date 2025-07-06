import { presentationReducer } from '@/app/presentations/_store/PresentationStore'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    presentation: presentationReducer
  }
})

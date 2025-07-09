import where from "@/lib/helpers/where";
import { Presentation } from "@/lib/models/Presentation";
import { DefaultSlide, Slide, SlideElement } from "@/lib/models/Slide";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";

type PresentationState = {
  id?: string
  title?: string
  selectedSlide: number
  selectedElement: string | null
  slides: Slide[]
}

const INITIAL_STATE: PresentationState = {
  selectedSlide: 0,
  selectedElement: null,
  slides: [{
    id: 0,
    type: 'default',
    elements: []
  }],
}

const presentationSlice = createSlice({
  name: "presentation",
  initialState: INITIAL_STATE,

  reducers: {
    setId(state, action: PayloadAction<string>) {
      state.id = action.payload
    },

    setPresentation(state, action: PayloadAction<Presentation>) {
      const presentation = action.payload

      state.title = presentation.title

      if (presentation.slides.length > 0) {
        state.slides = presentation.slides
      } else {
        state.slides = INITIAL_STATE.slides
      }
    },

    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload
    },

    selectSlide(state, action: PayloadAction<number>) {
      state.selectedSlide = action.payload
    },

    addSlide(state, action: PayloadAction<Pick<Slide, 'type'>>) {
      const { type } = action.payload

      switch (type) {
        case 'default':
          state.slides.push({
            id: state.slides.length,
            type,
            elements: []
          })

          break
        case 'multiple-choice':
          state.slides.push({
            id: state.slides.length,
            type,
            question: '',
            correctChoice: null,
            choices: [
              { id: v4(), text: "" },
              { id: v4(), text: "" },
            ]
          })

          break
      }

      state.selectedSlide = state.slides.length - 1
    },

    updateSlide<T>(state: PresentationState, action: PayloadAction<Partial<T>>) {
      state.slides[state.selectedSlide] = {
        ...state.slides[state.selectedSlide],
        ...action.payload
      }
    },

    removeSlide(state, action: PayloadAction<number>) {
      if (state.selectedSlide >= action.payload) {
        state.selectedSlide = state.selectedSlide - 1
      }

      state.slides =
        state
          .slides
          .filter(where('id').isNot(action.payload))
          .map((slide, index) => ({
            ...slide,
            id: index
          }))
    },

    updateElement(state, action: PayloadAction<SlideElement>) {
      (state.slides[state.selectedSlide] as DefaultSlide).elements =
        (state.slides[state.selectedSlide] as DefaultSlide)
          .elements
          .map((element) => element.id === action.payload.id ? action.payload : element)
    },

    removeElement(state, action: PayloadAction<string>) {
      (state.slides[state.selectedSlide] as DefaultSlide).elements =
        (state.slides[state.selectedSlide] as DefaultSlide)
          .elements
          .filter(where('id').equals(action.payload))
    },

    addImage(state, action: PayloadAction<string>) {
      (state.slides[state.selectedSlide] as DefaultSlide).elements.push({
        id: v4(),
        type: 'image',
        image: action.payload,
        transform: {
          x: 0,
          y: 0,
          width: 10,
          height: 10,
          scaleX: 1,
          scaleY: 1,
          rotation: 0
        },
        alt: ''
      })
    },

    addText(state) {
      (state.slides[state.selectedSlide] as DefaultSlide).elements.push({
        id: v4(),
        type: 'text',
        text: 'Text',
        fontSize: 48,
        transform: {
          x: 100,
          y: 100,
          scaleX: 1,
          scaleY: 1,
          rotation: 0
        }
      })
    },

    selectElement(state, action: PayloadAction<string>) {
      state.selectedElement = action.payload
    },

    clearElementSelection(state) {
      state.selectedElement = null
    },

    reset() {
      return INITIAL_STATE
    }
  }
});

export const { reducer: presentationReducer } = presentationSlice;

const PresentationStore = {
  ...presentationSlice.actions
}

export default PresentationStore
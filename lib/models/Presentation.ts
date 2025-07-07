import { Slide } from "./Slide"

export type Presentation = {
  id: string
  title: string
  slides: Slide[]
}
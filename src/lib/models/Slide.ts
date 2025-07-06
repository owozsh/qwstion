export type Slide = {
  id: number
  elements: SlideElement[]
}

export type SlideElement =
  | SlideImage
  | SlideText

export type SlideOptions = {
  x: number
  y: number
  width: number
  height: number
}

export type SlideImage = {
  id: string
  type: 'image'
  image: string
  options: SlideOptions & {
    alt: string
  }
}

export type SlideText = {
  id: string
  type: 'text'
  options: SlideOptions & {
    text: string
    fontSize: number
  }
}
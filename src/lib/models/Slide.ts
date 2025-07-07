export type Slide = {
  id: number
  elements: SlideElement[]
}

export type SlideElement =
  | SlideImage
  | SlideText

export type SlideTransformOptions = {
  x: number
  y: number
  scaleX: number
  scaleY: number
  width: number
  height: number
  rotation: number
}

export type SlideImage = {
  id: string
  type: 'image'
  image: string
  transform: Partial<SlideTransformOptions>
  alt: string
}

export type SlideText = {
  id: string
  type: 'text'
  transform: Partial<SlideTransformOptions>
  text: string
  fontSize: number
}
export type Slide = DefaultSlide | MultipleChoiceSlide

export type DefaultSlide = {
  id: number
  type: 'default'
  elements: SlideElement[]
}

export type MultipleChoiceSlide = {
  id: number
  type: 'multiple-choice'
  question: string,
  correctChoice: string | null,
  choices: Choice[]
}

export type Choice = {
  id: string,
  text: string
}

export type SlideType =
  | 'default'
  | 'multiple-choice'
  | 'word-cloud'
  | 'ranking'

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
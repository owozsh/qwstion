import { Presentation } from "../models/Presentation";
import Routes, { getRoute } from "../routes";

export default class Presentations {
  static create(attributes: Pick<Presentation, 'title'>) {
    return fetch(getRoute(Routes.Presentations.create), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attributes),
    });
  }

  static update(id: string, attributes: Partial<Omit<Presentation, 'id'>>) {
    return fetch(getRoute(Routes.Presentations.update(id)), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attributes),
    });
  }
}
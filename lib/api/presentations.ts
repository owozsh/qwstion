import { Presentation } from "../models/Presentation";
import Routes, { getRoute } from "../routes";

export default class Presentations {
  static async create(attributes: Pick<Presentation, 'title'>) {
    const res = await fetch(getRoute(Routes.Presentations.create), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attributes),
    });

    return await res.json()
  }

  static async update(id: string, attributes: Partial<Omit<Presentation, 'id'>>) {
    const res = await fetch(getRoute(Routes.Presentations.update(id)), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attributes),
    });

    return await res.json()
  }

  static async show(id: string) {
    const res = await fetch(getRoute(Routes.Presentations.show(id)), {
      method: 'GET',
    });

    return await res.json()
  }
}
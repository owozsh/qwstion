export const BASE_URL = '/api/'

export function getRoute(route: string) {
  return `${BASE_URL}${route}`
}

const Routes = {
  Presentations: {
    create: 'presentations',
    update: (id: string) => `presentations/${id}`
  }
}

export default Routes
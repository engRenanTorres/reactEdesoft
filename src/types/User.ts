export type User = {
  id?: string,
  name: Name,
  email: string,
  address?: Address,
  username?: string,
  password?: string,
}

interface Name {
  firstname: string,
  lastname: string
}

interface Address {
  geolocation?: Geolocation,
  city?: string,
  street?: string,
  number?: string,
  zipcode?: string
}

interface Geolocation {
  lat: string,
  long: string
}

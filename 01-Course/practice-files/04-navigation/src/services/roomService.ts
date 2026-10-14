export interface Room {
  id: string
  name: string
  ownerId: string
}

export function createRoom(name: string, ownerId: string): Room {
  return { id: `room-${ownerId}`, name, ownerId }
}

package repository

type Room struct {
	ID   string
	Name string
}

type RoomRepository interface {
	Find(id string) (Room, bool)
	Save(room Room)
}

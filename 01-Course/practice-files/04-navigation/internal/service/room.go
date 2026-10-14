package service

import "example/internal/repository"

type RoomService struct {
	repository repository.RoomRepository
}

func (s RoomService) GetRoom(id string) (repository.Room, bool) {
	return s.repository.Find(id)
}

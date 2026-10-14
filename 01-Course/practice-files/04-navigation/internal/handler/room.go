package handler

import "example/internal/service"

type RoomHandler struct {
	service service.RoomService
}

func (h RoomHandler) Show(id string) bool {
	_, found := h.service.GetRoom(id)
	return found
}

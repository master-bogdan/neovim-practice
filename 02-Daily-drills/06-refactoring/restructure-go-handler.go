// OBJECTIVE: Refactor this bloated handler into clean layers
// Use: extract function, rename, move code between functions
//
// Tasks:
//   1. Extract the JSON decoding + validation (lines 44-58) into `decodeAndValidate`
//   2. Extract the database call (lines 60-70) into a method on the service
//   3. Rename `h` to `handler` using <leader>cr
//   4. Extract the error response writing (lines 72-76) into `writeError`
//   5. Extract the success response (lines 78-82) into `writeJSON`
//   6. After extraction, the handler should be ~10 lines: decode, call service, respond
//
// TIMING: Expert 90s | Proficient 180s | Learning 300s

package api

import (
	"encoding/json"
	"net/http"
	"strings"
	"time"
)

type CreateUserRequest struct {
	Email string `json:"email"`
	Name  string `json:"name"`
	Role  string `json:"role"`
}

type UserResponse struct {
	ID        string `json:"id"`
	Email     string `json:"email"`
	Name      string `json:"name"`
	Role      string `json:"role"`
	CreatedAt string `json:"created_at"`
}

type Handler struct {
	db Database
}

func (h *Handler) CreateUser(w http.ResponseWriter, r *http.Request) {
	// --- decode and validate (extract this) ---
	var req CreateUserRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "invalid JSON"})
		return
	}

	if req.Email == "" || !strings.Contains(req.Email, "@") {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "invalid email"})
		return
	}

	if req.Name == "" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "name required"})
		return
	}

	// --- database call (extract this) ---
	user, err := h.db.InsertUser(r.Context(), req.Email, req.Name, req.Role)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "failed to create user"})
		return
	}

	// --- success response (extract this) ---
	resp := UserResponse{
		ID:        user.ID,
		Email:     user.Email,
		Name:      user.Name,
		Role:      user.Role,
		CreatedAt: user.CreatedAt.Format(time.RFC3339),
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(resp)
}

type Database interface {
	InsertUser(ctx interface{}, email, name, role string) (*User, error)
}

type User struct {
	ID        string
	Email     string
	Name      string
	Role      string
	CreatedAt time.Time
}

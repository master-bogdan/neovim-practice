// OBJECTIVE: Use LSP navigation to explore this Go codebase
//
// Tasks:
//   1. Put cursor on `Repository` (line 26) and press `gd` — jump to interface def
//   2. Put cursor on `FindByEmail` and press `gr` — find all references
//   3. Put cursor on `UserService` and press `gy` — go to type definition
//   4. Press `K` on `context.Context` to see hover documentation
//   5. Use `<leader>cs` to open symbols outline, navigate to `Validate`
//   6. Use `]d` to jump to the next diagnostic
//   7. Use `<leader>ca` on the unused `fmt` import for a code action
//   8. Use `<leader>cr` to rename `svc` to `service` everywhere
//   9. Use `gi` to go to the implementation of the `Repository` interface
//   10. Use `<C-o>` to retrace your jumps back to where you started
//
// TIMING: Expert 40s | Proficient 80s | Learning 160s

package user

import (
	"context"
	"errors"
	"fmt"
	"time"
)

type User struct {
	ID        string
	Email     string
	Name      string
	Role      string
	CreatedAt time.Time
}

type Repository interface {
	FindByID(ctx context.Context, id string) (*User, error)
	FindByEmail(ctx context.Context, email string) (*User, error)
	Create(ctx context.Context, user *User) error
	Update(ctx context.Context, user *User) error
	Delete(ctx context.Context, id string) error
}

type UserService struct {
	repo Repository
}

func NewUserService(repo Repository) *UserService {
	return &UserService{repo: repo}
}

func (svc *UserService) GetUser(ctx context.Context, id string) (*User, error) {
	user, err := svc.repo.FindByID(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("finding user: %w", err)
	}
	return user, nil
}

func (svc *UserService) CreateUser(ctx context.Context, email, name string) (*User, error) {
	existing, _ := svc.repo.FindByEmail(ctx, email)
	if existing != nil {
		return nil, errors.New("user already exists")
	}

	user := &User{
		ID:        generateID(),
		Email:     email,
		Name:      name,
		Role:      "member",
		CreatedAt: time.Now(),
	}

	if err := user.Validate(); err != nil {
		return nil, fmt.Errorf("validation failed: %w", err)
	}

	if err := svc.repo.Create(ctx, user); err != nil {
		return nil, fmt.Errorf("creating user: %w", err)
	}

	return user, nil
}

func (u *User) Validate() error {
	if u.Email == "" {
		return errors.New("email is required")
	}
	if u.Name == "" {
		return errors.New("name is required")
	}
	return nil
}

func generateID() string {
	return fmt.Sprintf("usr_%d", time.Now().UnixNano())
}

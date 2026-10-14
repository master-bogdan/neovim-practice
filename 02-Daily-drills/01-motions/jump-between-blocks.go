// OBJECTIVE: Navigate this Go file using paragraph motions, search, and marks
//
// Tasks:
//   1. Jump to the struct `Server` using /Server
//   2. Set mark A on the struct: mA
//   3. Jump to `HandleRequest` using /Handle
//   4. Set mark B: mB
//   5. Jump to the error return on line ~45 using /ErrTimeout
//   6. Jump back to mark A: 'A
//   7. Jump forward to mark B: 'B
//   8. Use { and } to move between function boundaries
//   9. Use ]] to jump to next function start
//   10. Use [[ to jump to previous function start
//
// TIMING: Expert 25s | Proficient 45s | Learning 90s

package server

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"sync"
	"time"
)

var (
	ErrTimeout     = errors.New("request timed out")
	ErrRateLimit   = errors.New("rate limit exceeded")
	ErrBadRequest  = errors.New("bad request")
	ErrServerFull  = errors.New("server at capacity")
)

type Config struct {
	Port         int
	ReadTimeout  time.Duration
	WriteTimeout time.Duration
	MaxConns     int
	RateLimit    int
}

type Server struct {
	config     Config
	mu         sync.RWMutex
	conns      int
	requests   int64
	startTime  time.Time
	middleware []Middleware
}

type Middleware func(http.Handler) http.Handler

type RequestContext struct {
	TraceID   string
	UserAgent string
	IP        string
	StartedAt time.Time
}

func NewServer(cfg Config) *Server {
	return &Server{
		config:    cfg,
		startTime: time.Now(),
	}
}

func (s *Server) HandleRequest(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(r.Context(), s.config.ReadTimeout)
	defer cancel()

	s.mu.RLock()
	if s.conns >= s.config.MaxConns {
		s.mu.RUnlock()
		http.Error(w, ErrServerFull.Error(), http.StatusServiceUnavailable)
		return
	}
	s.mu.RUnlock()

	s.mu.Lock()
	s.conns++
	s.requests++
	s.mu.Unlock()

	defer func() {
		s.mu.Lock()
		s.conns--
		s.mu.Unlock()
	}()

	select {
	case <-ctx.Done():
		http.Error(w, ErrTimeout.Error(), http.StatusGatewayTimeout)
		return
	default:
		s.processRequest(w, r)
	}
}

func (s *Server) processRequest(w http.ResponseWriter, r *http.Request) {
	reqCtx := RequestContext{
		TraceID:   r.Header.Get("X-Trace-ID"),
		UserAgent: r.UserAgent(),
		IP:        r.RemoteAddr,
		StartedAt: time.Now(),
	}

	fmt.Fprintf(w, "OK: %s from %s", reqCtx.TraceID, reqCtx.IP)
}

func (s *Server) Stats() map[string]interface{} {
	s.mu.RLock()
	defer s.mu.RUnlock()

	return map[string]interface{}{
		"uptime":      time.Since(s.startTime).String(),
		"connections": s.conns,
		"requests":    s.requests,
	}
}

func (s *Server) Shutdown(ctx context.Context) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	if s.conns > 0 {
		select {
		case <-ctx.Done():
			return fmt.Errorf("shutdown timed out with %d active connections", s.conns)
		case <-time.After(100 * time.Millisecond):
			return s.Shutdown(ctx)
		}
	}

	return nil
}

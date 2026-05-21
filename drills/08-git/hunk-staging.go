// OBJECTIVE: Practice gitsigns hunk navigation, staging, and blame
//
// Setup: Make several small edits to this file (don't commit), then practice:
//
// Tasks — Hunk Navigation:
//   1. Jump to next changed hunk: ]c
//   2. Jump to previous changed hunk: [c
//   3. Preview the hunk diff: <leader>ghp
//   4. Stage just this hunk: <leader>ghs
//   5. Undo the stage: <leader>ghu
//   6. Reset the hunk (discard change): <leader>ghr
//
// Tasks — Blame:
//   1. Toggle blame for current line: <leader>ghb (shows author + commit inline)
//   2. Full blame for file: :Gitsigns blame
//
// Tasks — DiffView:
//   1. Open DiffView: <leader>gv
//   2. Navigate between changed files with j/k in the file panel
//   3. View file history: <leader>gH
//   4. Close DiffView: <leader>gv
//
// Instructions:
//   1. First, modify lines 40, 55, and 70 (change anything)
//   2. Save the file (these become unstaged hunks)
//   3. Now practice the hunk operations above
//
// TIMING: Expert 45s | Proficient 90s | Learning 180s

package main

import (
	"fmt"
	"net/http"
	"os"
	"time"
)

// EDIT THIS: change the port number to practice hunk staging
var defaultPort = "8080"

type Application struct {
	Name      string
	Version   string
	StartedAt time.Time
	Debug     bool
}

func NewApplication() *Application {
	return &Application{
		Name:      "drill-app",
		Version:   "1.0.0",
		StartedAt: time.Now(),
		Debug:     false, // EDIT THIS: change to true
	}
}

func (app *Application) HealthHandler(w http.ResponseWriter, r *http.Request) {
	uptime := time.Since(app.StartedAt)
	status := map[string]interface{}{
		"status":  "healthy",
		"uptime":  uptime.String(),
		"version": app.Version,
	}
	fmt.Fprintf(w, "%v", status)
}

// EDIT THIS: add a new field or change the format string
func (app *Application) InfoHandler(w http.ResponseWriter, r *http.Request) {
	info := fmt.Sprintf("App: %s v%s (debug=%v)", app.Name, app.Version, app.Debug)
	fmt.Fprint(w, info)
}

func (app *Application) Start() error {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/health", app.HealthHandler)
	mux.HandleFunc("/info", app.InfoHandler)

	fmt.Printf("Starting %s on :%s\n", app.Name, port)
	return http.ListenAndServe(":"+port, mux)
}

func main() {
	app := NewApplication()
	if err := app.Start(); err != nil {
		fmt.Fprintf(os.Stderr, "Error: %v\n", err)
		os.Exit(1)
	}
}

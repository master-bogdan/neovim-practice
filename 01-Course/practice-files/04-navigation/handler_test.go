package navigation

import "testing"

func TestHandleRequest(t *testing.T) {
	request := Request{Method: "GET", Path: "/rooms"}
	if got := HandleRequest(request); got != "GET /rooms" {
		t.Fatalf("unexpected response: %s", got)
	}
}

package navigation

import "fmt"

func HandleRequest(request Request) string {
	return fmt.Sprintf("%s %s", request.Method, request.Path)
}

package router

import (
	"server/middleware"

	"github.com/gorilla/mux"
)

// Router is exported and used in main.go
func Router() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/api/task", middleware.GetAllTask).Methods("GET", "OPTIONS")
	// router.HandleFunc("api/task/{id}", middleware.GetTask).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/task", middleware.CreateTask).Methods("POST", "OPTIONS")
	// router.HandleFunc("/api/task/{id}", middleware.EditTask).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/prioritizeTask/{id}", middleware.TaskPrioritize).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/unprioritizeTask/{id}", middleware.UnprioritizeTask).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/completeTask/{id}", middleware.TaskComplete).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/undoTask/{id}", middleware.UndoTask).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/deleteTask/{id}", middleware.DeleteTask).Methods("DELETE", "OPTIONS")
	// router.HandleFunc("/api/deleteAllTask", middleware.DeleteAllTask).Methods("DELETE", "OPTIONS")
	return router
}
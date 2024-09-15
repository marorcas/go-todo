package middleware

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"server/models"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Database Name
const dbName = "test"

// Collection name
const collName = "todolist"

// collection object/instance
var collection *mongo.Collection

// create connection with mongo db
func init() {
	 // Load environment variables from .env file
	 if err := godotenv.Load(); err != nil {
        log.Fatalf("Error loading .env file: %v", err)
    }

	// DB connection string
	// for localhost mongoDB
	// const connectionString = "mongodb://localhost:27017"
    // Get the MongoDB connection string from the environment variable
    connectionString := os.Getenv("MONGO_DB_CONNECTION_STRING")
    if connectionString == "" {
        log.Fatal("MONGO_CONNECTION_STRING environment variable not set")
    }
	
	// Set client options
	clientOptions := options.Client().ApplyURI(connectionString)

	// connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	collection = client.Database(dbName).Collection(collName)

	fmt.Println("Collection instance created!")
}

// GetAllTask get all the task route
func GetAllTask(w http.ResponseWriter, r *http.Request) {
	// w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	payload := getAllTask()
	json.NewEncoder(w).Encode(payload)
}

// GetTaskById get a task by id route
// func GetTask(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
//     w.Header().Set("Access-Control-Allow-Origin", "*")

//     // Handle CORS preflight requests
//     if r.Method == http.MethodOptions {
//         return
//     }

//     // Get task ID from URL parameters
//     params := mux.Vars(r)
//     taskId := params["id"]

//     // Retrieve task from database
//     task, err := getTaskById(taskId)
//     if err != nil {
//         if err.Error() == "task not found" {
//             http.Error(w, err.Error(), http.StatusNotFound)
//             return
//         }
//         http.Error(w, err.Error(), http.StatusInternalServerError)
//         return
//     }

//     // Return the task as JSON
//     json.NewEncoder(w).Encode(task)
// }

// CreateTask create task route
func CreateTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var task models.ToDoList
	_ = json.NewDecoder(r.Body).Decode(&task)
	// fmt.Println(task, r.Body)
	insertOneTask(task)
	json.NewEncoder(w).Encode(task)
}

// TaskPrioritize update task route
func TaskPrioritize(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	taskPrioritize(params["id"])
	json.NewEncoder(w).Encode(params["id"])
}

// UnprioritizeTask undo the priority task route
func UnprioritizeTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	unprioritizeTask(params["id"])
	json.NewEncoder(w).Encode(params["id"])
}

// TaskComplete update task route
func TaskComplete(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	taskComplete(params["id"])
	json.NewEncoder(w).Encode(params["id"])
}

// UndoTask undo the complete task route
func UndoTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	undoTask(params["id"])
	json.NewEncoder(w).Encode(params["id"])
}

// EditTask updates a task by its ID
// func EditTask(w http.ResponseWriter, r *http.Request) {
//     w.Header().Set("Content-Type", "application/json")
//     w.Header().Set("Access-Control-Allow-Origin", "*")
//     w.Header().Set("Access-Control-Allow-Methods", "PUT, OPTIONS")
//     w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

//      // Handle CORS preflight requests
// 	 if r.Method == http.MethodOptions {
//         return
//     }

//     // Get task ID from URL parameters
//     params := mux.Vars(r)
//     taskId := params["id"]

//     // Decode the update fields from request body
//     var updates map[string]interface{}
//     if err := json.NewDecoder(r.Body).Decode(&updates); err != nil {
//         http.Error(w, "Invalid request payload", http.StatusBadRequest)
//         return
//     }

//     // Validate that updates are not empty
//     if len(updates) == 0 {
//         http.Error(w, "No fields to update", http.StatusBadRequest)
//         return
//     }

//     // Update the task in the database
//     err := editTaskById(taskId, updates)
//     if err != nil {
//         if err.Error() == "task not found" {
//             http.Error(w, err.Error(), http.StatusNotFound)
//             return
//         }
//         http.Error(w, err.Error(), http.StatusInternalServerError)
//         return
//     }

//     // Return a success response
//     json.NewEncoder(w).Encode(map[string]string{"status": "success"})
// }

// DeleteTask delete one task route
func DeleteTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE")
	params := mux.Vars(r)
	deleteOneTask(params["id"])
	json.NewEncoder(w).Encode(params["id"])
	// json.NewEncoder(w).Encode("Task not found")
}

// DeleteAllTask delete all tasks route
// func DeleteAllTask(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
// 	w.Header().Set("Access-Control-Allow-Origin", "*")
// 	w.Header().Set("Access-Control-Allow-Methods", "DELETE")
// 	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
// 	count := deleteAllTask()
// 	json.NewEncoder(w).Encode(count)
// 	// json.NewEncoder(w).Encode("Task not found")
// }

// get all task from the DB and return it
func getAllTask() []primitive.M {
	cur, err := collection.Find(context.Background(), bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}

	var results []primitive.M
	for cur.Next(context.Background()) {
		var result bson.M
		e := cur.Decode(&result)
		if e != nil {
			log.Fatal(e)
		}
		// fmt.Println("cur..>", cur, "result", reflect.TypeOf(result), reflect.TypeOf(result["_id"]))
		results = append(results, result)

	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	cur.Close(context.Background())
	return results
}

// get a task from the DB and return it
// func getTaskById(taskId string) (*models.ToDoList, error) {
//     id, err := primitive.ObjectIDFromHex(taskId)
//     if err != nil {
//         return nil, fmt.Errorf("invalid ID format: %v", err)
//     }

//     filter := bson.M{"_id": id}
//     var task models.ToDoList
//     err = collection.FindOne(context.Background(), filter).Decode(&task)
//     if err != nil {
//         if err == mongo.ErrNoDocuments {
//             return nil, fmt.Errorf("task not found")
//         }
//         return nil, fmt.Errorf("error finding task: %v", err)
//     }

//     return &task, nil
// }

// Insert one task in the DB
func insertOneTask(task models.ToDoList) {
	insertResult, err := collection.InsertOne(context.Background(), task)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Inserted a Single Record ", insertResult.InsertedID)
}

// task prioritize method, update task's priority to true
func taskPrioritize(task string) {
	fmt.Println(task)
	id, _ := primitive.ObjectIDFromHex(task)
	filter := bson.M{"_id": id}
	update := bson.M{"$set": bson.M{"priority": true}}
	result, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("modified count: ", result.ModifiedCount)
}

// task unprioritize method, update task's priority to false
func unprioritizeTask(task string) {
	fmt.Println(task)
	id, _ := primitive.ObjectIDFromHex(task)
	filter := bson.M{"_id": id}
	update := bson.M{"$set": bson.M{"priority": false}}
	result, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("modified count: ", result.ModifiedCount)
}

// task complete method, update task's status to true
func taskComplete(task string) {
	fmt.Println(task)
	id, _ := primitive.ObjectIDFromHex(task)
	filter := bson.M{"_id": id}
	update := bson.M{"$set": bson.M{"status": true}}
	result, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("modified count: ", result.ModifiedCount)
}

// task undo method, update task's status to false
func undoTask(task string) {
	fmt.Println(task)
	id, _ := primitive.ObjectIDFromHex(task)
	filter := bson.M{"_id": id}
	update := bson.M{"$set": bson.M{"status": false}}
	result, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("modified count: ", result.ModifiedCount)
}

// editTaskById updates a task by its ID with new fields
// func editTaskById(taskID string, updates map[string]interface{}) error {
//     id, err := primitive.ObjectIDFromHex(taskID)
//     if err != nil {
//         return fmt.Errorf("invalid ID format: %v", err)
//     }

//     // Filter for the specific task ID
//     filter := bson.M{"_id": id}

//     // Build the update document dynamically
//     update := bson.M{"$set": updates}

//     // Apply the update
//     result, err := collection.UpdateOne(context.Background(), filter, update)
//     if err != nil {
//         return fmt.Errorf("error updating task: %v", err)
//     }

//     if result.MatchedCount == 0 {
//         return fmt.Errorf("task not found")
//     }

//     fmt.Printf("Modified count: %d\n", result.ModifiedCount)
//     return nil
// }

// delete one task from the DB, delete by ID
func deleteOneTask(task string) {
	fmt.Println(task)
	id, _ := primitive.ObjectIDFromHex(task)
	filter := bson.M{"_id": id}
	d, err := collection.DeleteOne(context.Background(), filter)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Deleted Document", d.DeletedCount)
}

// delete all the tasks from the DB
// func deleteAllTask() int64 {
// 	d, err := collection.DeleteMany(context.Background(), bson.D{{}}, nil)
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	fmt.Println("Deleted Document", d.DeletedCount)
// 	return d.DeletedCount
// }
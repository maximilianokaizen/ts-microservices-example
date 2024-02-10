package main

import (
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"math/rand"
	"net/http"
	"time"

	"github.com/google/uuid"
)

type User struct {
	UUID      string  `json:"uuid"`
	Name      string  `json:"name"`
	UserName  string  `json:"userName"`
	LastName  string  `json:"lastName"`
	Email     string  `json:"email"`
	Password  string  `json:"password"`
	Active    bool    `json:"active"`
	CreatedAt string  `json:"createdAt"`
	Amount    float64 `json:"amount"`
}

func main() {
	var numMessages int
	flag.IntVar(&numMessages, "n", 10, "Number of users to create")
	flag.Parse()

	for i := 0; i < numMessages; i++ {
		user := generateRandomUser()
		jsonData, err := json.Marshal(user)
		if err != nil {
			fmt.Println("Error marshalling JSON:", err)
			continue
		}

		resp, err := http.Post("http://localhost:3000/v1/users", "application/json", bytes.NewBuffer(jsonData))
		if err != nil {
			fmt.Println("Error sending request:", err)
			continue
		}
		defer resp.Body.Close()

		fmt.Printf("User %d created with response status: %s\n", i+1, resp.Status)
	}
}

func generateRandomUser() User {
	rand.Seed(time.Now().UnixNano())
	return User{
		UUID:      uuid.NewString(),
		Name:      fmt.Sprintf("John%d", rand.Intn(10000)),
		UserName:  fmt.Sprintf("johndoe%d", rand.Intn(10000)),
		LastName:  "Doe",
		Email:     fmt.Sprintf("johndoe%d@example.com", rand.Intn(10000)),
		Password:  "P@ssw0rd123",
		Active:    true,
		CreatedAt: "2022-01-30T12:00:00Z",
		Amount:    float64(rand.Intn(500000)+100) / 100,
	}
}

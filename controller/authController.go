package controller

import (
	"awesomeProject/database"
	"awesomeProject/models"
	"awesomeProject/util"
	"fmt"
	"log"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
)

func validateEmail(email string) bool{
	Re:= regexp.MustCompile(`[a-z0-9._%+\-]+@[a-z0-9._%+\-]+\.[a-z0-9._%+\-]`)
	return Re.MatchString(email)
}

func Register(c *fiber.Ctx) error {
	var data map[string]interface{}
	var userData models.User
	if err:=c.BodyParser(&data);err!=nil{
		fmt.Println("Unable to parse body")
	}
	//CCheck if password less than 6
	if len(data["password"].(string))<= 6{
		c.Status(400)
		return c.JSON(fiber.Map{
			"message":"Password must be greater than 6 character",
		})
	}
	if !validateEmail(strings.TrimSpace(data["email"].(string))){
		c.Status(400)
		return c.JSON(fiber.Map{
			"message":"Invalid Email Address",
		})
	}
	//Check if email already exist in database
	database.DB.Where("email=?", strings.TrimSpace(data["email"].(string))).First(&userData)
	if userData.Id!=0{
		c.Status(400)
		
	}
	user:=models.User{
		FirstName: data["first_name"].(string),
		LastName: data["last_name"].(string),
		Phone: data["phone"].(string),
		Email: strings.TrimSpace(data["email"].(string)),
	}
	user.SetPassword(data["password"].(string))
	err:=database.DB.Create(&user)
	if err != nil{
		log.Println(err)
	}
	c.Status(200)
	return c.JSON(fiber.Map{
		"user":user,
		"message":"Account created successfully",
	})
}

func Login(c *fiber.Ctx)error  {
	var data map[string]string
	if err:=c.BodyParser(&data);err!=nil{
		fmt.Println("Unable to parse body")
	}
	var user models.User
	database.DB.Where("email=?", data["email"]).First(&user)
	if user.Id == 0 {
		c.Status(404)
		return c.JSON(fiber.Map{
			"message":"Email Address doesn't exists, kindly create account",
		})
	}
	if err:=user.ComparePassword(data["password"]); err != nil{
		c.Status(400)
		return c.JSON(fiber.Map{
			"message":"Incorrect password",
		})
	}
	token, err:=util.GenerateJwt(strconv.Itoa(int(user.Id)),)
	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return nil
	}

	cookie := fiber.Cookie{
		Name:"jwt",
		Value: token,
		Expires: time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message":"You have successfully login",
		"user":user,
	})
}
type Claims struct{
	jwt.StandardClaims
}
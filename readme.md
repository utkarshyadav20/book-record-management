# book-record-management-10567

This is a book record management API Backend for the management of records and books

# API Documentation link
 https://documenter.getpostman.com/view/26561821/2s93RWMqEK

# Routes and Endpoints

## /users

POST: Create a new user ✔️
GET: Get all list of users ✔️

## /users/{id}

GET: Get info about a user by id  ✔️
PUT: Update a user by id  ✔️
DELETE: Delete a user by id (check if he/she still has an issued book) (is there any fine to be paid) 👍

## /users/subscription-details/{id}

GET: Get user subscription details 

1. Date of subscription
2. Valid till
3. Fine if any

## /books

GET: Get all books ✔️
POST: Create/Add a new book ✔️

## /books/{id}

GET: Get a book by id ✔️
PUT: Update a book by id ✔️
DELETE:Delete a book by id ✔️

## /books/issued/by-users

GET: Get the list all issued books & users✔️

## /books/issued/withFine

GET: Get all issued books with fine

# Subscription Types

Basic (3 months)
Standard (6 months)
Premium (12 months)

NOTE: dates will be in format mm/dd/yyyy

If the subscription date is 01/08/22
and Subscription type is Standard
the valid till date will be 01/02/23

If he has an issued book and the issued book is to be returned at 01/01/23
If he missed the date of return, then he gts a fine of Rs. 100.

If he has an issued book and the issued book is to be returned at 01/01/23
If he missed the date of return, and his subscription also expires, then he will get a fine of Rs 200. 






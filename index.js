const { response } = require("express");
const express = require("express");
//JSON data import
const { users } = require('./data/users.json');

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "The server is running",
    });
});

/*
* Route: /users
* Method: GET
* Description: Get all users
* Access: public
* Parameters: None
*/
app.get("/users", (req, res) => {
    res.status(200).json({
        success: true,
        data: users,
    });
});

/*
* Route: /users/:id
* Method: GET
* Description: Get a single user by id
* Access: public
* Parameters: id
*/

app.get("/user/:id",(req,res)=>{
    const {id}=req.params;
    const user=users.find((each)=>each.id===id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"

        });
    }
    res.status(200).json({
        success:true,
        data:user,
    });
});
/*
* Route: /users
* Method: POST
* Description: Craete a new user
* Access: public
* Parameters: none
*/
app.post("/users",(req,res)=>{
    const {id,name,surname,email,subscriptionType,subscriptionDate}=req.body;
    const a=req.body;
    const user=users.find((each)=>each.id===id);
    if(user){
        return res.status(404).json({
            success:false,
            message:"User existes with this id"
        });
    }
    
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    });    
    return res.status(201).json({
        succes:true,
        message:"User added:>",
        data:a,
    });
});
/*
* Route: /users/:id
* Method: PUT
* Description: Update a user by id
* Access: public
* Parameters: id
*/
app.put("/user/:id",(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;
    
    const user=users.find((each)=>each.id===id);
    // console.log(user);

    if(!user){
        return res.status(404).json({
            succes:false,
            messaage:"No user found by given id"
        });
    }
    const updatedUser=users.map((each)=>{              //map returns a  array whereas find returns a single value
        if(each.id===id){
            return {
                ...each,              //this will modify the values inside the each object from the data object for eg
                ...data,             // if you have  a variable with some value in each and the same variable hsa a different value in data the value in each will be overridden by the value in data
                                    //and if a variable is not present in each object but is there in data object it will be created newly in each
                                    // ... is known as spread operator                                                            
            }
        }
        return each;
    });
    return res.status(200).json({
        succes:true,
        data:updatedUser,
    });
});









app.get("*", (req, res) => {
    res.status(200).json({
        message: "This route does not exist",
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
import bcrypt from "bcryptjs"

const users=[
    {
        name:'Admin User',
        email:'admin@example.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'John Doe',
        email:'john@example.com',
        password:bcrypt.hashSync('123456',10),
        password:'xxx',
       
    },
    {
        name:'Jane doe',
        email:'Jane@example.com',
        password:bcrypt.hashSync('123456',10),
        password:'xxx',
       
    }
]

export default users
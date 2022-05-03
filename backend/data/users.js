import bcrypt from "bcrypt"

const users=[
    {
        name:'Admin User',
        email:'admin@example.com',
        password:await bcrypt.hash('123456',10),
        isAdmin:true
    },
    {
        name:'John Doe',
        email:'john@example.com',
        password:await bcrypt.hash('123',10)
        
       
    },
    {
        name:'Jane doe',
        email:'Jane@example.com',
        password:await bcrypt.hash('123',10)
       
    }
]

export default users
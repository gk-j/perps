import { User } from "./user.class";

export class UserManager{
    users:Map<string,User>

    constructor(initialUser: Map<string, User>= new Map()) {
        this.users = initialUser;
    }

    hasUser(userId:string):boolean{
        return this.users.has(userId)
    }

    getUser(userId:string):User{
        const user =  this.users.get(userId)
        if(!user){
            throw new Error("user not found")
        }
        return user
    }

    createUser(userId:string):User{
        const newUser = new User(userId)
        this.users.set(userId,newUser)
        return newUser
    }


}
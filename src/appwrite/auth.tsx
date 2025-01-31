import conf from "../config/config";
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client(); 
    account: any;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID);
        this.account = new Account(this.client);
    }
    // creating a wrapper function for the login method where we call the Service
    async ceateAccount(email: string, password: string, name: string) {
        try{
           const userAccount :any= await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
            // call another methods
            return this.login(email, password);
            }else{
                return userAccount;
            }      
        }catch(error){
            // throw error;
            console.log(error);
        }
    }
    async login(email: string, password: string) {
        try {
            // i.e User s login mang lia h 
           return await this.account.createEmailSession(email, password);

        }catch(error){
            throw error;
            console.log(error);
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get();
        }catch(error){
            console.log('Appwrite Service error ::getCurrentUser',error);
        }
        return null;
    }
    async logout() {
        try {
             await this.account.deleteSessions();
        }catch(error){
            console.log('Appwrite Service error ::logout',error);
        }
    }
}

const authService = new AuthService();// authService -> Obj/instance of AuthService

export default AuthService;

import conf from "../config/config";
import { Client, Account, ID , Databases, Storage, Query} from "appwrite";

interface Post {
   title: string;
   slug: string;
   content: string;
   date: string;
   featuredImage: string;
   status: string;
   userId: string;
}

 export class Service{
    // creating class
    client = new Client();
    databases: any;
    buckets: any;

    constructor () {
      this.client
      .setEndpoint(conf.appwriteUrl) // Your API Endpoint
      .setProject(conf.appwriteProjectID) // Your project ID
      this.databases = new Databases(this.client);
      this.buckets = new Storage(this.client);
    }
    async createPost({title, slug, content, featuredImage, status,userId } : Post){
      try{
         return await this.databases.createDocument(
            conf.appwriteDbId,
            conf.appwriteCollectionId,
            slug,
            {
               title,
               content,
               featuredImage,
               status,
               userId
            }
         )
      }catch(e){
        console.log("Appwrite in CreatePost",e);
      }
    }
    async updatePost({title, slug, content, featuredImage, status,userId } : Post, docId: string){
 }

 const service = new Service();
 export default service;
export class User{
    id:number =0;
    username: string = "";
    password: string ="";
    firstname: string = "";
    lastname: string = "";
    phone: string | null = null;
    email: string | null = null;
    isReviewer: boolean = false;
    isAdmin: boolean = false;
}
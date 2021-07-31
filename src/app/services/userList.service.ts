import { BehaviorSubject } from "rxjs";

export class UserListService{

    private userLoggedInId = new BehaviorSubject<number>(-1);
    cast = this.userLoggedInId.asObservable();

    users = [{ userId: 0, userName: 'david'}, {userId: 1, userName: 'admin'}]

    verifyUser(username: string){
        let tempUser = this.users.filter(user => user.userName === username.toLocaleLowerCase());
        if( tempUser.length === 0){
            return false
        } else {
            this.setUserLoggedIn(tempUser[0].userId);
            return true
        }
    }

    setUserLoggedIn(id: number){
        this.userLoggedInId.next(id);
    }

}
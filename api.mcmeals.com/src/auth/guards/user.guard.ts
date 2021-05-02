import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from "@nestjs/common";
import { User } from "src/interfaces/user.interface";
import { UserService } from "src/user/user.service";

@Injectable()
export class UserIsUser implements CanActivate {

    constructor(
        @Inject(forwardRef(() => UserService))
        private userService: UserService
    ) {}


    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const params = request.params;
        const user: User = request.user.user;

        return this.userService.findOne(user.id)
        .then((user) => {
            let hasPermission = false;
            if (user.id === Number(params.id)) {hasPermission = true};
            return user && hasPermission;
        })
    }

}
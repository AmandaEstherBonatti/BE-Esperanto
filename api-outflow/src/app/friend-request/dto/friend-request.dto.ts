import { IsNotEmpty } from "class-validator";
import { UsersEntity } from "src/app/user/users.entity";
import { Status } from "../enum/status.enum";



export class FriendRequestDto {

  @IsNotEmpty()
  Creator: UsersEntity;

  @IsNotEmpty()
  Receiver?: UsersEntity;

  @IsNotEmpty()
  status: Status;
}

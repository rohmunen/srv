import { User } from "../db/models/user.model";

export class UserDto {
  constructor(model){
    this.id = model.id
    this.nickname = model.nickname
    this.email = email
  }
}
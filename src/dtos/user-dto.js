export class UserDto {
  constructor(model){
    this.id = model.id
    this.nickname = model.nickname
    this.email = model.email
  }
}
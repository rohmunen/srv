export class TagDto {
  constructor(user, tag){
    this.creator = {
      nickname: user.nickname,
      uid: user.id
    }
    this.name = tag.name
    this.sortOrder = tag.sortorder
  }
}
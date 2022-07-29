export class TagDto {
  constructor(data){
    this.creator = {
      nickname: data.nickname,
      uid: data.id
    }
    this.name = data.name
    this.sortOrder = data.sortorder
  }
}
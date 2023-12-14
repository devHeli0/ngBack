export class UserEntity {
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public creationDate?: Date,
    public updatedOn?: Date,
    public deletionDate?: Date | undefined
  ) {}
}

export interface UserInterface {
  readonly id?: number | null;
  uuid: string;
  name: string;
  email: string;
  lastName: string;
  user: string;
  password: string;
  active: boolean;
  amount: number | any;
  createdAt: Date | string;
  deletedAt?: Date | string | null;
  modifiedAt?: Date | string | null;
}

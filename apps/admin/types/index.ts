export interface GetUsersParams {
  limit?: number;
  offset?: number;
  orderBy?:
    | "created_at"
    | "updated_at"
    | "email_address"
    | "first_name"
    | "last_name"
    | "phone_number"
    | "username"
    | "last_active_at"
    | "last_sign_in_at"
    | "-created_at"
    | "-updated_at"
    | "-email_address"
    | "-web3wallet"
    | "-first_name"
    | "-last_name"
    | "-phone_number"
    | "-username"
    | "-last_active_at"
    | "-last_sign_in_at";
  query?: string;
  emailAddress?: string[];
  phoneNumber?: string[];
  username?: string[];
  userId?: string[];
  organizationId?: string[];
}

export interface User {
  id: string;
  emailAddress: string;
  phoneNumber: string;
  username: string;
  lastActiveAt: string;
}

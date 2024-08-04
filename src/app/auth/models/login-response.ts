export interface LoginResponse {
  statusCode: number;
  requestId: string;
  error: any[];
  result: {
    token: string;
    userDto: UserDto;
  };
  success: boolean;
  responseMessage: string;
}

  export interface UserDto {
    id: number;
    userName: string;
    email: string;
    phone: string;
    name: string;
    role: RoleDto;
  }
  
  export interface RoleDto {
    id: number;
    name: string;
  }
  
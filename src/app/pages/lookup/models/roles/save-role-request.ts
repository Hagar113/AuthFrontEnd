// save-role-request.ts
export interface SaveRoleRequest {
  id: number;
  name: string;
  roleCode: string;
  SelectedPageIds: number[];
}

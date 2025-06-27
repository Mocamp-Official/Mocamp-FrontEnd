export interface DelegationUpdateRequest {
  newAdminId: number; 
}

export interface DelegationUpdateResponse {
  type: 'ADMIN_UPDATED';
  previousAdminUsername: string;
  newAdminUsername: string; 
}

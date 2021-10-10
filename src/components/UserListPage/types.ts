export interface UserListState {
  users: User[] | null;
  usersError: string | null;
  usersStatus: "idle" | "loading" | "success" | "failed";
  viewMode: "listMode" | "gridMode";
  latestSearch: string;
}
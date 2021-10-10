export interface UserListState {
  users: User[] | null;
  usersError: string | null;
  usersStatus: FetchStatus;
  viewMode: ViewMode;
  latestSearch: string;
}

export type ViewMode = "listMode" | "gridMode";

export type FetchStatus = "idle" | "loading" | "success" | "failed";

export type UserReposPayload = {
  user: string | null,
  repos: any | null,
}

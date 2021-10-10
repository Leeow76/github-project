import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserListState, UserReposPayload, ViewMode } from './types'
import usersApi from './api'
import { userReposApi } from '../../store/api'

const initialState: UserListState = {
  users: [],
  usersError: null,
  usersStatus: "idle",
  viewMode: "listMode",
  latestSearch: ""
}

export const fetchUsers =  createAsyncThunk(
  'userListPageSlice/fetchUsers',
  async (
    fetchParams: {
      query: string,
      sort: string
    },
    {dispatch}
  ) => {
    const {query, sort} = fetchParams
    const response = await usersApi(query, sort)

    // Fetch repos for users
    if (response.length > 0) {
      response.forEach((response: User) => {
        dispatch(fetchUserRepos({user: response.login}))
      })
    }

    return response
  }
)

export const fetchUserRepos =  createAsyncThunk(
  'userListPageSlice/fetchUserRepos',
  async (fetchParams: {user: string}) => {
    const {user} = fetchParams
    const response = await userReposApi(user)
    return response
  }
)

export const userListSlice = createSlice({
  name: 'userListPageSlice',
  initialState,
  reducers: {
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload
    },
    setLatestSearch: (state, action: PayloadAction<string>) => {
      state.latestSearch = action.payload
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.latestSearch = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchUsers.pending, (state: UserListState) => {
        state.usersStatus = "loading"
        state.users = []
      },
    )
    builder.addCase(
      fetchUsers.fulfilled, (state: UserListState, action: PayloadAction<User[]>) => {
        state.usersStatus = "success"
        state.users = action.payload
      },
    )
    builder.addCase(
      fetchUsers.rejected, (state: UserListState) => {
        state.usersStatus = "failed"
        state.users = []
      },
    )
    builder.addCase(
      fetchUserRepos.fulfilled, (state: UserListState, action: PayloadAction<UserReposPayload>) => {
        const targetUser = state.users?.find(
          (user: User) => user.login === action.payload.user
        )
        if (targetUser) {
          targetUser["repos"] = action.payload.repos;
        }
      },
    )
  }
})

export const { setViewMode, setLatestSearch, setSearchValue } = userListSlice.actions

export default userListSlice.reducer
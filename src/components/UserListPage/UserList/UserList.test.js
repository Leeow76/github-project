import { shallow } from "enzyme";
// import configureStore from 'redux-mock-store';

import UserList from "./UserList";

import { userListPageData, userListPageLoadedUsers } from './dummyTestData';

describe("<UserList />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<UserList
      users={userListPageData.users}
      usersStatus={userListPageData.usersStatus}
      usersError={userListPageData.usersError}
      viewMode={userListPageData.viewMode}
    />);
  });
  
  it("renders user list", () => {
    expect(wrapper.find("ul.list").length).toEqual(1);
  })

  
  it("renders loading text when fetching users and status is loading", () => {
    wrapper.setProps({ usersStatus: "loading" });
    expect(wrapper.find(".message__neutral").text()).toEqual("LOADING...");
  })
  
  it("renders error text when status failed and fetch returns error", () => {
    wrapper.setProps({ usersStatus: "loading" });
    wrapper.setProps({ usersError: "Could not find users" });
    wrapper.setProps({ usersStatus: "failed" });
    expect(wrapper.find(".message__neutral").text()).toEqual("Could not find users");
  })
  
  it("renders users if users fetched to props", () => {
    wrapper.setProps({ usersStatus: "loading" });
    wrapper.setProps({
      usersStatus: "success",
      users: userListPageLoadedUsers
    });
    expect(wrapper.find("User").exists).toBeTruthy();
  })
});

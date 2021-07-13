import { shallow } from "enzyme";
import { mockDispatch, mockState } from "react-redux";
import * as redux from 'react-redux'

import User from "./User";

describe("<User />", () => {
  it("Renders user name, type text, image based on props", () => {
    const testUser = {
      login: "testuser",
      avatar_url: "https://avatars.githubusercontent.com/u/499550?v=4",
      type: "User"
    }
    const wrapper = shallow(<User user={testUser} />)
    console.log(wrapper.debug());
    // User type text based on props
    expect(wrapper.find(".itemInfo p").text()).toEqual(testUser.type);
    // User image based on props
    expect(wrapper.find(".itemImage img").prop("src")).toEqual(testUser.avatar_url)
    // User login name and link
    expect(wrapper.find(".itemInfo Link").prop("to")).toEqual(testUser.login)
    expect(wrapper.find(".itemInfo Link").text()).toEqual(testUser.login)
    // User image link
    expect(wrapper.find(".itemImage Link").prop("to")).toEqual(testUser.login)
  });
});

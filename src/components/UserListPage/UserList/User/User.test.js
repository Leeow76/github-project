import { shallow } from "enzyme";

import User from "./User";

import { testUser, testUserRepos } from './dummyTestData';

describe("<User />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<User user={testUser} />);
  });
  
  it("renders user name, type text, image based on props", () => {
    // User type text based on props
    expect(wrapper.find(".itemInfo p").text()).toEqual(testUser.type);
    // User image based on props
    expect(wrapper.find(".itemImage img").prop("src")).toEqual(testUser.avatar_url);
    // User login name and link
    expect(wrapper.find(".itemInfo Link").prop("to")).toEqual(testUser.login);
    expect(wrapper.find(".itemInfo Link").text()).toEqual(testUser.login);
    // User image link
    expect(wrapper.find(".itemImage Link").prop("to")).toEqual(testUser.login);
  });

  it("renders lodaing text when user repos are still being fetched", () => {
    expect(wrapper.find(".itemRepos p").text()).toEqual("LOADING...");
  })

  it("renders repos with corresponding names when repos fetched to props", () => {
    let updatedUser = {...testUser};
    updatedUser["repos"] = testUserRepos;
    wrapper.setProps({ user: updatedUser });

    // Check if itemRepo element(s) is/are rendered
    expect(wrapper.find(".itemRepos .itemRepo").exists).toBeTruthy();

    // Check if each itemRepo <span> has the corresponding testUserRepo name
    wrapper.find(".itemRepos .itemRepo").forEach((node, index) => {
      expect(node.text()).toEqual(testUserRepos[index].name);
    });
  })
  
  it("renders no repos text when empty array of repos fetched to props", () => {
    let updatedUser = {...testUser};
    updatedUser["repos"] = [];
    wrapper.setProps({ user: updatedUser });
    expect(wrapper.find(".itemRepos p").text()).toEqual("No repos to display");
  })
});

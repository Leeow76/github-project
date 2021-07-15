import { shallow, mount } from "enzyme";
import * as React from 'react';
// import configureStore from 'redux-mock-store';

import RecentSearches from "./RecentSearches";

// Mock localStorage
class LocalStorage {
  constructor() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }

  reset() {
    this.store = {};
  }
};

global.localStorage = new LocalStorage();

let props = {
  search: jest.fn(),
  latestSearch: ""
};


describe("<RecentSearches />", () => {

  // Clear localStorage for each case
  beforeEach(() => {
    localStorage.removeItem("recentSearches");
  });
  
  it("renders recent searches if recentSearches localStorage has value/values", () => {
    localStorage.setItem("recentSearches", JSON.stringify(["first", "second"]));
    const wrapper = shallow(<RecentSearches {...props} />);
    expect(wrapper.find(".recentSearches").length).toEqual(1);
  })
  
  it("renders nothing (only fragment) if no recentSearches in localStorage", () => {
    const wrapper = shallow(<RecentSearches {...props} />);
    expect(wrapper.find(".recentSearches").length).toEqual(0);
  })

  it("renders 1 search for 1 recentSearches entry", () => {
    localStorage.setItem("recentSearches", JSON.stringify(["first"]));
    const wrapper = shallow(<RecentSearches {...props} />);
    expect(wrapper.find(".recentSearch").length).toEqual(1);
  })

  it("renders 3 search for 3 recentSearches entries", () => {
    localStorage.setItem("recentSearches", JSON.stringify(["third", "second", "first"]));
    const wrapper = shallow(<RecentSearches {...props} />);
    expect(wrapper.find(".recentSearch").length).toEqual(3);
  })

  it("searches recent search when clicked", () => {
    localStorage.setItem("recentSearches", JSON.stringify(["third", "second", "first"]));
    const wrapper = shallow(<RecentSearches {...props} />);
    // Select button with text content "second"
    const secondButton = wrapper.findWhere(node => {
      return (
        node.type() &&
        node.name() &&
        node.text() === "second"
      );
    });
    secondButton.simulate("click");
    expect(props.search).toHaveBeenCalledTimes(1);
    expect(props.search).toHaveBeenLastCalledWith("second");

    // Select button with text content "third"
    const thirdButton = wrapper.findWhere(node => {
      return (
        node.type() &&
        node.name() &&
        node.text() === "third"
      );
    });
    thirdButton.simulate("click");
    expect(props.search).toHaveBeenCalledTimes(2);
    expect(props.search).toHaveBeenLastCalledWith("third");
  })
  
  it("updates recentSearches after new string passed to localStorage and latestSearch prop passed", () => {
    localStorage.setItem("recentSearches", JSON.stringify(["first", "second"]));
    const wrapper = mount(<RecentSearches {...props} />);
    expect(wrapper.find(".recentSearch").length).toEqual(2);
    localStorage.setItem("recentSearches", JSON.stringify(["third", "second", "first"]));
    wrapper.setProps({ latestSearch: "third" });
    wrapper.update();
    expect(wrapper.prop("latestSearch")).toEqual("third");
    expect(wrapper.find(".recentSearch").length).toEqual(3);
  })
  
  it("renders correct number and text for latest searches title", () => {
    // 1 search
    localStorage.setItem("recentSearches", JSON.stringify(["first"]));
    const wrapper = mount(<RecentSearches {...props} />);
    expect(wrapper.find(".recentSearches h4").text()).toEqual("Last search");
    // 2 searches
    localStorage.setItem("recentSearches", JSON.stringify(["second", "first"]));
    wrapper.setProps({ latestSearch: "second" });
    console.log(wrapper.debug())
    expect(wrapper.find(".recentSearches h4").text()).toEqual("Last 2 searches");
    // 3 searches
    localStorage.setItem("recentSearches", JSON.stringify(["third", "second", "first"]));
    wrapper.setProps({ latestSearch: "third" });
    wrapper.update();
    expect(wrapper.find(".recentSearches h4").text()).toEqual("Last 3 searches");
  })
});

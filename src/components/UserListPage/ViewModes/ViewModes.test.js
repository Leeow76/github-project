import { shallow } from "enzyme";

import ViewModes from "./ViewModes";

import { mockDispatch, mockSelector, mockState } from "react-redux";

describe("<User />", () => {
  const props = {
    viewMode: "listMode",
    setViewMode: jest.fn()
  };
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <ViewModes
        viewMode={props.viewMode}
        setViewMode={props.setViewMode}
      />
    );
  });
  
  it("renders view modes", () => {
    expect(wrapper.find("ViewModes").exists).toBeTruthy();
  });

  it("has a list button with active class and a grid button without an active class by default", () => {
    expect(wrapper.find(".modeButton_listMode.modeButton__active").length).toEqual(1);
    expect(wrapper.find(".modeButton_gridMode.modeButton_active").length).toEqual(0);
  });

  it("changes active class to grid button and not list button when viewMode set to gridMode", () => {
    wrapper.setProps({ viewMode: "gridMode" });
    expect(wrapper.find(".modeButton_listMode.modeButton__active").length).toEqual(0);
    expect(wrapper.find(".modeButton_gridMode.modeButton__active").length).toEqual(1);
  });
  
  it("runs setViewMode function on button click if not current view mode button", () => {
    // Simulate click on active list button (function should not be called)
    wrapper.find(".modeButton.modeButton__active.modeButton_listMode").simulate('click');
    expect(props.setViewMode).toHaveBeenCalledTimes(0);
    // Simulate click on inactive grid button (function should be called once)
    wrapper.find(".modeButton.modeButton_gridMode:not(.modeButton__active)").simulate('click');
    expect(props.setViewMode).toHaveBeenCalledTimes(1);
    expect(props.setViewMode).toHaveBeenCalledWith("gridMode");

    // Change list mode to grid
    wrapper.setProps({ viewMode: "gridMode" });

    // Simulate click on active grid button (function should not be called)
    wrapper.find(".modeButton.modeButton__active.modeButton_gridMode").simulate('click');
    expect(props.setViewMode).toHaveBeenCalledTimes(1);
    // Simulate click on inactive list button (function should be called once more)
    wrapper.find(".modeButton.modeButton_listMode:not(.modeButton__active)").simulate('click');
    expect(props.setViewMode).toHaveBeenCalledTimes(2);
    expect(props.setViewMode).toHaveBeenCalledWith("gridMode");
  });

});

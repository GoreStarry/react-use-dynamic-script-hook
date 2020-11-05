import React, { useEffect } from "react";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

import useDynamicScriptHook from "./useDynamicScriptHook.js";

const TestUseDynamicScriptHook = ({ children, ...restProps }) => {
  const isLoaded = useDynamicScriptHook(restProps);

  return (
    <div>
      <span>{isLoaded ? "script is loaded" : "not loaded"}</span>
      {children}
    </div>
  );
};

export default {
  title: "Example",
  component: TestUseDynamicScriptHook,
  decorators: [withKnobs],
  argTypes: {},
};

export const FacebookSDK = (args) => (
  <TestUseDynamicScriptHook {...args}>
    <button
      onClick={() => {
        window.FB.login();
      }}
    >
      Login
    </button>
  </TestUseDynamicScriptHook>
);

FacebookSDK.args = {
  scriptUrl: "https://connect.facebook.net/en_US/sdk.js",
  scriptId: "facebook-jssdk",
  callback: () => {
    window.FB.init({
      appId: text("your-fb-app-id", "736910126903721"),
      cookie: true,
      xfbml: true,
      version: text("fb-api-version", "v0.8"),
    });

    window.FB.AppEvents.logPageView();

    window.FB.getLoginStatus(function (response) {
      console.log(response);
    });

    console.log("callback done");
  },
};

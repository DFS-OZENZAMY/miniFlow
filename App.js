import React from "react";
import Auth from "./components/Auth";
import Feed from "./components/Feed";
import Chat from "./components/Chat";

const App = () => {
  return (
    <div>
      <Auth />
      <Feed />
      <Chat />
    </div>
  );
};

export default App;
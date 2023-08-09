import React from "react";
import Chat from "./components/Chat";
import AppLayout from "./components/AppLayout";

function chat() {
  return (
    <div>
      <AppLayout>
        <Chat />
      </AppLayout>
    </div>
  );
}

export default chat;

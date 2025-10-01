import { createContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export const SidebarBtn = createContext(null);

// context provider to manage sidebar button state and text state
export const ContextProvider = (props) => {
  const [sidebtn, sidebtnSwitch] = useState(false);
  // search text pass to homepage
  const [text, setText] = useState("");
  // context to get data on sidebar
  // function to toggle sidebar button state
  const switchSidebtn = () => {
    sidebtnSwitch(!sidebtn);
  };

  const [user, setUser] = useState([]);
  const [state, setState] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      async function getData() {
        await axios
          .get("http://localhost:3000/user/", {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setUser(res.data);
            // setSideBar(res.data);
          })
          .catch((err) => {
            toast.error(err);
            console.log(err);
          });
      }
      getData();
    }
  }, []);

  return (
    <SidebarBtn.Provider
      value={{ switchSidebtn, sidebtn, text, setText, user, setState }}
    >
      {props.children}
    </SidebarBtn.Provider>
  );
};

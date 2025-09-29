import { createContext } from "react";
import { useState } from "react";

export const SidebarBtn = createContext(null);

export const ContextProvider = (props)=>{
    const [sidebtn, sidebtnSwitch] = useState(false);
    const [text, setText] = useState('')

    const switchSidebtn = ()=>{
        sidebtnSwitch(!sidebtn);
    }

    return(
        <SidebarBtn.Provider value={ {switchSidebtn,sidebtn,text,setText} }>
            {props.children}
        </SidebarBtn.Provider>
    );
}
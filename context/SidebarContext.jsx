import { createContext } from "react";
import { useState } from "react";

export const SidebarBtn = createContext(null);

export const ContextProvider = (props)=>{
    const [sidebtn, sidebtnSwitch] = useState(false);
    
    const switchSidebtn = ()=>{
        sidebtnSwitch(!sidebtn);
    }

    return(
        <SidebarBtn.Provider value={ {switchSidebtn,sidebtn} }>
            {props.children}
        </SidebarBtn.Provider>
    );
}
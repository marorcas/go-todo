import { createContext, useState } from "react";
import { TabSelection } from "../enums/TabSelection";

export const TabSelectionContext = createContext(null);

const TabSelectionContextProvider = ({ children }) => {
    const [selectedTab, setSelectedTab] = useState(TabSelection.NONE);
    const [completedTab, setCompletedTab] = useState(false);
    const [priorityTab, setPriorityTab] = useState(false);

    return (
        <TabSelectionContext.Provider value={{
            selectedTab, 
            setSelectedTab,
            completedTab,
            setCompletedTab,
            priorityTab,
            setPriorityTab
        }}>
            {children}
        </TabSelectionContext.Provider>
    )
}

export default TabSelectionContextProvider;
import { useContext, useEffect, useState } from "react";
import styles from "./PriorityButton.module.scss";
import { TabSelectionContext } from "../../contexts/TabSelectionContextProvider";
import { TabSelection } from "../../enums/TabSelection";

const PriorityButton = () => {
    const { 
        setSelectedTab, 
        priorityTab, 
        setPriorityTab,
        completedTab,
        setCompletedTab 
    } = useContext(TabSelectionContext);

    const togglePriority = () => {
        const priorityTabValue = !priorityTab;
        setPriorityTab(priorityTabValue);

        if (priorityTabValue) {
            setSelectedTab(TabSelection.PRIORITY);
            setCompletedTab(false);
        } else {
            if (!completedTab) {
                setSelectedTab(TabSelection.NONE);
            }
        }
    }

    const priorityClassNames = [
        styles.PriorityButton,
        priorityTab ? styles.PrioritySelected : styles.PriorityUnselected
      ]
        .filter(Boolean)
        .join(' ');

    return (
        <button className={priorityClassNames} onClick={togglePriority}>
            Priority
        </button>
    );
}

export default PriorityButton;
import { useContext, useState, useEffect } from "react";
import styles from "./CompletedButton.module.scss";
import { TabSelectionContext } from "../../contexts/TabSelectionContextProvider";
import { TabSelection } from "../../enums/TabSelection";

const CompletedButton = () => {
    const { 
        setSelectedTab, 
        completedTab, 
        setCompletedTab,
        priorityTab,
        setPriorityTab 
    } = useContext(TabSelectionContext);

    const toggleCompleted = () => {
        const completedTabValue = !completedTab;
        setCompletedTab(completedTabValue);

        if (completedTabValue) {
            setSelectedTab(TabSelection.COMPLETED);
            setPriorityTab(false);
        } else {
            if (!priorityTab) {
                setSelectedTab(TabSelection.NONE);
            }
        }
    }

    const completedClassNames = [
        styles.CompletedButton,
        completedTab ? styles.CompletedSelected : styles.CompletedUnselected
      ]
        .filter(Boolean)
        .join(' ');

    return (
        <button 
            className={completedClassNames} 
            onClick={toggleCompleted}
        >
            Completed
        </button>
    );
}

export default CompletedButton;
import { useContext, useState } from "react";
import styles from "./PriorityButton.module.scss";
import { TabSelectionContext } from "../../contexts/TabSelectionContextProvider";
import { TabSelection } from "../../enums/TabSelection";

const PriorityButton = () => {
    const { setSelectedTab, priorityTab } = useContext(TabSelectionContext);

    const [selected, setSelected] = useState(false);

    const togglePriority = () => {
        const selectedStatus = !selected;
        setSelected(selectedStatus);

        console.log(selectedStatus);

        if (selectedStatus) {
            setSelectedTab(TabSelection.PRIORITY);
        } else {
            setSelectedTab(TabSelection.NONE);
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
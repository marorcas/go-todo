import { useContext, useState } from "react";
import styles from "./CompletedButton.module.scss";
import { TabSelectionContext } from "../../contexts/TabSelectionContextProvider";
import { TabSelection } from "../../enums/TabSelection";

const CompletedButton = () => {
    const { setSelectedTab, completedTab } = useContext(TabSelectionContext);

    const [selected, setSelected] = useState(false);

    const toggleCompleted = () => {
        const selectedStatus = !selected;
        setSelected(selectedStatus);

        console.log(selectedStatus);

        if (selectedStatus) {
            setSelectedTab(TabSelection.COMPLETED);
        } else {
            setSelectedTab(TabSelection.NONE);
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
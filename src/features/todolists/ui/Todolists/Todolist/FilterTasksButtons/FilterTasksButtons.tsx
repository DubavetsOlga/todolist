import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FilterValuesType } from "../../../../../Todolist";
import { filterButtonsContainerSx } from "../../../../../Todolist.styles";

type Props = {
    filter: FilterValuesType
    changeFilter: (filterValues: FilterValuesType) => void
}

export const FilterTasksButtons = ({ changeFilter, filter }: Props) => {
    return (
        <Box sx={filterButtonsContainerSx}>
            <Button
                variant={filter === 'all' ? 'outlined' : 'text'}
                color={'inherit'}
                onClick={() => changeFilter('all')}
            >
                All
            </Button>
            <Button
                variant={filter === 'active' ? 'outlined' : 'text'}
                color={'primary'}
                onClick={() => changeFilter('active')}
            >
                Active
            </Button>
            <Button
                variant={filter === 'completed' ? 'outlined' : 'text'}
                color={'secondary'}
                onClick={() => changeFilter('completed')}
            >
                Completed
            </Button>
        </Box>
    )
}

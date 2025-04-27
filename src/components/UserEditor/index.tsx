import {useContext, useState} from "react";
import natsort from "natsort";
import {Avatar, CircularProgress, List, ListItem, TextField, Tooltip} from "@mui/material";
import User from "../User";
import {iUser} from "../App/interfaces";
import {UserMapContext} from "../App/App";
import {iUserEditor} from "./interfaces";
import "./index.css";

export function UserEditor(props: iUserEditor) {
    const {value, onUpdate, onUpdateFinished} = props;
    const [selectedUsers, setSelectedUsers] = useState<string[]>(value);
    const [userFilter, setUserFilter] = useState<string>("");
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const {userMap} = useContext(UserMapContext);
    const sorter = natsort({desc: false, insensitive: true});

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setUserFilter(newValue);
    };

    const handleChangeUser = async (userId: string, action: string) => {
        const oldValue = selectedUsers;

        let newValue = selectedUsers;
        if (action === "add")
            newValue = [...selectedUsers, userId]
        else if (action === "remove")
            newValue = selectedUsers.filter((id: string) => id !== userId)
        else
            return

        setIsUpdating(true);
        setSelectedUsers(newValue);
        const success = await onUpdate(newValue);
        onUpdateFinished(success, newValue);
        if (!success) {
            setSelectedUsers(oldValue);
        }
        setIsUpdating(false);
    }

    // It's inefficient to define a RegExp inside a loop, so let's define it here instead
    const filterRegex = RegExp(userFilter, 'i');

    // Normally we'd test for user freshness and return a loading state here, but we're guaranteed that all users are loaded so we can skip that here

    // We could use the MUI Autocomplete component for this, but that seems like it sidesteps the point of the exercise of "create an autocomplete-style user picker"
    // Added a nice little fade effect when existing users don't match the current filter, especially handy since we don't show their names.
    return (
        <>
            <div className="user-editor">
                <div className="existing-users">
                    {selectedUsers.map((userId: string) => {
                        const user = userMap.get(userId) || {userId: '', name: '', avatarUri: ''};
                        const matchesFilter = filterRegex.test(user.name);
                        return (
                            <span key={user.userId} className={`user-editor-user ${userFilter.length > 0 && !matchesFilter && "no-match"}`} onClick={handleChangeUser.bind(null, user.userId, "remove")}>
                                <Tooltip title={user.name + " - Click to remove"}>
                                    <Avatar src={user.avatarUri} alt={user.name} data-tooltip-id={"tt-" + user.userId} data-tooltip-content={user.name} sx={{width: 32, height: 32}} />
                                </Tooltip>
                            </span>
                        );
                    })}
                    {isUpdating && <CircularProgress size={24} className="user-editor-loading" />}
                </div>
                <div className="user-editor-input-box">
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        placeholder="Search for users..."
                        value={userFilter}
                        onChange={handleFilterChange}
                        inputRef={input => input && input.focus()}
                    />
                </div>
                <List className="addable-users" dense={true}>
                    {userFilter.length > 0 && Array.from(userMap.values())
                        .filter((user: iUser) => !selectedUsers.includes(user.userId) && filterRegex.test(user.name))
                        .sort((a, b) => sorter(a.name, b.name))
                        .map((user: iUser) => {
                            return (
                                <ListItem key={user.userId} className="user-editor-user" onClick={handleChangeUser.bind(null, user.userId, "add")}>
                                    <User {...user} />
                                </ListItem>
                            );
                        })}
                </List>
            </div>
        </>
    )
}

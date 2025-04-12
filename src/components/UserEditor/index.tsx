import {useState} from "react";
import natsort from "natsort";
import {Avatar} from "../Avatar";
import {User} from "../User";
import {iUser} from "../User/interfaces";
import {iUserEditor} from "./interfaces";
import users from "../../assets/users.json";

export function UserEditor(props: iUserEditor) {
    const {value, onUpdate, onUpdateFinished} = props;
    const [selectedUsers, setSelectedUsers] = useState<string[]>(value);
    const [userFilter, setUserFilter] = useState<string>("");
    const sorter = natsort({desc: false, insensitive: true});

    // TODO: Rewrite this when loading the users is finalized
    const userMap = new Map<string, iUser>();
    users.forEach((user: iUser) => {
        userMap.set(user.userId, user);
    });

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setUserFilter(newValue);
    };

    const handleAddUser = (userId: string) => {
        const newValue = [...selectedUsers, userId]
        setSelectedUsers(newValue);
        onUpdate(newValue, onUpdateFinished);
    }

    const handleRemoveUser = (userId: string) => {
        const newValue = selectedUsers.filter((id: string) => id !== userId)
        setSelectedUsers(newValue);
        onUpdate(newValue, onUpdateFinished);
    }

    return (
        <>
            <div className="user-editor">
                <div className="existing-users">
                    {selectedUsers.map((userId: string) => {
                        const user = userMap.get(userId) || {userId: '', name: '', avatarUri: ''};
                        return (
                            <span key={user.userId} className="user-editor-user" onClick={handleRemoveUser.bind(null, user.userId)}>
                                <Avatar imageUri={user.avatarUri} name={user.name} />
                            </span>
                        );
                    })}
                </div>
                <div className="user-editor-input-box">
                    <input type="text" placeholder="Search for users..." value={userFilter} onChange={handleFilterChange} />
                </div>
                <div className="addable-users">
                    {Array.from(userMap.values())
                        .filter((user: iUser) => !selectedUsers.includes(user.userId) && RegExp(userFilter, 'i').test(user.name))
                        .sort((a, b) => sorter(a.name, b.name))
                        .map((user: iUser) => {
                            return (
                                <span key={user.userId} className="user-editor-user" onClick={handleAddUser.bind(null, user.userId)}>
                                    <User {...user} />
                                </span>
                            );
                        })}
                </div>
            </div>
        </>
    )
}

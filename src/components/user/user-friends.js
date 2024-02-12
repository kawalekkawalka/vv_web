import React, {useState} from "react";
import {useAuth} from "../../hooks/useAuth";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import {Tab} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import UserFriendsMatchesList from "./user-friends-matches-list";
import UserFriendsList from "./user-friends-list";
import UserFriendsInvitationsList from "./user-friends-invitations-list";

function UserFriends() {
    const {authData} = useAuth()
    const [tabValue, setTabValue] = useState("1");

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <React.Fragment>
            <TabContext value={tabValue}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleTabChange} variant="fullWidth" textColor='white'>
                        <Tab label="Znajomi" value="1"/>
                        <Tab label="Ostatnie mecze znajomych" value="2"/>
                        <Tab label="Nadchodzące mecze znajomych" value="3"/>
                        <Tab label="Zaproszenia" value="4"/>
                    </TabList>
                </Box>
                <br/>
                <TabPanel value="1" sx={{paddingTop: '5px'}}>
                    <UserFriendsList params={{user: authData.user.id}}></UserFriendsList>
                </TabPanel>
                <TabPanel value="2" sx={{paddingTop: '5px'}}>
                    <UserFriendsMatchesList params={{user: authData.user.id, time: "past"}}/>
                </TabPanel>
                <TabPanel value="3" sx={{paddingTop: '5px'}}>
                    <UserFriendsMatchesList params={{user: authData.user.id, time: "future"}}/>
                </TabPanel>
                <TabPanel value="4" sx={{paddingTop: '5px'}}>
                    <UserFriendsInvitationsList params={{user: authData.user.id,}}/>
                </TabPanel>
            </TabContext>
        </React.Fragment>

    );
}

export default UserFriends;

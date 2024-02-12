import {makeStyles} from "@mui/styles";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../hooks/useAuth";
import Paper from "@mui/material/Paper";
import {lighten} from "polished";
import {useFetchUserFriends} from "../../hooks/fetch-user-friends";
import Player from "../player/player";
import {deleteComment} from "../../services/comment-services";
import {deleteFriend} from "../../services/user-friendship-services";
import Button from "@mui/material/Button";

const useStyles = makeStyles({});

export default function UserFriendsList({params}) {
    const {authData} = useAuth();
    const [friends, loading, error, fetchMatches] = useFetchUserFriends(params);
    const backgroundColor = lighten(0.05, "#282c34");
    const [actualFriends, setFriends] = useState('');

    useEffect(() => {
        setFriends(friends);
    }, [friends]);

    const handleDeleteFriend = async (id) => {
        console.log(id)
        const deleted = await deleteFriend({user1: id, user2: authData.user.id}, authData.token);
        if (deleted) {
            setFriends((prevFriends) => prevFriends.filter((friend) => friend.id !== id));
        }
    }

    return (
        <div>
            {actualFriends && actualFriends.length > 0 ? (
                actualFriends.map((data) => (
                    <Paper
                        elevation={3}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "20px",
                            backgroundColor: backgroundColor,
                            color: "white",
                            
                            width: "50%",
                            margin: "auto",
                            mb: "20px",
                        }}
                    >
                        <Player player={data.player} />
                        <Button color="primary" variant="contained" onClick={() => handleDeleteFriend(data.id)}>
                            Usuń znajomego
                        </Button>
                    </Paper>
                ))
            ) : (
                <h1>Nie masz jeszcze znajomych.</h1>
            )}
        </div>
    );
}

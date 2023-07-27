import PropTypes from "prop-types";
import {makeStyles} from "@mui/styles";
import React, {useState} from "react";
import Comment from "./comment";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {sendComment} from "../../services/comment-services";
import {useAuth} from "../../hooks/useAuth";

export default function Comments({comments, objectId, contentType}) {

    const [newComment, setNewComment] = useState('');
    const {authData} = useAuth()

    const handleSetComment = () => {
        sendComment(authData.user.id, newComment, contentType, objectId, authData.token)
            .then( resp => {
                setNewComment('');
            })
    }

    return (
        <div >
            <TextField label={"Dodaj komentarz"} multiline fullWidth rows={4} variant="outlined" value={newComment}
            onChange={ evt => setNewComment(evt.target.value)}/>
            <Button onClick={handleSetComment} color="primary" variant="contained" disabled={!newComment}>
                Dodaj komentarz
            </Button>

            <h2>Komentarze:</h2>
            {comments.map ( comment => {
            return (
                <Comment comment={comment} key={comment.id} />
                )
            })}
        </div>
    )
}

Comments.propTypes = {
    comments : PropTypes.array.isRequired,
    objectId : PropTypes.number,
    contentType : PropTypes.string
}

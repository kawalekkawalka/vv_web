import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import Comment from "./comment";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { sendComment, deleteComment } from "../../services/comment-services";
import { useAuth } from "../../hooks/useAuth";
import Player from "../player/player";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

const useStyles = makeStyles({
  comments: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    left: '5%',
    marginBottom: '16px',
  },
  fillerIcon: {
    width: 32,
    height: 24,
    marginRight: 8,
  },
});

export default function Comments({ comments, objectId, contentType }) {

  const [newComment, setNewComment] = useState('');
  const { authData } = useAuth()
  const classes = useStyles();
  const [actualComments, setComments] = useState(comments);

  const handleSetComment = async () => {
    const comment = await sendComment(authData.user.id, newComment, contentType, objectId, authData.token);
    if (comment) {
      setNewComment('');
      actualComments.push(comment.result);
    }
  };

  const handleDeleteComment = async (id) => {
    const deleted = await deleteComment(id, authData.token);
    if (deleted) {
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
    }
  };

  const isCommentOwner = (ownerId) => {
    return authData.user.id === ownerId;
  };

  return (
    <div>
      {authData && (
        <div>
          <TextField label={"Dodaj komentarz"} multiline fullWidth rows={4} variant="outlined"
            value={newComment} onChange={evt => setNewComment(evt.target.value)} />
          <Button onClick={handleSetComment} color="primary" variant="contained" disabled={!newComment} sx={{marginTop:'5px'}}>
            Dodaj komentarz
          </Button>
        </div>
      )}

      {actualComments && actualComments.length > 0 && (
        <React.Fragment>
          <h2>Komentarze:</h2>
          {actualComments.map(comment => (
            <div className={classes.comments} key={comment.id}>
              {authData && isCommentOwner(comment.user.id) ? (
                <IconButton aria-label="delete comment" onClick={() => handleDeleteComment(comment.id)}>
                  <RemoveCircleIcon sx={{color:"white"}}/>
                </IconButton>
              ) : (
                <div className={classes.fillerIcon} />
              )}
              <Player player={comment.user.player} />
              <p>{comment.description}</p>
            </div>
          ))}
        </React.Fragment>
      )}

    </div>
  )
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  objectId: PropTypes.number,
  contentType: PropTypes.string
};

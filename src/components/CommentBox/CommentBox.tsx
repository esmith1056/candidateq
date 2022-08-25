import { Dispatch, SetStateAction, ChangeEvent } from "react";

import { TextField } from "@mui/material";

type TProps = {
  state: [comment: string, setComment: Dispatch<SetStateAction<string>>];
  placeholderText?: string;
  disabled?: boolean;
};

const CommentBox = ({
  state,
  placeholderText,
  disabled = false,
}: TProps): JSX.Element => {
  const [comment, setComment] = state;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target?.value !== comment) {
      setComment(event.target.value);
    }
  };

  return (
    <TextField
      placeholder={placeholderText}
      onChange={handleChange}
      multiline={true}
      value={comment}
      disabled={disabled}
    ></TextField>
  );
};

export default CommentBox;

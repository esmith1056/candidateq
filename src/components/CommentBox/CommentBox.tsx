import { Dispatch, SetStateAction, ChangeEvent } from "react";

import { TextArea } from "@blueprintjs/core";

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

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target?.value !== comment) {
      setComment(event.target.value);
    }
  };
  return (
    <TextArea
      placeholder={placeholderText}
      fill={true}
      onChange={handleChange}
      value={comment}
      disabled={disabled}
    ></TextArea>
  );
};

export default CommentBox;

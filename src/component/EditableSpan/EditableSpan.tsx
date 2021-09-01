import { TextField } from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";


type EditableSpanType = {
   value: string
   onChange: (newTitle: string) => void
}

export const EditableSpan = React.memo(
   (props: EditableSpanType) => {
      console.log('EditableSpan call')

      let [editMode, setEditMode] = useState(false);
      let [title, setTitle] = useState("");

      const activeteAditMode = () => {
            setEditMode(true);
            setTitle(props.value);
         }
      const activateViewMode = () => {
            setEditMode(false);
            props.onChange(title);
      }
      const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);


      return editMode
         ? <TextField label='rename task'
            variant='outlined'
            size='small'
            value={title}
            onBlur={activateViewMode}
            autoFocus
            onChange={onChangeValueHandler} />
         : <span onDoubleClick={activeteAditMode} >{props.value}</span>
   }
)
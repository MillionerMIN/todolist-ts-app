import { IconButton, TextField, Tooltip } from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

export type AddItemFormType = {
   onAddItem: (title: string) => void
}

export const AddItemForm = React.memo(({ onAddItem }: AddItemFormType) => {
   console.log('AddItemForm call');

   let [title, setTitle] = useState('');
   let [error, setError] = useState<string | null>(null);

   const addItem = () => {
      if (title.trim() !== '') {
         onAddItem(title);
         setTitle('');
      } else {
         setError('Title is required');
      }
   }
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
   }
   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (error !== null) {
         setError(null);
      }
      if (e.charCode === 13) {
         addItem()
      }
   }

   return <div>
      <TextField
         value={title}
         onChange={onChangeHandler}
         onKeyPress={onKeyPressHandler}
         error={!!error}
         id="outlined-basic"
         label="Title"
         variant="outlined"
         helperText={error}
      />
      <IconButton color='primary' size='small' onClick={addItem}>
         <Tooltip title="Add" aria-label="add">
            <AddCircleIcon />
         </Tooltip>
      </IconButton>

   </div>
})
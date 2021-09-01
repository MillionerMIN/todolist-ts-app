import { IconButton, TextField, Tooltip } from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

export type AddItemFormType = {
   addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormType) => {
   console.log('AddItemForm call');
   const { addItem } = props

   let [title, setTitle] = useState('');
   let [error, setError] = useState<string | null>(null);

   const onAddItem = () => {
      if (title.trim() !== '') {
         addItem(title);
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
         onAddItem()
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
      <IconButton color='primary' size='small' onClick={onAddItem}>
         <Tooltip title="Add" aria-label="add">
            <AddCircleIcon />
         </Tooltip>
      </IconButton>

   </div>
})
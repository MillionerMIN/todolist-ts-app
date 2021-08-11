import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { EditableSpan } from './EditableSpan';
import { action } from '@storybook/addon-actions';

export default {
   title: 'TODOLIST/EditableSpan',
   component: EditableSpan,
   // args: {
     
   // },
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

// const args = {
//    onAddTask: action('AddTask click'),
//    onRemoveTask: action('RemoveTask click'),
//    onChangeStatus: action('ChangeStatus click'),
//    onChangeValue: action('ChangeValue click'),
// }
export const TaskIsDone = Template.bind({});
TaskIsDone.args = {
   value: 'string',
   onChange: action('Chang')
};



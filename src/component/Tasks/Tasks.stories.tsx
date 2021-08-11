import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Tasks } from './Tasks';
import { action } from '@storybook/addon-actions';

export default {
   title: 'TODOLIST/Tasks',
   component: Tasks,
   args: {
      onRemoveTask: action('RemoveTask click'),
      onChangeStatus: action('ChangeStatus click'),
      onChangeValue: action('ChangeValue click'),
   },
} as ComponentMeta<typeof Tasks>;

const Template: ComponentStory<typeof Tasks> = (args) => <Tasks {...args} />;

// const args = {
//    onAddTask: action('AddTask click'),
//    onRemoveTask: action('RemoveTask click'),
//    onChangeStatus: action('ChangeStatus click'),
//    onChangeValue: action('ChangeValue click'),
// }
export const TaskIsDone = Template.bind({});
TaskIsDone.args = {
   todolistId: 'todo1',
   task: { id: '1', title: 'HTML', isDone: true },
};

export const TaskIsNotDone = Template.bind({});
TaskIsNotDone.args = {
   todolistId: 'todo1',
   task: { id: '1', title: 'HTML', isDone: false },
};

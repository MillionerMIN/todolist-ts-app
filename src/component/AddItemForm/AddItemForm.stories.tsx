import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AddItemForm, AddItemFormType } from './AddItemForm';
import { action } from '@storybook/addon-actions';

export default {
   title: 'TODOLIST/AddItemForm',
   component: AddItemForm,
   argTypes: {
      onClick: { 
         description: 'AddItemForm click' },
   },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = ( args: AddItemFormType) => <AddItemForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {
   onAddItem: action('AddItemForm click')
};





  
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AppWithRedux from './AppWithReducers';
import { ReduxStoreProviderDecorater } from '../../stories/decorators/ReduxStoreProviderDecorater';

export default {
    title: 'TODOLIST/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorater]
} as ComponentMeta<typeof AppWithRedux>;

const Template: ComponentStory<typeof AppWithRedux> = () => <AppWithRedux />;

export const AppWithReduxStories = Template.bind({});
AppWithReduxStories.args = {};
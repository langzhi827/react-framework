import React from 'react';
import { render, mount, shallow } from 'enzyme';
import NoMatch from '../NoMatch';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../redux/reducer';
import thunk from 'redux-thunk';

jest.useFakeTimers();

describe('NoMatch', () => {

    const initialState = {
        noMatch: {
            title: '404',
            list: []
        }
    }

    const middleware = [thunk];
    const store = createStore(
        combineReducers({
            noMatch: reducer
        }),
        initialState,
        applyMiddleware(...middleware)
    );

    const props = {
        location: { pathname: '/404' }
    };

    describe('renders correctly', () => {
        const wrapper = render(
            <Provider store={store}>
                <NoMatch {...props} />
            </Provider>
        );

        it('snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('default title', () => {
            expect(wrapper.find('h2').text()).toEqual(initialState.noMatch.title);
        });
    })

    describe('mount correctly', () => {
        const wrapper = mount(
            <Provider store={store} >
                <NoMatch  {...props} />
            </Provider>
        );

        it('snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('throw exception', () => {
            expect(() => wrapper).not.toThrow();
        });

        it('click img', () => {
            wrapper.find('img').simulate('click');
            expect(wrapper.find('h2').text()).toEqual(store.getState().noMatch.title);
        });
    })
});
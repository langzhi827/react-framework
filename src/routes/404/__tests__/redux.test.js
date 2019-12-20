import fetch from '@/utils/fetch';
import store from './store';
import { getList, updateTitle } from '../redux/actions';

jest.mock('@/utils/fetch');

describe('NoMatch Redux', () => {
    const mockList = [
        {
            "name": "name1",
            "age": 20
        },
        {
            "name": "name2",
            "age": 21
        }
    ];
    fetch.mockResolvedValue(mockList);

    it('getList', async () => {
        await store.dispatch(getList());
        const state = store.getState().noMatch;

        expect(state.list).toEqual(mockList);
    });

    it('updateTitle', () => {
        store.dispatch(updateTitle('标题404'));
        const state = store.getState().noMatch;
        expect(state.title).toBe('标题404');
    });
});
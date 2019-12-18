import React from 'react';
import { render, mount } from 'enzyme';

import Loading from '../Loading';

describe('Loading', () => {
    it('renders correctly', () => {
        const wrapper = render(<Loading />);
        expect(wrapper).toMatchSnapshot();
    });

    it('mount correctly', () => {
        expect(() => mount(<Loading />)).not.toThrow();
    });
});
import proxyquire from 'proxyquire';
import { expect } from 'chai';
import * as sinon from 'sinon';
import type BlockType from './Block';

const eventBusMock = {
    on: sinon.fake(),
    emit: sinon.fake(),
};

const { default: Block } = proxyquire('./Block', {
    './EventBus': {
        EventBus: class {
            emit = eventBusMock.emit;
            on = eventBusMock.on;
        },
    },
}) as { default: typeof BlockType };

describe('Block', () => {
    class ComponentMock extends Block {
        constructor(props: any) {
            super('div', props);
        }
    }

    it('should fire init event on initialization', () => {
        new ComponentMock({});

        expect(eventBusMock.emit.calledWith('init')).to.eq(true);
    });

    it.only('setProps() should update properties', () => {
        const component = new ComponentMock({});
        component.setProps({ props: 'new' });
        const result = component.props.props;
        expect(result).to.be.equal('new');
    });
});

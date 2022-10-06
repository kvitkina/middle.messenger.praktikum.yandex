import Block from './Block';
import { EventBus } from './EventBus';
import { isEqual, set } from './helpers';
import { StoreEvents } from './types';

export class Store extends EventBus {
    private state: any = {};

    public set(keypath: string, data: unknown) {
        set(this.state, keypath, data);

        this.emit(StoreEvents.Updated, this.getState());
    }

    public getState() {
        return this.state;
    }
}

const store = new Store();


export function withStore(mapStateToProps: (state: any) => any) {

    return function wrap(Component: typeof Block){
        let previousState: any;

        return class WithStore extends Component {

            constructor(props: any) {
                previousState = mapStateToProps(store.getState());

                super('div', { ...props, ...previousState });

                store.on(StoreEvents.Updated, () => {
                    const stateProps = mapStateToProps(store.getState());

                    if (!isEqual(previousState, stateProps)) {
                        this.setProps({...stateProps});
                    }

                    previousState = stateProps;
                });
            }
        };

    };
}

export default store;

import { EventBus } from './EventBus';
import { nanoid } from 'nanoid';
import { TemplateDelegate } from 'handlebars';

class Block {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
	};

	public id = nanoid(6);
	protected props: Record<string, unknown>;
	public children: Record<string, Block>;
	private eventBus: () => EventBus;
	private _element: HTMLElement | null = null;
	private _meta: { tagName: string; props: any };

	constructor(tagName = 'div', propsWithChildren: any = {}) {
		const eventBus = new EventBus();

		const { props, children } = this._getChildrenAndProps(propsWithChildren);

		this._meta = {
			tagName,
			props,
		};

		this.children = children;
		this.props = this._makePropsProxy(props);

		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);

		eventBus.emit(Block.EVENTS.INIT);
	}

	_getChildrenAndProps(childrenAndProps: any) {
		const props: Record<string, any> = {};
		const children: Record<string, Block> = {};

		Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value
            } else if (
                Array.isArray(value) &&
                value.every(value => value instanceof Block)
            ) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        })

		return { props, children };
	}

	_addEvents(): void {
		const { events = {} } = this.props as { events: Record<string, () => void> };

		Object.keys(events).forEach((eventName) => {
			this._element?.addEventListener(eventName, events[eventName]);
		});
	}

	_registerEvents(eventBus: EventBus): void {
		eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	_createResources(): void {
		const { tagName } = this._meta;
		this._element = this._createDocumentElement(tagName);
	}

	private _init(): void {
		this._createResources();

		this.init();

		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	protected init(): void {}

	_componentDidMount(): void {
		this.componentDidMount();
	}

	componentDidMount(): void {}

	public dispatchComponentDidMount(): void {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	private _componentDidUpdate(oldProps: any, newProps: any) {
		if (this.componentDidUpdate(oldProps, newProps)) {
			this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
		}
	}

	protected componentDidUpdate(oldProps: any, newProps: any): boolean {
		return true;
	}

	setProps = (nextProps: any) => {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	};

	get element(): HTMLElement | null {
		return this._element;
	}

	private _render(): void {
		const fragment = this.render();

		this._element!.innerHTML = '';

		this._element!.append(fragment);

		this._addEvents();
	}

	protected compile(template: TemplateDelegate, context: any): DocumentFragment {
		const contextAndStubs = { ...context };

        Object.entries(this.children).forEach(([name, component]) => {
            if (Array.isArray(component)) {
                contextAndStubs[name] = [];
                for (let i = 0; i < component.length; i++) {
                    contextAndStubs[name][i] = `<div data-id="${component[i].id}"></div>`
                  }
            } else {
                contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
            }
        });

		const html = template(contextAndStubs);

		const temp = document.createElement('template');

		temp.innerHTML = html;

		Object.entries(this.children).forEach(([_, component]) => {
            if (Array.isArray(component)) {
                for (let i = 0; i < component.length; i++) {
                  const stub = temp.content.querySelector(
                    `[data-id="${component[i].id}"]`
                  )
                  if (stub) {
                    stub.replaceWith(component[i].getContent())
                  }
                }
            } else {
                const stub: HTMLElement | null = temp.content.querySelector(`[data-id="${component.id}"]`);

                if (!stub) {
                    return;
                }
                component.getContent()?.append(...Array.from(stub.childNodes));

                stub.replaceWith(component.getContent()!);
            }
		});

		return temp.content;
	}

	protected render(): DocumentFragment {
		return new DocumentFragment();
	}

	getContent(): HTMLElement | null {
		return this.element;
	}

	_makePropsProxy(props: any) {
		const self = this;

		return new Proxy(props, {
			get(target, prop) {
				const value = target[prop];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set(target, prop, value) {
				const oldTarget = { ...target };

				target[prop] = value;
				self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
				return true;
			},
			deleteProperty() {
				throw new Error('Нет доступа');
			},
		});
	}

	_createDocumentElement(tagName: string) {
		return document.createElement(tagName);
	}

	show(): void {
		this.getContent()!.style.display = 'block';
	}

	hide(): void {
		this.getContent()!.style.display = 'none';
	}
}

export default Block;
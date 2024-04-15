export type Type = any;
export type Key = any;
export type Ref = any;
export type Props = any;
export type ElementType = any;

export interface ReactElementType {
	$$typeof: symbol | number;
	type: ElementType;
	key: Key;
	props: Props;
	ref: Ref;
	__author: string;
}

/**
 * 支持两种更新行为
 * this.setState(1)
 * this.setState(state => state * 2)
 */
export type Action<State> = State | ((prevState: State) => State);

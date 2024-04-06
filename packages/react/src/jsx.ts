import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
	Type,
	Key,
	Ref,
	Props,
	ReactElementType,
	ElementType
} from 'shared/ReactTypes';
const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElementType {
	const element: ReactElementType = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__author: 'Joz: zzc5464@foxmail.com'
	};
	return element;
};

export const jsx = (type: ElementType, config: any, ...childrens: any[]) => {
	let key = null;
	let ref = null;
	const props: Props = {};
	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key' && val !== undefined) {
			key = '' + val;
			continue;
		}
		if (prop === 'ref' && val !== undefined) {
			ref = val;
		}
		if (Object.prototype.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}
	if (childrens.length) {
		if (childrens.length === 1) {
			props.children = childrens[0];
		}
		props.children = childrens;
	}
	return ReactElement(type, key, ref, props);
};

export const jsxDev = jsx;

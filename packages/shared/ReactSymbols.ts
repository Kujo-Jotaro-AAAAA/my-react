const supportSymbol = typeof Symbol === 'function' && Symbol.for;

/**
 * 创建一个全局的唯一的react.element元素，如果不支持symbol方法，则用一个特定的整数替代
 * 目的是创建一个用于标识 React 元素类型的唯一标识符，以确保在不同环境中 React 元素的唯一性和一致性。
 * 使用 Symbol 类型可以更好地保证标识符的唯一性和不可变性，
 * 但为了兼容不支持 Symbol 的环境，也提供了一个整数值的备选方案。
 */
export const REACT_ELEMENT_TYPE = supportSymbol
	? Symbol.for('react.element')
	: 0xeac7;

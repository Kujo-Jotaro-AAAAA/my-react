import { FiberNode } from './fiber';
/**
 * @description 递归中的递阶段
 * @param fiber
 * @returns
 */
export const beginWork = (fiber: FiberNode): FiberNode => {
	// 比较，返回子fiberNode
	return fiber;
};

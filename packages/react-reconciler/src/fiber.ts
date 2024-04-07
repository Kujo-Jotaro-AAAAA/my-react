import { Props, Key, Ref } from 'shared/ReactTypes';
/**
 *
 */
export class FiberNode {
	// 运行时属性
	pendingProps: Props;
	// 工作完成后的属性
	memoizedProps: Props | null;

	// 描述节点关系
	return: FiberNode | null; // 父节点
	sibling: FiberNode | null; // 兄弟节点
	child: FiberNode | null; // 子节点
	index: number; // 如果是多节点，自己所在第几个位置 => ul>li*3

	// 用于切换current和workInProgress
	alternate: FiberNode | null;

	constructor(pendingProps: Props) {
		this.pendingProps = pendingProps;
		this.memoizedProps = null;

		this.return = null;
		this.sibling = null;
		this.child = null;
		this.index = 0;

		this.alternate = null;
	}
}

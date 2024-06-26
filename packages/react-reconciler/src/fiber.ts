import { Props, Key, Ref } from 'shared/ReactTypes';
import { Container } from 'hostConfig';
import { WorkTag } from './workTags';
/**
 *
 */
export class FiberNode {
	tag: WorkTag;
	// 运行时属性
	pendingProps: Props;
	key: Key;
	// 用于绑定根节点的指针
	stateNode: any;
	// 工作完成后的属性
	memoizedProps: Props | null;

	// 描述节点关系
	return: FiberNode | null; // 父节点
	sibling: FiberNode | null; // 兄弟节点
	child: FiberNode | null; // 子节点
	index: number; // 如果是多节点，自己所在第几个位置 => ul>li*3

	// 用于切换current和workInProgress
	alternate: FiberNode | null;
	updateQueue: unknown;
	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		this.tag = tag;
		this.key = key;
		this.pendingProps = pendingProps;
		this.memoizedProps = null;

		this.return = null;
		this.sibling = null;
		this.child = null;
		this.index = 0;
		this.stateNode = null;
		this.alternate = null;
		this.updateQueue = null;
	}
}

export class FiberRootNode {
	container: Container;
	current: FiberNode;
	finishedWork: FiberNode | null;
	constructor(container: Container, hostRootFiber: FiberNode) {
		this.container = container;
		this.current = hostRootFiber;
		hostRootFiber.stateNode = this;
		this.finishedWork = null;
	}
}

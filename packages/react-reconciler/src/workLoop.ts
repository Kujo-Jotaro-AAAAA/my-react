import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import { FiberNode } from './fiber';

let workInProgress: FiberNode | null = null;

/**
 * 一个简易的工作单元方法，链表方式深度遍历子节点
 * @param fiber
 */
function performUnitOfWork(fiber: FiberNode) {
	const next = beginWork(fiber);
	// 跑完工作单元后，将运行时的状态进行记录
	fiber.memoizedProps = fiber.pendingProps;
	if (next === null) {
		// 子节点找完了，开始“归”
		completeUnitOfWork(fiber);
	} else {
		workInProgress = next;
	}
}

function completeUnitOfWork(fiber: FiberNode) {
	let node: FiberNode | null = fiber;
	do {
		completeWork(node);
		const sibling = node.sibling;
		// 先找兄弟
		if (sibling !== null) {
			workInProgress = sibling;
			return;
		}
		// 兄弟都没了，就开始找父
		node = node.return;
		workInProgress = node;
	} while (node !== null);
}

/**
 * 从根节点开始出发，执行事件循环
 * @param root
 */
function renderRoot(root: FiberNode) {
	workInProgress = root;
	do {
		try {
			workLoop();
			break;
		} catch (e) {
			console.log('事件循环出错，停止执行');
			workInProgress = null;
		}
	} while (true);
}

function workLoop() {
	while (workInProgress !== null) {
		performUnitOfWork(workInProgress);
	}
}

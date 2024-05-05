// ReactDOM.createRoot(rootElement).render(<App/>)
// 在createRoot将调用 createContainer
// 在render时调用 updateContainer

import { Container } from 'hostConfig';
import { FiberNode, FiberRootNode } from './fiber';
import { HostRoot } from './workTags';
import {
	UpdateQueue,
	createUpdate,
	createUpdateQueue,
	enqueueUpdate
} from './updateQueue';
import { ReactElementType } from 'shared/ReactTypes';

/**
 * 创建一个tag为hostRoot的节点，通过FiberRootNode将双方用指针进行绑定
 * 为hostRootFiber创建一个用于更新的对象
 * @param container - 宿主对象
 */
export function createContainer(container: Container) {
	const hostRootFiber = new FiberNode(HostRoot, {}, null);
	const root = new FiberRootNode(container, hostRootFiber);
	hostRootFiber.updateQueue = createUpdateQueue();
	return root;
}

/**
 * 对传进来的elm(<App />) 进行更新
 * @param elm - render(<App />) 那自然就是一个dom
 * @param root - createContainer创建出来的root
 */
export function updateContainer(
	elm: ReactElementType | null,
	root: FiberRootNode
) {
	const hostRootFiber = root.current;
	const update = createUpdate<ReactElementType | null>(elm);
	enqueueUpdate(
		hostRootFiber.updateQueue as UpdateQueue<ReactElementType | null>,
		update
	);
	return elm;
}

import { Action } from 'shared/ReactTypes';

/**
 * 更新操作的基础数据结构
 */
export interface Update<State> {
	action: Action<State>;
}

// 能够消费基础数据的数据结构
export interface UpdateQueue<State> {
	shared: {
		pending: Update<State>;
	};
}

// 初始化Update实例
export const createUpdate = <State>(action: Action<State>): Update<State> => {
	return {
		action
	};
};

export const createUpdateQueue = <Action>() => {
	return {
		shared: {
			pending: null
		}
	} as unknown as UpdateQueue<Action>;
};

// 对update数据进行更新
export const enqueueUpdate = <Action>(
	updateQueue: UpdateQueue<Action>,
	update: Update<Action>
) => {
	updateQueue.shared.pending = update;
};

// ========================================================================
// 以上定义了基本的数据结构和能消费此基础数据的对象，声明了一个方法来让他们产生关系
// ========================================================================

/**
 * @description 费update数据的方法
 * @param baseState
 * @param pendingUpdate
 * @returns
 */
export const processUpdateQueue = <State>(
	baseState: State,
	pendingUpdate: Update<State> | null
): { memoizedState: State } => {
	const result: ReturnType<typeof processUpdateQueue<State>> = {
		memoizedState: baseState
	};
	if (pendingUpdate !== null) {
		const action = pendingUpdate?.action;
		// setState可以直接是个值 或者 是个回调函数
		if (action instanceof Function) {
			result.memoizedState = action(baseState);
		} else {
			result.memoizedState = action;
		}
	}

	return result;
};

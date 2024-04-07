import fs from 'fs';
import path from 'path';

/**
 * 插件：
 * rollup-plugin-typescript2： 让rollup支持ts编译
 * @rollup/plugin-commonjs： 在打包过程中，很多库和模块可能是以 CommonJS 格式导出的，而 Rollup 默认只支持 ES 模块。
 */
import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';

const PACKAGE_PATH = path.resolve(__dirname, '../../packages');

// 这是构建后产物的地址，根据node规范会将react、react-dom等包都构建在这里
const DIST_PATH = path.resolve(__dirname, '../../dist/node_modules');

export function resolvePkgPath(pkgName, isDist) {
	if (isDist) return `${DIST_PATH}/${pkgName}/`;
	return `${PACKAGE_PATH}/${pkgName}`;
}

export function getPackageJSON(pkgName) {
	const pkgJSON = fs.readFileSync(`${resolvePkgPath(pkgName)}/package.json`, {
		encoding: 'utf-8'
	});
	return JSON.parse(pkgJSON);
}

/**
 *
 * @description 所有rollup路径都需要的基础打包库
 * @returns
 */
export function getBaseRollupPlugins({ typescript = {} } = {}) {
	return [cjs(), ts(typescript)];
}

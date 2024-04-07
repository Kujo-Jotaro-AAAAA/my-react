import { resolvePkgPath, getPackageJSON, getBaseRollupPlugins } from './utils';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const reactPkgJSON = getPackageJSON('react');
const reactPkgPath = resolvePkgPath(reactPkgJSON.name);
const reactPkgDistPath = resolvePkgPath(reactPkgJSON.name, true);

export default [
	// react
	{
		input: `${reactPkgPath}/${reactPkgJSON.module}`,
		output: {
			file: `${reactPkgDistPath}/index.js`,
			name: 'react.js',
			// umd是兼容cjs和es module的
			format: 'umd'
		},
		plugins: [
			...getBaseRollupPlugins(),
			generatePackageJson({
				inputFolder: reactPkgPath,
				outputFolder: reactPkgDistPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					main: 'index.js'
				})
			})
		]
	},
	{
		input: `${reactPkgPath}/src/jsx.ts`,
		output: [
			// react/jsx-runtime.js
			{
				file: `${reactPkgDistPath}/jsx-runtime.js`,
				name: 'jsx-runtime.js',
				format: 'umd'
			},
			// react/jsx-dev-runtime.js
			{
				file: `${reactPkgDistPath}/jsx-dev-runtime.js`,
				name: 'jsx-dev-runtime.js',
				format: 'umd'
			}
		],
		plugins: getBaseRollupPlugins()
	}
];

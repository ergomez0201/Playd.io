module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		'jest/globals': true,
	},
	extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				project: ['./tsconfig.json'],
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', 'jest'],
	rules: {
		'no-console': 'off',
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
		'prefer-destructuring': [
			'error',
			{
				array: false,
				object: false,
			},
		],
	},
};

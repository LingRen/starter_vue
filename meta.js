module.exports = {
	prompts: {
		name: {
			'type': 'string',
			'required': true,
			'message': 'Project name'
		},
		description: {
			'type': 'string',
			'required': false,
			'message': 'Project description',
			'default': 'A Vue.js project'
		},
		author: {
			'type': 'string',
			'message': 'Author'
		},
		autoInstall: {
			when: 'isNotTest',
			type: 'list',
			message: 'Should we run `npm install` for you after the project has been created? (recommended)',
			choices: [{
					name: 'Yes, use NPM',
					value: 'npm',
					short: 'npm',
				},
				{
					name: 'Yes, use Yarn',
					value: 'yarn',
					short: 'yarn',
				},
				{
					name: 'No, I will handle that myself',
					value: false,
					short: 'no',
				},
			]
		}
	},
	completeMessage: '{{#inPlace}}To get started:\n\n  npm install # Or yarn\n  npm run dev{{else}}To get started:\n\n  cd {{destDirName}}\n  npm install # Or yarn\n  npm run dev{{/inPlace}}'
};
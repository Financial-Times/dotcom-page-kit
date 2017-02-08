const fs = require('fs');
const path = require('path');

const topLevelDeps = require(path.join(process.cwd(), 'bower.json')).dependencies;
const nUtilDeps = require('./bower.json').dependencies;

const dupedDeps = Object.keys(nUtilDeps)
	.map(dep => {
		if (topLevelDeps[dep]) {
			return dep;
		}
	})
	.filter(dep => !!dep);

if (dupedDeps.length) {
	console.warn(`\
You have declared dependencies that n-util takes care of for you.
Declaring a direct dependency will make it harder to resolve dependencies in future
There's no need to declare a direct dependency on the following:

	${dupedDeps,join(', ')}

You can jst require/import them as if you'd declared them as a dependency in your bower.json
`)
}
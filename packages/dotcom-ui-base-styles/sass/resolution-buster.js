const fs = require('fs');
const path = require('path');

const topLevelDeps = require(path.join(process.cwd(), 'bower.json')).dependencies;
const nUtilDeps = require('./bower.json').dependencies;

const dupedDeps = Object.keys(nUtilDeps)
	.map(dep => topLevelDeps[dep] && dep)
	.filter(dep => !!dep);

if (dupedDeps.length) {
	console.warn(`\
You have declared dependencies that n-util takes care of for you.
Declaring a direct dependency will make it harder to resolve dependencies in future
There's no need to declare a direct dependency on the following:

	${dupedDeps,join(', ')}

It's still safe to require/import them in your sass/js
`)
}

module.exports = name => {
	const performance = window.LUX || window.performance || window.msPerformance || window.webkitPerformance || window.mozPerformance;
	if (performance && performance.mark) {
		performance.mark(name);
	}
};

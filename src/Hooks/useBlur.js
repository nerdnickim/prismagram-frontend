export default {
	blurEvent: (e, callback) => {
		const currentTarget = e.currentTarget;

		setTimeout(() => {
			if (!currentTarget.contains(document.activeElement)) {
				callback();
			}
		}, 0);
	},
};

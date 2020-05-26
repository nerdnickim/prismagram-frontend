import { useState } from "react";

export default () => {
	let [defaultValue, setDefaultValue] = useState(false);

	const showToggle = (e) => {
		e.preventDefault();
		if (defaultValue === true) {
			setDefaultValue(false);
			document.querySelector("body").style.overflow = "";
			return;
		} else {
			setDefaultValue(true);
			document.querySelector("body").style.overflow = "hidden";
		}
	};
};

import { useEffect } from 'react';

export default function useClickOutside<T extends HTMLElement>(
	ref: React.RefObject<T>,
	func: () => void,
) {
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				func();
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref]);
}

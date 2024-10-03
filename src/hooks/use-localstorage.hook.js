/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

export function useLocalStorage(key, dateInit) {
	const [data, setData] = useState(dateInit);
	
	useEffect(() => {
		const res = JSON.parse(localStorage.getItem(key));
		if (res) {
			setData(res);
		}
	},[]);
	
	const saveData = (newData) => {
		localStorage.setItem(key, JSON.stringify(newData));
		setData(newData);
	};

	return [data, saveData];
}
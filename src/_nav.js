import React from "react";
import { SortAscendingOutlined, SelectOutlined } from "@ant-design/icons";

export default [
	{
		title: "Sortings",
		icon: <SortAscendingOutlined />,
		key: "sortings",
		items: [
			{
				title: "Insertion Sort",
				key: "insertion",
			},
			{
				title: "Merge Sort",
				key: "merge",
			},
		],
	},
	{
		title: "Selection",
		icon: <SelectOutlined />,
		key: "selection",
		items: [
			{
				title: 'Floyd-Rivest',
				key: 'floyd-rivest'
			},
			{
				title: 'Median of Medians',
				key: 'median'
			}
		]
	},
];

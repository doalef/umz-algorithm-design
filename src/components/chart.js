import React from "react";
import { Card } from "antd";
import { LineChart } from "@opd/g2plot-react";
const config = {
	height: 300,

	padding: "auto",
	forceFit: true,
	xField: "label",
	yField: "value",
	label: {
		visible: true,
		type: "point",
	},
	xAxis: {
		tickCount: 10,
	},
	animation: {
		appear: {
			animation: "clipingWithData",
		},
	},
};
export default class Chart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			times: this.props.times ? this.props.times : [],
		};
	}

	componentWillReceiveProps(newProps) {
		if (newProps.times.length !== this.state.times.length)
			this.setState({ times: newProps.times });
	}

	render() {
		return (
			<Card title="Performance" style={{ marginTop: 16 }}>
				<p>
					This chart shows you how much time it took to execute the
					algorithm with each payload. (updated upon payload
					submition)
				</p>
				{this.state.times.length ? (
					<LineChart
						{...config}
						data={this.state.times.map((item, index) => {
							return { label: index, value: item };
						})}
					/>
				) : null}
			</Card>
		);
	}
}

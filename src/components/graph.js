import React from "react";
import ReactDOM from "react-dom";
import { Card, Empty } from "antd";
import G6 from "@antv/g6";
export default class Graph extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
		};
	}

	addData(payload = []) {
		let nodes = [],
			edges = [];
		payload.map((item, index) => {
			nodes.push({ id: index + "", label: index + "" });
			item.map((itm, j) => {
				if (itm) edges.push({ source: index + "", target: j + "" });
				return null;
			});
			return null;
		});
		this.setState({ data: { nodes, edges } });
		if (this.Graph) return this.Graph.changeData(this.state.data);
		this.mountGraph();
	}

	mountGraph() {
		this.Graph = new G6.Graph({
			container: ReactDOM.findDOMNode(this.Div),
			width: ReactDOM.findDOMNode(this.Div).scrollWidth,
			height: 300,
			fitView: true,
			layout: {
				type: "mds",
				linkDistance: 100,
			},
			modes: {
				default: ["drag-node"],
			},
			defaultNode: {
				size: 20,
				style: {
					fill: "#C6E5FF",
					stroke: "#5B8FF9",
				},
			},
			defaultEdge: this.props.directed
				? {
						size: 1,
						color: "#e2e2e2",
						style: {
							endArrow: {
								path: "M 0,0 L 8,4 L 8,-4 Z",
								fill: "#e2e2e2",
							},
						},
				  }
				: {
						size: 1,
						color: "#e2e2e2",
				  },
		});
		this.Graph.data(this.state.data);
		this.Graph.render();
	}

	render() {
		return (
			<Card style={{ marginTop: 16 }} title="Graph Visualization">
				<div
					style={{
						width: "100%",
						display: "flex",
						justifyContent: "center",
					}}
					ref={(r) => (this.Div = r)}>
					{this.state.data ? null : <Empty />}
				</div>
			</Card>
		);
	}
}

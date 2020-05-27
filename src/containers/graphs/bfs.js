import React from "react";
import {
	Row,
	Col,
	Card,
	Input,
	Form,
	Button,
	message,
	InputNumber,
} from "antd";
import AlgorithmInfo from "../../components/info";
import { bfs } from "../../lib/graphs";
import { isArray } from "validate.js";
import Chart from "../../components/chart";
import Graph from "../../components/graph";
const details = `
Graph traversal means visiting every vertex and edge exactly once in a well-defined order. While using certain graph algorithms, you must ensure that each vertex of the graph is visited exactly once. The order in which the vertices are visited are important and may depend upon the algorithm or question that you are solving.

During a traversal, it is important that you track which vertices have been visited. The most common way of tracking vertices is to mark them.

Breadth First Search (BFS)

There are many ways to traverse graphs. BFS is the most commonly used approach.

BFS is a traversing algorithm where you should start traversing from a selected node (source or starting node) and traverse the graph layerwise thus exploring the neighbour nodes (nodes which are directly connected to source node). You must then move towards the next-level neighbour nodes.

As the name BFS suggests, you are required to traverse the graph breadthwise as follows:

First move horizontally and visit all the nodes of the current layer
Move to the next layer
`;
const formItemLayout = {
	labelCol: {
		xs: { span: 4 },
		sm: { span: 4 },
	},
	wrapperCol: {
		xs: { span: 20 },
		sm: { span: 20 },
	},
};
export default class BFS extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			payload: null,
			result: null,
			times: [],
		};
	}

	showResults(payload, start, goal) {
		let t1 = performance.now();
		let result = bfs(payload, start, goal);
		let t2 = performance.now();
		let times = this.state.times;
		times.push((t2 - t1).toFixed(4));
		this.Graph.addData(payload);
		this.setState({ payload, result, times, start, goal });
	}

	onFinish({ input, start, goal }) {
		try {
			let res = JSON.parse(input);
			if (!isArray(res))
				return message.error("Input is invalid, should be an array");
			if (start < 0 || start >= res.length)
				return message.error("start is invalid");
			if (goal < 0 || goal >= res.length)
				return message.error("goal is invalid");
			this.showResults(res, start, goal);
		} catch (error) {
			console.log(error);
			message.error("Input is invalid, should be an array");
		}
	}

	render() {
		return (
			<div>
				<Row justify="space-between" style={{ paddingBottom: 24 }}>
					<Col md={11}>
						<Card
							title={"Breadth First Search - Execute"}
							style={{ marginTop: 16 }}>
							<p>
								Enter your input data down in the field. (data
								must be a 2D array) example:
							</p>
							<pre>
								[{"\n"} [1, 1, 0, 0, 1, 0],{"\n"} [1, 0, 1, 0,
								1, 0],{"\n"} [0, 1, 0, 1, 0, 0],{"\n"} [0, 0, 1,
								0, 1, 1],{"\n"} [1, 1, 0, 1, 0, 0],{"\n"} [0, 0,
								0, 1, 0, 0]{"\n"}]
							</pre>
							<Form
								{...formItemLayout}
								onFinish={(values) => this.onFinish(values)}>
								<Form.Item
									label="Input"
									name="input"
									labelAlign={"left"}
									rules={[
										{
											required: true,
											message: "input is mandatory!",
										},
									]}>
									<Input />
								</Form.Item>

								<Form.Item
									label="Start"
									name="start"
									labelAlign={"left"}
									rules={[
										{
											required: true,
											message: "input is mandatory!",
										},
									]}>
									<InputNumber />
								</Form.Item>
								<Form.Item
									label="Goal"
									name="goal"
									labelAlign={"left"}
									rules={[
										{
											required: true,
											message: "input is mandatory!",
										},
									]}>
									<InputNumber />
								</Form.Item>
								<Form.Item>
									<Button type="primary" htmlType="submit">
										Submit
									</Button>
								</Form.Item>
							</Form>
							{this.state.payload ? (
								<React.Fragment>
									<hr />
									<h5>
										<strong>Payload:</strong>
									</h5>
									<pre>
										{JSON.stringify(this.state.payload)}
									</pre>
									<h5>
										<strong>start:</strong>{" "}
										{this.state.start}
									</h5>
									<h5>
										<strong>goal:</strong> {this.state.goal}
									</h5>
									<hr />
									<h5>
										<strong>Result:</strong>
									</h5>
									<pre>
										{JSON.stringify(this.state.result)}
									</pre>
									<p>
										<strong>Executed in:</strong>{" "}
										{
											this.state.times[
												this.state.times.length - 1
											]
										}
										ms
									</p>
								</React.Fragment>
							) : null}
						</Card>
					</Col>
					<Col md={12}>
						<Graph ref={(r) => (this.Graph = r)} />
						<Chart times={this.state.times} />
					</Col>
					<Col xs={24}>
						<AlgorithmInfo details={details} function={bfs} />
					</Col>
				</Row>
			</div>
		);
	}
}

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
import { dfs } from "../../lib/graphs";
import { isArray } from "validate.js";
import Chart from "../../components/chart";
import Graph from "../../components/graph";
const details = `
Depth First Search (DFS) algorithm traverses a graph in a depthward motion and uses a stack to remember to get the next vertex to start a search, when a dead end occurs in any iteration.

Depth First Travesal
As in the example given above, DFS algorithm traverses from S to A to D to G to E to B first, then to F and lastly to C. It employs the following rules.

Rule 1 − Visit the adjacent unvisited vertex. Mark it as visited. Display it. Push it in a stack.

Rule 2 − If no adjacent vertex is found, pop up a vertex from the stack. (It will pop up all the vertices from the stack, which do not have adjacent vertices.)

Rule 3 − Repeat Rule 1 and Rule 2 until the stack is empty.
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
export default class DFS extends React.Component {
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
		let result = dfs(payload, start, goal);
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
							title={"Depth First Search - Execute"}
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
										{this.state.result
											? `There is a path from ${this.state.start} to ${this.state.goal}`
											: `There is no path from ${this.state.start} to ${this.state.goal}`}
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
						<AlgorithmInfo details={details} function={dfs} />
					</Col>
				</Row>
			</div>
		);
	}
}

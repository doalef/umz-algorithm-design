import React from "react";
import { Row, Col, Card, Input, Form, Button, message } from "antd";
import AlgorithmInfo from "../../components/info";
import { topological } from "../../lib/graphs";
import { isArray } from "validate.js";
import Chart from "../../components/chart";
import Graph from "../../components/graph";

const details = `
Topological sorting for Directed Acyclic Graph (DAG) is a linear ordering of vertices such that for every directed edge uv, vertex u comes before v in the ordering. Topological Sorting for a graph is not possible if the graph is not a DAG.
For example, a topological sorting of the following graph is “5 4 2 3 1 0”. There can be more than one topological sorting for a graph. For example, another topological sorting of the following graph is “4 5 2 3 1 0”. The first vertex in topological sorting is always a vertex with in-degree as 0 (a vertex with no incoming edges).
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
export default class Topological extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			payload: null,
			result: null,
			times: [],
		};
	}

	showResults(payload, array) {
		try {
			let t1 = performance.now();
			this.Graph.addData(array);
			let result = topological(payload);
			let t2 = performance.now();
			let times = this.state.times;
			times.push((t2 - t1).toFixed(4));
			this.Graph.addData(array);
			this.setState({ payload: array, result, times });
		} catch (error) {
			message.error(error.message);
		}
	}

	onFinish({ input, start, goal }) {
		try {
			let res = JSON.parse(input);
			if (!isArray(res))
				return message.error("Input is invalid, should be an array");
			let payload = {};
			res.map((item, index) => {
				payload[index + ""] = [];
				return item.map((itm, inx) => {
					if (itm) payload[index + ""].push(inx + "");
					return null;
				});
			});
			console.log(payload);
			this.showResults(payload, res);
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
							title={"Topological Search - Execute"}
							style={{ marginTop: 16 }}>
							<p>
								Enter your input data down in the field. (data
								must be a 2D array) example:
							</p>
							<pre>
								[{"\n"} [0,1,0,0,1],{"\n"} [0,0,0,0,0],{"\n"}{" "}
								[1,1,0,1,1],{"\n"} [0,0,0,0,0],{"\n"}{" "}
								[0,0,0,0,0]{"\n"}]
							</pre>
							<p>
								NOTE: The input should be a directed acyclic
								graph (DAG)
							</p>
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
						<Graph directed ref={(r) => (this.Graph = r)} />
						<Chart times={this.state.times} />
					</Col>
					<Col xs={24}>
						<AlgorithmInfo
							details={details}
							function={topological}
						/>
					</Col>
				</Row>
			</div>
		);
	}
}

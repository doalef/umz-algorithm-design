import React from "react";
import { Row, Col, Card, Input, Form, Button, message } from "antd";
import AlgorithmInfo from "../../components/info";
import { merge } from "../../lib/sortings";
import { isArray } from "validate.js";
import Chart from "../../components/chart";
const details = `Merge Sort is a Divide and Conquer algorithm. It divides input array in two halves, calls itself for the two halves and then merges the two sorted halves. The major portion of the algorithm is given two sorted arrays, we have to merge them into a single sorted array. There is something known as the Two Finger Algorithm that helps us merge two sorted arrays together. Using this subroutine and calling the merge sort function on the array halves recursively will give us the final sorted array we are looking for.

Since this is a recursion based algorithm, we have a recurrence relation for it. A recurrence relation is simply a way of representing a problem in terms of its subproblems.

T(n) = 2 * T(n / 2) + O(n)

Putting it in plain english, we break down the subproblem into two parts at every step and we have some linear amount of work that we have to do for merging the two sorted halves together at each step.`;
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
export default class MergeSort extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			payload: null,
			result: null,
			times: [],
		};
	}

	showResults(payload) {
		let t1 = performance.now();
		let result = merge(payload);
		let t2 = performance.now();
		let times = this.state.times;
		times.push((t2 - t1).toFixed(4));
		this.setState({ payload, result, times });
	}

	onFinish({ input }) {
		try {
			let res = JSON.parse(input);
			if (!isArray(res))
				return message.error("Input is invalid, should be an array");
			this.showResults(res);
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
						<Card title={"Merge Sort - Execute"} style={{ marginTop: 16 }}>
							<p>
								Enter your input data down in the field. (data
								must be an array)
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
						<Chart times={this.state.times} />
					</Col>
					<Col xs={24}>
						<AlgorithmInfo details={details} function={merge} />
					</Col>
				</Row>
			</div>
		);
	}
}

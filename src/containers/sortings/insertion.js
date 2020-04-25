import React from "react";
import { Row, Col, Card, Input, Form, Button, message } from "antd";
import AlgorithmInfo from "../../components/info";
import { insertion } from "../../lib/sortings";
import { isArray } from "validate.js";
import Chart from "../../components/chart";
const details = `Merge Sort is a Divide and Conquer algorithm. It divides input array in two halves, calls itself for the two halves and then merges the two sorted halves. The merge() function is used for merging two halves. The merge(arr, l, m, r) is key process that assumes that arr[l..m] and arr[m+1..r] are sorted and merges the two sorted sub-arrays into one.`;
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
export default class InsertionSort extends React.Component {
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
		let result = insertion(payload);
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
			message.error("Input is invalid, should be an array");
		}
	}

	render() {
		return (
			<div>
				<Row justify="space-between" style={{ paddingBottom: 24 }}>
					<Col md={11}>
						<Card title={"Execute"} style={{ marginTop: 16 }}>
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
						<AlgorithmInfo details={details} function={insertion} />
					</Col>
				</Row>
			</div>
		);
	}
}

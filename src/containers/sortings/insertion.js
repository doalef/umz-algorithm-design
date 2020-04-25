import React from "react";
import { Row, Col, Card, Input, Form, Button, message } from "antd";
import AlgorithmInfo from "../../components/info";
import { insertion } from "../../lib/sortings";
import { isArray } from "validate.js";
import Chart from "../../components/chart";
const details = `Insertion sort is the sorting mechanism where the sorted array is built having one item at a time. The array elements are compared with each other sequentially and then arranged simultaneously in some particular order. The analogy can be understood from the style we arrange a deck of cards. This sort works on the principle of inserting an element at a particular position, hence the name Insertion Sort.`;
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

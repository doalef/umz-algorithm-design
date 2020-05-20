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
import { frSelection } from "../../lib/selection";
import { isArray } from "validate.js";
import Chart from "../../components/chart";
const details = `
In computer science, the Floyd-Rivest algorithm is a selection algorithm developed by Robert W. Floyd and Ronald L. Rivest that has an optimal expected number of comparisons within lower-order terms. It is functionally equivalent to quickselect, but runs faster in practice on average.[1] It has an expected running time of O(n) and an expected number of comparisons of n + min(k, n − k) + O(n1/2).

The algorithm was originally presented in a Stanford University technical report containing two papers, where it was referred to as SELECT and paired with PICK, or median of medians. It was subsequently published in Communications of the ACM, Volume 18: Issue 3.
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
export default class FloydRivest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			payload: null,
			result: null,
			times: [],
		};
	}

	showResults(payload, index) {
		let t1 = performance.now();
		let result = frSelection(payload, index);
		let t2 = performance.now();
		let times = this.state.times;
		times.push((t2 - t1).toFixed(4));
		this.setState({ payload, result, times });
	}

	onFinish({ input, index }) {
		try {
			let res = JSON.parse(input);
			if (!isArray(res))
				return message.error("Input is invalid, should be an array");
			if (index < 0 || index >= res.length)
				return message.error("K-smallest is invalid");
			this.showResults(res, index);
		} catch (error) {
			message.error("Input is invalid, should be an array");
		}
	}

	render() {
		return (
			<div>
				<Row justify="space-between" style={{ paddingBottom: 24 }}>
					<Col md={11}>
						<Card
							title={"Floyd-Rivest Quick Select - Execute"}
							style={{ marginTop: 16 }}>
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
								<Form.Item
									label="K-Smallest"
									name="index"
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
									<hr />
									<h5>
										<strong>Result:</strong>
									</h5>
									<pre>{this.state.result}</pre>
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
						<AlgorithmInfo
							details={details}
							function={frSelection}
						/>
					</Col>
				</Row>
			</div>
		);
	}
}

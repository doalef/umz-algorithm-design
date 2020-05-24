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
import { mSelection } from "../../lib/selection";
import { isArray } from "validate.js";
import Chart from "../../components/chart";
const details = `
the median of medians is an approximate (median) selection algorithm, frequently used to supply a good pivot for an exact selection algorithm, mainly the quickselect, that selects the kth largest element of an initially unsorted array. Median of medians finds an approximate median in linear time only, which is limited but an additional overhead for quickselect. When this approximate median is used as an improved pivot, the worst-case complexity of quickselect reduces significantly from quadratic to linear, which is also the asymptotically optimal worst-case complexity of any selection algorithm. In other words, the median of medians is an approximate median-selection algorithm that helps building an asymptotically optimal, exact general selection algorithm (especially in the sense of worst-case complexity), by producing good pivot elements.

Median of medians can also be used as a pivot strategy in quicksort, yielding an optimal algorithm, with worst-case complexity O(n log n). Although this approach optimizes the asymptotic worst-case complexity quite well, it is typically outperformed in practice by instead choosing random pivots for its average O(n) complexity for selection and average O(n log n) complexity for sorting, without any overhead of computing the pivot.

Similarly, Median of medians is used in the hybrid introselect algorithm as a fallback for pivot selection at each iteration until kth largest is found. This again ensures a worst-case linear performance, in addition to average-case linear performance: introselect starts with quickselect (with random pivot, default), to obtain good average performance, and then falls back to modified quickselect with pivot obtained from median of medians if the progress is too slow. Even though asymptotically similar, such a hybrid algorithm will have a lower complexity than a straightforward introselect up to a constant factor (both in average-case and worst-case), at any finite length.
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
export default class Median extends React.Component {
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
		let result = mSelection(payload, index);
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
							title={"Median Of Medians Quick Select - Execute"}
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
							function={mSelection}
						/>
					</Col>
				</Row>
			</div>
		);
	}
}

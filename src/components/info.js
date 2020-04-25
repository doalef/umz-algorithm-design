import React from "react";
import { Card, Row, Col } from "antd";
import Highlight from "react-highlight";
import "highlight.js/styles/a11y-dark.css";
var beautify = require("js-beautify").js;
export default class AlgorithmInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Card title="Algorithm Info" style={{ marginTop: 16 }}>
				<Row>
					<Col md={12}>
						<p style={{ fontSize: 16 }}>{this.props.details}</p>
					</Col>
					<Col md={12}>
						<Highlight language="javascript">
							{beautify(this.props.function.toString(), {
								indent_size: 2,
							})}
						</Highlight>
					</Col>
				</Row>
			</Card>
		);
	}
}

import React from "react";
import { Card, Row, Col } from "antd";
import Highlight from "react-highlight";
import "highlight.js/styles/a11y-dark.css";

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
							{this.props.function.toString()}
						</Highlight>
					</Col>
				</Row>
			</Card>
		);
	}
}

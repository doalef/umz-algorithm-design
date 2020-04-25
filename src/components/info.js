import React from "react";
import { Card, Row, Col } from "antd";
import Highlight from "react-highlight";
import "highlight.js/styles/a11y-dark.css";
var beautify = require("js-beautify").js;
let options = {
	indent_size: 4,
	indent_char: " ",
	indent_with_tabs: false,
	editorconfig: false,
	eol: "\n",
	end_with_newline: false,
	indent_level: 0,
	preserve_newlines: true,
	max_preserve_newlines: 10,
	space_in_paren: false,
	space_in_empty_paren: false,
	jslint_happy: false,
	space_after_anon_function: false,
	space_after_named_function: false,
	brace_style: "collapse",
	unindent_chained_methods: false,
	break_chained_methods: false,
	keep_array_indentation: false,
	unescape_strings: false,
	wrap_line_length: 0,
	e4x: false,
	comma_first: false,
	operator_position: "before-newline",
	indent_empty_lines: false,
	templating: ["auto"],
};
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
							{beautify(this.props.function.toString(), options)}
						</Highlight>
					</Col>
				</Row>
			</Card>
		);
	}
}

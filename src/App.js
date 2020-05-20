import React from "react";
import { Menu, Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import items from "./_nav";
import InsertionSort from "./containers/sortings/insertion";
import MergeSort from "./containers/sortings/merge";
import FloydRivest from "./containers/selection/floydRivest";

// import quickselect from "./lib/selection";

// var arr = [7, 3, 4, 0, 1, 1,3, 6];
// console.log(quickselect(arr, 7));

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,
			broken: false,
			key: "insertion",
		};
	}

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	renderMenuItems() {
		return items.map((item, index) => {
			if (item.items)
				return (
					<Menu.SubMenu
						key={item.key}
						title={
							<span>
								{item.icon
									? React.cloneElement(item.icon, {})
									: null}
								<span className="nav-text">{item.title}</span>
							</span>
						}>
						{item.items.map((i, key) => {
							return (
								<Menu.Item key={i.key}>
									{i.icon
										? React.cloneElement(i.icon, {})
										: null}
									<span className="nav-text">{i.title}</span>
								</Menu.Item>
							);
						})}
					</Menu.SubMenu>
				);
			else
				return (
					<Menu.Item key={item.key}>
						{React.cloneElement(item.icon, {})}
						<span className="nav-text">{item.title}</span>
					</Menu.Item>
				);
		});
	}

	renderContainer() {
		switch (this.state.key) {
			case "insertion":
				return <InsertionSort />;
			case "merge":
				return <MergeSort />;
			case "floyd-rivest":
				return <FloydRivest />;
			default:
				return <InsertionSort />;
		}
	}

	render() {
		return (
			<div>
				<Layout style={{ minHeight: "100vh", background: "white" }}>
					<Layout.Sider
						trigger={null}
						breakpoint="sm"
						zeroWidthTriggerStyle={{ display: "none" }}
						onBreakpoint={(broken) => {
							this.setState({ broken, collapsed: broken });
						}}
						collapsedWidth={this.state.broken ? 0 : 80}
						collapsible
						collapsed={this.state.collapsed}>
						<Menu
							onSelect={({ key }) => this.setState({ key })}
							defaultSelectedKeys={["insertion"]}
							defaultOpenKeys={["sortings"]}
							style={{ height: "100vh" }}
							mode="inline">
							{this.renderMenuItems()}
						</Menu>
					</Layout.Sider>
					<Layout>
						<Layout.Header
							style={{
								padding: 0,
								background: "white",
								boxShadow: "0 1px 4px rgba(0,21,41,.08)",
								zIndex: 10,
							}}>
							{React.createElement(
								this.state.collapsed
									? MenuUnfoldOutlined
									: MenuFoldOutlined,
								{
									className: "trigger",
									onClick: this.toggle,
									style: { marginLeft: 16 },
								}
							)}
						</Layout.Header>
						<Layout.Content style={{ margin: "24px 16px 0" }}>
							{this.renderContainer()}
						</Layout.Content>
						<Layout.Footer style={{ textAlign: "center" }}>
							Developed in quarantine by Amirali Ahmadi :)
						</Layout.Footer>
					</Layout>
				</Layout>
			</div>
		);
	}
}

export default App;

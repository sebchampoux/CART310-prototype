import React, { Component } from 'react'

export default class Sidebar extends Component {
	render() {
		return (
			<div className={"sidebar " + this.props.className}>
				{this.props.children}
			</div>
		)
	}
}

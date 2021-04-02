import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'

export default class MyPopUp extends Component {
	render() {
		return (
			<div className="my-pop-up-wrapper">
				<div className={"my-pop-up " + this.props.className}>
					<button
						className="btn btn-danger my-pop-up__close-btn"
						onClick={this.props.closeFct}>
						<FontAwesomeIcon icon="times" />
					</button>
					{this.props.children}
				</div>
			</div>
		)
	}
}

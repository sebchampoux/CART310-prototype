import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'

export default class SectionTitle extends Component {
	render() {
		return (
			<div className="section-title">
				<p className="section-title__title">
					<FontAwesomeIcon icon={this.props.icon} className="section-title__icon" />
					{this.props.title}
				</p>
			</div>
		)
	}
}

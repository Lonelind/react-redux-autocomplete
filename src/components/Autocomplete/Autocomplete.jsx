import React from 'react';
import block from 'bem-cn';

import './autocomplete.styl';

export default class Autocomplete extends React.Component {
	static displayName = 'Autocomplete';

	// static propTypes = {
	// 	selectedValue
	// 	onValueChange: React.PropTypes.function.required,
	// };

	state = {
		opened: false,
		focus: false,
		query: '',
		direction: 'down',
	};

	constructor(props) {
		super();

		this.block = block(props.className || 'autocomplete');
		this.clickOutsideHandler = this.handleClickOutside.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		this.updateQuery(
			nextProps.selectedValue 
				? this.getChildFromValue(nextProps.children, nextProps.selectedValue)
					.props.label
				: ''
		);
	}

	componentWillUpdate(nextProps, nextState) {
		if (!this.state.opened && nextState.opened) {
			document.addEventListener('click', this.clickOutsideHandler);

		} else if (this.state.opened && !nextState.opened) {
			document.removeEventListener('click', this.clickOutsideHandler);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.opened && !prevState.opened) {
			this.setDirection();
		}
	}

	getChildFromValue(children, value) {
		let child = React.Children
			.toArray(children)
			.filter((child) => child.props.value === value)[0];

		if (child) {
			return child;
		}

		return null;
	}

	setDirection() {
		// todo: check up-down
		let listWrapperRect = this.listWrapper && this.listWrapper.getBoundingClientRect();
		let inputRect = this.input && this.input.getBoundingClientRect();

		let inVerticalViewportDown = (listWrapperRect.top >= 0 && listWrapperRect.bottom <= (window.innerHeight || document.documentElement.clientHeight));
		let inVerticalViewportUp = (inputRect.top - listWrapperRect.height >= 0 && inputRect.top <= (window.innerHeight || document.documentElement.clientHeight));

		this.setState({
			direction: inVerticalViewportDown || !inVerticalViewportDown && !inVerticalViewportUp
				? 'down' : 'up',
		});
	}

	updateQuery(value) {
		this.setState({
			query: value,
		});
	}

	toggleFocusState(focus, opened) {
		this.setState({
			focus,
			opened,
		});
	}

	fallBackToNative(evt) {
		evt.preventDefault();

		this.select.focus();
	}

	handleScroll(evt) {
		evt.preventDefault();
	}

	handleClickOutside(evt) {
		if (evt.target === this.input) {
			return;
		}

		this.toggleFocusState(false, false);
	}

	handleClickArrow(evt) {
		if (this.state.opened) {
			this.toggleFocusState(false, false);
		} else {
			this.input.focus();
		}

	}

	handleClickCross() {
		this.toggleFocusState(false, false);
		this.props.onValueChange('');
	}

	renderChild(child) {
		return React.cloneElement(child, {
			className: this.props.className,
			selected: this.props.selectedValue 
				&& this.props.selectedValue === child.props.value,
			onClick: (evt) => {
				evt.stopPropagation();

				this.props.onValueChange(child.props.value);
				this.toggleFocusState(false, false);
			},
			query: this.state.query,
		});
	}

	renderSelectOption(child) {
		return (
			<option value={child.props.value}>
				{child.props.label}
			</option>
		);
	}

	render() {
		return (
			<div className={this.block({ 
					drop: this.state.direction,
					focus: this.state.focus,
					open: this.state.opened,
				})}
			>
				<div className={this.block('query')}>
					<input 
						className={this.block('input')}
						type="text"
						value={this.state.query}
						onChange={(evt) => this.updateQuery(evt.target.value)}
						onFocus={(evt) => this.toggleFocusState(true, true)}
						onTouchEnd={(evt) => this.fallBackToNative(evt)}
						ref={(input) => this.input = input}
					/>
					{(!this.state.query || this.state.focus) && this.state.direction === 'down' 
						? (
							<span className={this.block('placeholder')}>
								{this.props.placeholder}
							</span>
						) : null
					}
					{this.state.query
						? (
							<span
								className={this.block('arrow')({ style: 'cross' })}
								onClick={(evt) => this.handleClickCross(evt)}
							>&times;</span>
						) : (
							<span
								className={this.block('arrow')}
								onClick={(evt) => this.handleClickArrow(evt)}
							>▼</span>
						)
					}
				</div>
				<div 
					className={this.block('list-wrapper')}
					onScroll={(evt) => this.handleScroll(evt)}
					ref={(listWrapper) => this.listWrapper = listWrapper}
				>
					<ul className={this.block('list')}>
						{React.Children.map(this.props.children, this.renderChild.bind(this))}
					</ul>
				</div>
				<select
					className={this.block('select').is('hidden')}
					onChange={(evt) => this.props.onValueChange(evt.target.value)}
					value={this.props.selectedValue}
					size="0"
					ref={(select) => this.select = select}
				>
					{React.Children.map(this.props.children, this.renderSelectOption.bind(this))}
				</select>
			</div>
		);
	}
}
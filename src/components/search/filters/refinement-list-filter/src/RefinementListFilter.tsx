import * as React from "react";
import * as _ from "lodash";
import "../styles/index.scss";

import {
	Searcher,
	SearchkitManager,
	SearchkitComponent,
	FacetAccessor,
	FastClick
} from "../../../../../core"



export interface IRefinementListFilter {
	field:string
	operator?:string
	size?:number
	title:string
	id:string
	mod?:string
}

export class RefinementListFilter extends SearchkitComponent<IRefinementListFilter, any> {
	accessor:FacetAccessor

	shouldCreateNewSearcher() {
		return true;
	}

	constructor(props) {
		super(props);
		this.state = {
			showMore: false
		}
	}

	defineAccessor() {
		return new FacetAccessor(
			this.props.field,
			{id:this.props.id, operator:this.props.operator, title:this.props.title, size:(this.props.size || 50)}
		)
	}

	defineBEMBlocks() {
		var blockName = this.props.mod || "refinement-list"
		return {
			container: blockName,
			option: `${blockName}-option`
		}
	}

	addFilter(option) {
		this.accessor.state = this.accessor.state.toggle(option.key)
		this.searchkit.performSearch()
	}

	renderOption(option) {
		let block = this.bemBlocks.option
		let isSelected = this.accessor.state.contains(option.key)

		let optionClassName = block()
			.mix(this.bemBlocks.container("item"))
			.state({selected:isSelected})

		return (
			<FastClick handler={this.addFilter.bind(this, option)} key={option.key}>
				<div className={optionClassName}>
					<div className={block("checkbox").state({selected:isSelected})}></div>
					<div className={block("text")}>{this.translate(option.key)}</div>
					<div className={block("count")}>{option.doc_count}</div>
				</div>
			</FastClick>
		)
	}

	hasOptions():boolean {
		return this.accessor.getBuckets().length != 0
	}

	toggleViewMore() {
		let showMore = !this.state.showMore
		this.setState({showMore:showMore})
		if (showMore) {
			this.accessor.setSize(200);
		} else {
			this.accessor.setSize(this.props.size || 50);
		}
		this.searchkit.performSearch()
	}

	renderShowMore() {
		let label = this.state.showMore ? "view less" : "view more"
		return (
			<FastClick handler={this.toggleViewMore.bind(this)}>
				<div className={this.bemBlocks.container("view-more-action")}>
					{label}
				</div>
			</FastClick>
		)
	}

	render() {

		let block = this.bemBlocks.container
		let className = block()
			.mix(`filter--${this.props.id}`)
			.state({
				disabled: !this.hasOptions()
			})

		return (
			<div className={className}>
				<div className={block("header")}>{this.props.title}</div>
				<div className={block("options")}>
				{_.map(this.accessor.getBuckets(), this.renderOption.bind(this))}
				</div>
				{this.renderShowMore()}
      </div>
		);
	}
}

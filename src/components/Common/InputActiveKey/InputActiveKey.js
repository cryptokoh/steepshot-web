import React from 'react';
import {connect} from "react-redux";
import './inputActiveKey.css';
import ShowIf from "../ShowIf";
import {changeActiveKey, changeSavingKey} from "../../../actions/activeKey";
import GrayInput from "../GrayInput/GrayInput";

const InputActiveKey = ({className, activeKey, saveKey, changeSaveKey, changeActiveKey}) => (
	<div className={'container_input-active-key ' + (className || '')}>
		<p className="inputs-label">
			Active key
		</p>
		<GrayInput type="password" onChange={(e) => changeActiveKey(e.target.value)} value={activeKey}/>
		<div className="checkbox-field_input-active-key">
			<div className="checkbox_input-active-key" onClick={changeSaveKey}>
				<ShowIf show={saveKey}>
					<div className="save_input-active-key"/>
				</ShowIf>
			</div>
			<span>Save active key.</span>
		</div>
	</div>
);


const mapStateToProps = state => {
	const {activeKey, saveKey} = state.activeKey;
	return {
		activeKey,
		saveKey
	}
};

const mapDispatchToProps = dispatch => {
	return {
		changeSaveKey: () => {
			dispatch(changeSavingKey())
		},
		changeActiveKey: value => {
			dispatch(changeActiveKey(value))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(InputActiveKey);

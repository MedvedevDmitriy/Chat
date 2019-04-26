import { connect } from 'react-redux';
import Component from '../mainComponent/MainComponent.jsx';
// import * as selectors from './selectors';
import * as actions from './actions';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    initConnection: () => dispatch(actions.initConnection())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);

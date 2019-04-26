import Adapter from 'enzyme-adapter-react-16';
import mochaSnapshots from 'mocha-snapshots';
import { shallow, configure } from 'enzyme';
import { expect, assert } from 'chai';
import React from 'react';
import sinon from 'sinon';

configure({ adapter: new Adapter() });

global.React = React;
global.assert = assert;
global.shallow = shallow;
global.expect = expect;
global.mochaSnapshots = mochaSnapshots;
global.sinon = sinon;

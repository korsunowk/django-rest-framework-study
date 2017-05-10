/**
 * Created by base on 04.05.17.
 */

import React from 'react';
import ReactDOM from 'react-dom';

// var ApiButton = require('./components/button.js');
import PageHeader from './components/page-header'
import ApiButton from './components/button'

var styles = require('../sass/main.scss');


ReactDOM.render(
    (
        <div>
            <PageHeader/>
            <ApiButton className="first-button" title='Go go' href="/"/>
        </div>
    ),
    document.getElementById('root')
);

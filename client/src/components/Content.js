import React, { Component } from 'react';
import FusionCharts from 'fusioncharts/core';
import Msline from 'fusioncharts/viz/msline';
import ReactFC from 'react-fusioncharts';

ReactFC.fcRoot(FusionCharts, Msline);

export default class Content extends Component {
  render() {
    let { datasource } = this.props; 
    return (
        <div className="content">
            <div className="description">
              <p>
              Zipf's law is an empirical law formulated using mathematical statistics. The law is named after the linguist George Kingsley Zipf, who first proposed it.<br></br>
              Zipf's law states that given a large sample of words used, the frequency of any word is inversely proportional to its rank in the frequency table. So word number n has a frequency proportional to 1/n.
              </p>
            </div>
             <div id="chart-container">
             <ReactFC {...{
                type: 'msline',
                width: '900',
                height: '500',
                dataFormat: 'json',
                dataEmptyMessage: '',
                dataSource: datasource
              }}/> 
             </div>
        </div>
    )
  }
}

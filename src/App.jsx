import React from 'react'
import * as utils from './utils'
import DataTable from './components/DataTable'

import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignList: []
    }
  }
  componentDidMount() {
    window.AddCampaigns = (newCampaigns) => {
      try {
        const processedList = utils.processList(newCampaigns)

        if (processedList.goodList.length > 0) {
          console.log(`${processedList.goodList.length} new campaign(s) has bee added.`)
          this.setState(state => ({
            campaignList: state.campaignList.concat(processedList.goodList)
          }))
        }
        if (processedList.badList.length > 0) {
          console.error(`Failed to add the following campaign(s): ${processedList.badList} `)
          console.error(processedList.badList)
          return
        }
      } catch (e) {
        return e
      }
    }
  }
  render() {
    return (
      <div className="App">
        <h1>Campaign List</h1>
        <DataTable
          dataList={this.state.campaignList}
        />
      </div>
    );
  }
}

export default App;
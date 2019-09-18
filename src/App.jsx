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
      return this.processNewCampaigns(newCampaigns)
    }
  }

  processNewCampaigns = (newCampaigns) => {
    try {
      if (newCampaigns.length === 0) {
        throw new Error('Input array cannot be empty!')
      }
      const processedList = utils.processList(newCampaigns, this.state.campaignList)

      if (processedList.goodList.length > 0) {
        console.log(`${processedList.goodList.length} new campaign(s) has bee added.`)

        this.setState(state => ({
          campaignList: state.campaignList.concat(processedList.goodList)
        }))
      } else {
        console.log('No campain was added.')
      }
      if (processedList.badList.length > 0) {
        console.error(`Failed to add the following campaign(s): ${JSON.stringify(processedList.badList)}`)
      } else {
        console.log('No error found.')
      }
    } catch (e) {
      return e
    }
    return 'Done! Please see above for details.'
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
import React, { Component, PropTypes } from 'react'
import { Spin, message, Table } from 'antd'

const columns1 = [{
  title: 'Ticker-Name',
  dataIndex: 'ticker'
}, {
  title: 'Company-Name',
  dataIndex: 'Company-Name'
}, {
  title: 'Exchange-Name',
  dataIndex: 'Exchange-Name'
}, {
  title: 'previous_close_price',
  dataIndex: 'previous_close_price'
}, {
  title: 'volume',
  dataIndex: 'volume'
}, {
  title: 'unit',
  dataIndex: 'unit'
}, {
  title: 'first-trade',
  dataIndex: 'first-trade'
}, {
  title: 'last-trade',
  dataIndex: 'last-trade'
}, {
  title: 'currency',
  dataIndex: 'currency'
}, {
  title: 'last_update',
  render: () => '2017-3-10'
}]



class DowjonesDetail extends Component {

   static proptypes = {
    search: PropTypes.string,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    selectedDowjones: PropTypes.array,
    startTime: PropTypes.object,
    endTime: PropTypes.object,
    loadDowjonesDetail: PropTypes.func
  }

   componentDidMount(){
    const { 
      search,
      loadDowjonesDetail
    } = this.props
    const items = search.trim().slice(1).split('&');
    loadDowjonesDetail(items)

  }

  componentWillReceiveProps(props){

  }

  handleCollection = (record) => {
    console.log(record);
    let ref = new Wilddog("https://july95685.wilddogio.com/collection");
    ref.push(record.ticker.toUpperCase())
  }

  render(){

    const { Column, ColumnGroup } = Table;

    const {
      selectedDowjones
    } = this.props
    let selectedDowjonesDetails = [];
    console.log(selectedDowjones);
    for (var value of selectedDowjones) {
      console.log(value);
      selectedDowjonesDetails.push(value.meta);
    }


    

    console.log(selectedDowjonesDetails);
    let table = (
      <Table 
        columns={columns1} 
        dataSource={selectedDowjonesDetails}
      />
    )

    return (
      <div>
        <Table dataSource={selectedDowjonesDetails} pagination={false}>
          <Column
            title="Ticker-Name"
            dataIndex="ticker"
          />
          <Column
            title="Company-Name"
            dataIndex="Company-Name"
          />
          <Column
            title="Exchange-Name"
            dataIndex="Exchange-Name"
          />
           <Column
            title="unit"
            dataIndex="unit"
          />
        </Table>
        <Table dataSource={selectedDowjonesDetails} pagination={false} style={{ marginBottom:'16px' }}>
           <ColumnGroup title="Trade">
            <Column
              title="First Trade"
              dataIndex="first-trade"
            />
            <Column
              title="Last Trade"
              dataIndex="last-trade"
            />
          </ColumnGroup>
          <Column
            title="currency"
            dataIndex="currency"
          />
           <Column
            title="previous_close_price"
            dataIndex="previous_close_price"
          />
          <Column
            title="Collection"
            render={(text, record) => (
              <span>
                <a onClick={this.handleCollection.bind(this,text)}>Add to Collection</a>
              </span>
            )}
          />
        </Table>
        
      </div>
    )
  }
}

export default DowjonesDetail
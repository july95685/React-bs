import React, {Component, PropTypes} from 'react'
import { Table, Spin, message, Button, Icon } from 'antd'

const { Column, ColumnGroup } = Table;

const columns = [{
  title: 'Ticker-Name',
  dataIndex: 'ticker',
  render: text => text.toUpperCase()
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
  title: 'last_update',
  render: () => '2017-3-10'
}, {
  title: 'Collection',
  key: 'collection',
  render: (text, record) => (
    <span>
      <a href="" >Remove</a>
    </span>
  ),
}]

class CollectionList extends Component {
  static propTypes = {
    dowjonesList: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.bool,
    loading: PropTypes.bool,
    query: PropTypes.string,
    loadDowjones: PropTypes.func,
    push: PropTypes.func
  }


  state = {
    selectedRowKeys: []
  }

  componentDidMount(){
    console.log(2);
    this.props.loadDowjones();
    this.props.loadCollectionago();
  }

  handleCollection = (val,CollectionList) => {
    console.log(val);
    console.log(CollectionList)
    this.props.delectCollection(val,this.props.collection);

  }

  handleSelectChange = (selectedRowKeys) => {
    console.log(selectedRowKeys);
    this.setState({ selectedRowKeys })
  }

  handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const { push } = this.props
    const { selectedRowKeys } = this.state
    const items = selectedRowKeys.join('&')

    push(`/detail?${items}`)
  }


  render(){
    const {
      loading,
      error,
      dowjonesList,
      collection
    } = this.props

    let testArray = ["AXP","CAT"];
    let CollectionList = [];
    console.log(dowjonesList);
    console.log(collection);
    // if(collection){
    //   console.log(typeof(collection));
    //   for(val in collection){
    //     console.log(val);
    //   }
    // }
    if(dowjonesList && collection){
      dowjonesList.forEach(function(val,ind){
        val.key = val.key.toUpperCase();
        collection.forEach(function(value){
          if(value == val.key){
            CollectionList.push(val);
          }
        })
        // if(val.key.toUpperCase() == "AXP"){
        //   CollectionList.push(val);
        // }
      })
    }

    console.log(CollectionList);

    const { selectedRowKeys } = this.state

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0

    let table = (
      <Table 
        columns={columns} 
        dataSource={CollectionList}
        rowSelection={rowSelection}
      />
    )

    if (error) {
      message.error("加载数据错误！")
    }

    if (loading) {
      return (
        <div className=''>
          <Spin size="large" >
            {table}
          </Spin>
        </div>
      )
    }

    return (
      <div className="preview-list">
        <div style={{ marginBottom: 16 }}>
          <Button 
            type="primary" 
            onClick={this.handleClick}
            disabled={!hasSelected} 
            loading={loading}
            icon="search"
          >
             详细查看
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `选择了${selectedRowKeys.length}条数据` : ''}
          </span>
        </div>
        <Table dataSource={CollectionList}
        rowSelection={rowSelection}>
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
            title="Volume"
            dataIndex="volume"
          />
          <Column
            title="previous_close_price"
            dataIndex="previous_close_price"
          />
          <Column
            title="Collection"
            render={(text, record) => (
              <span>
                <a onClick={this.handleCollection.bind(this,text,CollectionList)}>Remove from Collection</a>
              </span>
            )}
          />
        </Table>
      </div>
    )
  }
}

export default CollectionList
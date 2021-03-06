import React, {Component, PropTypes} from 'react'
import { Table, Spin, message, Button, Icon } from 'antd'

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
}]

class PreviewList extends Component {
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
    //this.props.loadCollectionago();
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

  collectionClick = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const { push } = this.props
    const { selectedRowKeys } = this.state
    console.log(this.state);

    push(`/collection`)
  }

  addCollection = (e) => {
    let ref = new Wilddog("https://july95685.wilddogio.com/collection");
    // ref.on("value", function(snapshot) {
    //     console.log(snapshot.val());

    //     //ref.push("c");
    //  }, function (errorObject) {
    //      console.log("The read failed: " + errorObject.code);
    //  });
    ref.push("MMM");
    ref.push("AXP");
  }


  render(){
    const {
      loading,
      error,
      dowjonesList,
    } = this.props

    const { selectedRowKeys } = this.state

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0

    let table = (
      <Table 
        columns={columns} 
        dataSource={dowjonesList}
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
          <div style = {{ float: "right" }}>
           <Button 
            type="primary" 
            onClick={this.collectionClick}
            loading={loading}
            icon="collection"
          >
            我的收藏
          </Button></div>
        </div>
        {table}
         <Button 
          type="primary" 
          onClick={this.addCollection}
        >
          添加测试
        </Button>
      </div>
    )
  }
}

export default PreviewList
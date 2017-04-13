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
    this.props.loadDowjones()
  }

  handleSelectChange = (selectedRowKeys) => {
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
        </div>
        {table}
      </div>
    )
  }
}

export default PreviewList
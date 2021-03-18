/** @format */

interface IDataSourceStore {
  _dataSource: any[];
  dataSource: any[];
  onRowChange: (text, record) => void;
}

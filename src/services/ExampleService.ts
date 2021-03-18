/**
 * @format
 * @Description: example服务
 */

import Request from 'utils/request';
class ExampleService {
  /**
   *  接口简介 示例接口简介
   *  接口备注 示例接口备注
   *  接口类型 get
   *  接口地址 /v1/example
   *  @param  string 身份证明-实例id
   *  @param code string 编码
   *  @param parentCode string 父编码  顶级编码为0
   *  @param status integer 0 禁用  1启用
   */
  public async get_v1_example({ code, parentCode, status }, restParam = {}) {
    return Request({
      url: `example`,
      method: 'GET',
      data: {},
      query: { code, parentCode, status },
      app: 'data',
      version: 'v1',
      ...restParam
    });
  }

  /**
   *  接口简介 新增一个example
   *  接口备注 新增一个example
   *  接口类型 post
   *  接口地址 /v1/example
   *  @param exampleCreateReqDto [object Object] exampleCreateReqDto
   */
  public async post_v1_example({ exampleCreateReqDto }, restParam = {}) {
    return Request({
      url: `example`,
      method: 'POST',
      data: exampleCreateReqDto,
      query: {},
      app: 'data',
      version: 'v1',
      ...restParam
    });
  }

  /**
   *  接口简介 修改一个example
   *  接口备注 修改一个example
   *  接口类型 put
   *  接口地址 /v1/example
   *  @param exampleModifyReqDto [object Object] exampleModifyReqDto
   */
  public async put_v1_example({ exampleModifyReqDto }, restParam = {}) {
    return Request({
      url: `example`,
      method: 'PUT',
      data: exampleModifyReqDto,
      query: {},
      app: 'data',
      version: 'v1',
      ...restParam
    });
  }

  /**
   *  接口简介 删除一个example
   *  接口备注 删除一个example
   *  接口类型 delete
   *  接口地址 /v1/example/code
   *  @param code string 编码

   */
  public async delete_v1_example_code({ code }, restParam = {}) {
    return Request({
      url: `example/code`,
      method: 'DELETE',
      data: {},
      query: { code },
      app: 'data',
      version: 'v1',
      ...restParam
    });
  }
}
export default new ExampleService();

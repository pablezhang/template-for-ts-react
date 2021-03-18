/** @format */

const url = 'https://petstore.swagger.io/v2/swagger';

const parentFunTemplate = `
/**
 * @Description: </FileDescription/>
 */
// @ts-ignore
import Request from 'utils/request';
class </parentFunName/> {
  </childFunList/>
}
export default new </parentFunName/>`;

const centerName = 'user';

const childFunTemplate = `
  /**
</childInfo/>
</childParams/>
   */
    public async </childFunName/> ({</childrenParams/>}, restParam={}) {
      return Request({
        </childrenUrl/>,
        method:</childrenMetHod/>,
        data: </childrenName/>,
        query: {</QueryNames/>},
        app: </Centername/>,
        version: </version/>,
        ...restParam
      })
    }
`;

const outputPath = './ts-src/services';

const excludeParamName = ['Application-Key', 'Access-Token', 'extFields'];

const config = {
  childFunTemplate,
  excludeParamName,
  outputPath,
  parentFunTemplate,
  url,
  center: centerName
};

module.exports = config;

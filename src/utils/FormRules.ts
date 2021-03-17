/**
 * @format
 * @Description: 通用规则
 * @Autho: luckybo
 * @Date:2019/11/12 20:19
 */

export const FormRules = {
  isRequired: [
    {
      required: true,
      message: '不能为空'
    }
  ],
  maxName20: [
    {
      max: 20,
      message: '不能超过20个字符'
    }
  ],
  maxName50: [
    {
      max: 50,
      message: '不能超过50个字符'
    }
  ],
  maxName200: [
    {
      max: 200,
      message: '不能超过200个字符'
    }
  ],
  wordNumLinAndChinese: [
    {
      pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
      message: '请使用中文、字母、下划线、数字'
    }
  ],
  noChinese: [
    {
      pattern: /^[\x01-\x7f]*$/,
      message: '不支持中文'
    }
  ],
  wordNumAndLint: [
    {
      pattern: /^[0-9a-zA-Z._]+$/,
      message: '请使用字母，下划线，数字'
    }
  ],

  wordNumLintAndColLint: [
    {
      pattern: /^[0-9a-zA-Z._-]+$/,
      message: '请使用字母，下划线，横线，数字'
    }
  ],
  headwordNumAndLint: [
    {
      pattern: /^[a-zA-Z][0-9a-zA-Z._]*$/,
      message: '只能字母开头,请使用字母，下划线，数字，点号'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码'
    },
    {
      pattern: /^(?![0-9]+$)[a-z0-9]{6,}$/i,
      message: '字母与数字组合不含符号，且不少于6位'
    },
    {
      max: 50,
      message: '密码不得超过50个字符'
    }
  ],
  phone: [
    {
      pattern: /^1[3456789][0-9]{9}$/,
      message: '请输入11位常用手机号'
    }
  ],
  email: [
    {
      pattern: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      message: '请输入正确的邮箱账号'
    }
  ]
};

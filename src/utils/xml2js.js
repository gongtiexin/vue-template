import xml2js from 'xml2js';

// 用于访问属性的前缀
const ATTR_KEY = '$';
// 用于访问字符内容的前缀
const CHAR_KEY = '_';

// With parser
const parser = new xml2js.Parser(
  /* options */ { explicitArray: false, attrkey: ATTR_KEY, charkey: CHAR_KEY },
);

const parseString = data =>
  parser
    .parseStringPromise(data)
    .then(function(result) {
      console.log('Done', result);
      return result;
    })
    .catch(err => {
      console.log('Failed', err);
    });

// With builder
const builder = new xml2js.Builder({ attrkey: ATTR_KEY, charkey: CHAR_KEY });

const buildObject = obj => builder.buildObject(obj);

export default { parseString, buildObject, ATTR_KEY, CHAR_KEY };

/**
 * 全局属性配置
 * */

const configObj = {};

/**
 * 算子属性配置
 * */
const tableObj = {
  tables: {
    table: [
      {
        [ATTR_KEY]: {
          name:
            '表名，String类型，不包含空格、正斜杠(/)、#号(#)、分号(;)、冒号(:)、点(.)、逗号(,)、等号(=)，必填',
          version: 'version：版本号，String类型，不包含空格，选填',
          type: '表类型，String类型，不包含空格，必填，暂支持填写spark',
          label: '表标签，String类型，不包含空格，选填',
        },
        // 存储信息
        storage: {
          [ATTR_KEY]: {
            dbname:
              '数据库名，String类型，不包含空格、正斜杠(/)、#号(#)、分号(;)、冒号(:)、点(.)、逗号(,)、等号(=)，必填',
            format: '表存储格式，String类型，不包含空格，必填',
            path: '表数据存储路径（HDFS路径），String类型，不包含空格、等号(=)、逗号(,)，必填',
            label: '表标签，String类型，不包含空格，选填',
            // 表属性配置，可配置多个，选填
            property: {
              [ATTR_KEY]: {
                key: '属性key，String类型，不包含空格、等号(=)，必填',
                value: '属性值，String类型，不包含空格、等号(=)，必填',
              },
            },
          },
        },
        partitions: {
          [ATTR_KEY]: {
            // TODO 全局配置项
            config:
              '表region分省配置文件路径String类型，不包含空格，必填，支持填写指定路径配置和固定路径配置',
            region: [
              {
                [ATTR_KEY]: {
                  name:
                    '表的分区名，String类型，不包含空格、分号(;)、#号(#)、正斜杠(/)、冒号(:)、点(.)、逗号(,)、等号(=)，必填',
                  type: '分区字段类型，String类型，不包含空格，必填',
                  var: '分区变量名，String类型，不包含空格、点(.)、逗号(,)、等号(=)，必填',
                },
              },
            ],
            time: [
              {
                [ATTR_KEY]: {
                  name:
                    '表的分区名，String类型，不包含空格、分号(;)、#号(#)、正斜杠(/)、冒号(:)、点(.)、逗号(,)、等号(=)，必填',
                  type: '分区字段类型，String类型，不包含空格，必填',
                  var: '分区变量名，String类型，不包含空格、点(.)、逗号(,)、等号(=)，必填',
                  format: '格式，时间格式(yyyy、MM、DD、dd、ww、WW、HH、mm)，必填',
                  duration: '时间配置，String类型，(1Y、1M、7*24*60m、24*60m、60m、15m、5m)，必填',
                  identifiertime:
                    '表示该时间分区是相对于前面哪个分区的值，不配置表示相对上一级，String类型，选填',
                },
              },
            ],
          },
        },
        // 数据置信度，可选，不配置表示使用全局配置
        confidence: {
          [ATTR_KEY]: {
            percent: '置信度百分比值，short类型，必填',
            delay:
              '延迟等待时间，这里配置的为key，通过key去config_file里获取对应的value值，String类型，不包含空格，必填',
            type: '表类型，String类型，不包含空格，必填，暂支持填写spark',
            label: '表标签，String类型，不包含空格，选填',
            // TODO
            [CHAR_KEY]:
              'confidence_delay_cfg.conf：文件路径，String类型，不包含空格，必填，格式为key=value，路径配置规则，支持填写固定路径配置',
          },
        },
        // 数据存储周期
        savetime: {
          [ATTR_KEY]: {
            // TODO
            type: 'savetime_type_cfg.conf文件中key值，String类型，不包含空格，必填',
            [CHAR_KEY]:
              'savetime_type_cfg.conf：文件路径，String类型，不包含空格，必填，文件内容格式为key=value，路径配置规则，支持填写固定路径配置',
          },
        },
        // 数据表字段，用于建表
        columns: {
          column: {
            [CHAR_KEY]:
              '字段名与字段类型用空格分隔，如果字段类型包含<>，需要转义。eg：enbues1apid array<int>需要转义为enbues1apid array &lt;int &gt; ',
          },
        },
      },
    ],
  },
};

/**
 * 算子属性配置
 * */
const algorithmObj = {
  task: {
    [ATTR_KEY]: {
      name: '算法名，String类型，不包含#号、空格，必填，同一个项目下算法名不能重复',
      version: '版本号，String类型，不包含空格，选填',
      type: '算法类型，String类型，不包含空格，暂支持填写spark和spark-datasync，必填',
    },
    schedule: {
      region: {
        [ATTR_KEY]: { config: 'String类型，不包含空格、逗号(,)，选填' },
        // TODO divide
      },
      period: {
        [ATTR_KEY]: {
          cron: '调度周期，java cron 表达式格式，必填',
          var: '偏移变量，String类型，不包含空格、逗号(,)、点(.)、等号(=)，必填',
        },
      },
      drive: {
        [ATTR_KEY]: { type: 'String类型，data、time二选一，必填' },
      },
    },
    algorithm: {
      language: {
        [ATTR_KEY]: { type: 'String类型，暂支持填写 sql 、jar、python 类型，必填' },
        // sql
        // sql: { [CHAR_KEY]: 'sql文件路径，String类型，不包含空格、逗号(,)，必填' },
        // jar: { [CHAR_KEY]: '扩展jar包路径配置，String类型，不包含空格、逗号(,)，选填' },

        // jar
        // jar: { [CHAR_KEY]: 'String类型，不包含空格、逗号(,)', [ATTR_KEY]: { classname: 'String类型，不包含空格' } }, //rdd jar
        // jar: { [CHAR_KEY]: 'String类型，可配置多个jar包，以逗号分隔' }, //udf jar

        // python
        // py: 'python任务主程序文件路径，String类型，不包含空格、逗号(,)，必填',
        // pyfiles: 'python任务自定义包路径，String类型，不包含空格，多个文件以逗号分隔',
        // jar: 'python任务扩展jar包路径，String类型，不包括空格，多个jar包以逗号分隔',
      },
    },
    inputdata: Object.values(tableObj.tables.table).map(table => ({
      [ATTR_KEY]: {
        type: table[ATTR_KEY].type,
        tablename: table[ATTR_KEY].name,
        // dbname: '数据库名，String类型，不包含空格、正斜杠(/)、#号(#)、分号(;)、冒号(:)、点(.)、逗号(,)、等号(=)，必填',
        dbname: table[ATTR_KEY].dbname || 'xxx',
        // var: '用于sql where 条件替换的变量，String类型，不包含空格、$符号、点(.)',
        var: table[ATTR_KEY].var,
      },
      // TODO region time
    })),
    // TODO
    datasync: {},
  },
};

const xml = `
<?xml version="1.0" encoding="UTF-8"?>
<task name="time_ods_lte_mro_q_hw" version="v1.0" type="spark">
  <!--***************************************************************************************************-->
  <schedule>
    <region config="region_province_hw.xml"><!--task divide by region, example: multiple province task-->
      <divide var="p_provincecode"></divide><!--the config is a tree construction, this is the first level-->
      <divide var="p_region"></divide><!--the config is a tree construction, this is the second level-->
    </region>
    <period cron="0 0/15 * * * ?" var="plantime"></period>
    <drive type="data"></drive><!--data drive-->
  </schedule>
  <!--***************************************************************************************************-->
  <algorithm>
    <language type="sql"><!--sql task-->
      <sql>time_ods_lte_mro_q_hw.sql</sql>
      <jar></jar><!--udf jar-->
      <jar classname="com.hongshan.xxxx" >jar_file</jar>
    </language>
  </algorithm>
  <!--***************************************************************************************************-->
  <inputdata type="spark" dbname="hsdlake" tablename="temp_ods_lte_mro_q_hw">
    <region by="p_provincecode">p_provincecode</region>
    <time by="p_date"></time>
    <time by="p_hour"></time>
    <time by="p_quarter"></time>
  </inputdata>
  <!--***************************************************************************************************-->
  <outputdata type="spark" dbname="hsdlake" tablename="time_ods_lte_mro_q">
    <region by="p_provincecode">p_provincecode</region>
    <time by="p_date"></time>
    <time by="p_hour"></time>
    <region by="p_region">p_region</region>
    <time by="p_quarter">plantime-2</time>
  </outputdata>
  <!--***************************************************************************************************-->
  <common_config>commoncfg.xml</common_config>
  <special_config>specialcfg.conf</special_config>
  <custom_config>customcfg.conf</custom_config>
  <!--***************************************************************************************************-->
</task>
`;

parseString(xml);
console.log(buildObject(tableObj));
console.log(buildObject(algorithmObj));

<template>
  <el-popover
    v-model="visible"
    width="300"
    trigger="click"
    @show="handleShow"
    @after-leave="handleHide"
  >
    <div class="hs-table-filter-wrapper">
      <el-input v-model="input" size="mini" prefix-icon="el-icon-search" placeholder="请输入内容" />
      <vxe-table
        ref="table"
        :loading="loading"
        size="mini"
        border
        stripe
        align="center"
        show-overflow
        highlight-hover-row
        auto-resize
        max-height="400"
        :data="data"
        @checkbox-all="selectAllEvent"
        @checkbox-change="selectChangeEvent"
      >
        <vxe-table-column type="checkbox" width="60" />
        <vxe-table-column
          field="field"
          title="全选"
          show-overflow="tooltip"
          :formatter="column.formatter"
        />
      </vxe-table>
      <div class="hs-table-filter-footer">
        <el-button size="mini" @click="handleCancel">清空</el-button>
        <el-button size="mini" type="primary" @click="handleOK">确定</el-button>
      </div>
    </div>
    <span slot="reference" class="vxe-cell--filter">
      <i
        :class="{
          'vxe-filter--btn': true,
          'vxe-icon--funnel': true,
          'is-filtered': filterList.length !== 0,
        }"
        title="对所选的列启用筛选"
      />
    </span>
  </el-popover>
</template>

<script>
import { debounce } from 'lodash';

export default {
  name: 'ItemFilter',
  props: {
    fetch: {
      type: Function,
      default() {
        return () => new Promise();
      },
    },
    formatter: {
      type: Function,
      default() {
        return () => new Promise();
      },
    },
    filterList: {
      type: Array,
      default() {
        return [];
      },
    },
    column: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      input: '',
      data: [],
      allData: [],
      checked: [],
      visible: false,
      loading: false,
    };
  },
  watch: {
    input(newValue) {
      this.handleSearchChange(newValue);
    },
  },
  mounted() {
    this.handleSearchChange = debounce(this.handleSearchChange, 300);
  },
  methods: {
    handleShow() {
      this.loading = true;
      this.fetch(this.column.field)
        .then((data) => {
          this.data = data.map((item) => ({
            field: item,
          }));
          this.allData = this.data;
          this.$nextTick().then(() => {
            const checkRowKeys = this.data.filter(({ field }) => this.filterList.includes(field));
            this.$refs.table.setCheckboxRow(checkRowKeys, true);
            this.checked = checkRowKeys;
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleHide() {
      this.input = '';
      this.allData = [];
      this.data = [];
      this.checked = [];
    },
    selectAllEvent({ checked, records }) {
      this.checked = records;
    },
    selectChangeEvent({ checked, records }) {
      this.checked = records;
    },
    handleOK() {
      this.$emit(
        'change',
        this.column.field,
        this.checked.map(({ field }) => field)
      );
      this.visible = false;
    },
    handleCancel() {
      this.visible = false;
    },
    handleSearchChange(value) {
      this.data = this.allData.filter((item) => {
        let formatterValue = '';
        if (this.column.formatter) {
          formatterValue = this.column.formatter({ cellValue: item.field });
        }
        return item.field?.toString().includes(value) || formatterValue?.toString().includes(value);
      });
    },
  },
};
</script>

<style lang="less">
.vxe-cell--filter {
  margin-bottom: 1px;

  .is-filtered {
    color: @hs-primary-color;
  }
}

.hs-table-filter-wrapper {
  display: flex;
  flex-direction: column;

  .el-input {
    margin-bottom: 10px;
  }

  .hs-table-filter-footer {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>

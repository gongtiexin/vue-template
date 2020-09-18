<template>
  <vxe-grid
    align="center"
    size="small"
    border
    resizable
    stripe
    auto-resize
    highlight-hover-row
    max-height="680"
    show-overflow
    :data="tableData"
    :loading="loading && spinning"
    :sort-config="{
      defaultSort: {
        field: defaultSort.field,
        order: defaultSort.order,
      },
    }"
    v-bind="tableProps"
    @checkbox-all="selectAllEvent"
    @checkbox-change="selectChangeEvent"
  >
    <vxe-table-column v-for="(column, index) in columns" :key="index" v-bind="column">
      <template v-slot:header>
        <span>{{ column.title }}</span>
        <ItemFilter
          v-if="column.filterType === 'item'"
          :filterList="getFilterValue(column.field)"
          :column="column"
          :fetch="fetchColumn"
          @change="handleFilter"
        />
      </template>
      <template v-if="column.slotName" v-slot="{ row }">
        <slot :name="column.slotName" :row="row"></slot>
      </template>
    </vxe-table-column>
  </vxe-grid>
</template>

<script>
import ItemFilter from '../hs-remote-table/ItemFilter';
import { uniqBy } from 'lodash';

export default {
  name: 'HsLocalTable',
  components: {
    ItemFilter,
  },
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    fetch: {
      type: Object,
      default() {
        return {
          data: () => Promise.resolve([]),
        };
      },
    },
    defaultSort: {
      type: Object,
      default() {
        return {
          field: '',
          order: '',
        };
      },
    },
    defaultSearch: {
      type: Object,
      default() {
        return {
          keys: [],
          values: [],
        };
      },
    },
    loading: {
      type: Boolean,
      default: true,
    },
    tableProps: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      spinning: true,
      tableData: [],
      localData: [],
      checked: [],
      search: this.defaultSearch,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData(params) {
      this.spinning = true;
      return this.fetch
        .data(params)
        .then((data) => {
          this.localData = data;
          this.checked = [];
          this.fetchFilterData();
        })
        .finally(() => {
          this.spinning = false;
        });
    },
    fetchColumn(key) {
      return Promise.resolve(uniqBy(this.localData, key).map((item) => item[key]));
    },
    fetchFilterData() {
      const { keys, values } = this.search;
      this.tableData = this.localData.filter((item) =>
        keys.every((key, index) => values[index].includes(item[key]))
      );
    },
    handleFilter(key, value) {
      let index = this.search.keys.findIndex((item) => item === key);
      if (index === -1) {
        index = this.search.keys.push(key) - 1;
      }
      this.search.values[index] = value;
      this.fetchFilterData();
    },
    getFilterValue(key) {
      const index = this.search.keys.findIndex((item) => item === key);
      if (index === -1) {
        return [];
      }
      return this.search.values[index];
    },
    selectAllEvent({ records }) {
      this.checked = records;
    },
    selectChangeEvent({ records }) {
      this.checked = records;
    },
  },
};
</script>

<style lang="less" scoped></style>

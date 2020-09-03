<template>
    <vxe-grid
        class="hs-remote-table"
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
        :loading="loading"
        :seq-config="{
            startIndex: (pagerConfig.currentPage - 1) * pagerConfig.pageSize,
        }"
        :pager-config="pagerConfig"
        :sort-config="{
            remote: true,
            defaultSort: {
                field: defaultOrderField,
                order: defaultOrderBy,
            },
        }"
        :filter-config="{
            remote: true,
        }"
        v-bind="tableProps"
        @sort-change="handleSortChange"
        @page-change="handlePageChange"
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
import ItemFilter from './ItemFilter';
import { cloneDeep } from 'lodash';
import request from '@src/utils/axios';
import { defaultPage } from '@src/constants/common';

export default {
    name: 'HsTable',
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
        dataApi: String,
        columnApi: String,
        defaultOrderField: {
            type: String,
            default: '',
        },
        defaultOrderBy: {
            type: String,
            default: '',
        },
        defaultSearchKey: {
            type: Array,
            default() {
                return [];
            },
        },
        defaultSearchValue: {
            type: Array,
            default() {
                return [];
            },
        },
        tableProps: {
            type: Object,
            default() {
                return {};
            },
        },
        fieldType: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            loading: true,
            tableData: [],
            pagerConfig: {
                total: defaultPage.total,
                currentPage: defaultPage.page,
                pageSize: defaultPage.size,
                align: 'center',
                pageSizes: [defaultPage.size, 30, 45, 60, 75, 100, 200],
                layouts: [
                    'Total',
                    'PrevJump',
                    'PrevPage',
                    'Number',
                    'NextPage',
                    'NextJump',
                    'FullJump',
                    'Sizes',
                ],
                size: 'small',
            },
            checked: [],
            searchKey: this.defaultSearchKey,
            searchValue: this.defaultSearchValue,
            ascOrDesc: this.defaultOrderBy,
            orderBy: this.defaultOrderField,
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData(params) {
            this.loading = true;
            const { currentPage: page, pageSize: limit } = this.pagerConfig;
            const { searchKey, searchValue, ascOrDesc, orderBy } = this;
            const newParams = {
                page,
                limit,
                searchKey,
                searchValue,
                ascOrDesc,
                orderBy,
                ...params,
            };
            newParams.orderBy = this.transformField(newParams.orderBy);
            newParams.searchKey = newParams.searchKey.map((key) => this.transformField(key));
            return request({ method: 'GET', url: this.dataApi, params: newParams })
                .then(({ data, total }) => {
                    this.tableData = data;
                    this.pagerConfig.total = total;
                    this.checked = [];
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        fetchColumn(key) {
            const { ascOrDesc, orderBy } = this;
            const searchKey = cloneDeep(this.searchKey);
            const searchValue = cloneDeep(this.searchValue);

            // 合并
            const index = searchKey.findIndex((item) => item === key);
            if (index !== -1) {
                searchKey.splice(index, 1);
                searchValue.splice(index, 1);
            }

            // 约定放在第一位
            searchKey.unshift(key);
            searchValue.unshift([]);

            const newParams = { ascOrDesc, orderBy, searchKey, searchValue };
            newParams.orderBy = this.transformField(newParams.orderBy);
            newParams.searchKey = newParams.searchKey.map((key) => this.transformField(key));
            return request({ method: 'GET', url: this.columnApi, params: newParams });
        },
        handleSortChange({ column, property, order }) {
            this.ascOrDesc = order;
            this.orderBy = order ? property : '';
            return this.fetchData();
        },
        handlePageChange({ currentPage, pageSize }) {
            this.pagerConfig.currentPage = currentPage;
            this.pagerConfig.pageSize = pageSize;
            this.fetchData();
        },
        handleFilter(key, value) {
            let index = this.searchKey.findIndex((item) => item === key);
            if (index === -1) {
                index = this.searchKey.push(key) - 1;
            }
            this.searchValue[index] = value;
            this.pagerConfig.currentPage = 1;
            this.fetchData();
        },
        getFilterValue(key) {
            const index = this.searchKey.findIndex((item) => item === key);
            if (index === -1) {
                return [];
            }
            return this.searchValue[index];
        },
        selectAllEvent({ checked, records }) {
            this.checked = records;
        },
        selectChangeEvent({ checked, records }) {
            this.checked = records;
        },
        transformField(value) {
            switch (this.fieldType) {
                default:
                    return value;
            }
        },
    },
};
</script>

<style lang="less"></style>

<template>
    <div>
        <span>{{ msg }}</span>
        <hs-remote-table :columns="columns">
            <template v-slot:slot="{ row }">
                <span>{{ row }}</span>
            </template>
        </hs-remote-table>
        <hs-local-table :columns="columns1">
            <template v-slot:slot="{ row }">
                <span>{{ row }}</span>
            </template>
        </hs-local-table>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import HsRemoteTable from '@src/components/hs-remote-table';
import hsLocalTable from '@src/components/hs-local-table';

export default {
    name: 'Example',
    components: {
        'hs-remote-table': HsRemoteTable,
        'hs-local-table': hsLocalTable,
    },
    data() {
        return {
            columns: [
                {
                    width: 60,
                    type: 'checkbox',
                    fixed: 'left',
                },
                {
                    title: 'id',
                    field: 'id',
                    filterType: 'item',
                    sortable: true,
                    width: 100,
                    fixed: 'left',
                },
                {
                    title: 'formatter',
                    field: 'formatter',
                    filterType: 'item',
                    sortable: true,
                    formatter: ({ cellValue }) => {
                        return cellValue || '-';
                    },
                },
                { title: 'slot', field: 'slot', slotName: 'slot', width: 100 },
            ],
            columns1: [
                {
                    width: 60,
                    type: 'checkbox',
                    fixed: 'left',
                },
                {
                    title: 'id',
                    field: 'id',
                    filterType: 'item',
                    sortable: true,
                    'sort-method': (a, b) => a - b,
                    width: 100,
                    fixed: 'left',
                },
                {
                    title: 'formatter',
                    field: 'formatter',
                    filterType: 'item',
                    formatter: ({ cellValue }) => {
                        return cellValue || '-';
                    },
                },
                { title: 'slot', field: 'slot', slotName: 'slot', width: 100 },
            ],
        };
    },
    computed: {
        ...mapState({
            msg: (state) => state.example.msg,
        }),
    },
    mounted() {
        this.getMsg({ msg: 'Welcome to Your Vue.js App' });
    },
    methods: {
        ...mapActions('example', ['getMsg']),
    },
};
</script>

<style lang="less" scoped></style>

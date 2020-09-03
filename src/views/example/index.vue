<template>
    <div>
        <span>{{ msg }}</span>
        <HsTable :columns="columns" dataApi="/api/page" columnApi="/api/column">
            <template v-slot:slot="{ row }">
                <span>{{ row }}</span>
            </template>
        </HsTable>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import HsTable from '@src/components/hs-table';

export default {
    name: 'Example',
    components: {
        HsTable,
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

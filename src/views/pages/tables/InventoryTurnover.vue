<script>
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

export default {
    data() {
        return {
            tableData: [],
        };
    },
    mounted() {
        axios.get(BASE_URL + '/inventory/turnoverCoefficient')
            .then(response => {
                const { code, data } = response.data;
                if (code == 200) {
                    this.tableData = data;
                }
                // 成功时的处理逻辑
                // console.log(this.tableData);
            })
            .catch(error => {
                // 错误处理
                console.error("API调用错误：", error);
            });
    },
    methods: {
        handleEditClosed() {
            // 编辑关闭事件的处理逻辑
            const url = BASE_URL + '/inventory/turnoverCoefficient';
            axios.post(url, this.tableData)
                .then(response => {
                    // 处理响应数据
                    console.log(response.data);
                })
                .catch(error => {
                    // 处理错误情况
                    console.error(error);
                });
        },
    },
};
</script>

<template>
    <div>
        <!-- <p>
            <vxe-input v-model="filterName" type="search" placeholder="试试全表搜索" @keyup="searchEvent"></vxe-input>
        </p> -->
        <vxe-table border show-overflow :edit-config="{ trigger: 'click', mode: 'cell' }" :data="tableData"
            @edit-closed="handleEditClosed">
            <vxe-column type="seq" title="序号" width="70"></vxe-column>
            <vxe-column field="specNo" title="商家编码" :edit-render="{ name: 'input' }"></vxe-column>
            <vxe-column field="goodsName" title="货品名称" :edit-render="{ name: 'input' }"></vxe-column>
            <vxe-column field="spacName" title="规格名称" :edit-render="{ name: 'input' }"></vxe-column>
            <vxe-column field="goodsType" title="分类" :edit-render="{ name: 'input' }"></vxe-column>
            <vxe-column field="comment" title="备注" :edit-render="{ name: 'input' }"></vxe-column>
            <vxe-column field="turnoverCoefficient" title="库存周转系数" :edit-render="{ name: 'input' }"></vxe-column>
        </vxe-table>
    </div>
</template>

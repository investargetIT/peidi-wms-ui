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
        console.log('base url', BASE_URL);
        axios.get(BASE_URL + 'inventory/turnoverCoefficient')
            .then(response => {
                const { code, data } = response.data;
                if (code == 200) {
                    this.tableData = data;
                }
                // 成功时的处理逻辑
                console.log(this.tableData);
            })
            .catch(error => {
                // 错误处理
                console.error("API调用错误：", error);
            });
    },
};
</script>


<template>
    <div>
        <vxe-table border show-overflow :edit-config="{ trigger: 'click', mode: 'cell' }" :data="tableData">
            <vxe-column type="checkbox" width="60"></vxe-column>
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

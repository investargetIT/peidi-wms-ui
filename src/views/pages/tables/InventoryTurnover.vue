<script>
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

export default {
    data() {
        return {
            desserts: [
            ],
            tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
            ],

        };
    },
    mounted() {
        console.log('base url', BASE_URL);
        axios.get(BASE_URL + 'inventory/inventory-waring')
            .then(response => {
                // 成功时的处理逻辑
                this.desserts = response.data;
                console.log(this.desserts);
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
            <vxe-column field="id" title="商家编码" :edit-render="{ name: 'input' }"></vxe-column>
            <vxe-column field="name" title="货品名称" :edit-render="{ name: 'input' }"></vxe-column>
            <vxe-column field="role" title="规格名称" :edit-render="{ name: 'input' }"></vxe-column>
            <vxe-column field="sex" title="分类" :edit-render="{ name: 'input' }"></vxe-column>
            <vxe-column field="age" title="备注" :edit-render="{ name: 'input' }"></vxe-column>
            <vxe-column field="address" title="库存周转系数" :edit-render="{ name: 'input' }"></vxe-column>
        </vxe-table>
    </div>
</template>

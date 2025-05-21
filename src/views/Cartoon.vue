<template>
    <div class="body">
        <PdfViewer :pdfUrl="pdfUrl"></PdfViewer>
    </div>
</template>

<script>
import PdfViewer from '@/components/PdfViewer.vue';

export default {

    name: 'MyChart',
    components: {
        PdfViewer
    },
    data() {
        return {
            pdfUrl: '/pdf/01.pdf'
        }
    }

}
</script>

<style lang="less" scoped>
.body{
  width: 100vw;
  height: calc(100vh - 22vw);
}

</style>
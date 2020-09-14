<template>
  <!-- <pdf src="https://firebasestorage.googleapis.com/v0/b/dosaaf-2dec9.appspot.com/o/docs%2F%D0%BB%D0%BE%D0%BA%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5%20%D0%B0%D0%BA%D1%82%D1%8B.pdf?alt=media&token=21177288-0f80-4794-ad8e-87dea26f9d29" :page="1">
    <template slot="loading">
      loading content here...
    </template>
  </pdf> -->
  <!-- <embed :src="src" type="application/pdf" width="100%" height="100%" /> -->
  <!-- <iframe :src="`https://docs.google.com/viewer?url=${encodeURI(src)}&embedded=true`" style="position: absolute;width:100%; height: 100%;border: none;"></iframe> -->
  <embed :src="`https://docs.google.com/viewer?url=${encodeURI(src)}&embedded=true`" style="position: absolute;width:100%; height: 100%;border: none;" />
</template>

<script>
// import pdf from 'pdfvuer'

export default {
  props: ['src'],
//   components: {
//     pdf
//   }
}

</script>
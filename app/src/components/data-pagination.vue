<template>
  <div>
    <button @click="handlePrevious()">Prev</button>
    <button @click="handleNext()">Next</button>

    <div>{{ start }} - {{ end }} / {{ totalCount }}</div>
  </div>
</template>

<script lang="ts">
  export default {
    props: {
      page: Number,
      limit: Number,
      totalCount: Number,
    },

    computed: {
      start(): number {
        if (this.page && this.limit) return (this.page - 1) * this.limit + 1;
        return 0;
      },

      end() {
        if (this.limit && this.totalCount)
          return Math.min(this.start + this.limit - 1, this.totalCount);
        return 0;
      },

      nbrOfPages() {
        if (this.page && this.limit && this.totalCount) {
          return Math.ceil(this.totalCount / this.limit);
        }
        return 0;
      },
    },

    methods: {
      handlePrevious() {
        if (this.page && this.page > 1) {
          this.$emit('page-changed', this.page - 1);
        }
      },

      handleNext() {
        if (this.page && this.page < this.nbrOfPages) {
          this.$emit('page-changed', this.page + 1);
        }
      },
    },
  };
</script>

<style lang="scss" scoped></style>

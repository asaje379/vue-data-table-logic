<template>
  <div>
    <div>title</div>
    <div>
      <input
        type="text"
        placeholder="Rechercher"
        class="border"
        ref="searchInputRef"
        @input="handleSearchValueChanged" />
    </div>
  </div>

  <div>
    <table class="w-full">
      <thead>
        <tr>
          <th
            v-for="[key, value] in columns"
            :key="key"
            class="text-left">
            {{ value }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in rows"
          :key="row.id">
          <td v-for="[key] in columns">
            {{ row[key] }}
          </td>
        </tr>
        <div v-if="loading">Loading...</div>
      </tbody>
    </table>
    <data-pagination
      :page="filters.page"
      :limit="filters.limit"
      :totalCount="totalCount"
      @page-changed="handlePageChanged" />
  </div>
</template>

<script lang="ts">
  import { DataModel, Pagination } from '../models/model';
  import dataPagination from './data-pagination.vue';

  export default {
    props: {
      model: DataModel,
    },

    components: {
      dataPagination,
    },

    data() {
      return {
        columns: Object.entries(this.model?.columns ?? []),
        rows: [] as any[],
        totalCount: 0,
        loading: false,
        filters: {
          page: 1,
          limit: 4,
          search: '',
        },
      };
    },

    methods: {
      async loadItems() {
        this.loading = true;

        const result = await this.model?.find(this.filters);
        if (!result?.failed) {
          this.rows = result?.data.values;
          this.totalCount = result?.data.count;
        }

        this.loading = false;
      },

      updateFilters(filters: Pagination) {
        this.filters = { ...this.filters, ...filters };
        this.loadItems();
      },

      handlePageChanged(page: number) {
        this.updateFilters({ page });
      },

      handleSearchValueChanged(e: any) {
        const value = e.target.value;

        setTimeout(() => {
          const searchInputRef: any = this.$refs.searchInputRef;
          if (searchInputRef && value === searchInputRef.value) {
            this.updateFilters({ search: value });
          }
        }, 500);
      },
    },

    async mounted() {
      await this.loadItems();
    },
  };
</script>

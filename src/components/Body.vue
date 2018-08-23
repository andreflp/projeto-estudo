<template>
    <v-content class="body">
        <v-container fluid>
            <slot></slot>
        </v-container>
    </v-content>
</template>

<script>
export default {
  name: "my-body"
};
</script>

<style>
.body {
  padding: 20px;
}
</style>

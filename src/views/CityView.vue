<template>
    <div>
        <!-- Suspense component used for handling asynchronous loading -->
        <Suspense>
            <!-- Load the AsyncCityView component asynchronously -->
            <AsyncCityView />
            <!-- Fallback content displayed while AsyncCityView is loading -->
            <template #fallback>
                <p>Loading</p>
            </template>
        </Suspense>
    </div>
</template>

<script setup>
    // Import the AsyncCityView component from the specified path
    import AsyncCityView from '../components/AsyncCityView.vue';
</script>

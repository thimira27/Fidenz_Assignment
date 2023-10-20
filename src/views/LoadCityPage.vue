<template>
    <div>
        <!-- Suspense component used for handling asynchronous loading -->
        <Suspense>
            <!-- Load the City Page component asynchronously -->
            <CityPageComponent />
            <!-- Fallback content displayed while City Page Component is loading -->
            <template #fallback>
                <p>Loading</p>
            </template>
        </Suspense>
    </div>
</template>

<script setup>
    // Import the City Page component from the specified path
    import CityPageComponent from '../components/CityPageComponent.vue';
</script>

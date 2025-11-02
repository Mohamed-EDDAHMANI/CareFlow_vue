<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthentication } from '@/cookies/auth.cookie'
import { loginUser } from '@/core/services/auth.service'

const credentials = ref({
    email: '',
    password: ''
})

const isConnecting = ref(false)
const fallback_error = ref('')

const login = async () => {
    try {
        isConnecting.value = true
        fallback_error.value = ''
        const response = await loginUser(credentials.value)
        // axios response has data property
        useAuthentication().value = response.data?.token ?? response.data
        useRouter().push('/')
    } catch (error: any) {
        fallback_error.value = error?.response?.data?.message ?? String(error)
    } finally {
        isConnecting.value = false
    }
}
</script>

<template>
    <NuxtLayout name="empty">
        <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100">
            <div class="w-full max-w-4xl px-4">
                <div class="flex flex-col md:flex-row bg-white rounded-xl shadow-xl overflow-hidden">
                    <!-- Logo Section (Left) -->
                    <div class="w-full md:w-1/2 p-8 flex flex-col items-center justify-center bg-indigo-50">
                        <img src="/logo.png" class="h-40 mb-6" alt="Company Logo" />
                        <h1 class="text-3xl font-bold text-gray-800 text-center">Bienvenue</h1>
                        <p class="text-gray-600 mt-2 text-center">Veuillez vous connecter </p>
                    </div>
                    
                    <!-- Form Section (Right) -->
                    <div class="w-full md:w-1/2 p-8">
                        <div class="flex flex-col">
                            <h2 class="text-2xl font-bold text-gray-800 mb-6">Connexion</h2>
                            
                            <div class="space-y-4">
                                <FloatLabel>
                                    <InputText 
                                        id="email" 
                                        v-model="credentials.email" 
                                        class="w-full" 
                                        autocomplete="email"
                                        :disabled="isConnecting"
                                    />
                                    <label for="email">Email</label>
                                </FloatLabel>

                                <FloatLabel>
                                    <Password 
                                        v-model="credentials.password" 
                                        :feedback="false" 
                                        toggleMask 
                                        class="w-full"
                                        inputClass="w-full"
                                        :disabled="isConnecting"
                                    />
                                    <label>Mot de passe</label>
                                </FloatLabel>

                                <div v-if="fallback_error" class="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                                    {{ fallback_error }}
                                </div>
                                
                                <Button 
                                    :loading="isConnecting"
                                    label="Se connecter" 
                                    class="w-full mt-4" 
                                    size="large"
                                    @click="login"
                                    :class="{'opacity-50': isConnecting}"
                                >
                                    <template #loading>
                                        <i class="pi pi-spinner pi-spin mr-2"></i>
                                        Connexion...
                                    </template>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<style scoped>
/* Custom styling for the card */
:deep(.p-card) {
    border-radius: 0.75rem;
}

:deep(.p-card-content) {
    padding: 2rem;
}

:deep(.p-card-footer) {
    padding: 0 2rem 2rem 2rem;
}

/* FloatLabel adjustments */
:deep(.p-float-label) {
    margin-bottom: 1.5rem;
}

/* Button styling */
:deep(.p-button) {
    background-color: #d37f15;
    border-color: #d37f15;
    transition: all 0.2s;
}

:deep(.p-button:not(:disabled):hover) {
    background-color: #b86e12;
    border-color: #b86e12;
    transform: translateY(-1px);
}

:deep(.p-button:focus) {
    box-shadow: 0 0 0 0.2rem rgba(211, 127, 21, 0.5);
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .flex-col.md\:flex-row {
        flex-direction: column;
    }
    .w-full.md\:w-1\/2 {
        width: 100%;
    }
    .p-8 {
        padding: 2rem;
    }
}
</style>
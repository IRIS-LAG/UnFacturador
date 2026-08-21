<script setup>
const props = defineProps({
    user: {
        type: Object,
        default: () => ({ email: '', username: '' })
    }
})

</script>

<template>
    <header class="topbar">
        <div class="topbar-user">
            <div class="user-avatar">U</div>
            <div>
                <strong>{{props.user.username.toUpperCase()}}</strong>
                <span>{{props.user.email}}</span>
            </div>
        </div>
    </header>
</template>

<style scoped>
.topbar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 1.2rem 1.8rem;
    background: linear-gradient(150deg,var(--color3) 0%, var(--color1) 100%);
    border-bottom: 1px solid var(--color1);
}
.topbar-user {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}
.user-avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: var(--color3);
    color: var(--color1);
    display: grid;
    place-items: center;
    font-weight: 700;
    font-size: 1.5rem;
}
.topbar-user strong {
    display: block;
    color: white;
}
.topbar-user span {
    display: block;
    font-size: 0.85rem;
    color: var(--color3);
}
</style>

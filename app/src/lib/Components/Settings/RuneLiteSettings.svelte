<script lang="ts">
    import { GlobalState } from '$lib/State/GlobalState';
    import { BoltService } from '$lib/Services/BoltService';
    import { get } from 'svelte/store';

    async function selectAppImage() {
        const response = await fetch('/json-file-picker');
        if (response.status === 200) {
            const path = await response.text();
            const config = get(GlobalState.config);
            config.runelite_custom_appimage = path;
            config.runelite_use_appimage = true;
            GlobalState.config.set(config);
            BoltService.saveConfig();
        }
    }
</script>

<div class="settings-section">
    <h3>RuneLite Settings</h3>
    
    <div class="setting">
        <label>
            <input
                type="checkbox"
                bind:checked={$GlobalState.config.runelite_use_appimage}
                on:change={() => BoltService.saveConfig()}
            />
            Use AppImage
        </label>
    </div>

    {#if $GlobalState.config.runelite_use_appimage}
        <div class="setting">
            <button on:click={selectAppImage}>Select AppImage</button>
            {#if $GlobalState.config.runelite_custom_appimage}
                <span class="path">{$GlobalState.config.runelite_custom_appimage}</span>
            {/if}
        </div>
    {:else}
        <div class="setting">
            <label>
                <input
                    type="checkbox"
                    bind:checked={$GlobalState.config.runelite_use_custom_jar}
                    on:change={() => BoltService.saveConfig()}
                />
                Use custom JAR
            </label>
            {#if $GlobalState.config.runelite_use_custom_jar}
                <button on:click={selectCustomJar}>Select JAR</button>
                {#if $GlobalState.config.runelite_custom_jar}
                    <span class="path">{$GlobalState.config.runelite_custom_jar}</span>
                {/if}
            {/if}
        </div>
    {/if}
</div>

<style>
    .settings-section {
        margin: 1rem 0;
    }
    .setting {
        margin: 0.5rem 0;
    }
    .path {
        margin-left: 1rem;
        font-family: monospace;
    }
</style> 
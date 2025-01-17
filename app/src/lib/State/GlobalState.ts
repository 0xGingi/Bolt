import type { Session } from '$lib/Services/UserService';
import { defaultConfig, type Config } from '$lib/Util/Config';
import { writable } from 'svelte/store';

interface Config {
	runelite_use_appimage: boolean;
	runelite_custom_appimage: string;
}

export const GlobalState = {
	configHasPendingChanges: false,
	config: writable<Config>(defaultConfig),
	sessions: writable<Session[]>([])
};
